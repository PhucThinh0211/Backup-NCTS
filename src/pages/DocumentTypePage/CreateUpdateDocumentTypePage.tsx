import { useEffect } from 'react';

import { Button, Col, Form, Input, Row, Spin, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  documentTypeActions,
  getSelectedDocumentType,
  getSelectedDocumentTypeDetail,
} from '@/store/documentType';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AuditedDocumentType } from './AuditedDocumentType';
import { getLoading } from '@/store/loading';
import {
  GettingDocumentTypeLoadingKey,
  SavingDocumentTypeLoadingKey,
} from '@/common';
import { getLocale } from '@/store/persistState';

export const CreateUpdateDocumentTypePage = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation(['common', 'documentType']);
  const dispatch = useAppDispatch();

  const locale = useAppSelector(getLocale());
  const selectedDocumentType = useAppSelector(getSelectedDocumentType());
  const selectedDocumentTypeDetail = useAppSelector(
    getSelectedDocumentTypeDetail()
  );
  const isSubmmiting = useAppSelector(getLoading(SavingDocumentTypeLoadingKey));
  const isLoading = useAppSelector(getLoading(GettingDocumentTypeLoadingKey));

  useEffect(() => {
    if (locale && selectedDocumentType) {
      dispatch(
        documentTypeActions.getDocumentTypeRequest({
          documentTypeId: selectedDocumentType.id,
        })
      );
    }
  }, [locale, selectedDocumentType]);

  useEffect(() => {
    if (selectedDocumentTypeDetail) {
      form.setFieldsValue(selectedDocumentTypeDetail);
    } else {
      form.resetFields();
    }
  }, [selectedDocumentTypeDetail]);

  const handleSaveDocumentType = (values: any) => {
    const inputData = {
      ...values,
    };
    if (selectedDocumentType) {
      // prettier-ignore
      dispatch(documentTypeActions.updateDocumentTypeRequest({ documentTypeId: selectedDocumentType.id, documentType: { ...selectedDocumentType, ...inputData }}));
      return;
    }
    dispatch(
      documentTypeActions.createDocumentTypeRequest({ documentType: inputData })
    );
  };

  return (
    <div className='p-4'>
      <Link
        to={'/admin/document-type'}
        className={'d-flex flex-row align-items-center gap-1 mb-1'}
      >
        <ArrowLeftOutlined style={{ fontSize: 12 }} />
        {t('Back', { ns: 'common' })}
      </Link>
      <div className='d-flex flex-row justify-content-between align-items-center'>
        <div>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {selectedDocumentType
              ? t('Update documentType', { ns: 'documentType' })
              : t('Create documentType', { ns: 'documentType' })}
          </Typography.Title>
        </div>
        <div>
          <Button type='primary' loading={isSubmmiting} onClick={form.submit}>
            {t('OkText', { ns: 'common' })}
          </Button>
        </div>
      </div>
      <Form form={form} layout='vertical' onFinish={handleSaveDocumentType}>
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
                      <span>{t('Name', { ns: 'documentType' })}</span>
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
              <AuditedDocumentType />
            </Col>
          </Row>
        </Spin>
      </Form>
    </div>
  );
};
