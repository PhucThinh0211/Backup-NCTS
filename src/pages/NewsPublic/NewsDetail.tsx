import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Col, Divider, Row, Typography } from 'antd';

import { SEO } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLanguage } from '@/store/persistState';
import {
  getNewsTypeList,
  getSelectedNewsDetail,
  publicCmsActions,
} from '@/store/publicCms';
import { NewsPublicSider } from './components/NewsPublicSider';
import { ContentsPagingResponse } from '@/services/ContentService';
import { defaultPagingParams, largePagingParams } from '@/common';
import Utils from '@/utils';
import { PublicCmsService } from '@/services/PublicCmsService';
import { useTranslation } from 'react-i18next';

export const NewsDetail = () => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [relatedNews, setRelatedNews] = useState<ContentsPagingResponse>();

  const newsTypeList = useAppSelector(getNewsTypeList());
  const newsDetail = useAppSelector(getSelectedNewsDetail());
  const lang = useAppSelector(getLanguage());

  useEffect(() => {
    dispatch(
      publicCmsActions.getNewsTypesRequest({
        params: largePagingParams,
      })
    );
  }, [lang]);

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
    dispatch(publicCmsActions.getNewsDetailBySlugRequest(location.pathname));
  }, [location, lang]);

  useEffect(() => {
    const foundNewsType = (newsTypeList || []).find(
      (type) => type.code === newsDetail?.type
    );
    if (foundNewsType) {
      PublicCmsService.Get.getNewsList({
        search: {
          ...defaultPagingParams,
          NewsTypeId: foundNewsType.id,
        },
      }).subscribe(
        (res) => {
          setRelatedNews(res);
        },
        (err) => {
          Utils.errorHandling(err);
        }
      );
    }
  }, [newsDetail, newsTypeList]);

  return (
    <div className='container p-3 p-lg-5'>
      <SEO title={newsDetail?.title || ''} description='' />
      {!newsDetail && <div>Không tìm thấy nội dung</div>}
      <Row gutter={[50, 10]}>
        <Col span={24} lg={14}>
          {newsDetail && (
            <div className='h5 text-orange'>
              <div className='h5 text-orange'>{newsDetail.title}</div>
              <Divider style={{ marginBlock: 8 }} />
              <div className='d-flex flex-row gap-4 mb-4'>
                <div style={{ fontSize: 12 }} className=' text-black-50'>
                  <i className='fa-regular fa-clock me-1'></i>
                  {Utils.convertISODateToLocalTime(
                    newsDetail.publishDate || ''
                  ).toLocaleDateString('vi')}
                </div>
                <div style={{ fontSize: 12 }} className=' text-black-50'>
                  <i className='fa-solid fa-eye me-1'></i>
                  {`${newsDetail.viewsCount} views`}
                </div>
              </div>
              <div
                className='ck-content'
                dangerouslySetInnerHTML={{ __html: newsDetail.body || '' }}
              />
            </div>
          )}
          {relatedNews?.items?.length && (
            <>
              <Divider />
              <div>
                <div className='h6 text-orange'>{t('Related news')}</div>
                <ul>
                  {relatedNews.items
                    .filter((item) => item.id !== newsDetail?.id)
                    .map((item) => (
                      <li key={item.id} style={{ color: '#eca42e' }}>
                        <Link
                          to={`/tin-tuc${
                            item.url || '/' + Utils.createSlug(item.title || '')
                          }`}
                        >
                          <Typography.Link
                            style={{ fontSize: 12 }}
                            className='text-black-50 hover-text-orange'
                          >
                            {item.title}
                          </Typography.Link>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </>
          )}
        </Col>
        <Col span={24} lg={10}>
          <NewsPublicSider />
        </Col>
      </Row>
    </div>
  );
};
