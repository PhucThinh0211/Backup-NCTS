import { QuickLookup } from '@/components';
import Cards from '@/components/CarouselCard/Cards';
import '@/pages/Home/HomeStyle.css'
// import { Carousel } from 'antd';


const newsCards = [
  {
    img: "",
    date: "",
    author: "",
    title: "Giải pháp đóng gói vận chuyển đồ",
    desc: "Kho bãi",
  },
  {
    img: "",
    date: "",
    author: "",
    title: "Giải pháp đóng gói vận chuyển đồ",
    desc: "Kho bãi",  
  },
  {
    img: "",
    date: "",
    author: "",
    title: "Giải pháp đóng gói vận chuyển đồ",
    desc: "Kho bãi",  
  },
  {
    img: "",
    date: "",
    author: "",
    title: "Giải pháp đóng gói vận chuyển đồ",
    desc: "Kho bãi",  
  },
  {
    img: "",
    date: "",
    author: "",
    title: "Giải pháp đóng gói vận chuyển đồ",
    desc: "Kho bãi",  
  },
  {
    img: "",
    date: "",
    author: "",
    title: "Giải pháp đóng gói vận chuyển đồ",
    desc: "Kho bãi",  
  },
];

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
        <div className='d-flex w-100 h-100 justify-content-center mt-5 mb-2 '>
          <img className="session-img" src="https://sit.ntcs.hicas.vn/api/photo/dowload/b6eb6604-e28b-ea7a-cad2-3a1272ac5fca.png" alt="News" />
        </div>
        {/* Carousel */}
        <div className='my-4'>
        {newsCards.map((i) => (
          <Cards img={i.img} date={i.date} author={i.author} title={i.title} desc={i.desc} />
        ))}
        </div>
      </div>
    </div>

  );
};
