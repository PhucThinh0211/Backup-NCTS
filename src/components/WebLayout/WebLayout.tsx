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
import { AppPanelNav } from './AppPanelNav';
import { HeroSection } from '../HeroSection';
import { SearchForm } from '../SearchForm';
import { ProgressBar } from '../ProgressBar';
import { getLoading } from '@/store/loading';

const { Header, Content, Footer } = Layout;

export const WebLayout = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const lang = useAppSelector(getLanguage());
  const company = useAppSelector(getCurrentCompany());
  const searchVisibility = useAppSelector(getSearchVisibility());
  const panelNavVisibility = useAppSelector(getPanelVisibility());
  const location = useLocation();
  const isLoading = useAppSelector(getLoading());

  useEffect(() => {
    dispatch(publicCmsActions.getCompanyRequest({}));
    dispatch(publicCmsActions.getMenuListRequest({}));
  }, [lang]);

  useEffect(() => {
    const params = {
      // pageUrl: window.location.href,
      pageUrl: 'https://sit.ntcs.hicas.vn',
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
    <Layout>
      <ProgressBar isAnimating={isLoading} />
      <Header className="web-header sticky-top bg-white d-flex justify-content-between align-items-center px-3 px-lg-5 z-3 shadow">
        <div className="h-100">
          <Link to="/">
            <img
              src={company?.logoUrl ? uploadedPhotoUrl(company.logoUrl) : logo}
              alt="logo"
              className="h-75 mt-md-3"
            />
          </Link>
        </div>
        <AppTopNav />
        <Flex vertical align="end" style={{ height: '100%' }}>
          <span style={{ fontWeight: 'bold', color: '#900038' }} className="d-none d-md-flex">
            {t('Hotline', { ns: 'common' })}: {company?.phone}
          </span>
          <Space className="d-md-none">
            {/* <Button type="text" shape="circle" onClick={searchToggle}>
              <i className="fa-solid fa-magnifying-glass fa-xl" />
            </Button> */}
            <a href={`tel:${company?.phone}`}>
              <Button danger shape="circle">
                <i className="fa-solid fa-phone"></i>
              </Button>
            </a>
            <Link to="/dang-nhap">
              <Button type="primary" shape="circle" size="middle">
                <i className="fa-regular fa-user fa-lg" />
              </Button>
            </Link>
            <Button type="text" shape="circle" size="middle" onClick={panelNavToggle}>
              <i className="fa-solid fa-bars fa-lg"></i>
            </Button>
          </Space>
          <Space size="middle" className="d-none d-md-flex">
            <Button
              type="text"
              shape="circle"
              size="middle"
              className="d-xxl-none"
              onClick={panelNavToggle}>
              <i className="fa-solid fa-bars fa-lg"></i>
            </Button>
            <Button type="text" shape="circle" onClick={searchToggle}>
              <i className="fa-solid fa-magnifying-glass fa-xl" />
            </Button>
            <Link to="/dang-nhap">
              <Button type="primary" shape="circle" size="middle">
                <i className="fa-regular fa-user fa-lg" />
              </Button>
            </Link>
            <SwitchLang />
          </Space>
        </Flex>
      </Header>
      <Layout hasSider>
        <Content>
          {searchVisibility && <SearchForm />}
          <HeroSection />
          <div style={{ backgroundColor: '#fefefe' }}>
            <Outlet />
          </div>
          <FloatButton.Group shape="circle" style={{ right: 24 }}>
            <FloatButton.BackTop duration={100} visibilityHeight={200} type='primary' icon={<UpOutlined />} />
          </FloatButton.Group>
        </Content>
        <AppPanelNav />
      </Layout>
      <Footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'orange',
          paddingBlock: 14,
        }}
        className="px-3 px-lg-5">
        <Space direction="horizontal">
          <Typography.Text style={{ color: 'white' }}>{`Copyright © NCTS`}</Typography.Text>
        </Space>
        <Space className="d-none d-xl-flex gap-3">
          <Link to="/sitemap">
            <Typography.Text style={{ color: 'white' }}>Sitemap</Typography.Text>
          </Link>
          <Link to="/trang/contact">
            <Typography.Text style={{ color: 'white' }}>Contact</Typography.Text>
          </Link>
          <Link to="/trang/support">
            <Typography.Text style={{ color: 'white' }}>Support</Typography.Text>
          </Link>
        </Space>
      </Footer>
    </Layout>
  );
};
