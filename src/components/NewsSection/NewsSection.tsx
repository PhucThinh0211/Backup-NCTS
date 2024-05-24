import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { parse } from 'node-html-parser';
import dayjs from 'dayjs';

import {
  Carousel,
  Dropdown,
  Empty,
  Radio,
  RadioChangeEvent,
  Space,
  Typography,
} from 'antd';
import { LeftOutlined, RightOutlined, DownOutlined } from '@ant-design/icons';

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
import { NewsCard } from '@/components/CarouselCard';
import { getLoading } from '@/store/loading';

export const NewsSection = () => {
  const newsResponsiveSettings = [
    {
      breakpoint: bootstrapBreakpoints.xxl,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: bootstrapBreakpoints.md,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 9999, // A very large number to ensure the last settings are always applied
      settings: {
        slidesToShow: 5,
      },
    },
  ];

  const dispatch = useAppDispatch();
  const { t } = useTranslation(['home']);
  const [innerWidth, innerHeight] = useWindowSize();

  const lang = useAppSelector(getLanguage());
  const isNewsLoading = useAppSelector(
    getLoading(GettingContentListLoadingKey)
  );
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
    <section style={{ maxWidth: '100%', overflow: 'hidden' }}>
      <div className=' px-3 px-lg-5'>
        <SessionTitle title={t('News', { ns: 'home' })} />
        <div className='d-flex justify-content-center'>
          {innerWidth > bootstrapBreakpoints.sm ? (
            <Radio.Group
              value={selectedNewsTypeId}
              buttonStyle='solid'
              onChange={onChange}
            >
              {allNewsTypesOptions.map((option) => (
                <Radio.Button value={option.value} key={option.value}>
                  {option.label}
                </Radio.Button>
              ))}
            </Radio.Group>
          ) : (
            <Dropdown
              menu={{
                items: allNewsTypesOptions.map((option) => ({
                  label: option.label,
                  key: option.value || 'all',
                })),
                selectable: true,
                selectedKeys: [selectedNewsTypeId || 'all'],
                onSelect: ({ key }) => {
                  dispatch(
                    publicCmsActions.setSelectedNewsTypeId(
                      key && key !== 'all' ? key : undefined
                    )
                  );
                },
              }}
            >
              <Typography.Text strong>
                <Space>
                  {selectedNewsType?.label}
                  <DownOutlined />
                </Space>
              </Typography.Text>
            </Dropdown>
          )}
        </div>
      </div>
      <div
        className='my-4 slide-card'
        style={{ maxWidth: 1600, marginInline: 'auto' }}
      >
        {isNewsLoading ? (
          <div className='w-100 d-flex mx-auto justify-content-center '>
            {new Array(3).fill(null).map((_, index) => (
              <NewsCard loading key={index} />
            ))}
          </div>
        ) : !news?.items?.length ? (
          <div
            className='w-100 d-flex mx-auto justify-content-center align-items-center '
            style={{ minHeight: 500 }}
          >
            <Empty />
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
};
