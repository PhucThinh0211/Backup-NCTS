import { useEffect } from 'react';

import { Button, Col, Form, Input, Row, Spin, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  newsTypeActions,
  getSelectedNewsType,
  getSelectedNewsTypeDetail,
} from '@/store/newsType';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AuditedNewsType } from './AuditedNewsType';
import { getLoading } from '@/store/loading';
import { GettingNewsTypeLoadingKey, SavingNewsTypeLoadingKey } from '@/common';
import { getLocale } from '@/store/persistState';

export const CreateUpdateNewsTypePage = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation(['common', 'newsType']);
  const dispatch = useAppDispatch();

  const locale = useAppSelector(getLocale());
  const selectedNewsType = useAppSelector(getSelectedNewsType());
  const selectedNewsTypeDetail = useAppSelector(getSelectedNewsTypeDetail());
  const isSubmmiting = useAppSelector(getLoading(SavingNewsTypeLoadingKey));
  const isLoading = useAppSelector(getLoading(GettingNewsTypeLoadingKey));

  useEffect(() => {
    if (locale && selectedNewsType) {
      dispatch(
        newsTypeActions.getNewsTypeRequest({ newsTypeId: selectedNewsType.id })
      );
    }
  }, [locale, selectedNewsType]);

  useEffect(() => {
    if (selectedNewsTypeDetail) {
      form.setFieldsValue(selectedNewsTypeDetail);
    } else {
      form.resetFields();
    }
  }, [selectedNewsTypeDetail]);

  const handleSaveNewsType = (values: any) => {
    const inputData = {
      ...values,
    };
    if (selectedNewsType) {
      // prettier-ignore
      dispatch(newsTypeActions.updateNewsTypeRequest({ newsTypeId: selectedNewsType.id, newsType: { ...selectedNewsType, ...inputData }}));
      return;
    }
    dispatch(newsTypeActions.createNewsTypeRequest({ newsType: inputData }));
  };

  return (
    <div className='p-4'>
      <Link
        to={'/admin/news-type'}
        className={'d-flex flex-row align-items-center gap-1 mb-1'}
      >
        <ArrowLeftOutlined style={{ fontSize: 12 }} />
        {t('Back', { ns: 'common' })}
      </Link>
      <div className='d-flex flex-row justify-content-between align-items-center'>
        <div>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {selectedNewsType
              ? t('Update newsType', { ns: 'newsType' })
              : t('Create newsType', { ns: 'newsType' })}
          </Typography.Title>
        </div>
        <div>
          <Button type='primary' loading={isSubmmiting} onClick={form.submit}>
            {t('OkText', { ns: 'common' })}
          </Button>
        </div>
      </div>
      <Form form={form} layout='vertical' onFinish={handleSaveNewsType}>
        <Spin spinning={isLoading}>
          <Row gutter={[10, 10]} className='mt-2'>
            <Col span={16}>
              <div className='w-full border-b-gray-500 rounded-2 bg-white p-4 shadow-sm'>
                <Form.Item
                  label={
                    <div>
                      <span>{t('Code', { ns: 'common' })}</span>
                      {/* {' - '}
                      <span className='text-uppercase text-danger'>
                        {locale}
                      </span> */}
                    </div>
                  }
                  name='code'
                  rules={[
                    { required: true, message: t('Code required') },
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
                      <span>{t('Name', { ns: 'newsType' })}</span>
                      {' - '}
                      <span className='text-uppercase text-danger'>
                        {locale}
                      </span>
                    </div>
                  }
                  name='name'
                  rules={[
                    { required: true, message: t('Name required') },
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
                  <Input />
                </Form.Item>
              </div>
            </Col>
            <Col span={8}>
              <AuditedNewsType />
            </Col>
          </Row>
        </Spin>
      </Form>
    </div>
  );
};
