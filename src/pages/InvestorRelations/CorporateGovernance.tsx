import { useWindowSize } from '@/hooks/useWindowSize';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLanguage } from '@/store/persistState';
import { getSelectedPageDetail } from '@/store/publicCms';
import { Segmented, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReportsTable } from './ReportsTable';

export const CorporateGovernance = () => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();
  const [innerWidth] = useWindowSize();

  const lang = useAppSelector(getLanguage());
  const pageDetail = useAppSelector(getSelectedPageDetail());

  const options = [
    {
      label: (
        <div className='py-2 py-md-3'>{t('Báo cáo quản trị công ty')}</div>
      ),
      value: 'corporateReports',
    },
    {
      label: (
        <div className='py-2 py-md-3'>{t('Điều lệ, quy chế công ty')}</div>
      ),
      value: 'regulations',
    },
  ];

  return (
    <div style={{ backgroundColor: '#80808008' }}>
      <div className='container py-2 py-md-5'>
        <div className='d-flex justify-content-center mb-4'>
          <p className='h3 text-orange'>{pageDetail?.title}</p>
        </div>
        <div>
          <Segmented options={options} block />
          <ReportsTable dataSource={[]} />
        </div>
      </div>
    </div>
  );
};
