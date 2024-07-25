import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";

export const AntdConfigProvider = (props: React.PropsWithChildren) => {
  return <ConfigProvider locale={zhCN}>{props.children}</ConfigProvider>;
};
