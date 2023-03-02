import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import {
  CopyOutlined,
  CalendarOutlined,
  WarningOutlined,
  FileAddOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';

// 路由页面组件 懒加载引入
const Home = lazy(() => import('../views/Home/Home'));
const Apply = lazy(() => import('../views/Apply/Apply'));
const Check = lazy(() => import('../views/Check/Check'));
const Exception = lazy(() => import('../views/Exception/Exception'));
const Login = lazy(() => import('../views/Login/Login'));
const Sign = lazy(() => import('../views/Sign/Sign'));
// 路由守卫组件
const AuthRouter = lazy(() => import('../components/AuthRouter'));

// 扩展meta元信息接口
declare module 'react-router' {
  interface IndexRouteObject {
    meta?: {
      menu?: boolean;
      title?: string;
      icon?: React.ReactNode;
      auth?: boolean;
    };
    name?: string;
  }
  interface NonIndexRouteObject {
    meta?: {
      menu?: boolean;
      title?: string;
      icon?: React.ReactNode;
      auth?: boolean;
    };
    name?: string;
  }
}

// 路由表配置
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/sign" />,
  },
  {
    path: '/',
    name: 'home',
    element: (
      <AuthRouter>
        <Home />
      </AuthRouter>
    ),
    meta: {
      menu: true,
      title: '考勤管理',
      icon: <CopyOutlined />,
      auth: true,
    },
    children: [
      {
        path: 'apply',
        name: 'apply',
        element: <Apply />,
        meta: {
          menu: true,
          title: '添加考勤审批',
          icon: <FileAddOutlined />,
          auth: true,
        },
      },
      {
        path: 'check',
        name: 'check',
        element: <Check />,
        meta: {
          menu: true,
          title: '我的考勤审批',
          icon: <ScheduleOutlined />,
          auth: true,
        },
      },
      {
        path: 'exception',
        name: 'exception',
        element: <Exception />,
        meta: {
          menu: true,
          title: '异常考勤查询',
          icon: <WarningOutlined />,
          auth: true,
        },
      },
      {
        path: 'sign',
        name: 'sign',
        element: <Sign />,
        meta: {
          menu: true,
          title: '在线打卡签到',
          icon: <CalendarOutlined />,
          auth: true,
        },
      },
    ],
  },
  {
    path: '/login',
    element: (
      <AuthRouter>
        <Login />
      </AuthRouter>
    ),
  },
];

const router = createBrowserRouter(routes);

export default router;
