import { useEffect, useState } from 'react';

import { Layout, Menu, MenuProps, SiderProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { LeftPanelWidth, MenuItem, TopNavHeight } from '@/common/define';
import { customerServiceActions, getActiveMenu } from '@/store/customerService';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import MenuSvg from '@/assets/menu.svg';
import { defaultPersistConfig } from '@/store';
import { appActions, getCurrentUser } from '@/store/app';
import { reconfigurePersistor } from '@/store/reconfigurePersistor';

const { Sider } = Layout;

export const LeftPanel = (props: SiderProps) => {
  const { ...rest } = props;
  const { t } = useTranslation(['leftPanel', 'common']);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState(['/']);

  const activeMenu = useAppSelector(getActiveMenu());
  const currentUser = useAppSelector(getCurrentUser());

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
          label: t('Register vehicle'),
          key: '/phuc-vu-khach-hang/dich-vu/hang-trong-kho',
        },
        {
          label: t('Instorage good'),
          key: '/phuc-vu-khach-hang/dich-vu/bang-ke-su-dung-dich-vu',
        },
        {
          label: t('HAWB service charge'),
          key: '/phuc-vu-khach-hang/dich-vu/san-luong-chuyen-bay',
        },
        {
          label: t('Goods information'),
          key: '/phuc-vu-khach-hang/dich-vu/phuc-vu-chuyen-bay',
        },
        {
          label: t('Register vehicle'),
          key: '/phuc-vu-khach-hang/dich-vu/bang-ke-hang-hoa',
        },
        {
          label: t('Instorage good'),
          key: '/phuc-vu-khach-hang/dich-vu/manifest-chuyen-bay',
        },
        {
          label: t('HAWB service charge'),
          key: '/phuc-vu-khach-hang/dich-vu/lich-bay',
        },
        {
          label: t('Goods information'),
          key: '/phuc-vu-khach-hang/dich-vu/lich-su-truyen-nhan-hai-quan',
        },
        {
          label: t('Register vehicle'),
          key: '/phuc-vu-khach-hang/dich-vu/khao-sat',
        },
        {
          label: t('Instorage good'),
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
          label: t('Goods information'),
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
          label: t('HAWB service charge'),
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
          label: t('Khao báo hàng xuất'),
          key: '/phuc-vu-khach-hang/hang-xuat/khai-bao-hang-xuat',
        },
        {
          label: t('Danh sách hàng xuất'),
          key: '/phuc-vu-khach-hang/hang-xuat/danh-sach-hang-xuat',
        },
        {
          label: t('Đnagw ký xe vào kho'),
          key: '/phuc-vu-khach-hang/hang-xuat/dang-ky-xe-vao-kho',
        },
        {
          label: t('HAWB service charge'),
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
            if (!collapsed) {
              setOpenKeys([item.key]);
            }
          }
        }
      }
    }
  }, [location, collapsed]);

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
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={LeftPanelWidth}
      onCollapse={setCollapsed}
      className={`pvkh_leftSider overflow-y-auto custom_scrollbar pb-2`}
      style={{
        maxHeight: `calc(100dvh - ${TopNavHeight}px)`,
        backgroundColor: 'transparent',
      }}
      {...rest}
    >
      <div className={'mh-100 flex-column relative px-3 pt-4'}>
        <div className='px-1'>
          <p className='mb-2'>
            {t('Hello', { ns: 'common' })},{' '}
            <span className='bold'>{currentUser.name}</span>
          </p>
        </div>
        <Menu
          mode='inline'
          onClick={onClickMenu}
          selectedKeys={[activeMenu?.key]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          items={adminMenu}
          inlineIndent={15}
          style={{
            background: 'transparent',
            border: 'none',
          }}
        />
      </div>
    </Sider>
  );
};
