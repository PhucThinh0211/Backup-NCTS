import React from 'react';

import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { Banner } from './components/Banner';

import { bootstrapBreakpoints } from '@/common';
import { getBanners } from '@/store/publicCms';
import { useAppSelector } from '@/store/hooks';
import { useWindowSize } from '@/hooks/useWindowSize';
import './Banners.scss';

export const HeroSection = () => {
  const [innerWidth, innerHeight] = useWindowSize();
  const banners = useAppSelector(getBanners());

  const arrowsSettings = {
    arrows: innerWidth > bootstrapBreakpoints.xl,
    nextArrow: <RightOutlined />,
    prevArrow: <LeftOutlined />,
  };

  return (
    !!banners?.length && (
      <div style={{ minHeight: 50 }}>
        <Carousel
          autoplay
          autoplaySpeed={5000}
          dotPosition="bottom"
          dots={innerWidth < bootstrapBreakpoints.xl}
          style={{
            backgroundColor: '#f5f5f5',
          }}
          {...arrowsSettings}>
          {banners.map((banner) => (
            <Banner key={`banner-${banner.id}`} banner={banner} />
          ))}
        </Carousel>
      </div>
    )
  );
};
