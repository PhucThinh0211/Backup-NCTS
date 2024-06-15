import { AwbLookup } from '@/components/QuickLookup/AwbLookup';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { publicCmsActions } from '@/store/publicCms';
import { getLookupAwbResult, webTrackActions } from '@/store/webTrack';
import { Divider, Empty, Table } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const QuickLookupPage = () => {
  const { t } = useTranslation(['common']);
  const dispatch = useAppDispatch();
  const awbList = useAppSelector(getLookupAwbResult());

  useEffect(() => {
    dispatch(publicCmsActions.getCaptchaRequest());
    return () => {
      dispatch(webTrackActions.setLookupAwbResults(undefined));
    }
  }, []);

  const awbColumns = [
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
    },
  ];

  return (
    <div className="container-fluid py-3 py-md-5">
      <AwbLookup />
      <Divider />
      <div className="h6 mb-3">{t('Lookup results')}</div>
      {awbList?.length === 0 ? <Empty /> : <Table dataSource={awbList} columns={awbColumns} />}
    </div>
  );
};
