import { QuickLookup } from '@/components';
import Cards from '@/components/CarouselCard/Cards';
import '@/pages/Home/HomeStyle.css'
import { Carousel } from 'antd';
import { useRef } from 'react';

const newsCards = [
  {
    img: "https://s3-alpha-sig.figma.com/img/8a71/6a99/01ebca0161db844308dce7fd1c78ffa8?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JZNjq8DF-xpFFzB7epoLXKkEJQ78cHnWVDX3GuhSe6CZ5IdMTnhLhpFDe4dSqBzavHKcDNIJ5fMRaYZWmD9WEmz447vJfIgAmrM5MFGcXcPic-Y8jx8hmrbdjHPUbuaHl-ChJVjOVfZIeZsaFNpN81CsjQYxV~DXFODXP--Zr5oqJPyeSHHJ-n-8H8ru2XZSnjatZhXjON8ZbyZ5amPAs0-K~SXr53GVisqWDSsZKoWOxYg7Ahbndr9wfbiCZn299SresH~im9qqxEmatsN-INfLFBVqRps0SB956fHKokepg5ez~ICg8LefjR-GmUxX3sHdbYg6BNkDyBREc8Kz9w__",
    date: "Jun 12, 2023",
    author: "Hải Minh",
    title: "Giải pháp đóng gói vận chuyển đồ của chúng tôi là hoàn hảo Giải pháp đóng gói vận chuyển đồ của chúng tôi là hoàn hảo Giải pháp đóng gói vận chuyển đồ của chúng tôi là hoàn hảo",
    desc: "Kể từ khi thành lập, NCTS luôn từng bước khẳng định vị thế và uy tín của mình trong lĩnh vực phục vụ hàng hoá hàng Kể từ khi thành lập NCTSádjkabnsdkjasndkjasndkjasndkjasndk ể từ khi thành lập, NCTS luôn từng bước khẳng định vị thế và uy tín của mình trong lĩnh vực phục vụ hàng hoá hàng Kể từ khi thành lập NCTSádjkabnsdkjasndkjasndkjasndkjasndk ể từ khi thành lập, NCTS luôn từng bước khẳng định vị thế và uy tín của mình trong lĩnh vực phục vụ hàng hoá hàng Kể từ khi thành lập NCTSádjkabnsdkjasndkjasndkjasndkjasndk ể từ khi thành lập, NCTS luôn từng bước khẳng định vị thế và uy tín của mình trong lĩnh vực phục vụ hàng hoá hàng Kể từ khi thành lập NCTSádjkabnsdkjasndkjasndkjasndkjasndk",
  },
  {
  img: "https://s3-alpha-sig.figma.com/img/8a71/6a99/01ebca0161db844308dce7fd1c78ffa8?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JZNjq8DF-xpFFzB7epoLXKkEJQ78cHnWVDX3GuhSe6CZ5IdMTnhLhpFDe4dSqBzavHKcDNIJ5fMRaYZWmD9WEmz447vJfIgAmrM5MFGcXcPic-Y8jx8hmrbdjHPUbuaHl-ChJVjOVfZIeZsaFNpN81CsjQYxV~DXFODXP--Zr5oqJPyeSHHJ-n-8H8ru2XZSnjatZhXjON8ZbyZ5amPAs0-K~SXr53GVisqWDSsZKoWOxYg7Ahbndr9wfbiCZn299SresH~im9qqxEmatsN-INfLFBVqRps0SB956fHKokepg5ez~ICg8LefjR-GmUxX3sHdbYg6BNkDyBREc8Kz9w__",
  date: "Jun 12, 2023",
  author: "Hải Minh",
  title: "Giải pháp đóng gói vận chuyển đồ của chúng tôi là hoàn hảo Giải pháp đóng gói vận chuyển đồ của chúng tôi là hoàn hảo Giải pháp đóng gói vận chuyển đồ của chúng tôi là hoàn hảo",
  desc: "Kể từ khi thành lập, NCTS luôn từng bước khẳng định vị thế và uy tín của mình trong lĩnh vực phục vụ hàng hoá hàng Kể từ khi thành lập NCTSádjkabnsdkjasndkjasndkjasndkjasndk ể từ khi thành lập, NCTS luôn từng bước khẳng định vị thế và uy tín của mình trong lĩnh vực phục vụ hàng hoá hàng Kể từ khi thành lập NCTSádjkabnsdkjasndkjasndkjasndkjasndk ể từ khi thành lập, NCTS luôn từng bước khẳng định vị thế và uy tín của mình trong lĩnh vực phục vụ hàng hoá hàng Kể từ khi thành lập NCTSádjkabnsdkjasndkjasndkjasndkjasndk ể từ khi thành lập, NCTS luôn từng bước khẳng định vị thế và uy tín của mình trong lĩnh vực phục vụ hàng hoá hàng Kể từ khi thành lập NCTSádjkabnsdkjasndkjasndkjasndkjasndk",
  },
  {
    img: "https://s3-alpha-sig.figma.com/img/8a71/6a99/01ebca0161db844308dce7fd1c78ffa8?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JZNjq8DF-xpFFzB7epoLXKkEJQ78cHnWVDX3GuhSe6CZ5IdMTnhLhpFDe4dSqBzavHKcDNIJ5fMRaYZWmD9WEmz447vJfIgAmrM5MFGcXcPic-Y8jx8hmrbdjHPUbuaHl-ChJVjOVfZIeZsaFNpN81CsjQYxV~DXFODXP--Zr5oqJPyeSHHJ-n-8H8ru2XZSnjatZhXjON8ZbyZ5amPAs0-K~SXr53GVisqWDSsZKoWOxYg7Ahbndr9wfbiCZn299SresH~im9qqxEmatsN-INfLFBVqRps0SB956fHKokepg5ez~ICg8LefjR-GmUxX3sHdbYg6BNkDyBREc8Kz9w__",
    date: "Jun 12, 2023",
    author: "Hải Minh",
    title: "Giải pháp đóng gói vận chuyển đồ của chúng tôi là hoàn hảo Giải pháp đóng gói vận chuyển đồ của chúng tôi là hoàn hảo Giải pháp đóng gói vận chuyển đồ của chúng tôi là hoàn hảo",
    desc: "Kể từ khi thành lập, NCTS luôn từng bước khẳng định vị thế và uy tín của mình trong lĩnh vực phục vụ hàng hoá hàng Kể từ khi thành lập NCTSádjkabnsdkjasndkjasndkjasndkjasndk ể từ khi thành lập, NCTS luôn từng bước khẳng định vị thế và uy tín của mình trong lĩnh vực phục vụ hàng hoá hàng Kể từ khi thành lập NCTSádjkabnsdkjasndkjasndkjasndkjasndk ể từ khi thành lập, NCTS luôn từng bước khẳng định vị thế và uy tín của mình trong lĩnh vực phục vụ hàng hoá hàng Kể từ khi thành lập NCTSádjkabnsdkjasndkjasndkjasndkjasndk ể từ khi thành lập, NCTS luôn từng bước khẳng định vị thế và uy tín của mình trong lĩnh vực phục vụ hàng hoá hàng Kể từ khi thành lập NCTSádjkabnsdkjasndkjasndkjasndkjasndk",
  },
  {
    img: "https://s3-alpha-sig.figma.com/img/8a71/6a99/01ebca0161db844308dce7fd1c78ffa8?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JZNjq8DF-xpFFzB7epoLXKkEJQ78cHnWVDX3GuhSe6CZ5IdMTnhLhpFDe4dSqBzavHKcDNIJ5fMRaYZWmD9WEmz447vJfIgAmrM5MFGcXcPic-Y8jx8hmrbdjHPUbuaHl-ChJVjOVfZIeZsaFNpN81CsjQYxV~DXFODXP--Zr5oqJPyeSHHJ-n-8H8ru2XZSnjatZhXjON8ZbyZ5amPAs0-K~SXr53GVisqWDSsZKoWOxYg7Ahbndr9wfbiCZn299SresH~im9qqxEmatsN-INfLFBVqRps0SB956fHKokepg5ez~ICg8LefjR-GmUxX3sHdbYg6BNkDyBREc8Kz9w__",
    date: "Jun 12, 2023",
    author: "Hải Minh",
    title: "Giải pháp đóng gói vận chuyển đồ của chúng tôi là hoàn hảo Giải pháp đóng gói vận chuyển đồ của chúng tôi là hoàn hảo Giải pháp đóng gói vận chuyển đồ của chúng tôi là hoàn hảo",
    desc: "Kể từ khi thành lập, NCTS luôn từng bước khẳng định vị thế và uy tín của mình trong lĩnh vực phục vụ hàng hoá hàng Kể từ khi thành lập NCTSádjkabnsdkjasndkjasndkjasndkjasndk ể từ khi thành lập, NCTS luôn từng bước khẳng định vị thế và uy tín của mình trong lĩnh vực phục vụ hàng hoá hàng Kể từ khi thành lập NCTSádjkabnsdkjasndkjasndkjasndkjasndk ể từ khi thành lập, NCTS luôn từng bước khẳng định vị thế và uy tín của mình trong lĩnh vực phục vụ hàng hoá hàng Kể từ khi thành lập NCTSádjkabnsdkjasndkjasndkjasndkjasndk ể từ khi thành lập, NCTS luôn từng bước khẳng định vị thế và uy tín của mình trong lĩnh vực phục vụ hàng hoá hàng Kể từ khi thành lập NCTSádjkabnsdkjasndkjasndkjasndkjasndk",
  },
  {
    img: "https://s3-alpha-sig.figma.com/img/8a71/6a99/01ebca0161db844308dce7fd1c78ffa8?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JZNjq8DF-xpFFzB7epoLXKkEJQ78cHnWVDX3GuhSe6CZ5IdMTnhLhpFDe4dSqBzavHKcDNIJ5fMRaYZWmD9WEmz447vJfIgAmrM5MFGcXcPic-Y8jx8hmrbdjHPUbuaHl-ChJVjOVfZIeZsaFNpN81CsjQYxV~DXFODXP--Zr5oqJPyeSHHJ-n-8H8ru2XZSnjatZhXjON8ZbyZ5amPAs0-K~SXr53GVisqWDSsZKoWOxYg7Ahbndr9wfbiCZn299SresH~im9qqxEmatsN-INfLFBVqRps0SB956fHKokepg5ez~ICg8LefjR-GmUxX3sHdbYg6BNkDyBREc8Kz9w__",
    date: "Jun 12, 2023",
    author: "Hải Minh",
    title: "Giải pháp đóng gói vận chuyển đồ của chúng tôi là hoàn hảo Giải pháp đóng gói vận chuyển đồ của chúng tôi là hoàn hảo Giải pháp đóng gói vận chuyển đồ của chúng tôi là hoàn hảo",
    desc: "Kể từ khi thành lập, NCTS luôn từng bước khẳng định vị thế và uy tín của mình trong lĩnh vực phục vụ hàng hoá hàng Kể từ khi thành lập NCTSádjkabnsdkjasndkjasndkjasndkjasndk ể từ khi thành lập, NCTS luôn từng bước khẳng định vị thế và uy tín của mình trong lĩnh vực phục vụ hàng hoá hàng Kể từ khi thành lập NCTSádjkabnsdkjasndkjasndkjasndkjasndk ể từ khi thành lập, NCTS luôn từng bước khẳng định vị thế và uy tín của mình trong lĩnh vực phục vụ hàng hoá hàng Kể từ khi thành lập NCTSádjkabnsdkjasndkjasndkjasndkjasndk ể từ khi thành lập, NCTS luôn từng bước khẳng định vị thế và uy tín của mình trong lĩnh vực phục vụ hàng hoá hàng Kể từ khi thành lập NCTSádjkabnsdkjasndkjasndkjasndkjasndk",
  },
];

export const Home = () => {
  const carouselRef = useRef(null);

  const next = () => {
    carouselRef.current.next();
  };

  const prev = () => {
    carouselRef.current.prev();
  };
  const responsiveSettings = [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 9999, // A very large number to ensure the last settings are always applied
      settings: {
        slidesToShow: 3,
      },
    },
  ];

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
        <div className='d-flex w-100 h-100 justify-content-center'>
          <img className="session-img" src="https://sit.ntcs.hicas.vn/api/photo/dowload/b6eb6604-e28b-ea7a-cad2-3a1272ac5fca.png" alt="News" />
        </div>
        {/* Carousel */}
        <div className='my-4 d-flex flex-column container slide-card'>
          <Carousel
          slidesToShow={3}
          dots={false}
          ref={carouselRef}
          autoplay
          infinite={true}
          autoplaySpeed ={5000}
          responsive={responsiveSettings}
        >
          {newsCards.map((i, index) => (
              <Cards key={index} img={i.img} date={i.date} author={i.author} title={i.title} desc={i.desc} />
          ))}
         
        </Carousel>
         <div style={{ textAlign: "center"}} className="arrow-btn d-none d-xl-flex">
            <button className="lr-carousel-button" onClick={prev}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button className="lr-carousel-button" onClick={next}>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          </div>
      </div>
    </div>

  );
};
