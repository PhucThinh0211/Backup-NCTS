import { useEffect, useState } from 'react';

import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Typography,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  contentActions,
  getContentPhotoUrl,
  getSelectedContent,
  getSelectedContentDetail,
} from '@/store/content';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import { GettingContentLoadingKey, SavingContentLoadingKey } from '@/common';
import { getLanguage, getLocale } from '@/store/persistState';

import { AuditedPageContent } from './AuditedPageContent';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/vi';
import { SeoForm } from './SeoForm';

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const CreateUpdatePageContent = () => {
  const [pageContentBody, setPageContentBody] = useState('');
  const [form] = Form.useForm();
  const { t } = useTranslation(['common', 'pageContent']);
  const dispatch = useAppDispatch();

  const language = useAppSelector(getLanguage());
  const locale = useAppSelector(getLocale());
  const selectedContent = useAppSelector(getSelectedContent());
  const selectedContentDetail = useAppSelector(getSelectedContentDetail());
  const contentPhotoUrl = useAppSelector(getContentPhotoUrl());
  const isSubmmiting = useAppSelector(getLoading(SavingContentLoadingKey));
  const isLoading = useAppSelector(getLoading(GettingContentLoadingKey));

  const pageContentTypes = [
    {
      label: t('Ncts PageContent', { ns: 'pageContent' }),
      value: 'NctsPageContent',
    },
    {
      label: t('Customer PageContent', { ns: 'pageContent' }),
      value: 'CustomerPageContent',
    },
    {
      label: t('Activities PageContent', { ns: 'pageContent' }),
      value: 'ActivitiesPageContent',
    },
    {
      label: t('Industrial PageContent', { ns: 'pageContent' }),
      value: 'IndustrialPageContent',
    },
    {
      label: t('Recruitment PageContent', { ns: 'pageContent' }),
      value: 'RecruitmentPageContent',
    },
  ];

  useEffect(() => {
    if (locale && selectedContent) {
      dispatch(
        contentActions.getContentRequest({ contentId: selectedContent.id })
      );
    }
  }, [locale, selectedContent]);

  useEffect(() => {
    if (selectedContentDetail) {
      form.setFieldsValue(selectedContentDetail);
      setPageContentBody(selectedContentDetail.body || '');
    } else {
      form.resetFields();
      setPageContentBody('');
    }
  }, [selectedContentDetail]);

  const handleSaveContent = (values: any) => {
    const inputData = {
      ...values,
      photoUrl: contentPhotoUrl,
      body: pageContentBody,
    };

    if (selectedContent) {
      // prettier-ignore
      dispatch(contentActions.updateContentRequest({ contentId: selectedContent.id, content: { ...selectedContent, ...inputData }}));
      return;
    }
    dispatch(contentActions.createContentRequest({ content: inputData }));
  };

  const onImageDelete = () => {
    form.setFieldsValue({ upload: undefined });
    dispatch(contentActions.setContentPhotoUrl(undefined));
  };

  return (
    <div className='p-4'>
      <Link
        to={'/admin/pageContent'}
        className={'d-flex flex-row align-items-center gap-1 mb-2'}
      >
        <ArrowLeftOutlined style={{ fontSize: 12 }} />
        {t('Back', { ns: 'common' })}
      </Link>
      <div className='d-flex flex-row justify-content-between align-items-center'>
        <div>
          <Typography.Title level={4}>
            {selectedContent
              ? t('Update pageContent', { ns: 'pageContent' })
              : t('Create pageContent', { ns: 'pageContent' })}
          </Typography.Title>
        </div>
        <div>
          <Button type='primary' loading={isSubmmiting} onClick={form.submit}>
            {t('OkText', { ns: 'common' })}
          </Button>
        </div>
      </div>
      <Form form={form} layout='vertical' onFinish={handleSaveContent}>
        <Spin spinning={isLoading}>
          <Row gutter={[10, 10]} className='mt-4'>
            <Col span={16}>
              <div className='w-full border-b rounded-2 bg-white p-3 shadow-sm mb-4'>
                <Form.Item
                  label={t('PageContent type', { ns: 'pageContent' })}
                  name='type'
                  rules={[{ required: true, message: t('PageContent type required') }]}
                >
                  <Select options={pageContentTypes} />
                </Form.Item>
                <Form.Item
                  label={
                    <div>
                      <span>{t('Title', { ns: 'pageContent' })}</span>
                      {' - '}
                      <span className='uppercase text-red-600'>{locale}</span>
                    </div>
                  }
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
                  label={
                    <div>
                      <span>{t('Description', { ns: 'pageContent' })}</span>
                      {' - '}
                      <span className='uppercase text-red-600'>{locale}</span>
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
                <div>
                  <Typography.Text className='ant-form-item-label'>
                    {t('Content', { ns: 'pageContent' })}
                    {' - '}
                    <span className='uppercase text-red-600'>{locale}</span>
                  </Typography.Text>
                  <CKEditor
                    editor={ClassicEditor}
                    key={language}
                    data={pageContentBody}
                    onChange={(e, editor) => {
                      const data = editor.getData();
                      setPageContentBody(data);
                    }}
                    config={{
                      language: {
                        ui: language,
                      },
                      toolbar: {
                        items: [
                          'undo',
                          'redo',
                          '|',
                          'heading',
                          '|',
                          'bold',
                          'italic',
                          '|',
                          'link',
                          'insertImage',
                          'mediaEmbed',
                          'blockQuote',
                          '|',
                          'bulletedList',
                          'numberedList',
                          'outdent',
                          'indent',
                        ],
                      },
                    }}
                    onReady={(editor) => {
                      console.log('Editor is ready to use!', editor);
                    }}
                  />
                </div>
              </div>
              <SeoForm />
            </Col>
            <Col span={8}>
              <AuditedPageContent />
            </Col>
          </Row>
        </Spin>
      </Form>
    </div>
  );
};
