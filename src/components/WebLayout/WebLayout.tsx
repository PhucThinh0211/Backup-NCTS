import { useEffect } from 'react';

import { Button, Flex, FloatButton, Layout, Space, Typography } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCurrentCompany, publicCmsActions } from '@/store/publicCms';
import logo from '@/assets/logo.png';
import { uploadedPhotoUrl } from '@/common';
import { SwitchLang } from '../SwitchLang';
import {
  getLanguage,
  getPanelVisibility,
  getSearchVisibility,
  persistStateActions,
} from '@/store/persistState';
import { AppTopNav } from './AppTopNav';
import './webLayout.scss';
import './HomeStyle.css';
import { AppPanelNav } from './AppPanelNav';
import { HeroSection } from '../HeroSection';
import { SearchForm } from '../SearchForm';
import { ProgressBar } from '../ProgressBar';
import { getLoading } from '@/store/loading';
import { CustomerLogoSection } from './CustomerLogoSection';
import { getCurrentUser, getGrantedPolicies } from '@/store/app';
import { ProfileDropdown } from './ProfileDropdown';

const { Header, Content, Footer } = Layout;

export const WebLayout = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const lang = useAppSelector(getLanguage());
  const company = useAppSelector(getCurrentCompany());
  const searchVisibility = useAppSelector(getSearchVisibility());
  const panelNavVisibility = useAppSelector(getPanelVisibility());
  const currentUser = useAppSelector(getCurrentUser());
  const location = useLocation();
  const isLoading = useAppSelector(getLoading());
  const grantedPolicies = useAppSelector(getGrantedPolicies());

  const cmsUser = Object.keys(grantedPolicies).some((x) =>
    x.startsWith('CMS.')
  );

  useEffect(() => {
    dispatch(publicCmsActions.getCompanyRequest({}));
    dispatch(publicCmsActions.getMenuListRequest({}));
  }, [lang]);

  useEffect(() => {
    const params = {
      pageUrl: window.location.href,
      // pageUrl: 'https://sit.ntcs.hicas.vn',
    };
    dispatch(publicCmsActions.getBannerListRequest({ params }));
  }, [lang, location]);

  const panelNavToggle = () => {
    dispatch(persistStateActions.setPanelNavVisibility(!panelNavVisibility));
  };

  const searchToggle = () => {
    dispatch(persistStateActions.setSearchVisible(!searchVisibility));
  };

  return (
    <>
      <ProgressBar isAnimating={isLoading} />
      <Layout style={{ minHeight: '100vh' }}>
        <Header className='web-header sticky-top bg-white d-flex justify-content-between align-items-center px-3 px-lg-5 z-3 shadow'>
          <div className='h-100'>
            <Link to='/'>
              <img
                src={
                  company?.logoUrl ? uploadedPhotoUrl(company.logoUrl) : logo
                }
                alt='logo'
                className='h-75 mt-md-3'
              />
            </Link>
          </div>
          <AppTopNav />
          <Flex vertical align='end' style={{ height: '100%' }}>
            <span
              style={{ fontWeight: 'bold', color: '#900038' }}
              className='d-none d-md-flex'
            >
              {t('Hotline', { ns: 'common' })}: {company?.phone}
            </span>
            <div className='d-md-none d-flex align-items-center gap-2'>
              {/* <Button type="text" shape="circle" onClick={searchToggle}>
                <i className="fa-solid fa-magnifying-glass fa-xl" />
              </Button> */}
              <a href={`tel:${company?.phone}`}>
                <Button danger shape='circle'>
                  <i className='fa-solid fa-phone'></i>
                </Button>
              </a>
              {currentUser?.isAuthenticated ? (
                <ProfileDropdown />
              ) : (
                <Link to='/dang-nhap'>
                  <Button type='primary' shape='circle' size='middle'>
                    <i className='fa-regular fa-user fa-lg' />
                  </Button>
                </Link>
              )}
              <Button
                type='text'
                shape='circle'
                size='middle'
                onClick={panelNavToggle}
              >
                <i className='fa-solid fa-bars fa-lg'></i>
              </Button>
            </div>
            <div className='d-none d-md-flex gap-3 align-items-center'>
              <Button
                type='text'
                shape='circle'
                size='middle'
                className='d-xxl-none'
                onClick={panelNavToggle}
              >
                <i className='fa-solid fa-bars fa-lg'></i>
              </Button>
              {cmsUser && (
                <Link to='/admin'>
                  <Button size='middle' type='primary' danger>
                    Admin
                  </Button>
                </Link>
              )}
              <Button type='text' shape='circle' onClick={searchToggle}>
                <i className='fa-solid fa-magnifying-glass fa-xl' />
              </Button>
              {currentUser?.isAuthenticated ? (
                <ProfileDropdown />
              ) : (
                <Link to='/dang-nhap'>
                  <Button type='primary' shape='circle' size='middle'>
                    <i className='fa-regular fa-user fa-lg' />
                  </Button>
                </Link>
              )}
              <SwitchLang />
            </div>
          </Flex>
        </Header>
        <Content
          className='d-flex align-items-end flex-column bg-white'
          style={{ height: '100%' }}
        >
          <div className='w-100 bg-light'>
            {searchVisibility && <SearchForm />}
            <HeroSection />
          </div>
          <div className='w-100' style={{ flex: 1 }}>
            <Outlet />
          </div>
          <div className='w-100'>
            <CustomerLogoSection />
            <FloatButton.Group shape='circle' style={{ right: 24 }}>
              <FloatButton.BackTop
                duration={100}
                visibilityHeight={200}
                type='primary'
                icon={<UpOutlined />}
                style={{ opacity: 0.7 }}
              />
            </FloatButton.Group>
            <AppPanelNav />
          </div>
        </Content>
        <Footer
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'orange',
            paddingBlock: 14,
          }}
          className='px-3 px-lg-5'
        >
          <Space direction='horizontal'>
            <Typography.Text
              style={{ color: 'white' }}
            >{`Copyright © NCTS`}</Typography.Text>
          </Space>
          {/* <Space className="d-none d-xl-flex gap-3">
            <Link to="/sitemap">
              <Typography.Text style={{ color: 'white' }}>Sitemap</Typography.Text>
            </Link>
            <Link to="/trang/contact">
              <Typography.Text style={{ color: 'white' }}>Contact</Typography.Text>
            </Link>
            <Link to="/trang/support">
              <Typography.Text style={{ color: 'white' }}>Support</Typography.Text>
            </Link>
          </Space> */}
        </Footer>
      </Layout>
    </>
  );
};
