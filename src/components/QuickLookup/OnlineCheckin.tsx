import { Form, Input, Col, Row, Space, Button, Tooltip, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

import { LookupButton } from './components/LookupButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCaptcha, publicCmsActions } from '@/store/publicCms';
import { GettingCaptchaLoadingKey } from '@/common';
import { getLoading } from '@/store/loading';

export const OnlineCheckin = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common']);
  const captcha = useAppSelector(getCaptcha());
  const fetchingCaptcha = useAppSelector(getLoading(GettingCaptchaLoadingKey));

  const refreshCaptcha = () => {
    dispatch(publicCmsActions.getCaptchaRequest());
  };

  return (
    <div className='onlineCheckin'>
      <div className='d-flex justify-content-center container-md'>
        <Form
          layout='vertical'
          autoComplete='off'
          className='col-12 col-md-7 col-lg-5 col-xl-4 col-xxl-3 w-100'
        >
          <p className='h6 text-orange'>
            {t('Please fill in your login information', { ns: 'common' })}
          </p>
          <Form.Item
            label={t('username', { ns: 'common' })}
            name='username'
            required
            rules={[{ required: true }]}
          >
            <Input
              placeholder={t('Enter user name', { ns: 'common' })}
            />
          </Form.Item>
          <Form.Item
            label={t('Password', { ns: 'common' })}
            name='password'
            required
            rules={[{ required: true }]}
          >
            <Input placeholder={t('Enter password', { ns: 'common' })} />
          </Form.Item>
          <Form.Item
            label={t('Verification codes', { ns: 'common' })}
            name='captchaCode'
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
          <div className='mt-2'>
            <LookupButton>{t('Sign In', { ns: 'common' })}</LookupButton>
          </div>
        </Form>
      </div>
    </div>
  );
};
