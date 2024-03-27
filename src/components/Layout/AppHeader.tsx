import { useState } from 'react';

import type { MenuProps } from 'antd';
import { Layout, theme, Row, Menu, Space, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import logo from '@/assets/logo.png';
import { menus } from '@/fakeData';
import { TopNavHeight } from '@/common';
import { SwitchLang } from './SwitchLang';

const items: MenuProps['items'] = menus.map((x) => {
  if (x.type === 'FlyoutMemu' && x.links) {
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
  if (x.type === 'MegaMenu' && x.groups) {
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
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [current, setCurrent] = useState('/');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log(e.key);
    setCurrent(e.key);
  };

  return (
    <Layout.Header
      style={{ padding: '0px 16px', color: 'GrayText', background: colorBgContainer, height: TopNavHeight }}>
      <Row align="middle" justify="space-between">
        <Link to="/">
          <img src={logo} alt="logo" width={130} />
        </Link>
        <Menu
          onClick={onClick}
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
        <Space>
          <Link to="/dang-ky">
            <Button type="default">Đăng ký</Button>
          </Link>
          <Link to="/dang-nhap">
            <Button type="primary">Đăng nhập</Button>
          </Link>
          {/* Switch Language */}
          <SwitchLang />
        </Space>
      </Row>
    </Layout.Header>
  );
};
