import {
  largePagingParams,
  defaultPagingParams,
  bootstrapBreakpoints,
} from '@/common';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLanguage } from '@/store/persistState';
import {
  getInvestorNewsList,
  getNewsTypeList,
  getSelectedPageDetail,
  publicCmsActions,
} from '@/store/publicCms';
import { Divider, Tabs } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NewsPublicSection } from '../NewsPublic/components/NewsPublicSection';
import dayjs from 'dayjs';
import { useWindowSize } from '@/hooks/useWindowSize';

const newsTypeCode = 'DHCD';
const currentYear = dayjs().get('year');

export const SkateholderMeetings = () => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();
  const [innerWidth] = useWindowSize();

  const lang = useAppSelector(getLanguage());
  const news = useAppSelector(getInvestorNewsList());
  const newsTypes = useAppSelector(getNewsTypeList());
  const pageDetail = useAppSelector(getSelectedPageDetail());

  const foundNewsType = (newsTypes || []).find(
    (newsType) => newsType.code === newsTypeCode
  );

  useEffect(() => {
    dispatch(
      publicCmsActions.getNewsTypesRequest({ params: largePagingParams })
    );
  }, [lang]);

  useEffect(() => {
    if (pageDetail && foundNewsType) {
      dispatch(
        publicCmsActions.getInvestorNewsListRequest({
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
      <div className='container py-2 py-md-5  p-3 p-lg-5'>
        <div className='h5 text-orange'>{pageDetail?.title}</div>
        <Divider style={{ marginTop: 4 }} />
        {foundNewsType && (
          <>
            <Tabs
              tabPosition={
                innerWidth > bootstrapBreakpoints.sm ? 'left' : 'top'
              }
              items={new Array(6).fill(null).map((_, index) => {
                const year = currentYear - index;
                const newsByYear = (news?.items || []).filter(
                  (item) => dayjs(item.publishDate).get('year') === year
                );
                return {
                  label: `${year}`,
                  key: `${year}`,
                  children: <NewsPublicSection newsList={newsByYear || []} />,
                };
              })}
            />
          </>
        )}
      </div>
    </div>
  );
};
