import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './CustomerServiceLayout.css';

import { Layout } from 'antd';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { companyActions } from '@/store/company';
import { getLanguage } from '@/store/persistState';
import { TopNavHeight } from '@/common';

import { LeftPanel } from '.';

const { Content } = Layout;

export const CustomerServiceLayout = () => {
  const language = useAppSelector(getLanguage());
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(companyActions.getCompaniesRequest({ MaxResultCount: 1 }));
  }, [language]);

  return (
    <Layout className='w-screen h-screen relative'>
      <Layout>
        <LeftPanel />
        <Content
          style={{
            margin: 0,
            minHeight: `calc(100vh - ${TopNavHeight}px)`,
            maxHeight: `calc(100vh - ${TopNavHeight}px)`,
            padding: '2rem 1rem',
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
