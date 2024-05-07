import { useEffect, useState } from "react";

import { Layout, Row, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { TopNavHeight } from "@/common";
import { SwitchLang } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getMenuList, homeActions } from "@/store/publicCms";
import { getLanguage } from "@/store/persistState";
import TabletMobileMenu from "./TabletMobileMenu";
import TabletMobileSearch from "./TabletMobileSearch";
import React from "react";

const { SubMenu } = Menu;

export const AppHeader = () => {
  const dispatch = useAppDispatch();
  const menus = useAppSelector(getMenuList());
  const lang = useAppSelector(getLanguage());

  const LoginBtnText = lang === 'vi'? "Đăng nhập":"Log in"
  const searchBtnText = lang === 'vi'? "Tìm kiếm":"Search"

  useEffect(() => {
    dispatch(homeActions.getMenuListRequest({}));
  }, [lang]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(true);
    setShowSearch(false);
  };
  const handleCloseMenu = () => setShowMenu(false);

  const handleShowSearch = () => {
    setShowSearch(true);
    setShowMenu(false);
  };
  const handleCloseSearch = () => setShowSearch(false);

  function buildMenuTree(items, parentId = null) {
    const node = {};
    items
      .filter((item) => item.parentId === parentId)
      .forEach((item) => {
        node[item.id] = {
          label: item.label,
          url: item.url,
          icons: item.icons,
          children: buildMenuTree(items, item.id),
        };
      });
    return node;
  }


  const renderSubMenuItems = (menuItem) => {
    return (
      <React.Fragment>
        {menuItem.children &&
          Object.keys(menuItem.children).map((key) => {
            const subMenuItem = menuItem.children[key];
            return (
              <React.Fragment key={key}>
                <Menu.Item
                  key={key}
                  icon={
                    subMenuItem.icons && (
                      <i className={`fa ${subMenuItem.icons}`}></i>
                    )
                  }
                >
                  <Link  to={subMenuItem.url}>{subMenuItem.label}</Link>
                </Menu.Item>
                <div className="custom-menu-title">
               {renderSubMenuItems(subMenuItem)}
              </div>
              </React.Fragment>
            );
          })}
      </React.Fragment>
    );
  };
  
  // const desktopTree =buildMenuTreeWithGroups(menus)
  const menuTree = buildMenuTree(menus);

  // RenderMenuItems for Desktop
  const renderMenuItems = (menuItems) => {
    return Object.keys(menuItems).map((key) => {
      const menuItem = menuItems[key];
      if (menuItem.children && Object.keys(menuItem.children).length > 0) {
        return (
          <SubMenu
            key={key} 
            title={menuItem.label}
            icon={menuItem.icons && <i style={{color:"gray"}} className={`fa ${menuItem.icons}` }></i>}
          >
            <div className="p-3 mt-3 mb-3 fw-bold fs-5 text-gray">{menuItem.label}</div>
            <div className="custom-dropdown">
            {renderSubMenuItems(menuItem)}</div>
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item
            key={key}
            icon={menuItem.icons && <i className={`fa ${menuItem.icons}`}></i>}
          >
            <Link to={menuItem.url}>{menuItem.label}</Link>
          </Menu.Item>
        );
      }
    });
  };

  // Render Menu Items for Mobile
  const renderMobileMenuItems = (menuItems) => {
    return Object.keys(menuItems).map((key) => {
      const menuItem = menuItems[key];
      if (menuItem.children && Object.keys(menuItem.children).length > 0) {
        return (
          <SubMenu
            key={key}
            title={menuItem.label}
            icon={menuItem.icons && <i className={`fa ${menuItem.icons}`}></i>}
          >
            {renderMenuItems(menuItem.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item
            key={key}
            icon={menuItem.icons && <i className={`fa ${menuItem.icons}`}></i>}
          >
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
        position: 'sticky', top: 0, zIndex: 1000
      }}
    >
      <Row className="container-xl top-nav" align="middle" justify="space-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <div className="d-none d-xxl-flex">
          <Menu style={{minWidth: '800px'}} theme="light" mode="horizontal">
          {renderMenuItems(menuTree)}
          </Menu>
        </div>

        {/* Search and Profile */}
        <div
          style={{ height: 100 }}
          className="d-flex gap-4 align-items-center"
        >
          <div className="mobile-display">
            <div
              className="menu-icon d-xxl-none d-flex"
              onClick={handleShowMenu}
            >
              <i className="fa-solid fa-bars fa-xl"></i>
            </div>
            <div onClick={handleShowSearch} className="menu-icon">
              <i className=" fa-solid fa-magnifying-glass fa-lg"></i>
            </div>
          </div>
          <div className="menu-icon mobile-hidden">
            <i className=" fa-regular fa-user fa-xl"></i>
          </div>

          {/* Switch Language */}
          <div className="mobile-hidden">
            <SwitchLang />
          </div>
        </div>
      </Row>
      <TabletMobileMenu
        show={showMenu}
        onShowSearch={handleShowSearch}
        onHide={handleCloseMenu}
        items={renderMobileMenuItems(menuTree)}
        buttonText={LoginBtnText}
      />
      <TabletMobileSearch
        showMenu={handleShowMenu}
        show={showSearch}
        onHide={handleCloseSearch}
        searchBtnText= {searchBtnText}
      />
    </Layout.Header>
  );
};
