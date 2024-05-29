import { lazy } from 'react';
import { AuthRouteObject } from './AuthRoute';
import { HomePage, Content, LoginPage, ForgotPassword } from '@/pages';
import { AdminLayout } from '@/components';
import { Navigate } from 'react-router-dom';
import { MenuList } from '@/pages/MenuPage';
import { BannerList } from '@/pages/BannerPage';
import { CreateUpdateBannerPage } from '@/pages/BannerPage/CreateUpdateBannerPage';
import { CreateUpdateMenuPage } from '@/pages/MenuPage/CreateUpdateMenuPage';
import { NewsTypeList } from '@/pages/NewsTypePage';
import { CreateUpdateNewsTypePage } from '@/pages/NewsTypePage/CreateUpdateNewsTypePage';
import { NewsList } from '@/pages/NewsPage';
import { CreateUpdateNewsPage } from '@/pages/NewsPage/CreateUpdateNewsPage';
import { CreateUpdateCompanyPage } from '@/pages/CompanyPage';
import { PageContentList } from '@/pages/PageContent';
import { CreateUpdatePageContent } from '@/pages/PageContent/CreateUpdatePageContent';
import { DepartmentList } from '@/pages/DeparmentPage';
import { CreateUpdateDepartmentPage } from '@/pages/DeparmentPage/CreateUpdateDepartmentPage';
import {
  CreateUpdateDocumentTypePage,
  DocumentTypeList,
} from '@/pages/DocumentTypePage';

const WebLayout = lazy(() => import('@/components/WebLayout'));

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
    element: <WebLayout />,
    children: [
      { index: true, name: 'Home', element: <HomePage /> },
      {
        path: '/trang/*',
        name: 'Page',
        element: <Content />
      },
      { path: '/lien-he', name: 'Contact', element: <>Liên hệ</> },
      { path: '/dang-nhap', name: 'Sign In', element: <LoginPage /> },
      { path: '/dang-ky', name: 'Sign Up', element: <>Đăng ký</> },
      { path: '/quen-mat-khau', name: 'Forgot password', element: <ForgotPassword /> },
      { path: '/sitemap', name: 'Sitemap', element: <>Sitemap</> },
    ],
  },
  {
    path: '/admin',
    name: 'Admin',
    // Layout cho trang Quản trị web
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to={'/admin/company'} /> },
      { path: '/admin/company', name: 'Company', element: <CreateUpdateCompanyPage /> },
      
      { path: '/admin/menu', name: 'Menu', element: <MenuList /> },
      { path: '/admin/menu/create', name: 'Create menu', element: <CreateUpdateMenuPage /> },
      { path: '/admin/menu/edit', name: 'Edit menu', element: <CreateUpdateMenuPage /> },
      
      { path: '/admin/banners', name: 'Banners', element: <BannerList /> },
      { path: '/admin/banners/create', name: 'Create banner', element: <CreateUpdateBannerPage /> },
      { path: '/admin/banners/edit', name: 'Edit banner', element: <CreateUpdateBannerPage /> },
      
      { path: '/admin/pages', name: 'Pages', element: <PageContentList /> },
      { path: '/admin/pages/create-or-edit', name: 'Create pages', element: <CreateUpdatePageContent /> },
      
      { path: '/admin/news', name: 'News', element: <NewsList /> },
      { path: '/admin/news/create-or-edit', name: 'Create or edit news', element: <CreateUpdateNewsPage /> },
      
      { path: '/admin/news-type', name: 'News types', element: <NewsTypeList /> },
      { path: '/admin/news-type/create', name: 'Create news type', element: <CreateUpdateNewsTypePage /> },
      { path: '/admin/news-type/edit', name: 'Edit news type', element: <CreateUpdateNewsTypePage /> },
      
      { path: '/admin/document-type', name: 'Document types', element: <DocumentTypeList /> },
      { path: '/admin/document-type/create', name: 'Create document type', element: <CreateUpdateDocumentTypePage /> },
      { path: '/admin/document-type/edit', name: 'Edit document type', element: <CreateUpdateDocumentTypePage /> },
      
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
      
      { path: '/admin/contacts', name: 'Contacts', element: <DepartmentList /> },
      { path: '/admin/contacts/create', name: 'Add contact', element: <CreateUpdateDepartmentPage /> },
      { path: '/admin/contacts/edit', name: 'Edit contact', element: <CreateUpdateDepartmentPage /> },
      
      { path: '/admin/members', name: 'Members', element: <>Members</> },
      { path: '/admin/users', name: 'Users', element: <>Users</> },
      { path: '/admin/*', name: 'Not found', element: <>Not found</> },
    ]
  },
  { path: '*', name: 'Not found', element: <>Not found</> },
];
