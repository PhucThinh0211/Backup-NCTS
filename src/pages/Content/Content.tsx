import { Carousel } from 'antd';

import { Outlet, useParams } from 'react-router-dom';

export const Content = () => {
  const { '*': kk} = useParams();

  console.log(kk);

  return (
    <>
      <Carousel autoplay>
        <div>
          {/* prettier-ignore */}
          <img src="http://ncts.vn/images/ThuVien/Banner/vi/3-01.png" alt="1" width='100%'/>
        </div>
        <div>
          {/* prettier-ignore */}
          <img src="http://ncts.vn/images/ThuVien/Banner/vi/banner-cargo-5.jpg" alt="1" width='100%' />
        </div>
      </Carousel>
      <div style={{ margin: '16px 16px 0' }}>
        Noi dung
        <Outlet />
      </div>
    </>
  );
};
