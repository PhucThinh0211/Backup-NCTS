import { useEffect, useState } from 'react';

import type { MenuProps } from 'antd';
import { Layout, theme, Row, Menu, Space, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { NIL as NIL_UUID  } from 'uuid';
import { Link, useParams } from 'react-router-dom';

import logo from '@/assets/logo.png';
import { menus } from '@/fakeData';
import { TopNavHeight } from '@/common';
import { SwitchLang } from '@/components';





const flatMenu: { id: string; url?: string; parentId?: string }[] = [];

const items: MenuProps['items'] = menus.map((x) => {
  flatMenu.push({ id: x.id, url: x.url });
  if (x.links) {
    x.links.forEach((l) => {
      flatMenu.push({ id: l.id, url: l.url, parentId: x.id });
    });
  }
  if (x.groups) {
    x.groups.forEach((g) => {
      flatMenu.push({ id: g.id, url: '', parentId: x.id });
      if (g.links) {
        g.links.forEach((l) => {
          flatMenu.push({ id: l.id, url: l.url, parentId: g.id });
        });
      }
    });
  }

  if (x.type === 'Dropdown' && x.links) {
    return {
      key: x.id,
      label: (
        <div>
          {x.label}
          <DownOutlined style={{ marginLeft: 8 }} />
        </div>
      ),
      children: x.links.map((l) => ({
        key: l.id,
        label: <Link to={`/trang${l.url}`}>{l.label}</Link>,
      })),
    };
  }
  if (x.type === 'Group' && x.groups) {
    const groupChildren: any[] = []; //x.groups.map(g => ({ key: g.id, label: g.label, type: 'group' }));
    x.groups.forEach((g) => {
      groupChildren.push({ key: g.id, label: g.label, type: 'group' });
      if (g.links) {
        g.links.forEach((l) => {
          groupChildren.push({ key: l.id, label: <Link to={`/trang${l.url}`}>{l.label}</Link> });
        });
      }
    });
    return {
      key: x.id,
      label: (
        <div>
          {x.label}
          <DownOutlined style={{ marginLeft: 8 }} />
        </div>
      ),
      children: groupChildren,
    };
  }
  return {
    key: x.id,
    label: <Link to={x.url && x.url !== '/' ? `/trang${x.url}` : '/'}>{x.label}</Link>,
  };
});

export const AppHeader = () => {
  const { t } = useTranslation(['common']);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [current, setCurrent] = useState('/');
  const { '*': slug } = useParams();

  useEffect(() => {
    const selectedMenu = flatMenu.find((x) => `/${slug || ''}` === x.url);
    setCurrent(selectedMenu?.id || NIL_UUID);
  }, [slug]);

  return (
    <Layout.Header
      style={{
        color: 'GrayText',
        background: colorBgContainer,
        height: TopNavHeight,
      }}>
      <Row className='container p-0' align="middle" justify="space-between">
        <Link to="/">
          <img src={logo} alt="logo" height={70} />
        </Link>
        <Menu
          selectedKeys={[current]}
          mode="horizontal" 
          items={items}
          disabledOverflow
          triggerSubMenuAction="hover"
          style={{
            fontWeight: 600,
            fontSize: 16,
            height: TopNavHeight,
            textTransform: 'uppercase',
          }}
          className="top-nav"
        />
      
          {/* Search and Profile */}
          <div style={{height: 100 }} className='d-flex gap-4 align-items-center'>
            <div className='menu-icon'> <i className=" fa-solid fa-magnifying-glass fa-lg"></i></div>
            <div className='menu-icon'><i className=" fa-regular fa-user fa-xl"></i></div>
           
          {/* Switch Language */}
          <SwitchLang /></div>
    
      </Row>
    </Layout.Header>
  );
};
