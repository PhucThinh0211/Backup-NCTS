import { QuickLookup } from '@/components';
// import { Carousel } from 'antd';

export const Home = () => {
  return (
    < div className='bg-white'>
      {/* <Carousel autoplay>
        <div>
          <img src="http://ncts.vn/images/ThuVien/Banner/vi/3-01.png" alt="1" width='100%'/>
        </div>
        <div>
          <img src="http://ncts.vn/images/ThuVien/Banner/vi/banner-cargo-5.jpg" alt="1" width='100%' />
        </div>
      </Carousel> */}
      <div className=" w-full">
        <QuickLookup />
      </div>
      {/* News Session */}
      <div>
        <div className='d-flex w-100 h-100 justify-content-center mt-5'>
          <img src="https://sit.ntcs.hicas.vn/api/photo/dowload/b6eb6604-e28b-ea7a-cad2-3a1272ac5fca.png" alt="News" />
        </div>

        
      </div>
    </div>

  );
};
