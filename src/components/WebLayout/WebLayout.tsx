import { useEffect } from 'react';

import { Button, Flex, Form, Input, Layout, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCurrentCompany, publicCmsActions } from '@/store/publicCms';
import logo from '@/assets/logo.png';
import { TopNavHeight, uploadedPhotoUrl } from '@/common';
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

const { Header, Content, Footer, Sider } = Layout;

export const WebLayout = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const lang = useAppSelector(getLanguage());
  const company = useAppSelector(getCurrentCompany());
  const searchVisibility = useAppSelector(getSearchVisibility());
  const panelNavVisibility = useAppSelector(getPanelVisibility());

  useEffect(() => {
    dispatch(publicCmsActions.getCompanyRequest({}));
    dispatch(publicCmsActions.getMenuListRequest({}));
  }, [lang]);

  const searchToggle = () => {
    dispatch(persistStateActions.setSearchVisible(!searchVisibility));
  };

  const panelNavToggle = () => {
    dispatch(persistStateActions.setPanelNavVisibility(!panelNavVisibility));
  };

  return (
    <Layout>
      <Header
        className="web-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: TopNavHeight,
          backgroundColor: 'white',
        }}>
        <div>
          <Link to="/" className="d-none d-md-block">
            <img
              src={company?.logoUrl ? uploadedPhotoUrl(company.logoUrl) : logo}
              alt="logo"
              height={Math.round(TopNavHeight * 0.65)}
            />
          </Link>
          <div className="d-md-none">Logo mobile</div>
        </div>
        <AppTopNav />
        <Flex vertical align="end">
          <span style={{ fontWeight: 'bold', color: '#900038' }} className='d-none d-md-flex'>
            {t('Hotline', { ns: 'common' })}: {company?.phone}
          </span>
          <Space className="d-md-none">
            <Button type="text" shape="circle" onClick={searchToggle}>
              <i className="fa-solid fa-magnifying-glass fa-xl" />
            </Button>
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
          {searchVisibility && (
            <div
              style={{ width: '100%', height: 80, padding: '0 48px', backgroundColor: 'green' }}
              className="d-flex align-items-center">
              <div style={{ flex: 1 }}>
                <Form layout="inline" autoFocus>
                  <Form.Item style={{ flex: 1 }}>
                    <Input autoFocus placeholder={t('Type to search', { ns: 'common' })} />
                  </Form.Item>
                  <Form.Item noStyle>
                    <Button>{t('Search', { ns: 'common' })}</Button>
                  </Form.Item>
                </Form>
              </div>
              <Button
                type="text"
                shape="circle"
                onClick={searchToggle}
                style={{ marginBottom: 10, marginLeft: 40 }}>
                <i className="fa-solid fa-xmark fa-lg" />
              </Button>
            </div>
          )}
          <div style={{ padding: '0 48px', backgroundColor: 'red', minHeight: 200 }}>
            <Outlet />
          </div>
        </Content>
        <AppPanelNav />
      </Layout>
      <Footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'orange',
        }}>
        <Space>
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
