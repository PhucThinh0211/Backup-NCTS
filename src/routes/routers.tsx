import { AuthRouteObject } from './AuthRoute';
import { Content, Home } from '@/pages';
import { AppLayout } from '@/components';
import { Outlet } from 'react-router';

type MetaMenu = {
  name?: string;
  icon?: React.ReactNode;
};

export type MetaMenuAuthRouteObject = AuthRouteObject<MetaMenu>;

// prettier-ignore
export const routers: MetaMenuAuthRouteObject[] = [
  {
    path: '/',
    name: 'Main',
    element: <AppLayout />,
    children: [
      { index: true, name: 'Home', element: <Home /> },
      {
        path: '/trang/*',
        name: 'Page',
        element: <Content />
      },
      { path: '/lien-he', name: 'Contact', element: <>Liên hệ</> },
      { path: '/dang-nhap', name: 'Sign In', element: <>Đăng nhập</> },
      { path: '/dang-ky', name: 'Sign Up', element: <>Đăng ký</> },
      { path: '/sitemap', name: 'Sitemap', element: <>Sitemap</> },
    ],
  },
  {
    path: '/admin',
    name: 'Admin',
    // Layout cho trang Quản trị web
    element: <Outlet />,
    children: [
      { index: true, name: 'Home', element: 'Quản trị nội dung website' }
    ]
  },
  { path: '*', name: 'Not found', element: <>Not found</> },
];
