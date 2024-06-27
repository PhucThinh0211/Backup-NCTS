import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Segmented, Tabs } from 'antd';

import {
  GettingMediaLoadingKey,
  bootstrapBreakpoints,
  largePagingParams,
} from '@/common';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLanguage } from '@/store/persistState';
import {
  getDocumentList,
  getDocumentTypeList,
  getSelectedPageDetail,
  publicCmsActions,
} from '@/store/publicCms';
import { getLoading } from '@/store/loading';

import { ReportsTable } from './ReportsTable';

export const CorporateGovernance = () => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();
  const [innerWidth] = useWindowSize();
  const [activeDocumentTypeCode, setActiveDocumentTypeCode] =
    useState('BCQTCT');

  const isLoading = useAppSelector(getLoading(GettingMediaLoadingKey));
  const lang = useAppSelector(getLanguage());
  const documentList = useAppSelector(getDocumentList());
  const documentTypes = useAppSelector(getDocumentTypeList());
  const pageDetail = useAppSelector(getSelectedPageDetail());

  const foundDocumentType = documentTypes?.find(
    (documentType) => documentType.code === activeDocumentTypeCode
  );

  useEffect(() => {
    dispatch(
      publicCmsActions.getDocumentTypesRequest({ params: largePagingParams })
    );
  }, [lang]);

  useEffect(() => {
    if (pageDetail && foundDocumentType && activeDocumentTypeCode) {
      dispatch(
        publicCmsActions.getDocumentListRequest({
          params: {
            DocumentTypeId: foundDocumentType.id,
          },
        })
      );
    }
  }, [pageDetail, foundDocumentType, activeDocumentTypeCode]);

  const options = [
    {
      label: (
        <div className='py-2 py-md-3'>{t('Báo cáo quản trị công ty')}</div>
      ),
      value: 'BCQTCT',
    },
    {
      label: (
        <div className='py-2 py-md-3'>{t('Điều lệ, quy chế công ty')}</div>
      ),
      value: 'DLQCCT',
    },
  ];

  return (
    <div style={{ backgroundColor: '#80808008', flex: 1 }}>
      <div className='container py-2 py-md-5'>
        <div className='d-flex justify-content-center mb-4'>
          <p className='h3 text-orange'>{pageDetail?.title}</p>
        </div>
        <div>
          <Segmented
            options={options}
            block
            value={activeDocumentTypeCode}
            onChange={setActiveDocumentTypeCode}
          />
          <ReportsTable
            loading={isLoading}
            pagination={false}
            dataSource={documentList || []}
            showHeader={false}
          />
        </div>
      </div>
    </div>
  );
};
