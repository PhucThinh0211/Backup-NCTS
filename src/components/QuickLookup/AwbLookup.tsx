import { Button, Col, Form, Input, Row, Space, Spin, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import { LookupButton } from './components/LookupButton';
import { getCaptcha, publicCmsActions } from '@/store/publicCms';
import { GettingCaptchaLoadingKey, lookupAwbLoadingKey } from '@/common';
import { webTrackActions } from '@/store/webTrack';

export const AwbLookup = () => {
  const { t } = useTranslation(['common']);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const captcha = useAppSelector(getCaptcha());
  const fetchingCaptcha = useAppSelector(getLoading(GettingCaptchaLoadingKey));
  const lookupLoading = useAppSelector(getLoading(lookupAwbLoadingKey));

  const handleLookup = (values: any) => {
    const lookupPayload = {
      AWB_NO: `${values.awbPfx}${values.awbNum}`,
      CaptchaId: captcha?.captchaId,
      CaptchaCode: values.verificationCode,
    };
    dispatch(webTrackActions.lookupAwbRequest({ lookupInput: lookupPayload, navigate }));
  };

  const refreshCaptcha = () => {
    dispatch(publicCmsActions.getCaptchaRequest());
  };

  return (
    <Form
      requiredMark
      layout="vertical"
      autoComplete="off"
      onFinish={handleLookup}
      className="w-100">
      <Form.Item className="d-flex flex-column ">
        <Form.Item label={t('AWB number', { ns: 'common' })} required>
          <Row gutter={[10, 10]}>
            <Col span={24} sm={8}>
              <Form.Item
                name="awbPfx"
                rules={[
                  { required: true },
                  {
                    pattern: /^[\d]{0,3}$/,
                    message: 'Value must be 3 numbers',
                  },
                ]}>
                <Input placeholder="Prefix" />
              </Form.Item>
            </Col>
            <Col span={24} sm={16}>
              <Form.Item
                name="awbNum"
                rules={[
                  { required: true },
                  {
                    pattern: /^[\d]{0,8}$/,
                    message: 'Value must be 8 numbers',
                  },
                ]}>
                <Input placeholder="AWB#" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Form.Item>
      <Form.Item
        label={t('Verification codes', { ns: 'common' })}
        name="verificationCode"
        required
        rules={[{ required: true }]}>
        <Row align="stretch">
          <div style={{ flex: 1, marginRight: 8 }}>
            <Form.Item>
              <Input
                placeholder={t('Enter verification codes', {
                  ns: 'common',
                })}
              />
            </Form.Item>
          </div>
          <Space>
            {fetchingCaptcha ? (
              <Spin size="small" style={{ width: 110 }} />
            ) : (
              <img
                // prettier-ignore
                src={captcha?.captchBase64Data ? `data:image/png;base64,${captcha?.captchBase64Data}` : ''}
                alt="captcha code"
                className="border rounded"
                style={{ height: 32 }}
              />
            )}
            <Tooltip title={t('Refresh captcha', { ns: 'common' })}>
              <Button onClick={refreshCaptcha} shape="circle" disabled={fetchingCaptcha}>
                <i className="fa-solid fa-rotate"></i>
              </Button>
            </Tooltip>
          </Space>
        </Row>
      </Form.Item>
      <Form.Item noStyle>
        <div className="w-100 align-self-end pt-1">
          <LookupButton loading={lookupLoading}>{t('Lookup', { ns: 'common' })}</LookupButton>
        </div>
      </Form.Item>
    </Form>
  );
};
