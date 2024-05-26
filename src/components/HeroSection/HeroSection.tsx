import React from 'react';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Banner } from './components/Banner';
import { getBanners } from '@/store/publicCms';
import { useAppSelector } from '@/store/hooks';
import './Banners.scss';
import { useWindowSize } from '@/hooks/useWindowSize';
import { bootstrapBreakpoints } from '@/common';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 9000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


export const HeroSection = () => {
  const banners = useAppSelector(getBanners());
  const [innerWidth] = useWindowSize();

  return (
    !!banners?.length && (
      <div style={{ minHeight: 50 }}>
        <Carousel
          swipeable={true}
          draggable={false}
          showDots={innerWidth <= bootstrapBreakpoints.md}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={banners.length > 1}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          // customTransition="all .5"
          transitionDuration={500}
          containerClass="hero-carousel-container"
          arrows={true}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          // deviceType={this.props.deviceType}
          dotListClass="hero-carousel-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {banners.map((banner) => (
            <Banner key={`banner-${banner.id}`} banner={banner} />
          ))}
        </Carousel>
      </div>
    )
  );
};
