import { Outlet } from 'react-router-dom';

import { AppHeader } from './AppHeader';
import { Layout } from 'antd';
import { AppFooter } from './AppFooter';

const { Content } = Layout;

export const AppLayout = () => {
  return (
    <Layout>
      <AppHeader />
      <Content style={{ margin: 0, minHeight: 'calc(100vh - 129px' }}>
        <Outlet />
      </Content>
      <AppFooter />
    </Layout>
  );
};
