import { useEffect, useState } from 'react';

import {
  Avatar,
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
import vi from '@/assets/vn.svg';
import en from '@/assets/us.svg';
import { getLanguage, getLocale } from '@/store/persistState';

import { AuditedNews } from './AuditedNews';
import { NewsPhotoUrlUploader } from './NewsPhotoUrlUploader';

import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/vi';

const flag = {
  vi,
  en,
};

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const CreateUpdateNewsPage = () => {
  const [newsBody, setNewsBody] = useState('')
  const [form] = Form.useForm();
  const { t } = useTranslation(['common', 'news']);
  const dispatch = useAppDispatch();

  const language = useAppSelector(getLanguage());
  const locale = useAppSelector(getLocale());
  const selectedContent = useAppSelector(getSelectedContent());
  const selectedContentDetail = useAppSelector(getSelectedContentDetail());
  const contentPhotoUrl = useAppSelector(getContentPhotoUrl());
  const isSubmmiting = useAppSelector(getLoading(SavingContentLoadingKey));
  const isLoading = useAppSelector(getLoading(GettingContentLoadingKey));

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
      setNewsBody(selectedContentDetail.body || '');
    } else {
      form.resetFields();
      setNewsBody('');
    }
  }, [selectedContentDetail]);

  const handleSaveContent = (values: any) => {
    const inputData = {
      ...values,
      photoUrl: contentPhotoUrl,
      body: newsBody
    };
    if (selectedContent) {
      // prettier-ignore
      dispatch(contentActions.updateContentRequest({ contentId: selectedContent.id, content: { ...selectedContent, ...inputData }}));
      return;
    }
    dispatch(contentActions.createContentRequest({ content: inputData }));
  };

  const FlagComponent = () => (
    <Avatar
      size={20}
      shape='square'
      src={locale ? flag[locale] : flag['vi']}
      className='!rounded-none '
    />
  );

  const onImageDelete = () => {
    form.setFieldsValue({ upload: undefined });
    dispatch(contentActions.setContentPhotoUrl(undefined));
  };

  return (
    <div className='p-4'>
      <Link
        to={'/admin/news'}
        className={'flex flex-row items-center gap-1 mb-4'}
      >
        <ArrowLeftOutlined style={{ fontSize: 12 }} />
        {t('Back', { ns: 'common' })}
      </Link>
      <div className='flex flex-row justify-between items-center'>
        <div>
          <Typography.Title level={4}>
            {selectedContent
              ? t('Update news', { ns: 'news' })
              : t('Create news', { ns: 'news' })}
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
              <div className='w-full border-b-gray-500 rounded-md bg-white p-4 shadow-sm'>
                <Form.Item
                  name='upload'
                  label={t('Photo', { ns: 'banner' })}
                  valuePropName='fileList'
                  getValueFromEvent={normFile}
                  rules={[
                    {
                      required: !contentPhotoUrl,
                      message: t('Photo required', { ns: 'banner' }),
                    },
                  ]}
                >
                  <NewsPhotoUrlUploader onImageDelete={onImageDelete} />
                </Form.Item>
                <Form.Item
                  label={t('Title', { ns: 'news' })}
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
                  <Input suffix={<FlagComponent />} />
                </Form.Item>
                <Form.Item
                  label={t('News type', { ns: 'news' })}
                  name='type'
                  rules={[{ required: true, message: t('News type required') }]}
                >
                  <Select options={newsTypes} />
                </Form.Item>
                <Form.Item
                  label={
                    <div>
                      <span>{t('Description', { ns: 'news' })}</span>
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
                <CKEditor
                  editor={ ClassicEditor }
                  key={language}
                  data={newsBody}
                  onChange={(e, editor) => {
                    const data = editor.getData();
                    setNewsBody(data);
                  }}
                  config={{
                    language: {
                      ui: language,
                    }
                  }}
                  onReady={ editor => {
                    console.log( 'Editor is ready to use!', editor );
                  } }
                />
              </div>
            </Col>
            <Col span={8}>
              <AuditedNews />
            </Col>
          </Row>
        </Spin>
      </Form>
    </div>
  );
};
