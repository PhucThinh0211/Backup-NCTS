import { useEffect } from 'react';

import { Col, Row } from 'antd';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getNewsList, publicCmsActions } from '@/store/publicCms';

import { NewsPublicSection } from './components/NewsPublicSection';
import { NewsPublicSider } from './components/NewsPublicSider';

export const NewsPublic = () => {
  const dispatch = useAppDispatch();

  const news = useAppSelector(getNewsList());
  const mainActivityNews = (news?.items || []).filter(
    (item) => item.type === 'DHCD'
  );
  const customerNews = (news?.items || []).filter(
    (item) => item.type === 'Customer'
  );
  const recruimentNews = (news?.items || []).filter(
    (item) => item.type === 'Recruitment'
  );

  useEffect(() => {
    dispatch(publicCmsActions.getNewsListRequest({}));
  }, []);

  return (
    <div style={{ backgroundColor: '#80808008' }}>
      <div className='container py-2 py-md-5'>
        <Row gutter={[30, 10]}>
          <Col span={24} md={16} lg={18}>
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <NewsPublicSection
                  title={'Main activities'}
                  mainNews={mainActivityNews[0]}
                  newsList={mainActivityNews.slice(1)}
                />
              </Col>
              <Col span={24}>
                <NewsPublicSection
                  title={'Customer news'}
                  newsList={customerNews}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24} md={8} lg={6}>
            <NewsPublicSider newsList={recruimentNews.slice(0, 3)} />
          </Col>
        </Row>
      </div>
    </div>
  );
};
