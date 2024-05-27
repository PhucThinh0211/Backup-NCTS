import { Carousel } from 'antd';

const partnerSlideShow = [
  {
    url: 'https://ncts.hicas.vn/api/photo/dowload/4d19ede4-c906-c453-3fc8-3a12ca4faa9b.png',
  },
  {
    url: 'https://ncts.hicas.vn/api/photo/dowload/1cabfaa5-b5b2-b98c-6130-3a12ca505948.png',
  },
  {
    url: 'https://ncts.hicas.vn/api/photo/dowload/f7698340-d7e5-a81c-a99d-3a12ca50f884.png',
  },
  {
    url: 'https://ncts.hicas.vn/api/photo/dowload/08bdbd9c-9145-d1ad-a939-3a12ca51948e.png',
  },
  {
    url: 'https://ncts.hicas.vn/api/photo/dowload/88996db0-2dd8-45ef-6cbe-3a12ca524cff.png',
  },
  {
    url: 'https://ncts.hicas.vn/api/photo/dowload/9e359741-5837-5716-a977-3a12ca52cac1.png',
  },
  {
    url: 'https://ncts.hicas.vn/api/photo/dowload/86f69011-ef6a-5227-7840-3a12ca534f0e.png',
  },
  {
    url: 'https://ncts.hicas.vn/api/photo/dowload/2a37bce7-79e1-ac6a-cbc0-3a12ca53f072.png',
  },
  {
    url: 'https://ncts.hicas.vn/api/photo/dowload/370893f2-6995-e587-f537-3a12ca561fde.png',
  },
  {
    url: 'https://ncts.hicas.vn/api/photo/dowload/b7832f0b-1234-0615-ce5e-3a12ca56bbae.png',
  },
  {
    url: 'https://ncts.hicas.vn/api/photo/dowload/b5a1a2ca-511c-a4f3-0301-3a12ca574882.png',
  },
  {
    url: 'https://ncts.hicas.vn/api/photo/dowload/50dae03c-fbbe-bcb3-eb19-3a12ca57e338.png',
  },
  {
    url: 'https://ncts.hicas.vn/api/photo/dowload/f82647a4-8329-a2cc-6208-3a12ca58774e.png',
  },
  {
    url: 'https://ncts.hicas.vn/api/photo/dowload/0991d01d-1629-6bfa-9154-3a12ca59126d.png',
  },
  {
    url: 'https://ncts.hicas.vn/api/photo/dowload/aa65cbf9-db29-2e79-3b73-3a12ca599679.png',
  },
  {
    url: 'https://ncts.hicas.vn/api/photo/dowload/2d7cf50b-adf5-0cee-7010-3a12ca5a23fb.png',
  },
  {
    url: 'https://ncts.hicas.vn/api/photo/dowload/dbc2d39b-cc94-6bfc-6902-3a12ca5aaa3c.png',
  },
];

export const CustomerLogoSection = () => {
  return (
    <div className="w-100 pb-3">
      <Carousel
        slidesToShow={6}
        dots={false}
        autoplay
        infinite={true}
        autoplaySpeed={2000}
        speed={2000}>
        {partnerSlideShow.map((i, index) => (
          <img className="imgSlideShow" src={i.url} key={index} />
        ))}
      </Carousel>
    </div>
  );
};
