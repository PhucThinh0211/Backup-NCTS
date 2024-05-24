import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { parse } from 'node-html-parser';
import dayjs from 'dayjs';

import { Carousel, Radio, RadioChangeEvent } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import {
  bootstrapBreakpoints,
  dateTimeFormat,
  defaultPagingParams,
  uploadedPhotoUrl,
} from '@/common';
import {
  getNewsList,
  getNewsTypeList,
  getSelectedNewsTypeId,
  publicCmsActions,
} from '@/store/publicCms';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useWindowSize } from '@/hooks/useWindowSize';
import SessionTitle from '@/components/SessionTitle/SessionTitle';
import { getLanguage } from '@/store/persistState';
import { NewsCard } from '@/components/CarouselCard';

export const NewsSection = () => {
  const newsResponsiveSettings = [
    {
      breakpoint: bootstrapBreakpoints.xxl,
      settings: {
        slidesToShow: 3,
        centerMode: true,
      },
    },
    {
      breakpoint: bootstrapBreakpoints.lg,
      settings: {
        slidesToShow: 2,
        centerMode: true,
      },
    },
    {
      breakpoint: bootstrapBreakpoints.md,
      settings: {
        slidesToShow: 1,
        centerMode: true,
      },
    },
    {
      breakpoint: bootstrapBreakpoints.sm,
      settings: {
        slidesToShow: 1,
        centerMode: true,
      },
    },
    {
      breakpoint: 9999, // A very large number to ensure the last settings are always applied
      settings: {
        slidesToShow: 4,
        centerMode: true,
      },
    },
  ];

  const dispatch = useAppDispatch();
  const { t } = useTranslation(['home']);
  const [innerWidth, innerHeight] = useWindowSize();

  const lang = useAppSelector(getLanguage());
  const news = useAppSelector(getNewsList());
  const newsTypes = useAppSelector(getNewsTypeList());
  const selectedNewsTypeId = useAppSelector(getSelectedNewsTypeId());

  const newsTypeOptions = [...(newsTypes?.items || [])]
    .sort((a, b) => a.sortSeq - b.sortSeq)
    .map((newsType) => ({
      label: newsType.name,
      value: newsType.id,
    }));
  const breakingNewsType: any = {
    value: undefined,
    label: t('Breaking News'),
  };

  const arrowsSettings = {
    arrows: true,
    nextArrow: <RightOutlined />,
    prevArrow: <LeftOutlined />,
  };

  const onChange = (e: RadioChangeEvent) => {
    dispatch(publicCmsActions.setSelectedNewsTypeId(e.target.value));
  };

  useEffect(() => {
    dispatch(
      publicCmsActions.getNewsTypesRequest({
        params: defaultPagingParams,
      })
    );
  }, [lang]);

  useEffect(() => {
    dispatch(
      publicCmsActions.getNewsListRequest({
        params: {
          ...defaultPagingParams,
          NewsTypeId: selectedNewsTypeId,
        },
      })
    );
  }, [lang, selectedNewsTypeId]);

  return (
    <section>
      <div className=' px-3 px-lg-5'>
        <SessionTitle title={t('News', { ns: 'home' })} />
        <div className='d-flex justify-content-center'>
          <Radio.Group
            value={selectedNewsTypeId}
            buttonStyle='solid'
            onChange={onChange}
          >
            {[breakingNewsType].concat(newsTypeOptions).map((option) => (
              <Radio.Button style={{ paddingInline: 40 }} value={option.value}>
                {option.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
      </div>
      <div className='my-4 slide-card'>
        <Carousel
          {...arrowsSettings}
          autoplay={false}
          infinite={true}
          autoplaySpeed={5000}
          responsive={newsResponsiveSettings}
        >
          {(news?.items || []).map((news, index) => (
            <NewsCard
              key={news.id}
              img={uploadedPhotoUrl(news.photoUrl || '')}
              date={
                news.lastModificationTime
                  ? dayjs(news.lastModificationTime).format(dateTimeFormat)
                  : undefined
              }
              title={news.title || undefined}
              desc={news.body ? parse(news.body) : undefined}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
};
