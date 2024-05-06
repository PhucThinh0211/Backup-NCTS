import { useEffect, useState } from "react";

import { Layout, Row, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { TopNavHeight } from "@/common";
import { SwitchLang } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getMenuList, homeActions } from "@/store/publicCms";
import { getLanguage } from "@/store/persistState";

const { SubMenu } = Menu;

export const AppHeader = () => {
  const dispatch = useAppDispatch();
  const menus = useAppSelector(getMenuList());
  const lang = useAppSelector(getLanguage());

  useEffect(() => {
    dispatch(homeActions.getMenuListRequest({}));
  }, [lang]);
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  const [current, setCurrent] = useState("/");


  function buildMenuTree(items, parentId = null) {
    const node = {};
    items
        .filter(item => item.parentId === parentId)
        .forEach(item => {
            node[item.id] = {
                label: item.label,
                url: item.url,
                icons: item.icons,
                children: buildMenuTree(items, item.id)
            };
        });
    return node;
}

  // Build the menu tree from the fetched data
  const menuTree = buildMenuTree(menus);

  // Function to render menu items recursively
  const renderMenuItems = (menuItems) => {
    return Object.keys(menuItems).map((key) => {
      const menuItem = menuItems[key];
      if (Object.keys(menuItem.children).length > 0) {
        return (
          <SubMenu key={key} title={menuItem.label} icon={menuItem.icons && <i className={`fa ${menuItem.icons}`}></i>}>
            {renderMenuItems(menuItem.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={key} icon={menuItem.icons && <i className={`fa ${menuItem.icons}`}></i>}>
            <Link to={menuItem.url}>{menuItem.label}</Link>
          </Menu.Item>
        );
      }
    });
  };

  return (
    <Layout.Header
      style={{
        color: "GrayText",
        background: colorBgContainer,
        height: TopNavHeight,
        padding: 0,
      }}
    >
     
      <Row className="container-xl" align="middle" justify="space-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <div  className="d-none d-lg-flex">
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[current]}
          onClick={(e) => setCurrent(e.key)}
        >
          {/* Render menu items */}
          {renderMenuItems(menuTree)}
        </Menu></div>

        {/* Search and Profile */}
        <div
          style={{ height: 100 }}
          className="d-flex gap-4 align-items-center"
        >
          <div className="mobile-display">
          <div className="menu-icon tablet-mobile-menu">
          <i className="fa-solid fa-bars fa-xl"></i>
          </div>
          <div className="menu-icon">
            <i className=" fa-solid fa-magnifying-glass fa-lg"></i>
          </div></div>
          <div className="menu-icon mobile-hidden">
            <i className=" fa-regular fa-user fa-xl"></i>
          </div>

          {/* Switch Language */}
          <div className="mobile-hidden">
          <SwitchLang /></div>
        </div>
      </Row>
      
    </Layout.Header>
  );
};
