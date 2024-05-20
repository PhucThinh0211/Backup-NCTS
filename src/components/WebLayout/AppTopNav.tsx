import { useState, useEffect } from 'react';
import { Menu, Space } from 'antd';
import type { MenuProps } from 'antd';
import { Link, useParams } from 'react-router-dom';

import { useAppSelector } from '@/store/hooks';
import { getMenuList } from '@/store/publicCms';
import { MenuResponse } from '@/services/MenuService';
import Utils from '@/utils';

type MenuItem = Required<MenuProps>['items'][number];

export const AppTopNav = () => {
  const menus = useAppSelector(getMenuList());
  const [current, setCurrent] = useState('/');
  const { '*': slug } = useParams();

  useEffect(() => {
    const selectedMenu = menus.find((x) => `/${slug || ''}` === `${x.url}`);
    setCurrent(selectedMenu?.id || '/');
  }, [menus]);


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
            label: <span style={{ fontSize: 18, fontWeight: 'bold' }}>{x.label}</span>,
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
    setCurrent(e.key);
  };

  return (
    <Menu
      selectedKeys={[current]}
      onClick={onClick}
      mode='horizontal'
      triggerSubMenuAction="hover"
      items={buildTopNav()}
      style={{ flex: 1, minWidth: 0, justifyContent: 'center' }}
      className={`web-top-nav d-none d-xxl-flex`}
    />
  );
};
