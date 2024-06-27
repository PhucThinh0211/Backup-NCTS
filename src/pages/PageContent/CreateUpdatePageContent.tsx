import { useEffect, useMemo, useState } from 'react';

import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
  TreeSelect,
  Typography,
} from 'antd';
import {
  ArrowLeftOutlined,
  CheckOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  pageContentActions,
  getSelectedPageContent,
  getSelectedPageContentDetail,
  getNewsTypes,
  getPagePhotoUrl,
  getDocumentTypes,
  getMenus,
} from '@/store/pageContent';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import {
  GettingPageContentLoadingKey,
  PublishPageContentLoadingKey,
  SavingPageContentLoadingKey,
  TreeItem,
  largePagingParams,
} from '@/common';
import { getLanguage, getLocale } from '@/store/persistState';

import { AuditedPageContent } from './AuditedPageContent';

import { CKEditor } from '@ckeditor/ckeditor5-react';

import Utils from '@/utils';
import {
  PageContentShowPlace,
  PageContentType,
} from '@/services/PageContentService';
import { SeoForm } from '../NewsPage/SeoForm';
import { PagePhotoUrlUploader } from './PagePhotoUrlUploader';
import { MenuResponse } from '@/services/MenuService';
import { getEnvVars } from '@/enviroment';
import ClassicEditor from '@/common/ckeditor';

const { apiUrl } = getEnvVars();

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const CreateUpdatePageContent = () => {
  const [pageContentBody, setPageContentBody] = useState('');
  const [form] = Form.useForm();
  const { t } = useTranslation(['common', 'pageContent', 'news', 'department']);
  const dispatch = useAppDispatch();

  const language = useAppSelector(getLanguage());
  const locale = useAppSelector(getLocale());
  const selectedPageContent = useAppSelector(getSelectedPageContent());
  const selectedPageContentDetail = useAppSelector(
    getSelectedPageContentDetail()
  );
  const pagePhotoUrl = useAppSelector(getPagePhotoUrl());
  const newsTypes = useAppSelector(getNewsTypes());
  const menus = useAppSelector(getMenus());
  const documentTypes = useAppSelector(getDocumentTypes());
  const isSubmmiting = useAppSelector(getLoading(SavingPageContentLoadingKey));
  const isLoading = useAppSelector(getLoading(GettingPageContentLoadingKey));
  const isPublishing = useAppSelector(getLoading(PublishPageContentLoadingKey));

  const sortedMenus: MenuResponse[] = useMemo(
    () => Utils.deepClone(menus?.items || []),
    [menus]
  );
  sortedMenus.sort((a, b) => {
    return a.sortSeq - b.sortSeq;
  });

  const pageTitle = Form.useWatch('title', form);
  const selectedMenuId = Form.useWatch('menuId', form);
  const pageType = Form.useWatch('pageType', form);

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
          label: t('Customer', { ns: 'pageContent' }),
          value: PageContentType.CUSTOMER,
        },
        {
          label: t('Partner', { ns: 'pageContent' }),
          value: PageContentType.PARTNER,
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
      ],
    },
    {
      label: t('Investor relations', { ns: 'pageContent' }),
      value: PageContentType.INVESTOR_RELATIONS,
      children: [
        {
          label: t('Investor news', { ns: 'pageContent' }),
          value: PageContentType.INVESTOR_NEWS,
        },
        {
          label: t('Shareholder meetings', { ns: 'pageContent' }),
          value: PageContentType.SHAREHOLDER_MEETINGS,
        },
        {
          label: t('Financial reports', { ns: 'pageContent' }),
          value: PageContentType.FINANCIAL_REPORTS,
        },
        {
          label: t('Annual reports', { ns: 'pageContent' }),
          value: PageContentType.ANNUAL_REPORTS,
        },
        {
          label: t('Corporate governance', { ns: 'pageContent' }),
          value: PageContentType.CORPORATE_GOVERNANCE,
        },
      ],
    },
  ];

  const pageShowPlaces = [
    {
      label: t('Introduction', { ns: 'pageContent' }),
      value: PageContentShowPlace.INTRODUCTION,
      name: 'showInTheIntroduceSection',
    },
    {
      label: t('Services section', { ns: 'pageContent' }),
      value: PageContentShowPlace.SERVICES,
      name: 'showInTheServicesSection',
    },
  ];

  const mapTreeToSelectOption = (item: TreeItem<MenuResponse>): any => {
    return {
      title: item.label,
      value: item.id,
      children: item.children
        ? item.children.map((child) => mapTreeToSelectOption(child))
        : undefined,
      disabled: !!item.children?.length,
    };
  };

  useEffect(() => {
    dispatch(
      pageContentActions.getNewsTypesRequest({ params: largePagingParams })
    );
    dispatch(
      pageContentActions.getDocumentTypesRequest({ params: largePagingParams })
    );
    dispatch(pageContentActions.getMenusRequest({ params: largePagingParams }));
  }, [language]);

  useEffect(() => {
    if (locale && selectedPageContent) {
      dispatch(
        pageContentActions.getPageContentRequest({
          pageContentId: selectedPageContent.id,
        })
      );
    }
  }, [locale, selectedPageContent]);

  useEffect(() => {
    if (selectedPageContentDetail) {
      form.setFieldsValue({
        ...selectedPageContentDetail,
        pageType: selectedPageContentDetail.pageType || PageContentType.DYNAMIC,
      });
      setPageContentBody(selectedPageContentDetail.content || '');
    } else {
      form.resetFields();
      setPageContentBody('');
    }
  }, [selectedPageContentDetail]);

  useEffect(() => {
    if (pageTitle && !selectedPageContent) {
      form.setFieldValue('slug', '/' + Utils.createSlug(pageTitle));
    }
  }, [pageTitle]);

  useEffect(() => {
    const foundMenu = (menus?.items || []).find(
      (menu) => menu.id === selectedMenuId
    );
    if (foundMenu?.url && !selectedPageContent) {
      form.setFieldValue('slug', foundMenu.url);
    }
  }, [selectedMenuId]);

  const handleSaveContent = (values: any) => {
    const inputData = {
      ...values,
      content: pageContentBody,
      photoUrl: pagePhotoUrl,
      seo:
        !!values.seo && JSON.stringify(values.seo) !== '{}'
          ? values.seo
          : undefined,
    };
    if (selectedPageContentDetail) {
      // prettier-ignore
      dispatch(pageContentActions.updatePageContentRequest({ pageContentId: selectedPageContentDetail.id, pageContent: { ...selectedPageContentDetail, ...inputData }}));
      return;
    }
    dispatch(
      pageContentActions.createPageContentRequest({ pageContent: inputData })
    );
  };

  const renderByPageType = (type: string) => {
    switch (type) {
      case PageContentType.DYNAMIC:
        return (
          <>
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
                onReady={(editor) => {
                  editor.setData(pageContentBody);
                }}
              />
            </div>
          </>
        );

      case PageContentType.DOCUMENT:
      case PageContentType.ANNUAL_REPORTS:
      case PageContentType.FINANCIAL_REPORTS:
      case PageContentType.CORPORATE_GOVERNANCE:
        return (
          <>
            <Form.Item
              label={t('Type', { ns: 'department' })}
              name='codeType'
              rules={[
                {
                  required: true,
                  message: t('Type required', { ns: 'department' }),
                },
              ]}
            >
              <Select
                options={[...(documentTypes?.items || [])]
                  .sort((a, b) => a.sortSeq - b.sortSeq)
                  .map((type) => ({
                    label: type.name,
                    value: type.code,
                  }))}
              />
            </Form.Item>
          </>
        );

      case PageContentType.NEWS:
      case PageContentType.INVESTOR_NEWS:
      case PageContentType.SHAREHOLDER_MEETINGS:
        return (
          <>
            <Form.Item
              label={t('News type', { ns: 'news' })}
              name='codeType'
              rules={[
                {
                  required: true,
                  message: t('News type required', { ns: 'news' }),
                },
              ]}
            >
              <Select
                options={[...(newsTypes?.items || [])]
                  .sort((a, b) => a.sortSeq - b.sortSeq)
                  .map((type) => ({
                    label: type.name,
                    value: type.code,
                  }))}
              />
            </Form.Item>
          </>
        );

      default:
        return;
    }
  };

  const publishPageContent = () => {
    if (!selectedPageContent) {
      return;
    }
    if (!selectedPageContent.published) {
      dispatch(pageContentActions.publishPageRequest(selectedPageContent.id));
    } else {
      dispatch(pageContentActions.unpublishPageRequest(selectedPageContent.id));
    }
  };

  const onImageDelete = () => {
    form.setFieldsValue({ upload: undefined });
    dispatch(pageContentActions.setPagePhotoUrl(undefined));
  };

  const createPageContent = () => {
    dispatch(pageContentActions.setSelectedPageContent(undefined));
    dispatch(pageContentActions.setSelectedPageContentDetail(undefined));
  };

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
        <Space>
          {selectedPageContent && (
            <>
              <Button
                type='primary'
                icon={<PlusOutlined />}
                onClick={createPageContent}
                style={{ backgroundColor: '#0c75a0db' }}
              >
                {t('Add new', { ns: 'pageContent' })}
              </Button>
              <Divider type='vertical' />
            </>
          )}
          <Button
            type='default'
            disabled={!selectedPageContent?.id}
            onClick={publishPageContent}
            loading={isPublishing}
            icon={<CheckOutlined />}
          >
            {!!selectedPageContent?.published === false
              ? t('Publish', { ns: 'common' })
              : t('Unpublish', { ns: 'common' })}
          </Button>
          <Button type='primary' loading={isSubmmiting} onClick={form.submit}>
            {t('OkText', { ns: 'common' })}
          </Button>
        </Space>
      </div>
      <Form
        form={form}
        layout='vertical'
        onFinish={handleSaveContent}
        initialValues={{
          pageType: PageContentType.DYNAMIC,
          pageShowPlace: PageContentShowPlace.INTRODUCTION,
        }}
      >
        <Spin spinning={isLoading}>
          <Row gutter={[10, 10]} className='mt-2'>
            <Col span={16}>
              <div className='w-100 border-bottom rounded-2 bg-white p-3 shadow-sm mb-2'>
                <Form.Item
                  name='upload'
                  label={t('Photo', { ns: 'news' })}
                  valuePropName='fileList'
                  getValueFromEvent={normFile}
                  // rules={[
                  //   {
                  //     required: !pagePhotoUrl,
                  //     message: t('Photo url required', { ns: 'pageContent' }),
                  //   },
                  // ]}
                >
                  <PagePhotoUrlUploader onImageDelete={onImageDelete} />
                </Form.Item>
                <Form.Item
                  label={t('Page type', { ns: 'pageContent' })}
                  name='pageType'
                  rules={[{ required: true, message: t('Page type required') }]}
                >
                  <TreeSelect
                    treeData={pageTypes}
                    treeDefaultExpandAll={true}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <div>
                      <span>{t('Title', { ns: 'pageContent' })}</span>
                      {' - '}
                      <span className='text-uppercase text-danger'>
                        {locale}
                      </span>
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
                      <span>{t('Description', { ns: 'news' })}</span>
                      {' - '}
                      <span className='text-uppercase text-danger'>
                        {locale}
                      </span>
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
                  label={t('Menu', { ns: 'pageContent' })}
                  name='menuId'
                >
                  <TreeSelect
                    treeData={Utils.buildTree(sortedMenus).map((item) =>
                      mapTreeToSelectOption(item)
                    )}
                    treeDefaultExpandAll
                  />
                </Form.Item>
                <Form.Item
                  label={t('Slug', { ns: 'pageContent' })}
                  name='slug'
                  rules={[
                    {
                      required: true,
                      message: t('Slug required', { ns: 'pageContent' }),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <div>
                  <Typography.Text strong>
                    {t('Show in', { ns: 'pageContent' })}
                  </Typography.Text>
                </div>
                <Space>
                  {pageShowPlaces.map((place) => (
                    <Form.Item
                      name={place.name}
                      key={place.name}
                      valuePropName='checked'
                    >
                      <Checkbox>{place.label}</Checkbox>
                    </Form.Item>
                  ))}
                </Space>
                {/* <Form.Item
                  label={}
                  name='pageShowPlace'
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <Radio.Group>
                    {
                      pageShowPlaces.map(place => (
                        <Radio value={place.value} key={place.value}>{place.label}</Radio>
                      ))
                    }
                  </Radio.Group>
                </Form.Item> */}
                {renderByPageType(pageType)}
              </div>
            </Col>
            <Col span={8}>
              <AuditedPageContent />
              <SeoForm />
            </Col>
          </Row>
        </Spin>
      </Form>
    </div>
  );
};
