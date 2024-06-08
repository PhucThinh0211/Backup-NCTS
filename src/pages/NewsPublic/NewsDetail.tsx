import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Divider, Row } from 'antd';

import { SEO } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLanguage } from '@/store/persistState';
import { getSelectedNewsDetail, publicCmsActions } from '@/store/publicCms';
import { NewsPublicSider } from './components/NewsPublicSider';

export const NewsDetail = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const newsDetail = useAppSelector(getSelectedNewsDetail());
  const lang = useAppSelector(getLanguage());

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
    dispatch(publicCmsActions.getNewsDetailBySlugRequest(location.pathname));
  }, [location, lang]);

  return (
    <div className='container p-3 p-lg-5'>
      <SEO title={newsDetail?.title || ''} description='' />
      {!newsDetail && <div>Không tìm thấy nội dung</div>}
      <Row gutter={[30, 10]}>
        <Col span={24} lg={14}>
          {newsDetail && (
            <div className='h5 text-orange'>
              <div className='h5 text-orange'>{newsDetail.title}</div>
              <Divider style={{ marginTop: 4 }} />
              <div
                className='ck-content'
                dangerouslySetInnerHTML={{ __html: newsDetail.body || '' }}
              />
            </div>
          )}
        </Col>
        <Col span={24} lg={10}>
          <NewsPublicSider />
        </Col>
      </Row>
    </div>
  );
};
