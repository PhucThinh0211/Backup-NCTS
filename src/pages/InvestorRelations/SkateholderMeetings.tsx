import {
  largePagingParams,
  defaultPagingParams,
  bootstrapBreakpoints,
  GettingContentListLoadingKey,
} from '@/common';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLanguage } from '@/store/persistState';
import {
  getInvestorNewsList,
  getInvestorNewsParams,
  getNewsTypeList,
  getSelectedPageDetail,
  publicCmsActions,
} from '@/store/publicCms';
import { Divider, Pagination, PaginationProps, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NewsPublicSection } from '../NewsPublic/components/NewsPublicSection';
import dayjs from 'dayjs';
import { useWindowSize } from '@/hooks/useWindowSize';
import { getLoading } from '@/store/loading';
import Utils from '@/utils';

const currentYear = dayjs().get('year');
const oldestYear = 2013;

export const SkateholderMeetings = () => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();
  const [innerWidth] = useWindowSize();
  const [activeYear, setActiveYear] = useState(currentYear);

  const isLoading = useAppSelector(getLoading(GettingContentListLoadingKey));
  const lang = useAppSelector(getLanguage());
  const news = useAppSelector(getInvestorNewsList());
  const newsParams = useAppSelector(getInvestorNewsParams());
  const newsTypes = useAppSelector(getNewsTypeList());
  const pageDetail = useAppSelector(getSelectedPageDetail());

  const newsTypeCode = pageDetail?.codeType;

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
            MaxResultCount: 12,
            NewsTypeId: foundNewsType.id,
            Year: activeYear,
          },
        })
      );
    }
  }, [pageDetail, foundNewsType, activeYear]);

  const showTotal: PaginationProps['showTotal'] = (total, range) =>
    t('PagingTotal', {
      range1: range[0],
      range2: range[1],
      total,
      ns: 'common',
    });

  const onPagingChange: PaginationProps['onChange'] = (page, pageSize) => {
    if (foundNewsType) {
      dispatch(
        publicCmsActions.getInvestorNewsListRequest({
          params: {
            SkipCount: (page - 1) * pageSize,
            MaxResultCount: pageSize,
            NewsTypeId: foundNewsType.id,
            Year: activeYear,
          },
        })
      );
    }
  };

  const paginationProps = {
    ...Utils.parseParamsToPagination(newsParams),
    total: news?.totalCount,
    onChange: onPagingChange,
    responsive: true,
    showTotal,
  };

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
              activeKey={activeYear.toString()}
              onChange={(activeKey) => setActiveYear(parseInt(activeKey))}
              items={new Array(currentYear - oldestYear + 1)
                .fill(null)
                .map((_, index) => {
                  const year = currentYear - index;
                  return {
                    label: `${year}`,
                    key: `${year}`,
                    children: (
                      <>
                        <NewsPublicSection
                          loading={isLoading}
                          newsList={news?.items || []}
                        />
                        {news && newsParams && (
                          <div className='w-100 d-flex justify-content-end py-2 pt-3'>
                            <Pagination {...paginationProps} />
                          </div>
                        )}
                      </>
                    ),
                  };
                })}
            />
          </>
        )}
      </div>
    </div>
  );
};
