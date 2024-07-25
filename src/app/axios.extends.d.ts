import "axios";
declare module "axios" {
  interface AxiosRequestConfig {
    // 不检查 auth header
    ignoreAuthHeader?: boolean;
    // 是否返回原始Axios响应
    rawResponse?: boolean;
    // 不展示 notify
    silentOnError?: boolean;
  }
}
