import {
  AppstoreOutlined,
  HomeFilled,
  OrderedListOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";

export const menus = {
  path: "/",
  routes: [
    {
      path: "/",
      name: "欢迎",
      icon: <HomeFilled />,
    },
    {
      path: "/demos",
      name: "代码案例",
      icon: <AppstoreOutlined />,
      routes: [
        {
          name: "查询列表",
          path: "queryform",
          icon: <OrderedListOutlined></OrderedListOutlined>,
        },
        {
          name: "可编辑列表",
          path: "arraytable",
          icon: <OrderedListOutlined></OrderedListOutlined>,
        },
        {
          name: "枚举值",
          path: "proenum",
          icon: <OrderedListOutlined></OrderedListOutlined>,
        },
        {
          name: "级联查询",
          path: "cascaderplus",
          icon: <OrderedListOutlined></OrderedListOutlined>,
        },
      ],
    },
  ],
} satisfies Required<React.ComponentProps<typeof ProLayout>>["route"];
