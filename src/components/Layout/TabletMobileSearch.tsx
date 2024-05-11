
import { Form, Offcanvas } from "react-bootstrap";
import Link from "antd/es/typography/Link";
import { useTranslation } from "react-i18next";

type Props = {
  show: boolean;
  showMenu:() => void;
  onHide: () => void;
};

function TabletMobileSearch({ show,showMenu, onHide }: Props) {
  const { t } = useTranslation(['home']);

  return (
    <div>
      <Offcanvas
        className="menu-mobile"
        show={show}
        onHide={onHide}
        placement="end"
        backdrop={false}
        scroll={true}
      >
        <div className="custom-offcanvas-header">
          <i
            onClick={onHide}
            className="fa-solid fa-x fa-lg"
          ></i>
          <i
            onClick={showMenu}
            className="fa-solid fa-bars fa-lg d-xxl-none d-flex"
          ></i>
        </div>

        <Form className="d-flex flex-column px-4 gap-2 position-relative">
            <Form.Control
              type="search"
              placeholder={t('Enter keywords to search', {ns: 'home'})}
              className="search-field me-2"
              aria-label="Search"
            />
            <Link className="d-flex justify-content-center" href="/">
            <button type="button" className="btn-custom-search">
              <h5 className="text-white mb-0">{t('Search', {ns: 'home'})}</h5>
            </button></Link>
          </Form>
      </Offcanvas>
    </div>
  );
}

export default TabletMobileSearch;
