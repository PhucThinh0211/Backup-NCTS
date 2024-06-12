import { useTranslation } from 'react-i18next';

import { Tabs, Table } from 'antd';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLanguage } from '@/store/persistState';
import { getSelectedPageDetail } from '@/store/publicCms';
import dayjs from 'dayjs';
import { ReportsTable } from './ReportsTable';
import { useWindowSize } from '@/hooks/useWindowSize';
import { bootstrapBreakpoints } from '@/common';

const currentYear = dayjs().get('year');

export const AnnualReports = () => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();
  const [innerWidth] = useWindowSize();

  const lang = useAppSelector(getLanguage());
  const pageDetail = useAppSelector(getSelectedPageDetail());

  return (
    <div style={{ backgroundColor: '#80808008' }}>
      <div className='container py-2 py-md-5'>
        <div className='d-flex justify-content-center mb-4'>
          <p className='h3 text-orange'>{pageDetail?.title}</p>
        </div>
        <Tabs
          tabPosition={innerWidth > bootstrapBreakpoints.md ? 'left' : 'top'}
          items={new Array(6).fill(null).map((_, index) => {
            const year = currentYear - index;
            return {
              label: `${year}`,
              key: `${year}`,
              children: <ReportsTable />,
            };
          })}
        />
      </div>
    </div>
  );
};
