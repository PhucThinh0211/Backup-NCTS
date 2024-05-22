import { Button, Form, Input, Radio, RadioChangeEvent } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

export const OnlineCheckin = () => {
  const { t } = useTranslation(['common']);

  const [value, setValue] = useState(1);

  const handleOnChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <div className='onlineCheckin'>
      <div className='d-flex justify-content-center container-md'>
        <div className='w-100'>
          {/* Radio otions */}
          {/* <Radio.Group
            value={value}
            onChange={handleOnChange}
            className="d-flex justify-content-start mb-3 gap-5"
          >
            <Radio value={1}>
              <span style={{ fontWeight: value === 1 ? 600 : "normal" }}>
                {t("Online delivery procedures", { ns: "common" })}
              </span>
            </Radio>
            <Radio value={2}>
              <span style={{ fontWeight: value === 2 ? 600 : "normal" }}>
                {t("Declare export goods information", { ns: "common" })}
              </span>
            </Radio>
          </Radio.Group> */}
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
              <Form.Item
                name={t('Verification codes', { ns: 'common' })}
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(70% - 4px)' }}
              >
                <Input
                  style={{
                    height: '40px',
                    borderRadius: 10,
                  }}
                  placeholder={t('Enter verification codes', { ns: 'common' })}
                />
              </Form.Item>
              <div
                className='verification'
                style={{
                  display: 'inline-block',
                  height: '40px',
                  width: 'calc(30% - 4px)',
                  borderRadius: 10,
                  alignContent: 'center',
                  marginLeft: 8,
                }}
              >
                <img
                  src='https://sit.ntcs.hicas.vn/api/photo/dowload/64bbc359-c083-cdce-83aa-3a128d8ed489.png'
                  alt=''
                />
              </div>
            </Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              style={{
                fontWeight: 600,
                fontSize: '18px',
                height: '48px',
                width: 'calc(100%)',
                borderRadius: 20,
              }}
            >
              {t('Log in', { ns: 'home' })}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
