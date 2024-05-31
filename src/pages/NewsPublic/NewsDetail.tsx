import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Divider } from 'antd';

import { SEO } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLanguage } from '@/store/persistState';
import { getSelectedNewsDetail, publicCmsActions } from '@/store/publicCms';


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
    <div className="container p-3 p-lg-5">
      <SEO title={newsDetail?.title || ''} description="" />
      {!newsDetail && <div>Không tìm thấy nội dung</div>}
      {newsDetail && (
        <div className="h5 text-orange">
          <Divider style={{ marginTop: 4 }}/>
          <div dangerouslySetInnerHTML={{ __html: newsDetail.body || '' }} />
        </div>
      )}
    </div>
  );
};
