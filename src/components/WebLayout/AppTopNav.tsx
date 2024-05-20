import { useState, useEffect } from 'react';
import { ConfigProvider, Menu, Space } from 'antd';
import type { MenuProps } from 'antd';
import { Link, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getMenuList } from '@/store/publicCms';
import { MenuResponse } from '@/services/MenuService';
import Utils from '@/utils';
import { getActiveMenuKey, persistStateActions } from '@/store/persistState';

type MenuItem = Required<MenuProps>['items'][number];

export const AppTopNav = () => {
  const dispatch = useAppDispatch();
  const menus = useAppSelector(getMenuList());
  const activeKey = useAppSelector(getActiveMenuKey());
  const { '*': slug } = useParams();

  useEffect(() => {
    const selectedMenu = menus.find((x) => slug ? `/${slug}` : window.location.pathname === `${x.url}`);
    dispatch(persistStateActions.setActiveMenuKey(selectedMenu?.id || window.location.pathname));
  }, [menus, window]);

  const buildTopNav = () => {
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
      if (x.type === 'Dropdown') {
        return {
          key: x.id,
          title: x.label,
          label: (
            <Space>
              {x.icons && <i className={x.icons} style={{ color: x.iconColor || 'orange' }} />}
              <span>{x.label}</span>
              <i className="fa-solid fa-chevron-down" />
            </Space>
          ),
          children: buildSubmenu(x),
        };
      }
      return {
        key: x.id,
        title: x.label,
        label: (
          <Space>
            {x.icons && <i className={x.icons} style={{ color: x.iconColor || 'orange' }} />}
            <span>{x.label}</span>
            <i className="fa-solid fa-chevron-down" />
          </Space>
        ),
        children: [
          {
            key: `${x.id}_${Utils.createUUID()}`,
            label: (
              <Space direction="vertical">
                <span style={{ fontSize: 18, fontWeight: 'bold' }}>{x.label}</span>
                <div className="d-none">Render submenu</div>
              </Space>
            ),
            type: 'group',
            className: 'web-mega-menu',
            children: buildSubmenu(x),
          },
        ],
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
          <Space className={x.type === 'Group' ? 'web-mega-menu-item-group-title' : ''}>
            {x.icons && <i className={x.icons} style={{ color: x.iconColor || 'orange' }} />}
            <span>{x.label}</span>
          </Space>
        ),
        children: buildSubmenu(x),
      };
    });
    return navItems;
  };

  const onClick: MenuProps['onClick'] = (e) => {
    dispatch(persistStateActions.setActiveMenuKey(e.key));
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemHeight: 26,
          },
        },
      }}>
      <Menu
        selectedKeys={[activeKey]}
        onClick={onClick}
        mode="horizontal"
        triggerSubMenuAction="hover"
        items={buildTopNav()}
        style={{ flex: 1, minWidth: 0, justifyContent: 'center' }}
        className={`web-top-nav d-none d-xxl-flex`}
      />
    </ConfigProvider>
  );
};
