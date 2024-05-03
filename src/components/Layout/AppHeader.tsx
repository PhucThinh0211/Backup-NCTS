import { useEffect, useState } from "react";

import type { MenuProps } from "antd";
import { Layout, theme, Row, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { NIL as NIL_UUID } from "uuid";
import { Link, useParams } from "react-router-dom";
import logo from "@/assets/logo.png";
// import {menus} from '@/fakeData'
import { TopNavHeight } from "@/common";
import { SwitchLang } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getMenuList, homeActions } from "@/store/publicCms";
import { getLanguage } from "@/store/persistState";
import { Nav, NavDropdown } from "react-bootstrap";

// const buildMenuTree = (data, parentId = null) => {
//   return data
//     .filter((item) => item.parentId === parentId)
//     .map((item) => {
//       const children = buildMenuTree(data, item.id);
//       if (children.length > 0) {
//         return {
//           ...item,
//           children,
//         };
//       } else {
//         return {
//           ...item,
//         };
//       }
//     });
// };

export const AppHeader = () => {
  const dispatch = useAppDispatch();
  const menus = useAppSelector(getMenuList());
  const lang = useAppSelector(getLanguage());

  useEffect(() => {
    dispatch(homeActions.getMenuListRequest({}));
  }, [lang]);

  // const [showMenu, setShowMenu] = useState(false);
  // const [showSearch, setShowSearch] = useState(false);

  // const handleShowMenu = () => {
  //   setShowMenu(true);
  //   setShowSearch(false);
  // };
  // const handleCloseMenu = () => setShowMenu(false);

  // const handleShowSearch = () => {
  //   setShowSearch(true);
  //   setShowMenu(false);
  // };
  // const handleCloseSearch = () => setShowSearch(false);

  // const menuTree = buildMenuTree(menus);
  // const flattenMenuItems = (data) => {
  //   const flatMenuItems = [];
  //   data.forEach((item) => {
  //     flatMenuItems.push({ key: item.id, label: item.label, url: item.url });
  //     if (item.children && item.children.length > 0) {
  //       flatMenuItems.push(...flattenMenuItems(item.children));
  //     }
  //   });
  //   return flatMenuItems;
  // };

  // const flatMenuItems = flattenMenuItems(menuTree);
  console.log(menus);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [current, setCurrent] = useState("/");
  const { "*": slug } = useParams();

  return (
    <Layout.Header
      style={{
        color: "GrayText",
        background: colorBgContainer,
        height: TopNavHeight,
      }}
    >
      <Row className="container p-0" align="middle" justify="space-between">
        <Link to="/">
          <img src={logo} alt="logo" height={70} />
        </Link>
        {/* <Menu
          selectedKeys={[current]}
          mode="horizontal"
          items={flatMenuItems}
          disabledOverflow
          triggerSubMenuAction="hover"
          style={{
            fontWeight: 600,
            fontSize: 16,
            height: TopNavHeight,
            textTransform: "uppercase",
          }}
          className="top-nav"
        /> */}

        {/* Search and Profile */}
        <div
          style={{ height: 100 }}
          className="d-flex gap-4 align-items-center"
        >
          <div className="menu-icon">
            {" "}
            <i className=" fa-solid fa-magnifying-glass fa-lg"></i>
          </div>
          <div className="menu-icon">
            <i className=" fa-regular fa-user fa-xl"></i>
          </div>

          {/* Switch Language */}
          <SwitchLang />
        </div>
      </Row>
    </Layout.Header>
  );
};
