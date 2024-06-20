import { useEffect } from 'react';

import { Button, Drawer, Space, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  getActiveMenuKey,
  getPanelVisibility,
  getSearchVisibility,
  persistStateActions,
} from '@/store/persistState';

import { getMenuList } from '@/store/publicCms';
import { Link, useParams } from 'react-router-dom';
import { MenuResponse } from '@/services/MenuService';
import { SwitchLang } from '../SwitchLang';
import { getCurrentUser } from '@/store/app';
import { ProfileDropdown } from './ProfileDropdown';

type MenuItem = Required<MenuProps>['items'][number];

export const AppPanelNav = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const panelNavVisibility = useAppSelector(getPanelVisibility());
  const searchVisibility = useAppSelector(getSearchVisibility());
  const menus = useAppSelector(getMenuList());
  const acitveKey = useAppSelector(getActiveMenuKey());
  const currentUser = useAppSelector(getCurrentUser());
  const { '*': slug } = useParams();

  useEffect(() => {
    const selectedMenu = (menus || []).find(
      (x) => (slug ? `/${slug}` : window.location.pathname) === x.url
    );
    dispatch(
      persistStateActions.setActiveMenuKey(
        selectedMenu?.id || window.location.pathname
      )
    );
  }, [menus, slug]);

  const buildAppNav = () => {
    if (!menus) {
      return [];
    }
    const menuList = (menus || []).filter((x) => !x.parentId);
    const navItems: MenuItem[] = menuList.map((x) => {
      if (x.type === 'Link') {
        return {
          key: x.id,
          label: (
            <Link to={x.url === '/' ? '/' : `/trang${x.url}`}>
              {x.icons && (
                <i
                  className={x.icons}
                  style={{ marginRight: 8, color: x.iconColor || 'orange' }}
                />
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
            {x.icons && (
              <i
                className={x.icons}
                style={{ color: x.iconColor || 'orange' }}
              />
            )}
            <span>{x.label}</span>
          </Space>
        ),
        children: buildSubmenu(x),
      };
    });
    return navItems;
  };

  const buildSubmenu = (parent: MenuResponse) => {
    const menuList = (menus || []).filter((x) => x.parentId === parent.id);
    const navItems: MenuItem[] = menuList.map((x) => {
      if (x.type === 'Link') {
        return {
          key: x.id,
          label: (
            <Link to={x.url === '/' ? '/' : `/trang${x.url}`}>
              {x.icons && (
                <i
                  className={x.icons}
                  style={{ marginRight: 8, color: x.iconColor || 'orange' }}
                />
              )}
              {x.label}
            </Link>
          ),
        };
      }
      return {
        key: x.id,
        type: x.type === 'Group' ? 'group' : undefined,
        className: 'web-mega-menu-item-group',
        label: (
          <Space>
            {x.icons ? (
              <i
                className={x.icons}
                style={{ color: x.iconColor || 'orange' }}
              />
            ) : undefined}
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

  const searchToggle = () => {
    dispatch(persistStateActions.setSearchVisible(!searchVisibility));
    dispatch(persistStateActions.setPanelNavVisibility(false));
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
            {currentUser?.isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <Link to='/dang-nhap'>
                <Button type='primary' onClick={panelNavToggle}>
                  {t('Sign In', { ns: 'common' })}
                </Button>
              </Link>
            )}

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
        className='web-panel-nav'
        onClick={onClick}
        style={{ width: '100%' }}
        selectedKeys={[acitveKey]}
        mode='inline'
        items={buildAppNav()}
      />
    </Drawer>
  );
};
