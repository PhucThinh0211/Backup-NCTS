import { Button, Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const ContactForm = () => {
  const { t } = useTranslation();
  const [contactForm] = Form.useForm();

  return (
    <div
      className=" py-3 py-md-4 px-4 px-md-5 shadow-lg rounded-3 mx-auto"
      style={{ maxWidth: 676 }}>
      <Form layout="vertical" form={contactForm}>
        <p className="h4 text-orange mb-4">{t('Contact online', { ns: 'common' })}</p>
        <Form.Item
          name={'fullName'}
          label={t('Full name', { ns: 'common' })}
          rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={'address'}
          label={t('Address', { ns: 'common' })}
          rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'email'} label={t('Email', { ns: 'common' })} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'phone'} label={t('Phone', { ns: 'common' })} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={'description'}
          label={t('Message', { ns: 'common' })}
          required
          rules={[{ required: true }]}>
          <Input.TextArea rows={3} />
        </Form.Item>
        <div className="pt-3">
          <Button
            htmlType="submit"
            onClick={contactForm.submit}
            block
            size="large"
            type="default"
            className="border border-warning"
            icon={<i className="fa-solid fa-plane"></i>}>
            {t('Send info', { ns: 'common' })}
          </Button>
        </div>
      </Form>
    </div>
  );
};
