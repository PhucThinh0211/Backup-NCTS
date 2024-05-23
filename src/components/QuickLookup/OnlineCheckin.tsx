import { Form, Input, Col, Row, Space, Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

import { LookupButton } from './components/LookupButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCaptcha, publicCmsActions } from '@/store/publicCms';

export const OnlineCheckin = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common']);
  const captcha = useAppSelector(getCaptcha());

  const refreshCaptcha = () => {
    dispatch(publicCmsActions.getCaptchaRequest());
  }

  return (
    <div className='onlineCheckin'>
      <div className='d-flex justify-content-center container-md'>
        <div className='w-100'>
          <h5 className=''>
            {t('Please fill in your login information', { ns: 'common' })}
          </h5>
          {/* Online Checkin Form */}
          <Form className='' layout='vertical' autoComplete='off'>
            <Form.Item
              label={t('Account', { ns: 'common' })}
              required
              rules={[{ required: true }]}
              style={{ display: '' }}
            >
              <Input
                style={{
                  height: '40px',
                  borderRadius: 10,
                }}
                placeholder={t('Enter account name', { ns: 'common' })}
              />
            </Form.Item>
            <Form.Item
              label={t('Password', { ns: 'common' })}
              required
              rules={[{ required: true }]}
              style={{ display: '' }}
            >
              <Input.Password
                type='password'
                style={{
                  height: '40px',
                  borderRadius: 10,
                }}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                placeholder={t('Enter password', { ns: 'common' })}
              />
            </Form.Item>
            {/* Verification codes */}
            <Form.Item
              label={t('Verification codes', { ns: 'common' })}
              required
              style={{
                display: 'inline-block',
                width: 'calc(100%)',
                marginBottom: 0,
              }}
            >
              <Row gutter={[10, 10]}>
                <Col flex='calc(100% - 180px)'>
                  <Form.Item
                    name='verificationCodes'
                    rules={[{ required: true }]}
                  >
                    <Input
                      style={{
                        height: '40px',
                        borderRadius: 10,
                      }}
                      placeholder={t('Enter verification codes', {
                        ns: 'common',
                      })}
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
            <div className='mt-2'>
              <LookupButton>{t('Sign In', { ns: 'common' })}</LookupButton>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
