import { lazy } from 'react';
import { AuthRouteObject } from './AuthRoute';
import {
  HomePage,
  Content,
  LoginPage,
  ForgotPassword,
  SignUp,
  NewsDetail,
  ContactPage,
  QuickLookupPage,
} from '@/pages';
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
import { RolePage } from '@/pages/RolePage';
import { UserPage } from '@/pages/UsersPage';
import {
  DocumentList,
  PhotoList,
  VideoList,
  CertificateList,
  LogoList,
} from '@/pages/FileManagement';
import { RequireAuth } from '@/components';
import { EstimateChargePage } from '@/pages/EstimateCharge';
import { AccountPage } from '@/pages/CustomerService/Account';
import { Emaling } from '@/pages/Emailing';

const WebLayout = lazy(() => import('@/components/WebLayout'));
const AdminLayout = lazy(() => import('@/components/AdminLayout'));
const CustomerServiceLayout = lazy(
  () => import('@/components/CustomerServiceLayout')
);

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
      {
        path: '/tra-cuu-thong-tin',
        name: 'Lookup',
        element: <QuickLookupPage />
      },
      {
        path: '/tinh-phi-hang-nhap',
        name: 'EstimateCharge',
        element: <EstimateChargePage />
      },
      {
        path: '/phuc-vu-khach-hang',
        name: 'Customers',
        element: <RequireAuth><CustomerServiceLayout /></RequireAuth>,
        children: [
          { index: true, element: <Navigate to={'/phuc-vu-khach-hang/tai-khoan'} /> },
          {
            path: '/phuc-vu-khach-hang/tai-khoan',
            name: 'Account',
            element: <AccountPage />
          },
          {
            path: '/phuc-vu-khach-hang/dich-vu',
            name: 'Service',
            element: <>Dịch vụ</>
          },
          {
            path: '/phuc-vu-khach-hang/hang-xuat',
            name: 'Export',
            element: <>Hàng xuất</>
          },
          {
            path: '/phuc-vu-khach-hang/hang-nhap',
            name: 'Import',
            element: <>Hàng nhập</>
          },
          {
            path: '/phuc-vu-khach-hang/doi-mat-khau',
            name: 'Change Password',
            element: <>Đổi mật khẩu</>
          },
        ]
      },
      {
        path: '/tin-tuc/*',
        name: 'News',
        element: <NewsDetail />
      },
      { path: '/lien-he', name: 'Contact', element: <ContactPage /> },
      { path: '/dang-nhap', name: 'Sign In', element: <LoginPage /> },
      { path: '/dang-ky', name: 'Sign Up', element: <SignUp /> },
      { path: '/quen-mat-khau', name: 'Forgot password', element: <ForgotPassword /> },
      { path: '/sitemap', name: 'Sitemap', element: <>Sitemap</> },
    ],
  },
  {
    path: '/admin',
    name: 'Admin',
    // Layout cho trang Quản trị web
    element: <RequireAuth><AdminLayout /></RequireAuth>,
    children: [
      { index: true, element: <Navigate to={'/admin/company'} /> },
      { path: '/admin/company', name: 'Company', element: <CreateUpdateCompanyPage /> },
      
      { path: '/admin/menu', name: 'Menu', auth: 'CMS.Menus', element: <MenuList /> },
      { path: '/admin/menu/create-or-edit', name: 'Create menu', auth: ['CMS.Menus.Create', 'CMS.Menus.Edit'], element: <CreateUpdateMenuPage /> },
      
      { path: '/admin/banners', name: 'Banners', auth: 'CMS.Banners', element: <BannerList /> },
      { path: '/admin/banners/create-or-edit', name: 'Create banner', auth: ['CMS.Banners.Create', 'CMS.Banners.Edit'], element: <CreateUpdateBannerPage /> },
      
      { path: '/admin/pages', name: 'Pages', auth: 'CMS.Pages', element: <PageContentList /> },
      { path: '/admin/pages/create-or-edit', name: 'Create pages', auth: ['CMS.Pages.Create', 'CMS.Pages.Edit'], element: <CreateUpdatePageContent /> },
      
      { path: '/admin/news', name: 'News', auth: 'CMS.News', element: <NewsList /> },
      { path: '/admin/news/create-or-edit', name: 'Create or edit news', auth: ['CMS.News.Create', 'CMS.News.Edit'], element: <CreateUpdateNewsPage /> },
      
      { path: '/admin/news-type', name: 'News types', auth: 'CMS.NewsTypes', element: <NewsTypeList /> },
      { path: '/admin/news-type/create-or-edit', name: 'Create news type', auth: ['CMS.NewsTypes.Create', 'CMS.NewsTypes.Edit'], element: <CreateUpdateNewsTypePage /> },
      
      { path: '/admin/document-type', name: 'Document types', auth: 'CMS.DocumentTypes', element: <DocumentTypeList /> },
      { path: '/admin/document-type/create-or-edit', name: 'Create document type', auth: ['CMS.DocumentTypes.Create', 'CMS.DocumentTypes.Edit'], element: <CreateUpdateDocumentTypePage /> },
      
      {
        path: '/admin/media',
        name: 'Media',
        auth: 'CMS.Files',
        children: [
          { path: '/admin/media/documents', name: 'Documents', element: <DocumentList /> },
          { path: '/admin/media/photos', name: 'Photos', element: <PhotoList /> },
          { path: '/admin/media/videos', name: 'Video', element: <VideoList /> },
          { path: '/admin/media/certifications', name: 'Certifications', element: <CertificateList /> },
          { path: '/admin/media/partnersLogo', name: 'PartnersLogo', element: <LogoList /> },
        ]
      },
      
      { path: '/admin/contacts', name: 'Contacts', auth: 'CMS.Departments', element: <DepartmentList /> },
      { path: '/admin/contacts/create-or-edit', name: 'Add contact', auth: ['CMS.Departments.Create', 'CMS.Departments.Edit'], element: <CreateUpdateDepartmentPage /> },
      
      { path: '/admin/members', name: 'Members', element: <>Members</> },
      { path: '/admin/roles', name: 'Roles', auth: 'AbpIdentity.Roles', element: <RolePage /> },
      { path: '/admin/users', name: 'Users', element: <UserPage /> },
      { path: '/admin/emailing', name: 'Emailing', element: <Emaling /> },
      { path: '/admin/*', name: 'Not found', element: <>Not found</> },
    ]
  },
  { path: '*', name: 'Not found', element: <>Not found</> },
];
