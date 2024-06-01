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
import { Divider } from 'antd';
import { SignUp } from '../SignUp';
import { ContactPage } from '../Contact';
import { NewsPublic } from '..';

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
      {pageDetail?.pageType === 'dynamic' && (
        <div className='container p-3 p-lg-5'>
          <div className='h5 text-orange'>{pageDetail.title}</div>
          <Divider style={{ marginTop: 4 }} />
          <div dangerouslySetInnerHTML={{ __html: pageDetail.content || '' }} />
        </div>
      )}
      {pageDetail?.pageType === 'video' && <div>Thư viện video</div>}
      {pageDetail?.pageType === 'photo' && <div>Thư viện video</div>}
      {pageDetail?.pageType === 'document' && <div>Thư viện document</div>}
      {pageDetail?.pageType === 'news' && <NewsPublic />}
      {pageDetail?.pageType === 'contact' && <ContactPage />}
      {pageDetail?.pageType === 'login' && <SignIn />}
      {pageDetail?.pageType === 'register' && <SignUp />}
    </>
  );
};
