import { AuthRouteObject } from './AuthRoute';
import { Content, Home } from '@/pages';
import { AdminLayout, AppLayout } from '@/components';
import { Navigate } from 'react-router-dom';
import { MenuList } from '@/pages/MenuPage';

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
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to={'/admin/menu'} /> },
      { path: '/admin/menu', name: 'Menu', element: <MenuList /> },
      { path: '/admin/banners', name: 'Banners', element: <>Banners</> },
      { path: '/admin/pages', name: 'Pages', element: <>Pages</> },
      { path: '/admin/blogs', name: 'Blogs', element: <>Blogs</> },
      {
        path: '/admin/media',
        name: 'Media',
        children: [
          { path: '/admin/media/photos', name: 'Photos', element: <>Photos</> },
          { path: '/admin/media/videos', name: 'Video', element: <>Videos</> },
          { path: '/admin/media/certifications', name: 'Certifications', element: <>Certifications</> },
          { path: '/admin/media/partnersLogo', name: 'PartnersLogo', element: <>Partners Logo</> },
        ]
      },
      { path: '/admin/contacts', name: 'Contacts', element: <>Contacts</> },
      { path: '/admin/members', name: 'Members', element: <>Members</> },
      { path: '/admin/users', name: 'Users', element: <>Users</> },
    ]
  },
  { path: '*', name: 'Not found', element: <>Not found</> },
];
