import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { SEO, SignIn } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getActiveMenuKey, getLanguage } from '@/store/persistState';
import {
  getMenuList,
  getSelectedPageDetail,
  publicCmsActions,
} from '@/store/publicCms';
import { MenuResponse } from '@/services/MenuService';
import { Col, Divider, Row } from 'antd';
import { SignUp } from '../SignUp';
import { ContactPage } from '../Contact';
import { NewsPublic } from '..';
import { PageContentType } from '@/services/PageContentService';
import { NewsPublicSider } from '../NewsPublic/components/NewsPublicSider';
import {
  InvestorNews,
  AnnualReports,
  FinancialReports,
  SkateholderMeetings,
  CorporateGovernance,
} from '../InvestorRelations';
import { PhotoGallery } from '../PhotoGallery/PhotoGallery';

export const Content = () => {
  const dispatch = useAppDispatch();
  const activeMenuKey = useAppSelector(getActiveMenuKey());
  const menus = useAppSelector(getMenuList());
  const [currentMenu, setCurrentMenu] = useState<MenuResponse>();
  const location = useLocation();
  const pageDetail = useAppSelector(getSelectedPageDetail());
  const lang = useAppSelector(getLanguage());

  useEffect(() => {
    const activeMenu = menus?.find((x) => x.id === activeMenuKey);
    setCurrentMenu(activeMenu);
  }, [activeMenuKey, menus]);

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
    dispatch(publicCmsActions.getPageDetailBySlugRequest(location.pathname));
  }, [location, lang]);

  return (
    <>
      <SEO
        title={
          pageDetail?.seo?.title || pageDetail?.title || currentMenu?.label
        }
        description={pageDetail?.seo?.description || ''}
      />
      {!pageDetail && <div className='p-3 p-lg-5'>Không tìm thấy nội dung</div>}
      {pageDetail?.pageType === PageContentType.DYNAMIC && (
        <div className='container p-3 p-lg-5'>
          <Row gutter={[30, 10]}>
            <Col span={24} md={14} lg={16}>
              <div className='h5 text-orange'>{pageDetail.title}</div>
              <Divider style={{ marginTop: 4 }} />
              <div
                className='ck-content'
                dangerouslySetInnerHTML={{ __html: pageDetail.content || '' }}
              />
            </Col>
            <Col span={24} md={10} lg={8}>
              <NewsPublicSider />
            </Col>
          </Row>
        </div>
      )}
      {pageDetail?.pageType === PageContentType.VIDEO && <PhotoGallery />}
      {pageDetail?.pageType === PageContentType.PHOTO && <PhotoGallery />}
      {pageDetail?.pageType === PageContentType.DOCUMENT && (
        <div>Thư viện document</div>
      )}
      {pageDetail?.pageType === PageContentType.NEWS && <NewsPublic />}
      {pageDetail?.pageType === PageContentType.CONTACT && <ContactPage />}
      {pageDetail?.pageType === PageContentType.LOGIN && <SignIn />}
      {pageDetail?.pageType === PageContentType.REGISTER && <SignUp />}
      {pageDetail?.pageType === PageContentType.INVESTOR_NEWS && (
        <InvestorNews />
      )}
      {pageDetail?.pageType === PageContentType.SHAREHOLDER_MEETINGS && (
        <SkateholderMeetings />
      )}
      {pageDetail?.pageType === PageContentType.FINANCIAL_REPORTS && (
        <FinancialReports />
      )}
      {pageDetail?.pageType === PageContentType.ANNUAL_REPORTS && (
        <AnnualReports />
      )}
      {pageDetail?.pageType === PageContentType.CORPORATE_GOVERNANCE && (
        <CorporateGovernance />
      )}
    </>
  );
};
