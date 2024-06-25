import { useEffect } from 'react';
import { Button, Drawer, Menu, Space } from 'antd';
import { SwitchLang } from '..';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

import { defaultPersistConfig } from '@/store';
import { getActiveMenu } from '@/store/customerService';
import { customerServiceActions } from '@/store/customerService';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { reconfigurePersistor } from '@/store/reconfigurePersistor';
import { MenuItem } from '@/common';
import {
  getCustomerPanelVisibility,
  getSearchVisibility,
  persistStateActions,
} from '@/store/persistState';
import { appActions } from '@/store/app';

export const CustomerPanelNav = () => {
  const { t } = useTranslation(['leftPanel', 'common']);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const activeMenu = useAppSelector(getActiveMenu());
  const panelNavVisibility = useAppSelector(getCustomerPanelVisibility());
  const searchVisibility = useAppSelector(getSearchVisibility());

  const adminMenu: MenuItem[] = [
    {
      label: t('Account', { ns: 'leftPanel' }),
      icon: <i className='fa-solid fa-user'></i>,
      key: '/phuc-vu-khach-hang/tai-khoan',
    },
    {
      label: t('Service', { ns: 'leftPanel' }),
      icon: (
        <i
          className='fa-solid fa-layer-group'
          style={{ transform: 'translateX(-2px)' }}
        ></i>
      ),
      key: '/phuc-vu-khach-hang/dich-vu',
      children: [
        {
          label: t('Goods information'),
          key: '/phuc-vu-khach-hang/dich-vu/thong-tin-hang-hoa',
        },
        {
          label: t('Instorage goods'),
          key: '/phuc-vu-khach-hang/dich-vu/hang-trong-kho',
        },
        {
          label: t('Service list'),
          key: '/phuc-vu-khach-hang/dich-vu/bang-ke-su-dung-dich-vu',
        },
        {
          label: t('Flight volume'),
          key: '/phuc-vu-khach-hang/dich-vu/san-luong-chuyen-bay',
        },
        {
          label: t('Flight service'),
          key: '/phuc-vu-khach-hang/dich-vu/phuc-vu-chuyen-bay',
        },
        {
          label: t('Goods list'),
          key: '/phuc-vu-khach-hang/dich-vu/bang-ke-hang-hoa',
        },
        {
          label: t('Flight manifest'),
          key: '/phuc-vu-khach-hang/dich-vu/manifest-chuyen-bay',
        },
        {
          label: t('Flight schedule'),
          key: '/phuc-vu-khach-hang/dich-vu/lich-bay',
        },
        {
          label: t('Logistic'),
          key: '/phuc-vu-khach-hang/dich-vu/lich-su-truyen-nhan-hai-quan',
        },
        {
          label: t('Survey'),
          key: '/phuc-vu-khach-hang/dich-vu/khao-sat',
        },
        {
          label: t('Employee register'),
          key: '/phuc-vu-khach-hang/dich-vu/dang-ky-nhan-vien',
        },
      ],
    },
    {
      label: t('Import', { ns: 'leftPanel' }),
      icon: <i className='fa-solid fa-box'></i>,
      key: '/phuc-vu-khach-hang/hang-nhap',
      popupClassName: 'leftSider_subMenu',
      children: [
        {
          label: t('Authorized goods'),
          key: '/phuc-vu-khach-hang/hang-nhap/lo-hang-uy-quyen',
        },
        {
          label: t('Register vehicle'),
          key: '/phuc-vu-khach-hang/hang-nhap/dang-ky-xe',
        },
        {
          label: t('Instorage good'),
          key: '/phuc-vu-khach-hang/hang-nhap/hang-trong-kho',
        },
        {
          label: t('Import notifications'),
          key: '/phuc-vu-khach-hang/hang-nhap/phieu-thong-bao-hang-den',
        },
      ],
    },
    {
      label: t('Export', { ns: 'leftPanel' }),
      icon: (
        <i
          className='fa-solid fa-dolly'
          style={{ transform: 'translateX(-2px)' }}
        ></i>
      ),
      key: '/phuc-vu-khach-hang/hang-xuat',
      children: [
        {
          label: t('Export declarations'),
          key: '/phuc-vu-khach-hang/hang-xuat/khai-bao-hang-xuat',
        },
        {
          label: t('Export list'),
          key: '/phuc-vu-khach-hang/hang-xuat/danh-sach-hang-xuat',
        },
        {
          label: t('Warehouse registed vehicle'),
          key: '/phuc-vu-khach-hang/hang-xuat/dang-ky-xe-vao-kho',
        },
        {
          label: t('Registed vehicle'),
          key: '/phuc-vu-khach-hang/hang-xuat/danh-sach-xe-da-dang-ky',
        },
        {
          label: t('Address book'),
          key: '/phuc-vu-khach-hang/hang-xuat/so-dia-chi',
        },
      ],
    },
    {
      label: t('Change password', { ns: 'common' }),
      icon: <i className='fa-solid fa-lock'></i>,
      key: '/phuc-vu-khach-hang/doi-mat-khau',
    },
    {
      label: t('Sign out', { ns: 'common' }),
      icon: <i className='fa-solid fa-arrow-right-from-bracket'></i>,
      key: 'logout',
      danger: true,
    },
  ];

  useEffect(() => {
    const { pathname } = location;
    const menus: any = adminMenu;
    for (const item of menus) {
      if (item?.key === pathname) {
        const { label, key } = item;
        dispatch(customerServiceActions.setPVKHActiveMenu({ label, key }));
      }
      if (item?.children) {
        for (const child of item.children) {
          if (child.key === pathname) {
            const { label, key } = child;
            dispatch(customerServiceActions.setPVKHActiveMenu({ label, key }));
          }
        }
      }
    }
  }, [location]);

  const signout = () => {
    reconfigurePersistor(defaultPersistConfig.whitelist);
    dispatch(appActions.logout({ callback: () => navigate('/') }));
  };

  const onClickMenu = (menu: any) => {
    const { key } = menu;
    if (key === 'logout') {
      signout();
      return;
    }
    navigate(key);
    dispatch(persistStateActions.setCustomerPanelNavVisibility(false));
  };

  const panelNavToggle = () => {
    dispatch(
      persistStateActions.setCustomerPanelNavVisibility(!panelNavVisibility)
    );
  };

  const searchToggle = () => {
    dispatch(persistStateActions.setSearchVisible(!searchVisibility));
    dispatch(persistStateActions.setCustomerPanelNavVisibility(false));
  };

  return (
    <Drawer
      title={null}
      closable={true}
      onClose={panelNavToggle}
      open={panelNavVisibility}
      size='large'
      zIndex={9999}
      extra={
        <div className='d-flex justify-content-between align-items-center'>
          <Space>
            <Button type='text' shape='circle' onClick={searchToggle}>
              <i className='fa-solid fa-magnifying-glass fa-xl' />
            </Button>
            <SwitchLang />
          </Space>
        </div>
      }
      placement='right'
      className='web-panel-nav'
    >
      <Menu
        mode='inline'
        onClick={onClickMenu}
        selectedKeys={[activeMenu?.key]}
        items={adminMenu}
        defaultOpenKeys={['/phuc-vu-khach-hang/dich-vu']}
        className='web-panel-nav'
        style={{
          width: '100%',
        }}
      />
    </Drawer>
  );
};
