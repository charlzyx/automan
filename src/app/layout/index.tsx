import "@/app/global.css";
import { useMount } from "ahooks";
import moment from "moment";
import "moment/locale/zh-cn";
import { Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AntdConfigProvider } from "../providers";
moment.locale("zh-cn");

const AppLayout = () => {
  const navigate = useNavigate();

  useMount(() => {
    const isLogin = true;
    if (!isLogin) {
      return navigate("/login");
    }
  });

  return (
    <Suspense fallback={undefined}>
      <AntdConfigProvider>
        <Outlet />
      </AntdConfigProvider>
    </Suspense>
  );
};

export default AppLayout;
