import { useTranslation } from 'react-i18next';

import { Tabs, Table } from 'antd';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLanguage } from '@/store/persistState';
import {
  getDocumentList,
  getDocumentTypeList,
  getSelectedPageDetail,
  publicCmsActions,
} from '@/store/publicCms';
import dayjs from 'dayjs';
import { ReportsTable } from './ReportsTable';
import { useWindowSize } from '@/hooks/useWindowSize';
import {
  GettingMediaLoadingKey,
  bootstrapBreakpoints,
  largePagingParams,
} from '@/common';
import { useEffect, useState } from 'react';
import { getLoading } from '@/store/loading';

const currentYear = dayjs().get('year');
const oldestYear = 2013;

export const AnnualReports = () => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();
  const [innerWidth] = useWindowSize();
  const [activeYear, setActiveYear] = useState(currentYear);

  const isLoading = useAppSelector(getLoading(GettingMediaLoadingKey));
  const lang = useAppSelector(getLanguage());
  const documentList = useAppSelector(getDocumentList());
  const documentTypes = useAppSelector(getDocumentTypeList());
  const pageDetail = useAppSelector(getSelectedPageDetail());
  const documentTypeCode = pageDetail?.codeType;

  const foundDocumentType = documentTypes?.find(
    (documentType) => documentType.code === documentTypeCode
  );

  useEffect(() => {
    dispatch(
      publicCmsActions.getDocumentTypesRequest({ params: largePagingParams })
    );
  }, [lang]);

  useEffect(() => {
    if (pageDetail && foundDocumentType && activeYear) {
      dispatch(
        publicCmsActions.getDocumentListRequest({
          params: {
            DocumentTypeId: foundDocumentType.id,
            Year: activeYear,
          },
        })
      );
    }
  }, [pageDetail, foundDocumentType, activeYear]);

  return (
    <div style={{ backgroundColor: '#80808008' }}>
      <div className='container py-2 py-md-5'>
        <div className='d-flex justify-content-center mb-4'>
          <p className='h3 text-orange'>{pageDetail?.title}</p>
        </div>
        <Tabs
          tabPosition={innerWidth > bootstrapBreakpoints.md ? 'left' : 'top'}
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
                  <ReportsTable
                    dataSource={documentList || []}
                    loading={isLoading}
                    pagination={false}
                    bordered
                  />
                ),
              };
            })}
        />
      </div>
    </div>
  );
};
