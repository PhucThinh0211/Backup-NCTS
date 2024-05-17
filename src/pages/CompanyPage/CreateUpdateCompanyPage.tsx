import { useEffect } from 'react';

import { Button, Col, Form, Input, Row, Spin, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import {
  companyActions,
  getCompanies,
  getCompanyPhotoUrl,
  getSelectedCompanyDetail,
} from '@/store/company';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import { GettingCompanyLoadingKey, SavingCompanyLoadingKey } from '@/common';
import { getLocale } from '@/store/persistState';
import { AuditedCompany } from './AuditedCompany';
import { PhotoUploader } from '@/components/Uploader/PhotoUploader';

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const CreateUpdateCompanyPage = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation(['common', 'company', 'leftPanel']);
  const dispatch = useAppDispatch();

  const locale = useAppSelector(getLocale());
  const companies = useAppSelector(getCompanies());
  const selectedCompanyDetail = useAppSelector(getSelectedCompanyDetail());
  const companyPhotoUrl = useAppSelector(getCompanyPhotoUrl());
  const isSubmmiting = useAppSelector(getLoading(SavingCompanyLoadingKey));
  const isLoading = useAppSelector(getLoading(GettingCompanyLoadingKey));

  const currentCompany = companies?.items[0];

  useEffect(() => {
    if (locale && currentCompany) {
      dispatch(
        companyActions.getCompanyRequest({ companyId: currentCompany.id })
      );
    }
  }, [locale, currentCompany]);

  useEffect(() => {
    if (selectedCompanyDetail) {
      form.setFieldsValue(selectedCompanyDetail);
    } else {
      form.resetFields();
    }
  }, [selectedCompanyDetail]);

  const handleSaveCompany = (values: any) => {
    const inputData = {
      ...values,
      logoUrl: companyPhotoUrl,
    };
    if (currentCompany) {
      // prettier-ignore
      dispatch(companyActions.updateCompanyRequest({ companyId: currentCompany.id, company: { ...currentCompany, ...inputData }}));
      return;
    }
    dispatch(companyActions.createCompanyRequest({ company: inputData }));
  };

  const onImageDelete = () => {
    form.setFieldsValue({ upload: undefined });
    dispatch(companyActions.setCompanyPhotoUrl(undefined));
  };

  return (
    <div className='p-4'>
      <div className='d-flex flex-row justify-content-between align-items-center'>
        <div>
          <Typography.Title level={4}>
            {t('Company', { ns: 'leftPanel' })}
          </Typography.Title>
        </div>
        <div>
          <Button type='primary' loading={isSubmmiting} onClick={form.submit}>
            {t('OkText', { ns: 'common' })}
          </Button>
        </div>
      </div>
      <Form form={form} layout='vertical' onFinish={handleSaveCompany}>
        <Spin spinning={isLoading}>
          <Row gutter={[10, 10]} className='mt-2'>
            <Col xs={24} md={24} lg={16}>
              <div className='w-full border-b rounded-2 bg-white p-3 shadow-sm'>
                <Form.Item
                  name='upload'
                  label={t('Logo', { ns: 'banner' })}
                  valuePropName='fileList'
                  getValueFromEvent={normFile}
                  rules={[
                    {
                      required: !companyPhotoUrl,
                      message: t('Photo required', { ns: 'banner' }),
                    },
                  ]}
                >
                  <PhotoUploader 
                    onPhotoUrlChange={(url) => 
                      dispatch(companyActions.setCompanyPhotoUrl(url))
                    } 
                    photoUrl={companyPhotoUrl} 
                    onImageDelete={onImageDelete} 
                  />
                </Form.Item>
                <Form.Item
                  label={t('Name', { ns: 'company' })}
                  name='name'
                  rules={[
                    { required: true, message: t('Name required') },
                    {
                      max: 500,
                      min: 0,
                      message: t('StringRange', {
                        ns: 'common',
                        range1: 0,
                        range2: 500,
                      }),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={t('Business code', { ns: 'company' })}
                  name='businessCode'
                  rules={[
                    { required: true, message: t('Business code required') },
                    {
                      max: 20,
                      min: 0,
                      message: t('StringRange', {
                        ns: 'common',
                        range1: 0,
                        range2: 20,
                      }),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={t('Address', { ns: 'company' })}
                  name='address'
                  rules={[
                    { required: true, message: t('Address required') },
                    {
                      max: 1000,
                      min: 0,
                      message: t('StringRange', {
                        ns: 'common',
                        range1: 0,
                        range2: 1000,
                      }),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={t('Information Registered', { ns: 'company' })}
                  name='infoRegistered'
                  rules={[
                    {
                      max: 200,
                      min: 0,
                      message: t('StringRange', {
                        ns: 'common',
                        range1: 0,
                        range2: 200,
                      }),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Row gutter={[10, 10]}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={t('Phone', { ns: 'company' })}
                      name='phone'
                      rules={[
                        {
                          max: 200,
                          min: 0,
                          message: t('StringRange', {
                            ns: 'common',
                            range1: 0,
                            range2: 200,
                          }),
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={t('Fax', { ns: 'company' })}
                      name='fax'
                      rules={[
                        {
                          max: 200,
                          min: 0,
                          message: t('StringRange', {
                            ns: 'common',
                            range1: 0,
                            range2: 200,
                          }),
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[10, 10]}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={t('Sita', { ns: 'company' })}
                      name='sita'
                      rules={[
                        {
                          max: 200,
                          min: 0,
                          message: t('StringRange', {
                            ns: 'common',
                            range1: 0,
                            range2: 200,
                          }),
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={t('Email', { ns: 'company' })}
                      name='email'
                      rules={[
                        {
                          max: 200,
                          min: 0,
                          message: t('StringRange', {
                            ns: 'common',
                            range1: 0,
                            range2: 200,
                          }),
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label={t('Bank name', { ns: 'company' })}
                  name='bankName'
                  rules={[
                    {
                      max: 500,
                      min: 0,
                      message: t('StringRange', {
                        ns: 'common',
                        range1: 0,
                        range2: 500,
                      }),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={t('Bank branch', { ns: 'company' })}
                  name='bankBranch'
                  rules={[
                    {
                      max: 500,
                      min: 0,
                      message: t('StringRange', {
                        ns: 'common',
                        range1: 0,
                        range2: 500,
                      }),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Row gutter={[10, 10]}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={t('Account vnd', { ns: 'company' })}
                      name='accountVnd'
                      rules={[
                        {
                          max: 20,
                          min: 0,
                          message: t('StringRange', {
                            ns: 'common',
                            range1: 0,
                            range2: 20,
                          }),
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={t('Account usd', { ns: 'company' })}
                      name='accountUsd'
                      rules={[
                        {
                          max: 20,
                          min: 0,
                          message: t('StringRange', {
                            ns: 'common',
                            range1: 0,
                            range2: 20,
                          }),
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label={t('Website', { ns: 'company' })}
                  name='website'
                  rules={[
                    {
                      max: 200,
                      min: 0,
                      message: t('StringRange', {
                        ns: 'common',
                        range1: 0,
                        range2: 200,
                      }),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={t('Google map embed', { ns: 'company' })}
                  name='googleMapsEmbed'
                  rules={[
                    {
                      max: 4000,
                      min: 0,
                      message: t('StringRange', {
                        ns: 'common',
                        range1: 0,
                        range2: 4000,
                      }),
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
              </div>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <AuditedCompany />
              <div className='google-maps'
                dangerouslySetInnerHTML={{ __html: selectedCompanyDetail?.googleMapsEmbed || ''}}
              />
            </Col>
          </Row>
        </Spin>
      </Form>
    </div>
  );
};
