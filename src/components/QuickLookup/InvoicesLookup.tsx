import { Button, Col, Form, Input, Row, Space, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import { LookupButton } from './components/LookupButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCaptcha, publicCmsActions } from '@/store/publicCms';

export const InvoicesLookup = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common']);
  const captcha = useAppSelector(getCaptcha());

  const refreshCaptcha = () => {
    dispatch(publicCmsActions.getCaptchaRequest());
  }

  return (
    <Form requiredMark layout='vertical' autoComplete='off'>
      <Form.Item
        label={t('E-invoice number', { ns: 'common' })}
        required
        rules={[{ required: true }]}
      >
        <Input
          style={{
            height: '40px',
            borderRadius: 10,
          }}
        />
      </Form.Item>
      {/* Verification codes */}
      <Form.Item label={t('Verification codes', { ns: 'common' })} required>
        <Row gutter={[10, 10]}>
          <Col flex='auto'>
            <Form.Item name='verificationCodes' rules={[{ required: true }]}>
              <Input
                style={{
                  height: '40px',
                  borderRadius: 10,
                }}
                placeholder={t('Enter verification codes', { ns: 'common' })}
              />
            </Form.Item>
          </Col>
          <Col flex='180px'>
            <div
              className='verification w-100'
              style={{
                height: '40px',
                borderRadius: 10,
                alignContent: 'center',
              }}
            >
              <Space>
                <img
                  src={`data:image/png;base64,${captcha?.captchBase64Data}`}
                  alt=''
                  className='border rounded'
                />
                <Tooltip title={t('Refresh captcha', {ns: 'common'})}>
                  <Button onClick={refreshCaptcha} shape='circle'>
                    <i className="fa-solid fa-rotate"></i>
                  </Button>
                </Tooltip>
              </Space>
            </div>
          </Col>
        </Row>
      </Form.Item>
      {/* Submit button */}
      <Form.Item noStyle>
        <div className='w-100 align-self-end pt-1'>
          <LookupButton>{t('Lookup', { ns: 'common' })}</LookupButton>
        </div>
      </Form.Item>
    </Form>
  );
};
