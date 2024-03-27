import { QuickLookup } from '@/components';
import { Carousel } from 'antd';

export const Home = () => {
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
      <div style={{ backgroundColor: 'white', width: '100%' }}>
        <QuickLookup />
      </div>
    </>
  );
};
