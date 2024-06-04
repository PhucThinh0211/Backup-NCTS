import React, { ReactNode } from 'react';

import { uploadedPhotoUrl, dateTimeFormat } from '@/common';
import { NewsCard } from '@/components';
import { ContentResponse } from '@/services/ContentService';
import Utils from '@/utils';
import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import parse from 'node-html-parser';

interface NewsSectionProps {
  title: ReactNode;
  mainNews?: ContentResponse;
  newsList: ContentResponse[];
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
    desc: parse(news.description || ''),
  };
};

const cardStyle: React.CSSProperties = {
  margin: 0,
  borderRadius: 8,
  height: '100%',
  overflow: 'hidden',
};

export const NewsPublicSection = ({
  title,
  mainNews,
  newsList,
}: NewsSectionProps) => {
  const hasMainNews = !!mainNews;
  return (
    <div>
      <div>
        <p className='h5 text-orange mb-3'>{title}</p>
      </div>
      <div>
        <Row gutter={[16, 16]}>
          {hasMainNews && (
            <Col span={24} md={24} lg={16}>
              <NewsCard
                {...convertNewsResponseToNewsData(mainNews)}
                style={cardStyle}
              />
            </Col>
          )}
          {hasMainNews ? (
            <Col span={24} md={24} lg={8}>
              <Row gutter={[16, 16]}>
                {newsList.slice(0, 2).map((news) => (
                  <Col span={24} sm={12} md={12} lg={24}>
                    <NewsCard
                      {...convertNewsResponseToNewsData(news)}
                      style={cardStyle}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          ) : (
            <Col span={24}>
              <Row gutter={[16, 16]}>
                {newsList.slice(0, 6).map((news) => (
                  <Col span={24} sm={12} lg={8}>
                    <NewsCard
                      {...convertNewsResponseToNewsData(news)}
                      style={cardStyle}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
};
