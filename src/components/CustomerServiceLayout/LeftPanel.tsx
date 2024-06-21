import { useEffect, useState } from 'react';

import { Button, Layout, Menu, MenuProps, SiderProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  RightOutlined,
  LeftOutlined,
  HomeOutlined,
  TagsOutlined,
  SnippetsOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { LeftPanelWidth, MenuItem, TopNavHeightAdmin } from '@/common/define';
import { customerServiceActions, getActiveMenu } from '@/store/customerService';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import MenuSvg from '@/assets/menu.svg';
import BannerSvg from '@/assets/banner.svg';
import PageSvg from '@/assets/page.svg';
import BlogSvg from '@/assets/blog.svg';
import MediaSvg from '@/assets/media.svg';
import ContactSvg from '@/assets/contact.svg';
// import MemberSvg from '@/assets/member.svg';
// import UserSvg from '@/assets/user.svg';

const { Sider } = Layout;

export const LeftPanel = (props: SiderProps) => {
  const { ...rest } = props;
  const { t } = useTranslation(['leftPanel']);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState(['/']);

  const activeMenu = useAppSelector(getActiveMenu());

  const adminMenu: MenuItem[] = [
    {
      label: t('Account'),
      icon: <HomeOutlined style={{ fontSize: collapsed ? 16 : 20 }} />,
      key: '/phuc-vu-khach-hang/account',
    },
    {
      label: t('Import'),
      icon: <HomeOutlined style={{ fontSize: collapsed ? 16 : 20 }} />,
      key: '/phuc-vu-khach-hang/import',
      popupClassName: 'leftSider_subMenu',
      children: [
        {
          label: t('Goods information'),
          key: '/phuc-vu-khach-hang/import/goods',
        },
        {
          label: t('Import notifications'),
          key: '/phuc-vu-khach-hang/import/bills',
        },
        {
          label: t('Instorage good'),
          key: '/phuc-vu-khach-hang/import/instorage',
        },
        {
          label: t('HAWB service charge'),
          key: '/phuc-vu-khach-hang/import/hawb-service-charge',
        },
      ],
    },
    {
      label: t('Export'),
      icon: <HomeOutlined style={{ fontSize: collapsed ? 16 : 20 }} />,
      key: '/phuc-vu-khach-hang/export',
    },
    {
      label: t('Flight'),
      icon: <HomeOutlined style={{ fontSize: collapsed ? 16 : 20 }} />,
      key: '/phuc-vu-khach-hang/flight',
    },
    {
      label: t('Customs History'),
      icon: <HomeOutlined style={{ fontSize: collapsed ? 16 : 20 }} />,
      key: '/phuc-vu-khach-hang/customs-history',
    },
    {
      label: t('Change password'),
      icon: <HomeOutlined style={{ fontSize: collapsed ? 16 : 20 }} />,
      key: '/phuc-vu-khach-hang/change-password',
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

  const onClickMenu = (menu: any) => {
    const { key } = menu;
    navigate(key);
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const handleLeftPanelVisibility = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <Sider
      breakpoint='lg'
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={LeftPanelWidth}
      onCollapse={setCollapsed}
      className={`pvkh_leftSider overflow-y-auto custom_scrollbar pb-2`}
      style={{
        maxHeight: `calc(100dvh - ${TopNavHeightAdmin}px)`,
        backgroundColor: 'transparent',
      }}
      {...rest}
    >
      <div
        className={`d-flex flex-column justify-content-center ${
          collapsed
            ? 'align-items-center my-2'
            : 'align-items-end m-2 mb-0 mx-3'
        }`}
      >
        <Button
          shape='circle'
          size='small'
          onClick={handleLeftPanelVisibility}
          icon={
            collapsed ? (
              <RightOutlined style={{ fontSize: 11 }} />
            ) : (
              <LeftOutlined style={{ fontSize: 11 }} />
            )
          }
        />
      </div>
      <div className={'mh-100 flex-column relative p-3 pt-0'}>
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
          }}
        />
      </div>
    </Sider>
  );
};
