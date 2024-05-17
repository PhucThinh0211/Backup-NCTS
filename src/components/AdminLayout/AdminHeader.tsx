import { Layout, theme, Row, Space } from 'antd';
// import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import logo from '@/assets/logo.png';
import { TopNavHeightAdmin } from '@/common';
import { SwitchLang } from '@/components';

export const AdminHeader = () => {
  // const { t } = useTranslation(['common']);

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
      className='border-b border-[rgba(5, 5, 5, 0.06)]'
    >
      <Row align='middle' justify='space-between' style={{ height: '100%' }}>
        <Link to='/'>
          <img src={logo} alt='logo' width={130} />
        </Link>
        <Space>
          {/* Switch Language */}
          <SwitchLang />
        </Space>
      </Row>
    </Layout.Header>
  );
};
