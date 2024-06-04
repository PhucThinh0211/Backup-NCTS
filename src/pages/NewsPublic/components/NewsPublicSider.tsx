import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  FileSearchOutlined,
  BarChartOutlined,
  FileProtectOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';
import { ContentResponse } from '@/services/ContentService';
import { NewsCard } from '@/components';
import {
  uploadedPhotoUrl,
  dateTimeFormat,
  defaultPagingParams,
} from '@/common';
import Utils from '@/utils';
import dayjs from 'dayjs';
import parse from 'node-html-parser';
import '../NewsPublic.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { persistStateActions } from '@/store/persistState';
import { getLatestNewsList, publicCmsActions } from '@/store/publicCms';

const convertNewsResponseToNewsData = (news: ContentResponse) => {
  return {
    key: news.id,
    url: `/tin-tuc${news.url || ('/' + Utils.createSlug(news.title || ''))}`,
    img: uploadedPhotoUrl(news.photoUrl || ''),
    date: news.lastModificationTime
      ? dayjs(news.lastModificationTime).format(dateTimeFormat)
      : undefined,
    title: news.title || undefined,
    desc: parse(news.description || ''),
  };
};
const cardStyle: React.CSSProperties = {
  margin: 0,
  borderRadius: 8,
  height: '100%',
  overflow: 'hidden',
};

export const NewsPublicSider = () => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const latestNewsList = useAppSelector(getLatestNewsList());

  const items = [
    {
      key: 'online-check-in',
      label: t('Online check-in', { ns: 'common' }),
      icon: <FileProtectOutlined className='text-orange' />,
    },
    {
      key: 'lookup',
      label: t('Lookup information', { ns: 'common' }),
      icon: <FileSearchOutlined className='text-orange' />,
    },
    {
      key: 'estimate-charge',
      label: t('Estimate charge', { ns: 'common' }),
      icon: <BarChartOutlined className='text-orange' />,
    },
  ];

  const handleLookupClick = (key: string) => {
    dispatch(persistStateActions.setTabLookupActive(key));
    navigate('/', { state: { tab: key } });
  };

  useEffect(() => {
    dispatch(
      publicCmsActions.getLatestNewsListRequest({ params: defaultPagingParams })
    );
  }, []);

  return (
    <div>
      <div className='mb-2 mb-md-4'>
        <p className='h5 text-orange mb-3'>
          {t('Quick lookup', { ns: 'common' })}
        </p>
        <div className='d-flex flex-column gap-3'>
          {items.map((item) => (
            <div
              key={item.key}
              className='bg-white shadow-sm p-3 rounded-3 lookupItem'
              onClick={() => handleLookupClick(item.key)}
            >
              <div className='d-flex flex-row align-items-center gap-2'>
                {item.icon}
                <div className='d-flex flex-fill'>
                  <Typography.Text strong className='lookupName'>
                    {item.label}
                  </Typography.Text>
                </div>
                <div style={{ height: 32, minWidth: 32 }}>
                  <div className='w-100 h-100 border rounded-circle d-flex align-items-center justify-content-center lookupButton'>
                    <ArrowRightOutlined style={{ fontSize: 12 }} />
                  </div>
                  {/* <Button
                    className='rounded-circle'
                    icon={<ArrowRightOutlined style={{ fontSize: 12 }} />}
                  /> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {!!latestNewsList?.items?.length && (
        <div>
          <div>
            <p className='h5 text-orange mb-3'>
              {t('Latest news', { ns: 'common' })}
            </p>
          </div>
          <div>
            <Row gutter={[16, 16]}>
              {latestNewsList.items.slice(0, 3).map((news) => (
                <Col span={24}>
                  <NewsCard
                    {...convertNewsResponseToNewsData(news)}
                    style={cardStyle}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      )}
    </div>
  );
};
