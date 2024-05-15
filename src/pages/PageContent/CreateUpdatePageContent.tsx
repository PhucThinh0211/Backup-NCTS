import { useEffect, useState } from 'react';

import { Button, Col, Form, Input, Row, Select, Spin, TreeSelect, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  pageContentActions,
  getSelectedPageContent,
  getSelectedPageContentDetail,
} from '@/store/pageContent';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import { GettingPageContentLoadingKey, SavingPageContentLoadingKey } from '@/common';
import { getLanguage, getLocale } from '@/store/persistState';

import { AuditedPageContent } from './AuditedPageContent';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/vi';
import { SeoForm } from './SeoForm';
import Utils from '@/utils';
import { PageContentType } from '@/services/PageContentService';

export const CreateUpdatePageContent = () => {
  const [pageContentBody, setPageContentBody] = useState('');
  const [form] = Form.useForm();
  const { t } = useTranslation(['common', 'pageContent', 'news', 'department']);
  const dispatch = useAppDispatch();

  const language = useAppSelector(getLanguage());
  const locale = useAppSelector(getLocale());
  const selectedPageContent = useAppSelector(getSelectedPageContent());
  const selectedPageContentDetail = useAppSelector(getSelectedPageContentDetail());
  const isSubmmiting = useAppSelector(getLoading(SavingPageContentLoadingKey));
  const isLoading = useAppSelector(getLoading(GettingPageContentLoadingKey));

  const pageTitle = Form.useWatch("title", form);
  const pageType = Form.useWatch("pageType", form);

  const newsTypes = [
    {
      label: t('Ncts News', { ns: 'news' }),
      value: 'NctsNews',
    },
    {
      label: t('Customer News', { ns: 'news' }),
      value: 'CustomerNews',
    },
    {
      label: t('Activities News', { ns: 'news' }),
      value: 'ActivitiesNews',
    },
    {
      label: t('Industrial News', { ns: 'news' }),
      value: 'IndustrialNews',
    },
    {
      label: t('Recruitment News', { ns: 'news' }),
      value: 'RecruitmentNews',
    },
  ];

  const contactTypes = [
    {
      label: t('Phone', { ns: 'department' }),
      value: 'Phone',
    },
    {
      label: t('Ext', { ns: 'department' }),
      value: 'Ext',
    },
    {
      label: t('Fax', { ns: 'department' }),
      value: 'Fax',
    },
    {
      label: t('Email', { ns: 'department' }),
      value: 'Email',
    },
  ];

  const pageTypes = [
    {
      label: t('Dynamic', { ns: 'pageContent' }),
      value: PageContentType.DYNAMIC,
    },
    {
      label: t('Available', { ns: 'pageContent' }),
      value: PageContentType.AVAILABLE,
      selectable: false,
      children: [
        {
          label: t('Video', { ns: 'pageContent' }),
          value: PageContentType.VIDEO,
        },
        {
          label: t('Photo', { ns: 'pageContent' }),
          value: PageContentType.PHOTO,
        },
        {
          label: t('Document', { ns: 'pageContent' }),
          value: PageContentType.DOCUMENT,
        },
        {
          label: t('News', { ns: 'pageContent' }),
          value: PageContentType.NEWS,
        },
        {
          label: t('Contact', { ns: 'pageContent' }),
          value: PageContentType.CONTACT,
        },
        {
          label: t('Login', { ns: 'pageContent' }),
          value: PageContentType.LOGIN,
        },
        {
          label: t('Register', { ns: 'pageContent' }),
          value: PageContentType.REGISTER,
        },
      ]
    },
  ];

  useEffect(() => {
    if (pageTitle && !selectedPageContent) {
      form.setFieldValue('slug', '/' + Utils.createSlug(pageTitle));
    }
  }, [pageTitle]);

  useEffect(() => {
    if (locale && selectedPageContent) {
      dispatch(
        pageContentActions.getPageContentRequest({ pageContentId: selectedPageContent.id })
      );
    }
  }, [locale, selectedPageContent]);

  useEffect(() => {
    if (selectedPageContentDetail) {
      form.setFieldsValue({
        ...selectedPageContentDetail,
        pageType: selectedPageContentDetail.pageType || PageContentType.DYNAMIC
      });
      setPageContentBody(selectedPageContentDetail.content || '');
    } else {
      form.resetFields();
      setPageContentBody('');
    }
  }, [selectedPageContentDetail]);

  const handleSaveContent = (values: any) => {
    const inputData = {
      ...values,
      content: pageContentBody,
      seo: !!values.seo && JSON.stringify(values.seo) !== '{}' ? values.seo : undefined  
    };

    if (selectedPageContentDetail) {
      // prettier-ignore
      dispatch(pageContentActions.updatePageContentRequest({ pageContentId: selectedPageContentDetail.id, pageContent: { ...selectedPageContentDetail, ...inputData }}));
      return;
    }
    dispatch(pageContentActions.createPageContentRequest({ pageContent: inputData }));
  };

  const renderByPageType = (type: string) => {
    switch (type) {
      case PageContentType.DYNAMIC:
        return <>
          <div>
            <Typography.Text className='ant-form-item-label'>
              {t('Content', { ns: 'pageContent' })}
              {' - '}
              <span className='text-uppercase text-danger'>{locale}</span>
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
        </>;
      
      case PageContentType.DOCUMENT:
        return <>
            <Form.Item
              label={t('Type', { ns: 'department' })}
              name='codeType'
              rules={[
                { required: true, message: t('Type required', { ns: 'department' }) },
              ]}
            >
              <Select options={contactTypes}/>
            </Form.Item>
        </>

      case PageContentType.NEWS:
        return <>
            <Form.Item
              label={t('News type', { ns: 'news' })}
              name='codeType'
              rules={[
                { required: true, message: t('News type required', { ns: 'news' }) },
              ]}
            >
              <Select options={newsTypes}/>
            </Form.Item>
        </>

      default:
        return;
    }
  }

  return (
    <div className='p-4'>
      <Link
        to={'/admin/pages'}
        className={'d-flex flex-row align-items-center gap-1 mb-2'}
      >
        <ArrowLeftOutlined style={{ fontSize: 12 }} />
        {t('Back', { ns: 'common' })}
      </Link>
      <div className='d-flex flex-row justify-content-between align-items-center'>
        <div>
          <Typography.Title level={4}>
            {selectedPageContent
              ? t('Update page', { ns: 'pageContent' })
              : t('Create page', { ns: 'pageContent' })}
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
        onFinish={handleSaveContent}
        initialValues={{
          pageType: PageContentType.DYNAMIC
        }}
      >
        <Spin spinning={isLoading}>
          <Row gutter={[10, 10]} className='mt-2'>
            <Col span={16}>
              <div className='w-100 border-bottom rounded-2 bg-white p-3 shadow-sm mb-2'>
                <Form.Item
                  label={t('Page type', { ns: 'pageContent' })}
                  name='pageType'
                  rules={[
                    { required: true, message: t('Page type required') },
                  ]}
                >
                  <TreeSelect treeData={pageTypes} treeDefaultExpandAll={true} />
                </Form.Item>
                <Form.Item
                  label={
                    <div>
                      <span>{t('Title', { ns: 'pageContent' })}</span>
                      {' - '}
                      <span className='text-uppercase text-danger'>{locale}</span>
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
                  label={t('Slug', { ns: 'pageContent' })}
                  name='slug'
                  rules={[
                    { required: true, message: t('Slug required') },
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
                {renderByPageType(pageType)}
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