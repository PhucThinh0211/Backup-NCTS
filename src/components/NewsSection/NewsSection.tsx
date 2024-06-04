import React, { useCallback, useEffect, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { parse } from 'node-html-parser';
import dayjs from 'dayjs';
import { Dropdown, Empty, Radio, RadioChangeEvent, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './NewsSection.scss';

import {
  GettingContentListLoadingKey,
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
import { NewsCard } from '@/components/NewsCard';
import { getLoading } from '@/store/loading';
import Utils from '@/utils';

const responsive = {
  desktopv1: {
    breakpoint: { max: 9000, min: 1900 },
    items: 5,
    slidesToSlide: 5,
    partialVisibilityGutter: 20,
  },
  desktopv2: {
    breakpoint: { max: 1900, min: 1600 },
    items: 4,
    slidesToSlide: 4,
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

export const NewsSection = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['home']);
  const [innerWidth] = useWindowSize();

  const lang = useAppSelector(getLanguage());
  const isNewsLoading = useAppSelector(getLoading(GettingContentListLoadingKey));
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

  const allNewsTypesOptions = useMemo(
    () => [breakingNewsType].concat(newsTypeOptions),
    [newsTypeOptions]
  );

  const selectedNewsType = useCallback(
    allNewsTypesOptions.find((type) => type.value === selectedNewsTypeId),
    [selectedNewsTypeId, allNewsTypesOptions]
  );

  const onChange = (e: RadioChangeEvent) => {
    dispatch(publicCmsActions.setSelectedNewsTypeId(e.target.value));
  };

  const selectBearkingNews = () => {
    dispatch(publicCmsActions.setSelectedNewsTypeId(undefined));
  }

  useEffect(() => {
    dispatch(
      publicCmsActions.getNewsTypesRequest({
        params: {
          ...defaultPagingParams
        },
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
    <section className="w-100 overflow-hidden pb-md-3">
      <div className=" px-3 px-lg-5">
        <SessionTitle title={t('News', { ns: 'home' })} titleLayer='NCTS' />
        <div className="d-flex justify-content-center">
          {innerWidth > bootstrapBreakpoints.sm ? (
            <Radio.Group
              options={allNewsTypesOptions}
              value={selectedNewsTypeId}
              optionType="button"
              buttonStyle="solid"
              onChange={onChange}
            />
          ) : (
            <Space className="w-100">
              <div
                className={`btn btn-sm text-light rounded-5 ${
                  selectedNewsTypeId ? 'bg-secondary' : 'bg-info active'
                }`}
                onClick={selectBearkingNews}
              >
                {t('Breaking News', { ns: 'home' })}
              </div>
              <Dropdown
                menu={{
                  items: allNewsTypesOptions.map((option) => ({
                    label: option.value ? option.label : t('More', { ns: 'common' }),
                    key: option.value || 'all',
                  })),
                  selectable: true,
                  selectedKeys: [selectedNewsTypeId || 'all'],
                  onSelect: ({ key }) => {
                    dispatch(
                      publicCmsActions.setSelectedNewsTypeId(key && key !== 'all' ? key : undefined)
                    );
                  },
                }}>
                <div
                  className={`btn btn-sm text-light rounded-5 ${
                    selectedNewsTypeId ? 'bg-info active' : 'bg-secondary'
                  }`}>
                  <Space>
                    {selectedNewsTypeId ? selectedNewsType?.label : t('More', { ns: 'common' })}
                    <DownOutlined />
                  </Space>
                </div>
              </Dropdown>
            </Space>
          )}
        </div>
      </div>
      <div className="my-2 slide-card">
        {isNewsLoading ? (
          <div className="w-100 d-flex mx-auto justify-content-center" style={{ height: 469 }}>
            <Carousel responsive={responsive}>
              {new Array(5).fill(null).map((_, index) => (
                <NewsCard loading key={index} url='#' />
              ))}
            </Carousel>
          </div>
        ) : !news?.items?.length ? (
          <div
            className="w-100 d-flex mx-auto justify-content-center align-items-center "
            style={{ height: 469 }}>
            <Empty />
          </div>
        ) : (
          <Carousel
            swipeable={true}
            draggable={false}
            showDots={innerWidth >= 768}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            // autoPlay={this.props.deviceType !== 'mobile' ? true : false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            // removeArrowOnDeviceType={['tablet', 'mobile']}
            // deviceType={this.props.deviceType}
            className="news-carousel"
            dotListClass="news-carousel-dot-list-style"
            itemClass="carousel-item-padding-40-px">
            {(news?.items || []).map((news, index) => (
              <NewsCard
                key={news.id}
                url={`/tin-tuc${news.url || ('/' + Utils.createSlug(news.title || ''))}`}
                img={uploadedPhotoUrl(news.photoUrl || '')}
                date={
                  news.lastModificationTime
                    ? dayjs(news.lastModificationTime).format(dateTimeFormat)
                    : undefined
                }
                title={news.title || undefined}
                desc={parse(news.description || '')}
              />
            ))}
          </Carousel>
        )}
      </div>
    </section>
  );
};
