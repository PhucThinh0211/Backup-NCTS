import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  FileSearchOutlined,
  BarChartOutlined,
  FileProtectOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import { ContentResponse } from '@/services/ContentService';
import { NewsCard } from '@/components';
import { uploadedPhotoUrl, dateTimeFormat } from '@/common';
import Utils from '@/utils';
import dayjs from 'dayjs';

interface NewsPublicSiderProps {
  newsList?: ContentResponse[];
}
const convertNewsResponseToNewsData = (news: ContentResponse) => {
  return {
    key: news.id,
    url: `/tin-tuc${news.url || Utils.createSlug(news.title || '')}`,
    img: uploadedPhotoUrl(news.photoUrl || ''),
    date: news.lastModificationTime
      ? dayjs(news.lastModificationTime).format(dateTimeFormat)
      : undefined,
    title: news.title || undefined,
    // desc: parse(news.description || news.body || ''),
  };
};
const cardStyle: React.CSSProperties = {
  margin: 0,
  borderRadius: 8,
  height: '100%',
  overflow: 'hidden',
};

export const NewsPublicSider = ({ newsList }: NewsPublicSiderProps) => {
  const { t } = useTranslation(['common']);

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
  return (
    <div>
      <div className='mb-2 mb-md-4'>
        <p className='h4 text-orange mb-4'>Quick lookup</p>
        <div className='d-flex flex-column gap-3'>
          {items.map((item) => (
            <div key={item.key} className='bg-white shadow p-3 rounded-3'>
              <div className='d-flex flex-row align-items-center gap-2'>
                {item.icon}
                <div className='d-flex flex-fill'>
                  <Typography.Text strong>{item.label}</Typography.Text>
                </div>
                <div style={{ height: 32, width: 32 }}>
                  <Button
                    className='rounded-circle'
                    icon={<ArrowRightOutlined style={{ fontSize: 12 }} />}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {!!newsList?.length && (
        <div>
          <div>
            <p className='h4 text-orange mb-4'>{'Flash news'}</p>
          </div>
          <div>
            <Row gutter={[16, 16]}>
              {newsList.slice(0, 6).map((news) => (
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
