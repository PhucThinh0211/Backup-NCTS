import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Divider, Empty, Table, TableColumnsType } from 'antd';

import { AwbLookup } from '@/components/QuickLookup/AwbLookup';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { publicCmsActions } from '@/store/publicCms';
import { getLookupAwbResult, webTrackActions } from '@/store/webTrack';
import Utils from '@/utils';
import { AwbResponse } from '@/services/WebTrackService';

export const AwbLookupResult = () => {
  const { t } = useTranslation(['common']);
  const windowSize = useWindowSize();
  const dispatch = useAppDispatch();
  const awbList = useAppSelector(getLookupAwbResult());

  useEffect(() => {
    dispatch(publicCmsActions.getCaptchaRequest());
    return () => {
      dispatch(webTrackActions.setLookupAwbResults(undefined));
    };
  }, []);

  const awbColumns: TableColumnsType<AwbResponse> = [
    {
      title: t('No'),
      dataIndex: 'id',
      key: 'id',
      render: (item: any, record: any, index: number) => <>{index + 1}</>,
    },
    {
      title: t('Flight no'),
      dataIndex: 'flightno',
      key: 'flightno',
    },
    {
      title: t('Flight date'),
      dataIndex: 'flidate',
      key: 'flidate',
      render: (value) => {
        return value ? (
          <>
            {Utils.convertISODateToLocalTime(value || '').toLocaleDateString(
              'vi'
            )}
          </>
        ) : (
          <></>
        );
      },
    },
    {
      title: t('Route'),
      dataIndex: 'route',
      key: 'route',
    },
    {
      title: t('Pieces'),
      dataIndex: 'pieces',
      key: 'pieces',
    },
    {
      title: t('Weight'),
      dataIndex: 'cweight',
      key: 'cweight',
    },
    {
      title: t('Nature'),
      dataIndex: 'nature',
      key: 'nature',
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: t('Remark'),
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: t('Shipper'),
      dataIndex: 'shipper',
      key: 'shipper',
    },
    {
      title: t('Consignee'),
      dataIndex: 'consignee',
      key: 'consignee',
    },
    {
      title: t('Customs status'),
      dataIndex: 'customs_status',
      key: 'customs_status',
      width: 300,
    },
  ];
  return (
    <>
      <div
        className='mx-auto my-2 px-3 py-2 px-md-4 py-md-3'
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, .1))',
          // padding: '25px 30px',
        }}
      >
        <AwbLookup />
      </div>
      <Divider />
      <div className='h6 mb-3'>{t('Lookup results')}</div>
      {awbList?.length === 0 ? (
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
      )}
    </>
  );
};
