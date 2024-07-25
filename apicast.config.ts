import type { SwaggerV2 } from "apicast";
import {
  byTags,
  defineConfig,
  getMaxSamePath,
  makeNameByUrl,
  typingsOf,
  where,
} from "apicast";
import fs, { linkSync } from "node:fs";

const reexports = (mod: string, defs: SwaggerV2["definitions"] = {}) => {
  const list = Object.keys(defs as any);
  const lines = [`  export namespace ${mod} {`];
  list.forEach((name) => {
    const notOk = /[^a-zA-Z]/g.test(name);
    if (notOk) return;
    lines.push(`    export type ${name} = ${mod}Def['${name}'];`);
  });
  lines.push("  }");

  return [
    `import { definitions as ${mod}Def } from './${mod}DTS'`,
    lines.join(""),
  ] as const;
};

const map = {
  petstore: "/petstore",
};

const ignorePath = /\*/;

fs.writeFileSync(
  "./src/api/apidefs.d.ts",
  `${Object.keys(map)
    .map((name) => {
      return `import { definitions as ${name}Def } from './${name}DTS'`;
    })
    .join("\n")}
declare namespace defs {

`,
);

let acc = 0;
export default defineConfig({
  input: Object.keys(map).reduce((mapping, name) => {
    mapping[name] = `./swagger/${name}.json`;
    return mapping;
  }, {}),
  output: "./src/api/",
  tpl: async (input: SwaggerV2, sourceName: string) => {
    // 根据 tag 分组
    const tags = byTags(input);
    const pickRspType = typingsOf.pickRsp;
    const lines = [
      // 导入类型
      `import { paths } from './${sourceName}DTS';`,
      `import { AxiosRequestConfig, request } from '@/app/request';`,
      // 导入辅助函数
      pickRspType,
      `type PickBody<T extends any> = T extends Record<string, infer U> ? U : T;
      `,
    ];

    const [importer, namespaces] = reexports(sourceName, input.definitions);
    fs.appendFileSync("./src/api/apidefs.d.ts", namespaces);
    acc += 1;
    if (acc === Object.keys(map).length) {
      fs.appendFileSync("./src/api/apidefs.d.ts", "}");

      setTimeout(() => {
        fs.writeFileSync(
          "./src/api/index.ts",
          `${Object.keys(map)
            .map((name) => {
              return `import * as ${name} from './${name}'`;
            })
            .join("\n")}
export type { defs } from './apidefs';

export const Api = {
  ${Object.keys(map).join(",")}
};
        `,
        );
      }, 300);
    }

    tags.forEach((tag) => {
      // 没有方法就不生成
      if (tag.operations.length === 0) return;
      // 描述写入注释
      if (tag.description) {
        lines.push(`\n/** ${tag.description || ""} */`);
      }
      const tagKey = tag.key.replace(/[^a-zA-Z0-9_]/g, "NAME");
      // 导出 tag 对应的模块
      lines.push(`\nexport const ${tagKey} = {`);
      const samePath = getMaxSamePath(tag.operations.map((item) => item.path));

      tag.operations.forEach((op) => {
        // 拼装单个 请求的代码
        const { method, path } = op;
        if (ignorePath.test(path)) return;
        const parameterIn = where(op);

        const dataType = [
          parameterIn.query ? `${typingsOf(path, method).query}` : "",
          parameterIn.body ? `PickBody<${typingsOf(path, method).body}>` : "",
          parameterIn.formData ? `${typingsOf(path, method).formData}` : "",
          parameterIn.path ? `${typingsOf(path, method).path}` : "",
        ]
          .filter(Boolean)
          .join("&");

        const withPrefixPath = map[sourceName] + path;
        const maybePathParmas = parameterIn.path
          ? withPrefixPath.replace(/\{(.*?)\}/g, (target, pathParamName) => {
              return `\${${"data"}.${pathParamName}}`;
            })
          : withPrefixPath;

        // console.log('withPrefixPath', withPrefixPath, map[sourceName]);
        const fnName = makeNameByUrl(path, method, samePath);
        // nameUrl.splice(0, nameUrl.length - 2);
        const fn = [
          "\n",
          op.summary || op.description
            ? `/** ${op.summary || ""} ${op.description || ""} */`
            : "",
          "\n",
          `${fnName}(`,
          dataType ? `data: ${dataType},` : "_useless?: any,",
          `config?: Omit<AxiosRequestConfig, 'data' | 'params'> `,
          `) {`,
          `return request.${method}(\`${maybePathParmas}\`, {
            ${
              parameterIn.body || parameterIn.formData || parameterIn.path
                ? "data,"
                : ""
            }
            ${parameterIn.query ? "params: data," : ""}
            ...(config || {})
          }) as Promise<${typingsOf(path, method).maybeRsp}>;
          `,
          "},\n",
        ].join("");

        lines.push(fn);
      });
      lines.push(`}\n`);
    });

    return lines.join("\n").replace(/\n\n+/g, "\n");
  },
});
