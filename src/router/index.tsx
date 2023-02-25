import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

// 路由页面组件 懒加载引入
const Home = lazy(() => import('../views/Home/Home'));
const Apply = lazy(() => import('../views/Apply/Apply'));
const Check = lazy(() => import('../views/Check/Check'));
const Exception = lazy(() => import('../views/Exception/Exception'));
const Login = lazy(() => import('../views/Login/Login'));
const Sign = lazy(() => import('../views/Sign/Sign'));

// 路由表配置
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'apply',
        element: <Apply />,
      },
      {
        path: 'check',
        element: <Check />,
      },
      {
        path: 'exception',
        element: <Exception />,
      },
      {
        path: 'sign',
        element: <Sign />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
];

const router = createBrowserRouter(routes);

export default router;
