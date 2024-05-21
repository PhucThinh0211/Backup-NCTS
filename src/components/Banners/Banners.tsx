import React from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { Banner } from './components/Banner';

import { bootstrapBreakpoints } from '@/common';
import { getBanners } from '@/store/publicCms';
import { useAppSelector } from '@/store/hooks';
import { useWindowSize } from '@/hooks/useWindowSize';
import './Banners.scss';

export const Banners = () => {
  const [innerWidth, innerHeight] = useWindowSize();
  const banners = useAppSelector(getBanners());

  const arrowsSettings = {
    arrows: innerWidth > bootstrapBreakpoints.xl,
    nextArrow: <RightOutlined />,
    prevArrow: <LeftOutlined />,
  };
  return (
    <div style={{ minHeight: 50 }}>
      {!!banners?.length && (
        <Carousel
          autoplay
          autoplaySpeed={5000}
          dotPosition='top'
          {...arrowsSettings}
        >
          {banners.map((banner) => (
            <Banner key={`banner-${banner.id}`} banner={banner} />
          ))}
        </Carousel>
      )}
    </div>
  );
};
