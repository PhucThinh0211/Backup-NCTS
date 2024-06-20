import React from 'react';
import { useTranslation } from 'react-i18next';

import { Divider } from 'antd';
import { FreightEstimate } from '@/components/QuickLookup/FreightEstimate';
import { getFreightEstimateResult } from '@/store/webTrack';
import { useAppSelector } from '@/store/hooks';

export const EstimateChargePage = () => {
  const { t } = useTranslation(['common']);

  const estimateFreightResults = useAppSelector(getFreightEstimateResult());
  return (
    <div
      className='container py-2 px-2 px-md-3'
      style={{ backgroundColor: '#fefefe' }}
    >
      <div
        className='mx-auto my-2 px-3 py-2 px-md-4 py-md-3'
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, .1))',
          // padding: '25px 30px',
        }}
      >
        <FreightEstimate />
      </div>
      <Divider />
      <div className='h6 mb-3'>{t('Lookup results')}</div>
      {estimateFreightResults?.money}
      {/* {awbList?.length === 0 ? (
        <Empty />
      ) : (
        <Table
          dataSource={awbList}
          columns={awbColumns}
          rowKey={(record) => record.flightno + record.flidate}
          style={{ width: '100%' }}
          size='small'
          scroll={{ x: 1320, y: windowSize[1] - 310 }}
        />
      )} */}
    </div>
  );
};
