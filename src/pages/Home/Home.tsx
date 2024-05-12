import { QuickLookup } from '@/components';
import Cards from '@/components/CarouselCard/Cards';
import ServiceCard from '@/components/ServiceCard/ServiceCard';
import '@/pages/Home/HomeStyle.css'
import { Carousel } from 'antd';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

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

const serviceCards = [
  {
    img: "https://s3-alpha-sig.figma.com/img/8a71/6a99/01ebca0161db844308dce7fd1c78ffa8?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JZNjq8DF-xpFFzB7epoLXKkEJQ78cHnWVDX3GuhSe6CZ5IdMTnhLhpFDe4dSqBzavHKcDNIJ5fMRaYZWmD9WEmz447vJfIgAmrM5MFGcXcPic-Y8jx8hmrbdjHPUbuaHl-ChJVjOVfZIeZsaFNpN81CsjQYxV~DXFODXP--Zr5oqJPyeSHHJ-n-8H8ru2XZSnjatZhXjON8ZbyZ5amPAs0-K~SXr53GVisqWDSsZKoWOxYg7Ahbndr9wfbiCZn299SresH~im9qqxEmatsN-INfLFBVqRps0SB956fHKokepg5ez~ICg8LefjR-GmUxX3sHdbYg6BNkDyBREc8Kz9w__",
    url: "/",
    title: "Dịch Vụ Hàng Xuất",
  },
  {
    img: "https://s3-alpha-sig.figma.com/img/8a71/6a99/01ebca0161db844308dce7fd1c78ffa8?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JZNjq8DF-xpFFzB7epoLXKkEJQ78cHnWVDX3GuhSe6CZ5IdMTnhLhpFDe4dSqBzavHKcDNIJ5fMRaYZWmD9WEmz447vJfIgAmrM5MFGcXcPic-Y8jx8hmrbdjHPUbuaHl-ChJVjOVfZIeZsaFNpN81CsjQYxV~DXFODXP--Zr5oqJPyeSHHJ-n-8H8ru2XZSnjatZhXjON8ZbyZ5amPAs0-K~SXr53GVisqWDSsZKoWOxYg7Ahbndr9wfbiCZn299SresH~im9qqxEmatsN-INfLFBVqRps0SB956fHKokepg5ez~ICg8LefjR-GmUxX3sHdbYg6BNkDyBREc8Kz9w__",
    url: "/",
    title: "Dịch Vụ Hàng Nhập",
  },
  {
    img: "https://s3-alpha-sig.figma.com/img/8a71/6a99/01ebca0161db844308dce7fd1c78ffa8?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JZNjq8DF-xpFFzB7epoLXKkEJQ78cHnWVDX3GuhSe6CZ5IdMTnhLhpFDe4dSqBzavHKcDNIJ5fMRaYZWmD9WEmz447vJfIgAmrM5MFGcXcPic-Y8jx8hmrbdjHPUbuaHl-ChJVjOVfZIeZsaFNpN81CsjQYxV~DXFODXP--Zr5oqJPyeSHHJ-n-8H8ru2XZSnjatZhXjON8ZbyZ5amPAs0-K~SXr53GVisqWDSsZKoWOxYg7Ahbndr9wfbiCZn299SresH~im9qqxEmatsN-INfLFBVqRps0SB956fHKokepg5ez~ICg8LefjR-GmUxX3sHdbYg6BNkDyBREc8Kz9w__",
    url: "/",
    title: "Dịch Vụ Khác",
  }
]

const partner =[
  {
    url : "https://s3-alpha-sig.figma.com/img/4351/b56c/19e398c091eb2fc03aaecb417c151b54?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B53mJNHyr3h6pCFHKsFYkPO8l-MUBacDT8AMPHcGE7suFN3G2bO7P2YLSYpVwNSEI2zD60NOK61PFR14nTWxY5m1hxYeG-FhEdReTbEkKKGOko8grhdwOn9rml~uXy0KR5oNsgNgoWGxL8vxiU6dck~7W-56jdZw3Rh~r8BTvGoMGHOW0juBgeJeU5KBTcwRmAqM8zbgiQya-gX0JIEDFwQzLd-v9MoC0qPZdmzPWMV3XztxfgK3~GMz0mTp1T67C9hQjIVHax9bfKHRKShvxCIoB2k7przZGljTwd~2LAToN37Cfb6-33K76vGaGRN4OeJk27ZU1IIQZR-nlyRmtw__"
  },
  {
    url : "https://s3-alpha-sig.figma.com/img/704a/a250/6d9ac464b2022e2358e4cde9814bb99d?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VQTdJ8qQYigelRri9Y8Mhe275ajG7ErRWHnYdZwldZxya8dojtvn0jELWaLRMFoGPRRX8ErQFnj7no1l~m8e1oVXFpBZpHd~gta7xsXS1gy7nEZ4BEBzcz20Ei3LWl4so9lXre76X9oyRSvw-C2OWtFz7apZZiynug0QR~czM6IH5jwpeyZyaHxYvWLc~MYYYV8LYCJCiMO2zQsXLHTLTR8SJQRzYNpTCstFlJf4KJ8kvlYTUVf0sJDmlynXDsiR7XAS0Ec2bSMMwUhiKobmPq7UreKsQWKgsd8b9JI-awnoX6YQt6ALOPsbDjy28-RrsSS9mIORrEN3O2wM3vZljg__"
  },
  {
    url : "https://s3-alpha-sig.figma.com/img/3595/10e6/104b5446d8d99ac8d7c6c8ff798b8dcd?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SYAJ2p9n-OWuZDDTEYUWyix8lUCRmACuk7h4MmrwmoZQ7650c6elvjM8J5AntdHKxgcyjI5j3SFhNSeoIHCnnnKEPgfn0O2ZMhoq64cNhR1RTRJuMeR-xnqc6BxDfeJ1LDzemSUhcs4zAm~r5RW2q0j20irZpuqZgue0gSZEmLnlAVGglCg2nOgjL-6v5EdQPU0gaUp0udNVk-zeEOuYFH6LVJShdUk8sQ1b6ApdW91GQSfW6HiQpf~OYckJec2aIFqaaVJIanzZCo8qBJjOYtQLxI0aBvxiYesoMnp7kGM0mFfTLkTKiIZ6flJvqkNoEUpoveVjqCiZtZIphP7ynA__"
  },
]  


export const Home = () => {
  const carouselRef = useRef(null);
  const { t } = useTranslation(['home']);

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
        dot: true,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1,
        dot: true,
      },
    },
    {
      breakpoint: 9999, // A very large number to ensure the last settings are always applied
      settings: {
        slidesToShow: 3,
        dot: false,
      },
    },
  ];

  return (
    < div className='bg-white'>
      {/* Hero */}
      <div className=" w-full">
        <QuickLookup />
      </div>
      {/* News Session */}
      <div>
        <div className='d-flex w-100 h-100 justify-content-center'>
          <img className="session-img" src="https://sit.ntcs.hicas.vn/api/photo/dowload/b6eb6604-e28b-ea7a-cad2-3a1272ac5fca.png" alt="News" />
        </div>
        {/* Carousel */}
        <div className='my-4 container slide-card'>
          <Carousel
            slidesToShow={3}
            ref={carouselRef}
            autoplay
            infinite={true}
            autoplaySpeed={5000}
            responsive={responsiveSettings}
          >
            {newsCards.map((i, index) => (
              <Cards key={index} img={i.img} date={i.date} author={i.author} title={i.title} desc={i.desc} />
            ))}

          </Carousel>
          <div style={{ textAlign: "center" }} className="arrow-btn d-none d-xl-flex">
            <button className="lr-carousel-button" onClick={prev}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button className="lr-carousel-button" onClick={next}>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
      {/* Service session */}
      <div className="service-session">
        <div className='d-flex w-100 h-100 justify-content-center'>
          <img className="session-img" src="https://sit.ntcs.hicas.vn/api/photo/dowload/193910fd-f559-efcc-91f3-3a1278b70130.png" alt="News" />
        </div> 
          <div className='container w-100 justify-content-evenly'>
          <Carousel
            slidesToShow={3}
            autoplay
            infinite={true}
            autoplaySpeed={5000}
            responsive={responsiveSettings}
          >
            {serviceCards.map((i) => (
                <ServiceCard img={i.img} url={i.url} title={i.title} />
            ))}
            </Carousel>
          </div>
      </div>
      <div className="mb-3">
      {/* About Us session */}
        <div className='d-flex w-100 h-100 justify-content-center '>
          <img className="aboutUs-img" src="https://sit.ntcs.hicas.vn/api/photo/dowload/ce19dde0-2b93-953b-fa84-3a127e03a96b.png" alt="News" />
        </div> 
        <div className='container aboutUs-content my-5'>
          <img className="" src="https://sit.ntcs.hicas.vn/api/photo/dowload/5b850407-87b5-ddcd-8e20-3a127e40fb91.png" alt="News" />
          <div className ="">
            <h5>
            Đối tác tin cậy hàng đầu của các hãng hàng không trong và ngoài nước.
            </h5>
            <p>Công ty Cổ phần Dịch vụ Hàng hóa Nội Bài (NCTS), là đơn vị thành viên của Tổng công ty Hàng không Việt Nam, được thành lập và chính thức đi vào hoạt động từ ngày 01/05/2005. Công ty Cổ phần Dịch vụ Hàng hóa Nội Bài (NCTS), là đơn vị thành viên của Tổng công ty Hàng không Việt Nam, được thành lập và chính thức đi vào hoạt động từ ngày 01/05/2005..  Công ty Cổ phần Dịch vụ Hàng hóa Nội Bài (NCTS), là đơn vị thành viên của Tổng công ty Hàng không Việt Nam, được thành lập và chính thức đi vào hoạt động từ ngày 01/05/2005.. </p>
            <div className = "partner d-flex flex-row gap-3">
              {
                partner.map((i, index) => (
                  <img  src={i.url}  key={index}/>
                ))
              }
            </div>
            <Link className="d-flex justify-content-start mt-5" to="/">
            <button type="button" className="btn-custom">
              <h5 className="text-white mb-0">{t('See more', {ns: 'home'})}</h5>
            </button>
          </Link>
          </div>
        </div>
      </div>

    </div>
  );
};
