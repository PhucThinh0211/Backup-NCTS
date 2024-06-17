import { FlightLookup } from '@/components/QuickLookup/FlightLookup';
import { Divider } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const FlightLookupResult = () => {
  const { t } = useTranslation(['common']);
  return (
    <>
      <div
        className='mx-auto my-2'
        style={{
          maxWidth: 550,
          backgroundColor: 'white',
          borderRadius: 8,
          filter: 'drop-shadow(0 14px 30px rgba(0, 0, 0, .1))',
          padding: '25px 30px',
        }}
      >
        <FlightLookup />
      </div>
      <Divider />
      <div className='h6 mb-3'>{t('Lookup results')}</div>
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
    </>
  );
};
