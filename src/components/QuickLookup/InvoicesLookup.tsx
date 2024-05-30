import { Button, Col, Form, Input, Row, Space, Spin, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import { LookupButton } from './components/LookupButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCaptcha, publicCmsActions } from '@/store/publicCms';
import { GettingCaptchaLoadingKey } from '@/common';
import { getLoading } from '@/store/loading';

export const InvoicesLookup = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common']);
  const captcha = useAppSelector(getCaptcha());
  const fetchingCaptcha = useAppSelector(getLoading(GettingCaptchaLoadingKey));

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
        <Input />
      </Form.Item>
      {/* Verification codes */}
      <Form.Item
        label={t('Verification codes', { ns: 'common' })}
        name='verificationCode'
        required
        rules={[{ required: true }]}
      >
        <Row align='stretch'>
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
              <Spin size='small' style={{ width: 110 }} />
            ) : (
              <img
                // prettier-ignore
                src={captcha?.captchBase64Data ? `data:image/png;base64,${captcha?.captchBase64Data}` : ''}
                alt='captcha code'
                className='border rounded'
                style={{ height: 32 }}
              />
            )}
            <Tooltip title={t('Refresh captcha', { ns: 'common' })}>
              <Button
                onClick={refreshCaptcha}
                shape='circle'
                disabled={fetchingCaptcha}
              >
                <i className='fa-solid fa-rotate'></i>
              </Button>
            </Tooltip>
          </Space>
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
