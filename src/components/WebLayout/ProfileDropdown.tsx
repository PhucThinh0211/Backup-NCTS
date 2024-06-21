import { getCurrentUser } from '@/store/app';
import { useAppSelector } from '@/store/hooks';
import Utils from '@/utils';
import { Avatar, Divider, Dropdown, MenuProps, theme, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

const { useToken } = theme;

export const ProfileDropdown = () => {
  const { token } = useToken();
  const { t } = useTranslation(['common']);
  const currentUser = useAppSelector(getCurrentUser());
  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      label: t('Account'),
      key: '1',
      icon: <i className='fa-solid fa-user' style={{ color: '#ffa500' }} />,
      onClick: () => {
        navigate('/phuc-vu-khach-hang');
      },
    },
    {
      label: t('Services'),
      key: '2',
      icon: (
        <i className='fa-brands fa-servicestack' style={{ color: '#ffa500' }} />
      ),
      onClick: () => {
        navigate('/phuc-vu-khach-hang');
      },
    },
    {
      label: t('Import'),
      key: '3',
      icon: <i className='fa-solid fa-coins' style={{ color: '#ffa500' }} />,
      onClick: () => {
        navigate('/phuc-vu-khach-hang');
      },
    },
    {
      label: t('Export'),
      key: '4',
      icon: (
        <i
          className='fa-solid fa-plane-departure'
          style={{ color: '#ffa500' }}
        />
      ),
      onClick: () => {
        navigate('/phuc-vu-khach-hang');
      },
    },
    {
      type: 'divider',
    },
    {
      label: t('Logout'),
      key: 'logout',
      icon: <i className='fa-solid fa-right-from-bracket' />,
      danger: true,
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

  return (
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
        style={{
          backgroundColor: Utils.stringToColour(currentUser.name),
          cursor: 'pointer',
        }}
      >
        {(currentUser?.name || '').slice(0, 1).toUpperCase()}
      </Avatar>
    </Dropdown>
  );
};