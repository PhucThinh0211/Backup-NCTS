import { QuickLookup } from '@/components';
import { Avatar, Carousel } from 'antd';

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
      <div className="bg-white w-full">
        <QuickLookup />
      </div>
      <button className="btn btn-primary">Bootstrap Primary button</button>
      
      <Avatar size={64} style={{ backgroundColor: 'red' }}>
        <i className="fa-brands fa-twitter fa-xl" style={{ color: 'orange' }}></i>
      </Avatar>
    </>
  );
};
