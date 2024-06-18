import { Col, DatePicker, Form, Radio, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { LookupButton } from './components/LookupButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCaptcha } from '@/store/publicCms';
import {
  ALL_OPTIONS,
  GettingCarriersLoadingKey,
  defaultNctsPagingParams,
  lookupFlightLoadingKey,
} from '@/common';
import { getLoading } from '@/store/loading';
import { useEffect } from 'react';
import { getCarriers, webTrackActions } from '@/store/webTrack';
import { useNavigate } from 'react-router-dom';
import { CaptchaInput } from '../Captcha/CaptchaInput';

export const FlightLookup = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common']);
  const navigate = useNavigate();

  const carriers = useAppSelector(getCarriers());
  const fetchingCarriers = useAppSelector(
    getLoading(GettingCarriersLoadingKey)
  );
  const lookupLoading = useAppSelector(getLoading(lookupFlightLoadingKey));

  const options = [
    { label: t('Arrival', { ns: 'common' }), value: 'IMP' },
    { label: t('Departure', { ns: 'common' }), value: 'EXP' },
  ];

  useEffect(() => {
    dispatch(webTrackActions.getCarriersRequest({}));
  }, []);

  const handleLookup = (values: any) => {
    const lookupPayload = {
      ...values,
      ...defaultNctsPagingParams,
      FLIDATE: values.FLIDATE.format('YYYY-MM-DD'),
      CARRIER: values.CARRIER !== ALL_OPTIONS ? values.CARRIER : undefined,
    };
    dispatch(webTrackActions.setLookupFlightPayload(lookupPayload));
    dispatch(
      webTrackActions.lookupFlightRequest({
        lookupInput: lookupPayload,
        navigate,
      })
    );
  };

  return (
    <Form
      requiredMark
      layout='vertical'
      autoComplete='off'
      initialValues={{ FLIDATE: dayjs(), EXPIMP: 'IMP', CARRIER: ALL_OPTIONS }}
      onFinish={handleLookup}
    >
      <Row gutter={[8, 0]} className='flight-lookup'>
        <Col span={24}>
          <Form.Item
            label={t('Carrier', { ns: 'common' })}
            required
            rules={[{ required: true, message: t('Carrier required') }]}
            name={'CARRIER'}
          >
            <Select
              loading={fetchingCarriers}
              showSearch
              optionFilterProp='label'
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={[
                { label: t('All', { ns: 'common' }), value: ALL_OPTIONS },
                ...carriers.map((carrier) => ({
                  label: `${carrier.carrier}-${carrier.name}`,
                  value: carrier.carrier,
                })),
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={{ flex: 'auto' }} md={{ flex: 'auto' }}>
          <Row gutter={[8, 0]}>
            <Col span={24}>
              <Form.Item
                name='FLIDATE'
                label={t('Flight date', { ns: 'common' })}
                rules={[{ required: true }]}
              >
                <DatePicker className='w-100' allowClear={false} />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Form.Item name={'EXPIMP'}>
            <Radio.Group
              className=''
              options={options}
              optionType='button'
              buttonStyle='solid'
            />
          </Form.Item>
        </Col>
      </Row>
      {/* <CaptchaInput /> */}
      <Form.Item noStyle>
        <div className='w-100 align-self-end pt-1'>
          <LookupButton loading={lookupLoading}>
            {t('Lookup', { ns: 'common' })}
          </LookupButton>
        </div>
      </Form.Item>
    </Form>
  );
};
