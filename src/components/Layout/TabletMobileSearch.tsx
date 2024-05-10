
import { Form, Offcanvas } from "react-bootstrap";
import Link from "antd/es/typography/Link";

type Props = {
  show: boolean;
  showMenu:() => void;
  onHide: () => void;
  searchBtnText: string
};

function TabletMobileSearch({ show,showMenu, onHide, searchBtnText }: Props) {
 

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
              placeholder="Nhập từ khóa cần tìm kiếm"
              className="search-field me-2"
              aria-label="Search"
            />
            <Link className="d-flex justify-content-center" href="/">
            <button type="button" className="btn-custom-search">
              <h5 className="text-white mb-0">{searchBtnText}</h5>
            </button></Link>
          </Form>
      </Offcanvas>
    </div>
  );
}

export default TabletMobileSearch;
