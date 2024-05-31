import { Button, Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const ContactForm = () => {
  const { t } = useTranslation();
  const [contactForm] = Form.useForm();
  return (
    <div
      className=' py-3 py-md-4 px-4 px-md-5 shadow-lg rounded-3 mx-auto'
      style={{ maxWidth: 676 }}
    >
      <Form layout='vertical' form={contactForm}>
        <p className='h4 text-orange mb-4'>{t('Contact online')}</p>
        <Form.Item
          name={'fullName'}
          label={t('Full name')}
          rules={[
            {
              required: true,
              message: t('Full name required'),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'email'}
          label={t('Email')}
          rules={[
            {
              required: true,
              message: t('Email required'),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'address'}
          label={t('Address')}
          rules={[
            {
              required: true,
              message: t('Address required'),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'phone'}
          label={t('Phone')}
          rules={[
            {
              required: true,
              message: t('Phone required'),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={'description'} label={t('Description')}>
          <Input.TextArea rows={3} />
        </Form.Item>
        <div className='pt-3'>
          <Button
            htmlType='submit'
            onClick={contactForm.submit}
            block
            type='primary'
          >
            {t('Send')}
          </Button>
        </div>
      </Form>
    </div>
  );
};
