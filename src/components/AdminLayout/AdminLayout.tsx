import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './AdminLayout.css';

import { Layout } from 'antd';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { companyActions } from '@/store/company';
import { getLanguage } from '@/store/persistState';
import { TopNavHeight, TopNavHeightAdmin } from '@/common';

import { AdminHeader, LeftPanel } from '.';

const { Content } = Layout;

export const AdminLayout = () => {
  const language = useAppSelector(getLanguage());
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(companyActions.getCompaniesRequest({ MaxResultCount: 1 }));
  }, [language]);

  return (
    <Layout className='w-screen h-screen relative'>
      <AdminHeader />
      <Layout>
        <LeftPanel />
        <Content
          style={{
            margin: 0,
            minHeight: `calc(100vh - ${TopNavHeightAdmin}px)`,
            maxHeight: `calc(100vh - ${TopNavHeightAdmin}px)`,
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
