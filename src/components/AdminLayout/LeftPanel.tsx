import { useEffect, useState } from 'react';

import { Button, Layout, Menu, MenuProps, SiderProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { LeftPanelWidth, MenuItem } from '@/common/define';
import { appActions, getActiveMenu } from '@/store/app';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import MenuSvg from '@/assets/menu.svg';
import BannerSvg from '@/assets/banner.svg';
import PageSvg from '@/assets/page.svg';
import BlogSvg from '@/assets/blog.svg';
import MediaSvg from '@/assets/media.svg';
import ContactSvg from '@/assets/contact.svg';
import MemberSvg from '@/assets/member.svg';
import UserSvg from '@/assets/user.svg';

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
      label: t('Menu'),
      icon: <img src={MenuSvg} alt='menu icon' />,
      key: '/admin/menu',
    },
    {
      label: t('Banners'),
      icon: <img src={BannerSvg} alt='banner icon' />,
      key: '/admin/banners',
    },
    {
      label: t('Pages'),
      icon: <img src={PageSvg} alt='page icon' />,
      key: '/admin/pages',
    },
    {
      label: t('News'),
      icon: <img src={BlogSvg} alt='blog icon' />,
      key: '/admin/blogs',
    },
    {
      label: t('All Files'),
      icon: <img src={MediaSvg} alt='media icon' />,
      key: '/admin/media',
      popupClassName: 'leftSider_subMenu',
      children: [
        {
          label: t('Photos'),
          key: '/admin/media/photos',
        },
        {
          label: t('Videos'),
          key: '/admin/media/videos',
        },
        {
          label: t('Certifications'),
          key: '/admin/media/certifications',
        },
        {
          label: t("Partners's logo"),
          key: '/admin/media/partnersLogo',
        },
      ],
    },
    {
      label: t('Contacts'),
      icon: <img src={ContactSvg} alt='contact icon' />,
      key: '/admin/contacts',
    },
    {
      label: t('Members'),
      icon: <img src={MemberSvg} alt='member icon' />,
      key: '/admin/members',
    },
    {
      label: t('Users'),
      icon: <img src={UserSvg} alt='user icon' />,
      key: '/admin/users',
    },
  ];

  useEffect(() => {
    const { pathname } = location;
    const menus: any = adminMenu;
    for (const item of menus) {
      if (item?.key === pathname) {
        const { label, key } = item;
        dispatch(appActions.setActiveMenu({ label, key }));
      }
      if (item?.children) {
        for (const child of item.children) {
          if (child.key === pathname) {
            const { label, key } = child;
            dispatch(appActions.setActiveMenu({ label, key }));
            if (!collapsed) {
              setOpenKeys([item.key]);
            }
          }
        }
      }
    }
    // eslint-disable-next-line
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
      className={`border-r border-[rgba(5, 5, 5, 0.06)] leftSider overflow-y-auto custom_scrollbar pb-2`}
      {...rest}
    >
      <div
        className={`flex flex-col justify-center ${
          collapsed ? 'items-center my-2' : 'items-end m-2 mb-0'
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
      <div className={'max-h-full flex-col relative p-3 pt-0'}>
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
          theme='dark'
        />
      </div>
    </Sider>
  );
};
