import { Layout, theme, Row, Space } from 'antd';
import { Link } from 'react-router-dom';

import logo from '@/assets/logo.png';
import { TopNavHeightAdmin } from '@/common';
import { SwitchLang } from '@/components';

export const AdminHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Header
      style={{
        padding: '0px 16px',
        color: 'GrayText',
        background: colorBgContainer,
        height: TopNavHeightAdmin,
      }}
      className='border-bottom shadow'
    >
      <Row align='middle' justify='space-between' style={{ height: '100%' }}>
        <div className='h-100 pt-1'>
          <Link to='/'>
            <img src={logo} alt='logo' className='h-75' />
          </Link>
        </div>
        <Space>
          {/* Switch Language */}
          <SwitchLang />
        </Space>
      </Row>
    </Layout.Header>
  );
};
