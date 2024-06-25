import { bootstrapBreakpoints } from '@/common';
import { useWindowSize } from '@/hooks';
import { defaultPersistConfig } from '@/store';
import { appActions, getCurrentUser } from '@/store/app';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getTabLookupActive } from '@/store/persistState';
import { persistStateActions } from '@/store/persistState';
import { reconfigurePersistor } from '@/store/reconfigurePersistor';
import Utils from '@/utils';
import { Avatar, Divider, Dropdown, MenuProps, theme, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const { useToken } = theme;

export const ProfileDropdown = () => {
  const { token } = useToken();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common', 'leftPanel']);
  const navigate = useNavigate();
  const tabLookupActive = useAppSelector(getTabLookupActive());
  const [innerWidth] = useWindowSize();

  const currentUser = useAppSelector(getCurrentUser());

  const signout = () => {
    reconfigurePersistor(defaultPersistConfig.whitelist);
    dispatch(appActions.logout({ callback: () => navigate(`/?tab=${tabLookupActive}`) }));
  };

  const openCustomerPanelNav = () => {
    dispatch(persistStateActions.setCustomerPanelNavVisibility(true));
  };

  const items: MenuProps['items'] = [
    {
      label: t('Account', { ns: 'leftPanel' }),
      key: '1',
      icon: <i className='fa-solid fa-user' style={{ color: '#ffa500' }} />,
      onClick: () => {
        navigate('/phuc-vu-khach-hang/tai-khoan');
      },
    },
    {
      label: t('Service', { ns: 'leftPanel' }),
      key: '2',
      icon: (
        <i className='fa-brands fa-servicestack' style={{ color: '#ffa500' }} />
      ),
      onClick: () => {
        navigate('/phuc-vu-khach-hang/dich-vu');
      },
    },
    {
      label: t('Export', { ns: 'leftPanel' }),
      key: '3',
      icon: (
        <i
          className='fa-solid fa-plane-departure'
          style={{ color: '#ffa500' }}
        />
      ),
      onClick: () => {
        navigate('/phuc-vu-khach-hang/hang-xuat');
      },
    },
    {
      label: t('Import', { ns: 'leftPanel' }),
      key: '4',
      icon: <i className='fa-solid fa-coins' style={{ color: '#ffa500' }} />,
      onClick: () => {
        navigate('/phuc-vu-khach-hang/hang-nhap');
      },
    },
    {
      type: 'divider',
    },
    {
      label: t('Sign out'),
      key: 'logout',
      icon: <i className='fa-solid fa-right-from-bracket' />,
      danger: true,
      onClick: signout,
    },
  ];

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    minWidth: 200,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  };

  return innerWidth > bootstrapBreakpoints.lg ? (
    <Dropdown
      menu={{ items }}
      dropdownRender={(menu) => (
        <div style={contentStyle}>
          <div className='py-1 px-3'>
            <Typography.Text strong>{currentUser?.name}</Typography.Text>
          </div>
          <Divider className='my-1' />
          {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
        </div>
      )}
    >
      <Avatar
        gap={2}
        size={26}
        style={{
          backgroundColor: Utils.stringToColour(currentUser.name),
          cursor: 'pointer',
        }}
      >
        {(currentUser?.name || '').slice(0, 1).toUpperCase()}
      </Avatar>
    </Dropdown>
  ) : (
    <Avatar
      gap={2}
      size={26}
      style={{
        backgroundColor: Utils.stringToColour(currentUser.name),
        cursor: 'pointer',
      }}
      onClick={openCustomerPanelNav}
    >
      {(currentUser?.name || '').slice(0, 1).toUpperCase()}
    </Avatar>
  );
};
