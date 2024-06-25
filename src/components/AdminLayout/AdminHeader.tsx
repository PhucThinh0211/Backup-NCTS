import { Layout, theme, Row, Space, Button, Tooltip } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import logo from '@/assets/logo.png';
import { TopNavHeightAdmin } from '@/common';
import { SwitchLang } from '@/components';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { appActions } from '@/store/app';
import { reconfigurePersistor } from '@/store/reconfigurePersistor';
import { defaultPersistConfig } from '@/store';
import { getTabLookupActive } from '@/store/persistState';

export const AdminHeader = () => {
  const { t } = useTranslation(['common']);
  const tabLookupActive = useAppSelector(getTabLookupActive());
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signout = () => {
    reconfigurePersistor(defaultPersistConfig.whitelist);
    dispatch(appActions.logout({ callback: () => navigate(`/?tab=${tabLookupActive}`) }));
  };

  return (
    <Layout.Header
      style={{
        padding: '0px 16px',
        color: 'GrayText',
        background: colorBgContainer,
        height: TopNavHeightAdmin,
      }}
      className="border-bottom shadow">
      <Row align="middle" justify="space-between" style={{ height: '100%' }}>
        <div className="h-100 pt-1">
          <Link to="/">
            <img src={logo} alt="logo" className="h-75" />
          </Link>
        </div>
        <Space>
          {/* Switch Language */}
          <SwitchLang />
          <Tooltip title={t('Sign out')}>
            <Button shape="circle" size="middle" onClick={signout}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </Button>
          </Tooltip>
        </Space>
      </Row>
    </Layout.Header>
  );
};
