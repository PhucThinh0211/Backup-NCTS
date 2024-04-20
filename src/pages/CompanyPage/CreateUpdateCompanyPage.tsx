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
import { CompanyInformation } from './CompanyInformation';

export const CreateUpdateCompanyPage = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation(['common', 'company']);
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
      photoUrl: companyPhotoUrl,
    };
    if (currentCompany) {
      // prettier-ignore
      dispatch(companyActions.updateCompanyRequest({ companyId: currentCompany.id, company: { ...currentCompany, ...inputData }}));
      return;
    }
    dispatch(companyActions.createCompanyRequest({ company: inputData }));
  };

  return (
    <div className='p-4'>
      <div className='flex flex-row justify-between items-center'>
        <div>
          <Typography.Title level={4}>
            {t('Company', { ns: 'company' })}
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
          <Row gutter={[10, 10]} className='mt-4'>
            <Col span={16}>
              <div className='w-full border-b-gray-500 rounded-md bg-white p-4 shadow-sm'>
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
                  <Input />
                </Form.Item>
              </div>
            </Col>
            <Col span={8}>
              <CompanyInformation />
            </Col>
          </Row>
        </Spin>
      </Form>
    </div>
  );
};
