import { Offcanvas } from "react-bootstrap";
import { Menu } from "antd";
import Link from "antd/es/typography/Link";
import { useTranslation } from "react-i18next";

type Props = {
  show: boolean;
  onShowSearch: () => void;
  onHide: () => void;
  items:  any;
};

function TabletMobileMenu({ show, onShowSearch, onHide, items }: Props) {
  const { t } = useTranslation(['home']);

  return (
    <div>
      <Offcanvas
        className="menu-mobile d-xxl-none"
        show={show}
        onHide={onHide}
        placement="end"
        backdrop={false}
        scroll={true}
      >
        <div className="custom-offcanvas-header">
          <i onClick={onHide} className="fa-solid fa-x fa-lg"></i>
          <i
            onClick={onShowSearch}
            className="fa-solid fa-magnifying-glass fa-lg"
          ></i>
        </div>
        <Offcanvas.Body>
          <Menu mode="inline" defaultSelectedKeys={["1"]}>
            {items}
          </Menu>
          <Link className="d-flex justify-content-center" href="/">
            <button type="button" className="btn-custom-signin">
              <i className="fa-regular fa-user fa-xl "></i>
              <h5 className="text-white mb-0">{t('Log in', {ns: 'home'})}</h5>
            </button>
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default TabletMobileMenu;
