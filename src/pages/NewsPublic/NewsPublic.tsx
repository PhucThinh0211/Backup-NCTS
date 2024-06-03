import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Col, Row } from 'antd';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  getNewsList,
  getNewsTypeList,
  getSelectedPageDetail,
  publicCmsActions,
} from '@/store/publicCms';

import { NewsPublicSection } from './components/NewsPublicSection';
import { NewsPublicSider } from './components/NewsPublicSider';
import { defaultPagingParams, largePagingParams } from '@/common';
import { getLanguage } from '@/store/persistState';

export const NewsPublic = () => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();

  const lang = useAppSelector(getLanguage());
  const news = useAppSelector(getNewsList());
  const newsTypes = useAppSelector(getNewsTypeList());
  const pageDetail = useAppSelector(getSelectedPageDetail());
  const foundNewsType = (newsTypes?.items || []).find(
    (newsType) => newsType.code === pageDetail?.codeType
  );

  useEffect(() => {
    dispatch(
      publicCmsActions.getNewsTypesRequest({ params: largePagingParams })
    );
  }, [lang]);

  useEffect(() => {
    if (pageDetail && foundNewsType) {
      dispatch(
        publicCmsActions.getNewsListRequest({
          params: {
            ...defaultPagingParams,
            NewsTypeId: foundNewsType.id,
          },
        })
      );
    }
  }, [pageDetail, foundNewsType]);

  return (
    <div style={{ backgroundColor: '#80808008' }}>
      <div className='container py-2 py-md-5'>
        <Row gutter={[30, 10]}>
          <Col span={24} md={16} lg={18}>
            {foundNewsType && (
              <NewsPublicSection
                title={foundNewsType.name}
                newsList={news?.items || []}
              />
            )}
          </Col>
          <Col span={24} md={8} lg={6}>
            <NewsPublicSider />
          </Col>
        </Row>
      </div>
    </div>
  );
};
