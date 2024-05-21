import { useEffect, useState } from 'react';

import { Button, Drawer, Space, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getActiveMenuKey, getPanelVisibility, persistStateActions } from '@/store/persistState';

import { getMenuList } from '@/store/publicCms';
import { Link, useParams } from 'react-router-dom';
import { MenuResponse } from '@/services/MenuService';

type MenuItem = Required<MenuProps>['items'][number];

export const AppPanelNav = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const panelNavVisibility = useAppSelector(getPanelVisibility());
  const menus = useAppSelector(getMenuList());
  const acitveKey = useAppSelector(getActiveMenuKey());
  const { '*': slug } = useParams();

  useEffect(() => {
    const selectedMenu = menus.find((x) => (slug ? `/${slug}` : window.location.pathname) === x.url);
    dispatch(persistStateActions.setActiveMenuKey(selectedMenu?.id || window.location.pathname));
  }, [menus, slug]);

  const buildAppNav = () => {
    if (!menus) {
      return [];
    }
    const menuList = menus.filter((x) => !x.parentId);
    const navItems: MenuItem[] = menuList.map((x) => {
      if (x.type === 'Link') {
        return {
          key: x.id,
          label: (
            <Link to={x.url === '/' ? '/' : `/trang${x.url}`}>
              {x.icons && (
                <i className={x.icons} style={{ marginRight: 8, color: x.iconColor || 'orange' }} />
              )}
              {x.label}
            </Link>
          ),
        };
      }
      return {
        key: x.id,
        title: x.label,
        label: (
          <Space>
            {x.icons && <i className={x.icons} style={{ color: x.iconColor || 'orange' }} />}
            <span>{x.label}</span>
          </Space>
        ),
        children: buildSubmenu(x),
      };
    });
    return navItems;
  };

  const buildSubmenu = (parent: MenuResponse) => {
    const menuList = menus.filter((x) => x.parentId === parent.id);
    const navItems: MenuItem[] = menuList.map((x) => {
      if (x.type === 'Link') {
        return {
          key: x.id,
          label: (
            <Link to={x.url === '/' ? '/' : `/trang${x.url}`}>
              {x.icons && (
                <i className={x.icons} style={{ marginRight: 8, color: x.iconColor || 'orange' }} />
              )}
              {x.label}
            </Link>
          ),
        };
      }
      return {
        key: x.id,
        type: x.type === 'Group' ? 'group' : null,
        className: 'web-mega-menu-item-group',
        icon: x.icons ? <i className={x.icons} style={{ color: x.iconColor || 'orange' }} /> : null,
        label: (
          <Space>
            {x.icons ? <i className={x.icons} style={{ color: x.iconColor || 'orange' }} /> : null}
            <span>{x.label}</span>
          </Space>
        ),
        children: buildSubmenu(x),
      };
    });
    return navItems;
  };

  const panelNavToggle = () => {
    dispatch(persistStateActions.setPanelNavVisibility(!panelNavVisibility));
  };

  const onClick: MenuProps['onClick'] = (e) => {
    dispatch(persistStateActions.setActiveMenuKey(e.key));
    dispatch(persistStateActions.setPanelNavVisibility(false));
  };

  return (
    <Drawer
      title={t('Menu', { ns: 'common' })}
      closable={false}
      onClose={panelNavToggle}
      open={panelNavVisibility}
      extra={
        <Button type="text" shape="circle" onClick={panelNavToggle}>
          <i className="fa-solid fa-xmark fa-lg" />
        </Button>
      }
      placement="right"
      className='web-panel-nav'>
      <Menu
        className='web-panel-nav'
        onClick={onClick}
        style={{ width: '100%' }}
        selectedKeys={[acitveKey]}
        mode="inline"
        items={buildAppNav()}
      />
    </Drawer>
  );
};
