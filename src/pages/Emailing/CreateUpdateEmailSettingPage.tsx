import {
  GettingEmailSettingLoadingKey,
  SavingEmailSettingLoadingKey,
} from '@/common';
import { adminSettingActions, getEmailSetting } from '@/store/adminSetting';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import {
  Typography,
  Button,
  Form,
  Spin,
  Input,
  Checkbox,
  InputNumber,
  Row,
  Col,
} from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const CreateUpdateEmailSettingPage = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { t } = useTranslation(['common', 'adminSetting']);

  const isSubmmiting = useAppSelector(
    getLoading([SavingEmailSettingLoadingKey, GettingEmailSettingLoadingKey])
  );
  const isLoading = useAppSelector(getLoading([GettingEmailSettingLoadingKey]));
  const emailSetting = useAppSelector(getEmailSetting());

  useEffect(() => {
    dispatch(adminSettingActions.getEmailSettingRequest({}));
  }, []);

  useEffect(() => {
    if (emailSetting) {
      form.setFieldsValue({
        ...emailSetting,
      });
    } else {
      form.setFieldsValue({
        smtpEnableSsl: false,
        smtpUseDefaultCredentials: true,
      });
    }
  }, [emailSetting]);

  const handleSaveEmailSetting = (values: any) => {
    dispatch(adminSettingActions.createEmailSettingRequest({ input: values }));
  };

  return (
    <div className='p-4'>
      <div className='d-flex flex-row justify-content-between align-items-center mb-2'>
        <div>
          <Typography.Title level={4}>
            {t('Emailing', { ns: 'leftPanel' })}
          </Typography.Title>
        </div>
        <div>
          <Button type='primary' loading={isSubmmiting} onClick={form.submit}>
            {t('OkText', { ns: 'common' })}
          </Button>
        </div>
      </div>
      <Form
        form={form}
        layout='vertical'
        onFinish={handleSaveEmailSetting}
        autoComplete='off'
        autoCorrect='off'
      >
        <Spin spinning={isLoading}>
          <div className='w-full border-b rounded-2 bg-white p-3 shadow-sm'>
            <Form.Item
              label={t('Default from display name', { ns: 'adminSetting' })}
              name='defaultFromDisplayName'
              rules={[
                {
                  required: true,
                  message: t('Default from display name required', {
                    ns: 'adminSetting',
                  }),
                },
                {
                  min: 1,
                  max: 1024,
                  message: t('StringRange', {
                    ns: 'common',
                    range1: 1,
                    range2: 1024,
                  }),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t('Default from address', { ns: 'adminSetting' })}
              name='defaultFromAddress'
              rules={[
                {
                  required: true,
                  message: t('Default from address required', {
                    ns: 'adminSetting',
                  }),
                },
                {
                  min: 1,
                  max: 1024,
                  message: t('StringRange', {
                    ns: 'common',
                    range1: 1,
                    range2: 1024,
                  }),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Row gutter={[10, 10]}>
              <Col span={24} md={16}>
                <Form.Item
                  label={t('Host', { ns: 'adminSetting' })}
                  name='smtpHost'
                  rules={[
                    {
                      max: 256,
                      message: t('StringRange', {
                        ns: 'common',
                        range1: 0,
                        range2: 256,
                      }),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24} md={8}>
                <Form.Item
                  label={t('Port', { ns: 'adminSetting' })}
                  name='smtpPort'
                >
                  <InputNumber
                    controls={false}
                    min={1}
                    max={65535}
                    className='w-100'
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[10, 10]}>
              <Col span={24} md={12}>
                <Form.Item
                  label={t('Username', { ns: 'adminSetting' })}
                  name='smtpUserName'
                  rules={[
                    {
                      max: 1024,
                      message: t('StringRange', {
                        ns: 'common',
                        range1: 0,
                        range2: 1024,
                      }),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Form.Item
                  label={t('Password', { ns: 'adminSetting' })}
                  name='smtpPassword'
                  rules={[
                    {
                      max: 1024,
                      message: t('StringRange', {
                        ns: 'common',
                        range1: 0,
                        range2: 1024,
                      }),
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label={t('Domain', { ns: 'adminSetting' })}
              name='smtpDomain'
              rules={[
                {
                  max: 1024,
                  message: t('StringRange', {
                    ns: 'common',
                    range1: 0,
                    range2: 1024,
                  }),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name={'smtpEnableSsl'} valuePropName='checked'>
              <Checkbox>{t('Enable ssl', { ns: 'adminSetting' })}</Checkbox>
            </Form.Item>
            <Form.Item
              name={'smtpUseDefaultCredentials'}
              valuePropName='checked'
            >
              <Checkbox>
                {t('Use default credentials', { ns: 'adminSetting' })}
              </Checkbox>
            </Form.Item>
          </div>
        </Spin>
      </Form>
    </div>
  );
};
