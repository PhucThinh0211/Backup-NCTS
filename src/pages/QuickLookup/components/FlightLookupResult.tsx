import {
  Divider,
  Empty,
  PaginationProps,
  Table,
  TableColumnsType,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { FlightLookup } from '@/components/QuickLookup/FlightLookup';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  getLookupFlightPayload,
  getLookupFlightResult,
  webTrackActions,
} from '@/store/webTrack';
import { FlightLookupResponse } from '@/services/WebTrackService';
import { useWindowSize } from '@/hooks/useWindowSize';
import { defaultNctsPagingParams, lookupFlightLoadingKey } from '@/common';
import { getLoading } from '@/store/loading';

export const FlightLookupResult = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common']);
  const windowSize = useWindowSize();

  const flightsLookup = useAppSelector(getLookupFlightResult());
  const lookupFlightPayload = useAppSelector(getLookupFlightPayload());
  const isLookuping = useAppSelector(getLoading(lookupFlightLoadingKey));

  const columns: TableColumnsType<FlightLookupResponse> = [
    {
      title: t('No'),
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      width: 60,
      render: (_, __, index) => (
        <>
          {((lookupFlightPayload?.pageNumber ||
            defaultNctsPagingParams.pageNumber) -
            1) *
            (lookupFlightPayload?.pageSize ||
              defaultNctsPagingParams.pageSize) +
            (index + 1)}
        </>
      ),
    },
    {
      title: t('Flight no'),
      dataIndex: 'flightno',
      key: 'flightno',
    },
    {
      title: t('Route'),
      dataIndex: 'route',
      key: 'route',
    },
    {
      title: t('Aircraft'),
      dataIndex: 'aircraft',
      key: 'aircraft',
    },
    {
      title: t('ETD / ETA'),
      dataIndex: 'flitime',
      key: 'flitime',
    },
    {
      title: t('ATD / ATA'),
      dataIndex: 'attime',
      key: 'attime',
    },
  ];

  const onPagingChange: PaginationProps['onChange'] = (page, pageSize) => {
    const lookupPayload = {
      ...lookupFlightPayload,
      pageNumber: page,
    };
    dispatch(webTrackActions.setLookupFlightPayload(lookupPayload));
    dispatch(
      webTrackActions.lookupFlightRequest({
        lookupInput: lookupPayload,
      })
    );
  };

  return (
    <>
      <div
        className='mx-auto my-2 px-3 py-2 px-md-4 py-md-3'
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          filter: 'drop-shadow(0 14px 30px rgba(0, 0, 0, .1))',
        }}
      >
        <FlightLookup />
      </div>
      <Divider />
      <div className='container'>
        <div className='d-flex flex-row justify-content-between align-items-center mb-3'>
          <div className='h6 mb-0'>{t('Lookup results')}</div>
          {!!flightsLookup?.data?.length && (
            <div className='d-flex gap-2 align-items-center'>
              <div>
                <Typography.Text strong className={'me-3'}>
                  {t('Carrier')}
                </Typography.Text>
                {lookupFlightPayload?.CARRIER}
              </div>
              <Divider
                type='vertical'
                style={{ borderColor: 'rgba(5, 5, 5, 0.36' }}
              />
              <div>
                <Typography.Text strong className={'me-3'}>
                  {t('Date')}
                </Typography.Text>
                {lookupFlightPayload?.FLIDATE}
              </div>
            </div>
          )}
        </div>
        {flightsLookup?.data?.length === 0 ? (
          <Empty />
        ) : (
          <Table
            dataSource={flightsLookup?.data}
            columns={columns}
            rowKey={(record) => record.flightno + record.flidate}
            style={{ width: '100%' }}
            size='small'
            loading={isLookuping}
            scroll={{ x: 450, y: windowSize[1] - 310 }}
            pagination={{
              current: lookupFlightPayload?.pageNumber || 1,
              total: flightsLookup?.total,
              pageSize:
                lookupFlightPayload?.pageSize ||
                defaultNctsPagingParams.pageSize,
              showSizeChanger: false,
              onChange: onPagingChange,
            }}
          />
        )}
      </div>
    </>
  );
};
