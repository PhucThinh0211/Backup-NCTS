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

  const menuTree = buildMenuTree(menus);

  const renderMenuItems = (menuItems) => {
    return Object.keys(menuItems).map((key) => {
      const menuItem = menuItems[key];
      if (menuItem.children && Object.keys(menuItem.children).length > 0) {
        return (
          <SubMenu
            key={key}
            title={menuItem.label}
            icon={menuItem.icons && <i className={`fa ${menuItem.icons}`}></i>}
            className="submenu-wrapper" // Add a class to the submenu element
            popupClassName="submenu-popup" // Add a class to the submenu popup
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
        items={renderMenuItems(menuTree)}
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
