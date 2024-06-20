import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  TimePicker,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { LookupButton } from './components/LookupButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  getClassList,
  getFreightEstimatePayload,
  webTrackActions,
} from '@/store/webTrack';
import { useEffect } from 'react';
import {
  bootstrapBreakpoints,
  dateFormat,
  EstimatingChargeLoadingKey,
  timeFormat,
} from '@/common';
import { getLoading } from '@/store/loading';
import { useWindowSize } from '@/hooks';
import { getCaptcha } from '@/store/publicCms';
import { CaptchaInput } from '../Captcha/CaptchaInput';
import { useNavigate } from 'react-router-dom';

export const FreightEstimate = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common']);
  const [innerWidth] = useWindowSize();
  const navigate = useNavigate();

  const captcha = useAppSelector(getCaptcha());
  const classList = useAppSelector(getClassList());
  const freightEstimatePayload = useAppSelector(getFreightEstimatePayload());
  const isEstimating = useAppSelector(getLoading(EstimatingChargeLoadingKey));

  useEffect(() => {
    dispatch(webTrackActions.getClassListRequest());
  }, []);

  const handleEstimate = (values: any) => {
    const tzOffset = new Date().getTimezoneOffset();
    const inputValues = {
      ...values,
      accepttime: values.accepttime.format(timeFormat),
      acceptdate: values.acceptdate.subtract(tzOffset, 'minutes').toISOString(),
      leavetime: values.leavetime.format(timeFormat),
      leavedate: values.leavedate.subtract(tzOffset, 'minutes').toISOString(),
      service: 'FCI',
      captchaId: captcha?.captchaId,
      captchaCode: values.verificationCode,
    };
    dispatch(webTrackActions.setFreightEstimatePayload(values));
    dispatch(
      webTrackActions.estimateFreightRequest({ input: inputValues, navigate })
    );
  };

  return (
    <div className=' container-md'>
      <Form
        layout='vertical'
        requiredMark
        autoComplete='off'
        initialValues={{
          domint: 'DOM',
          expimp: 'IMP',
          FCI: true,
          ...freightEstimatePayload,
        }}
        onFinish={handleEstimate}
      >
        <Row>
          <h5 style={{ color: '#FFB629' }}>{t('Estimate charge')}</h5>
        </Row>
        <Row gutter={[10, 0]}>
          <Col xs={10} sm={12} md={6} xxl={4}>
            <Form.Item
              label={t('Arrival Time')}
              name={'leavetime'}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TimePicker className='w-100' format={timeFormat} />
            </Form.Item>
          </Col>
          <Col xs={14} sm={12} md={6} xxl={4}>
            <Form.Item
              label={t('Arrival Date')}
              name={'leavedate'}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker className='w-100' format={dateFormat} />
            </Form.Item>
          </Col>
          <Col xs={10} sm={12} md={6} xxl={4}>
            <Form.Item
              label={t('Collection Time')}
              name={'accepttime'}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TimePicker className='w-100' format={timeFormat} />
            </Form.Item>
          </Col>
          <Col xs={14} sm={12} md={6} xxl={4}>
            <Form.Item
              label={t('Collection Date')}
              name={'acceptdate'}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker className='w-100' format={dateFormat} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} xxl={4}>
            <Form.Item
              label={t('Weight')}
              name={'weight'}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                controls={false}
                className='w-100'
                placeholder='Kg?'
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} xxl={4}>
            <Form.Item
              label={t('Kind of goods')}
              name={'class'}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                options={classList.map((classItem) => ({
                  label: classItem.name,
                  value: classItem.class,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[10, 0]}>
          <Col xs={24}>
            <Row gutter={[10, 0]}>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  name='domint'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value='DOM'>{t('Domestic', { ns: 'common' })}</Radio>
                    <Radio value='INT'>
                      {t('International', { ns: 'common' })}
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  name='expimp'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value='IMP'>{t('Inbound', { ns: 'common' })}</Radio>
                    <Radio value='EXP'>{t('Outbound', { ns: 'common' })}</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Row>
                  <Col>
                    <Form.Item name='FCI' valuePropName='checked'>
                      <Checkbox style={{ lineHeight: '32px' }}>
                        {t('Process items', { ns: 'common' })}
                      </Checkbox>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item name='STO' valuePropName='checked'>
                      <Checkbox value='STO' style={{ lineHeight: '32px' }}>
                        {t('Storage', { ns: 'common' })}
                      </Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={18}>
            <CaptchaInput />
          </Col>
          <Col span={24} md={4}>
            <div className='d-flex justify-content-center'>
              <Form.Item
                label={
                  innerWidth > bootstrapBreakpoints.md ? (
                    <p className='invisible m-0'>Button</p>
                  ) : undefined
                }
              >
                <LookupButton loading={isEstimating}>
                  {t('Lookup', { ns: 'common' })}
                </LookupButton>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
