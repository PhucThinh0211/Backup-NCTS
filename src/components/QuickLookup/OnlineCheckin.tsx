import { Button, Form, Input, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { LookupButton } from './components/LookupButton';

export const OnlineCheckin = () => {
  const { t } = useTranslation(['common']);

  return (
    <div className='onlineCheckin'>
      <div className='d-flex justify-content-center container-md'>
        <div className='w-100'>
          <h5 className='pb-3'>
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
                <Col flex='auto'>
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
                <Col flex='140px'>
                  <div
                    className='verification w-100'
                    style={{
                      height: '40px',
                      borderRadius: 10,
                      alignContent: 'center',
                    }}
                  >
                    <img
                      src='https://ncts.hicas.vn/api/photo/dowload/7d2cc5be-d112-f84f-8c63-3a12926fd666.png'
                      alt=''
                    />
                  </div>
                </Col>
              </Row>
            </Form.Item>
            <div className='mt-2'>
              <LookupButton>{t('Log in', { ns: 'home' })}</LookupButton>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
