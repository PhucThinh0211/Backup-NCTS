import { useEffect } from 'react';

import { Button, Col, Form, Input, Row, Select, Spin, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import {
  companyActions,
  getCompanyPhotoUrl,
  getSelectedCompany,
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
  const selectedCompany = useAppSelector(getSelectedCompany());
  const selectedCompanyDetail = useAppSelector(getSelectedCompanyDetail());
  const companyPhotoUrl = useAppSelector(getCompanyPhotoUrl());
  const isSubmmiting = useAppSelector(getLoading(SavingCompanyLoadingKey));
  const isLoading = useAppSelector(getLoading(GettingCompanyLoadingKey));

  const horizontalOptions = [
    {
      label: t('left', { ns: 'company' }),
      value: 'left',
    },
    {
      label: t('center', { ns: 'company' }),
      value: 'center',
    },
    {
      label: t('right', { ns: 'company' }),
      value: 'right',
    },
  ];

  const verticalOptions = [
    {
      label: t('top', { ns: 'company' }),
      value: 'left',
    },
    {
      label: t('middle', { ns: 'company' }),
      value: 'middle',
    },
    {
      label: t('bottom', { ns: 'company' }),
      value: 'bottom',
    },
  ];

  useEffect(() => {
    if (locale && selectedCompany) {
      dispatch(
        companyActions.getCompanyRequest({ companyId: selectedCompany.id })
      );
    }
  }, [locale, selectedCompany]);

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
    if (selectedCompany) {
      // prettier-ignore
      dispatch(companyActions.updateCompanyRequest({ companyId: selectedCompany.id, company: { ...selectedCompany, ...inputData }}));
      return;
    }
    dispatch(companyActions.createCompanyRequest({ company: inputData }));
  };

  return (
    <div className='p-4'>
      <div className='flex flex-row justify-between items-center'>
        <div>
          <Typography.Title level={4}>
            {selectedCompany
              ? t('Update company', { ns: 'company' })
              : t('Create company', { ns: 'company' })}
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
                  label={t('Title', { ns: 'company' })}
                  name='title'
                  rules={[
                    { required: true, message: t('Title required') },
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
                  label={t('Button label', { ns: 'company' })}
                  name='buttonLabel'
                  rules={[
                    {
                      max: 50,
                      min: 0,
                      message: t('StringRange', {
                        ns: 'common',
                        range1: 0,
                        range2: 50,
                      }),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={t('Button link', { ns: 'company' })}
                  name='linkButton'
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
                  label={
                    <div>
                      <span>{t('Description', { ns: 'company' })}</span>
                      {' - '}
                      <span className='uppercase'>{locale}</span>
                    </div>
                  }
                  name='description'
                  rules={[
                    {
                      max: 2000,
                      min: 0,
                      message: t('StringRange', {
                        ns: 'common',
                        range1: 0,
                        range2: 2000,
                      }),
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item
                  label={t('Horizontal', { ns: 'company' })}
                  name='horizontal'
                >
                  <Select options={horizontalOptions} />
                </Form.Item>
                <Form.Item
                  label={t('Vertical', { ns: 'company' })}
                  name='vertical'
                >
                  <Select options={verticalOptions} />
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
