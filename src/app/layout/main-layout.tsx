import { GithubOutlined } from "@ant-design/icons";
import { PageContainer, ProLayout } from "@ant-design/pro-components";
import { observer } from "@formily/react";
import { Space } from "antd";
import { Suspense, useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { menus } from "../menus";
import { useAccessStore } from "@/models/access";
import { useUserStore } from "@/models/user";

const conf = {
  style: {
    height: "100vh",
    overflow: "auto",
  },
  menu: {
    collapsedShowGroupTitle: true,
  },
};

const MainLayout = observer(() => {
  const location = useLocation();
  const pathname = location.pathname;
  const accessList = useAccessStore((state) => state.list);
  const user = useUserStore();

  const route = useMemo(() => {
    // do something loop filter if needed
    menus.routes = menus.routes.filter((x) => accessList);
    return menus;
  }, [accessList]);

  return (
    <Suspense fallback={undefined}>
      <div style={conf.style}>
        <ProLayout
          route={route}
          logo="https://r2.charlzyx.xyz/duckformlogo.png"
          title={"Antd管理后台模版"}
          avatarProps={{
            src: user.avatarUrl,
            title: user.nickName || "未登录",
            size: "small",
          }}
          actionsRender={(props) => {
            if (props.isMobile) return [];
            return [
              <a key="github" href="https://github.com/charlzyx/automan">
                <GithubOutlined key="github"></GithubOutlined>
              </a>,
            ];
          }}
          menuItemRender={(menu) => {
            return (
              <Link to={menu.path!} key={menu.key}>
                <Space>
                  {menu.icon}
                  {menu.name}
                </Space>
              </Link>
            );
          }}
          // menu={conf.menu}
          location={{
            pathname,
          }}
        >
          <PageContainer>
            <Outlet />
          </PageContainer>
        </ProLayout>
      </div>
    </Suspense>
  );
});

export default MainLayout;
