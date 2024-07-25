import React, { Suspense } from "react";

import { createBrowserRouter } from "react-router-dom";

import AppLayout from "@/app/layout/index";
import AuthLayout from "@/app/layout/auth-layout";
import MainLayout from "@/app/layout/main-layout";

const Welcome = React.lazy(() => import("@/pages/welcome"));
const DemoQueryForm = React.lazy(() => import("@/pages/demos/queryform"));
const DemoArrayTable = React.lazy(() => import("@/pages/demos/arraytable"));
const DemoProEnum = React.lazy(() => import("@/pages/demos/proenum"));
const DemoCascaderPlus = React.lazy(() => import("@/pages/demos/cascaderplus"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: (
              <Suspense fallback={undefined}>
                <div>LOGIN</div>
              </Suspense>
            ),
          },
          {
            path: "/forgetpwd",
            element: (
              <Suspense fallback={undefined}>
                <div>RE FIND MY PASSWORD</div>
              </Suspense>
            ),
          },
        ],
      },
      {
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: (
              <Suspense fallback={undefined}>
                <Welcome />
              </Suspense>
            ),
          },
          {
            path: "/demos",
            children: [
              {
                path: "queryform",
                element: (
                  <Suspense fallback={undefined}>
                    <DemoQueryForm />
                  </Suspense>
                ),
              },
              {
                path: "arraytable",
                element: (
                  <Suspense fallback={undefined}>
                    <DemoArrayTable />
                  </Suspense>
                ),
              },
              {
                path: "proenum",
                element: (
                  <Suspense fallback={undefined}>
                    <DemoProEnum />
                  </Suspense>
                ),
              },
              {
                path: "cascaderplus",
                element: (
                  <Suspense fallback={undefined}>
                    <DemoCascaderPlus />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);
