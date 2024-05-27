import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLanguage } from '@/store/persistState';
import { getServicePages, publicCmsActions } from '@/store/publicCms';
import SessionTitle from '@/components/SessionTitle/SessionTitle';
import { ServiceCard } from '@/components';
import logo from '@/assets/logo.png';
import { useWindowSize } from '@/hooks/useWindowSize';

const responsive = {
  desktopv1: {
    breakpoint: { max: 9000, min: 1900 },
    items: 3,
    slidesToSlide: 3,
    partialVisibilityGutter: 20,
  },
  desktopv2: {
    breakpoint: { max: 1900, min: 1600 },
    items: 3,
    slidesToSlide: 3,
    partialVisibilityGutter: 20,
  },
  desktopv3: {
    breakpoint: { max: 1600, min: 1200 },
    items: 3,
    slidesToSlide: 3,
    partialVisibilityGutter: 20,
  },
  desktopv4: {
    breakpoint: { max: 1200, min: 1024 },
    items: 3,
    slidesToSlide: 3,
    partialVisibilityGutter: 20,
  },
  tablet1: {
    breakpoint: { max: 1024, min: 992 },
    items: 3,
    slidesToSlide: 3,
    partialVisibilityGutter: 20,
  },
  tablet2: {
    breakpoint: { max: 992, min: 464 },
    items: 2,
    slidesToSlide: 2,
    partialVisibilityGutter: 20,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
    partialVisibilityGutter: 20,
  },
};

export const ServicesSection = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const services = useAppSelector(getServicePages());
  const lang = useAppSelector(getLanguage());
  const [innerWid] = useWindowSize();

  useEffect(() => {
    dispatch(publicCmsActions.getServicePagesRequest());
  }, [lang]);

  return (
    <div className="service-session py-2">
      <SessionTitle title={t('Quick Access', { ns: 'home' })} />
      <div className="container w-100 justify-content-evenly">
        <Carousel
          swipeable={true}
          draggable={false}
          showDots={innerWid <= 992}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={innerWid <= 992 ? true : false}
          autoPlaySpeed={4000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="services-carousel-container"
          arrows={false}
          removeArrowOnDeviceType={['tablet', 'mobile']}
          className="services-carousel"
          dotListClass="services-carousel-dot-list-style"
          itemClass="carousel-item-padding-40-px">
          {services.map((item) => (
            <ServiceCard
              key={item.id}
              img={item.photoUrl || logo}
              url={item.slug || '/'}
              title={item.title || ''}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};
