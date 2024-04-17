import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { AdminHeader, LeftPanel } from '.';
import './AdminLayout.css';

const { Content } = Layout;

export const AdminLayout = () => {
  return (
    <Layout className='w-screen h-screen relative'>
      <AdminHeader />
      <Layout>
        <LeftPanel />
        <Content
          style={{
            margin: 0,
            minHeight: 'calc(100vh - 76px)',
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
