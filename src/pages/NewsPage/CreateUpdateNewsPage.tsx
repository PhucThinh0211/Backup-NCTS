import { useEffect, useState } from 'react';

import { Button, Col, Form, Input, Row, Select, Space, Spin, Typography } from 'antd';
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  contentActions,
  getContentPhotoUrl,
  getNewsTypes,
  getSelectedContent,
  getSelectedContentDetail,
} from '@/store/content';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import {
  GettingContentLoadingKey,
  PublishContentLoadingKey,
  SavingContentLoadingKey,
  largePagingParams,
} from '@/common';
import { getLanguage, getLocale } from '@/store/persistState';

import { AuditedNews } from './AuditedNews';
import { NewsPhotoUrlUploader } from './NewsPhotoUrlUploader';

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

export const CreateUpdateNewsPage = () => {
  const [newsBody, setNewsBody] = useState('');
  const [form] = Form.useForm();
  const { t } = useTranslation(['common', 'news']);
  const dispatch = useAppDispatch();

  const language = useAppSelector(getLanguage());
  const locale = useAppSelector(getLocale());
  const selectedContent = useAppSelector(getSelectedContent());
  const selectedContentDetail = useAppSelector(getSelectedContentDetail());
  const contentPhotoUrl = useAppSelector(getContentPhotoUrl());
  const newsTypes = useAppSelector(getNewsTypes());
  const isSubmmiting = useAppSelector(getLoading(SavingContentLoadingKey));
  const isLoading = useAppSelector(getLoading(GettingContentLoadingKey));
  const isPublishing = useAppSelector(getLoading(PublishContentLoadingKey));

  const newsTypesOptions = [...(newsTypes?.items || [])]
    .sort((a, b) => a.sortSeq - b.sortSeq)
    .map((item) => ({
      label: item.name,
      value: item.id,
    }));

  useEffect(() => {
    dispatch(contentActions.getNewsTypeRequest({ params: largePagingParams }));
  }, [language, locale]);

  useEffect(() => {
    if (locale && selectedContent) {
      dispatch(contentActions.getContentRequest({ contentId: selectedContent.id }));
    }
  }, [locale, selectedContent]);

  useEffect(() => {
    if (selectedContentDetail) {
      form.setFieldsValue(selectedContentDetail);
      setNewsBody(selectedContentDetail.body || '');
    } else {
      form.resetFields();
      setNewsBody('');
    }
  }, [selectedContentDetail]);

  const handleSaveContent = (values: any) => {
    const foundNewsType = (newsTypes?.items || []).find(
      (newsType) => newsType.id === values?.newsTypeId
    );
    const inputData = {
      ...values,
      photoUrl: contentPhotoUrl,
      body: newsBody,
      type: foundNewsType?.code,
    };

    if (!inputData?.seo?.title) {
      delete inputData?.seo;
    }

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

  const publishContent = () => {
    if (!selectedContent) {
      return;
    }
    if (!selectedContent.published) {
      dispatch(contentActions.publishContentRequest(selectedContent.id));
    } else {
      dispatch(contentActions.unpublishContentRequest(selectedContent.id));
    }
  };

  return (
    <div className="p-4">
      <Link to={'/admin/news'} className={'d-flex flex-row align-items-center gap-1 mb-2'}>
        <ArrowLeftOutlined style={{ fontSize: 12 }} />
        {t('Back', { ns: 'common' })}
      </Link>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div>
          <Typography.Title level={4}>
            {selectedContent ? t('Update news', { ns: 'news' }) : t('Create news', { ns: 'news' })}
          </Typography.Title>
        </div>
        <Space>
          <Button
            type="default"
            disabled={!selectedContent?.id}
            onClick={publishContent}
            loading={isPublishing}
            icon={<CheckOutlined  />}  
          >
            {!!selectedContent?.published === false ? t('Publish', { ns: 'common' }) : t('Unpublish', { ns: 'common' })}
          </Button>
          <Button type="primary" loading={isSubmmiting} onClick={form.submit}>
            {t('OkText', { ns: 'common' })}
          </Button>
        </Space>
      </div>
      <Form form={form} layout="vertical" onFinish={handleSaveContent} autoComplete="off">
        <Spin spinning={isLoading}>
          <Row gutter={[10, 10]} className="mt-2">
            <Col span={16}>
              <div className="w-100 border-bottom rounded-2 bg-white p-3 shadow-sm mb-2">
                <Form.Item
                  name="upload"
                  label={t('Photo', { ns: 'news' })}
                  valuePropName="fileList"
                  getValueFromEvent={normFile}>
                  <NewsPhotoUrlUploader onImageDelete={onImageDelete} />
                </Form.Item>
                <Form.Item
                  label={t('News type', { ns: 'news' })}
                  name="newsTypeId"
                  rules={[{ required: true, message: t('News type required') }]}>
                  <Select options={newsTypesOptions} />
                </Form.Item>
                <Form.Item
                  label={
                    <div>
                      <span>{t('Title', { ns: 'news' })}</span>
                      {' - '}
                      <span className="uppercase text-red-600">{locale}</span>
                    </div>
                  }
                  name="title"
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
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label={
                    <div>
                      <span>{t('Description', { ns: 'news' })}</span>
                      {' - '}
                      <span className="uppercase text-red-600">{locale}</span>
                    </div>
                  }
                  name="description"
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
                  ]}>
                  <Input.TextArea />
                </Form.Item>
                <div>
                  <Form.Item
                    label={t('Content', { ns: 'news' }) + ' - ' + locale}
                    rules={[{ required: true }]}
                    required>
                    <CKEditor
                      editor={ClassicEditor}
                      key={language}
                      data={newsBody}
                      onChange={(e, editor) => {
                        const data = editor.getData();
                        setNewsBody(data);
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
                  </Form.Item>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <AuditedNews />
              <SeoForm />
            </Col>
          </Row>
        </Spin>
      </Form>
    </div>
  );
};
