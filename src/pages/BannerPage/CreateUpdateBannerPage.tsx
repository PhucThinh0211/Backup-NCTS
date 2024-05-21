import { useEffect } from 'react';

import { Button, Col, Form, Input, Row, Select, Spin, Typography } from 'antd';
import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  bannerActions,
  getBannerPhotoUrl,
  getSelectedBanner,
  getSelectedBannerDetail,
} from '@/store/banner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { BannerInformation } from './BannerInformation';
import { getLoading } from '@/store/loading';
import { GettingBannerLoadingKey, SavingBannerLoadingKey } from '@/common';
import { BannerPhotoUrlUploader } from './BannerPhotoUrlUploader';
import { getLocale } from '@/store/persistState';
import { BannerHorizontal, BannerVertical } from '@/services/BannerService';

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const CreateUpdateBannerPage = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation(['common', 'banner']);
  const dispatch = useAppDispatch();

  const locale = useAppSelector(getLocale());
  const selectedBanner = useAppSelector(getSelectedBanner());
  const selectedBannerDetail = useAppSelector(getSelectedBannerDetail());
  const bannerPhotoUrl = useAppSelector(getBannerPhotoUrl());
  const isSubmmiting = useAppSelector(getLoading(SavingBannerLoadingKey));
  const isLoading = useAppSelector(getLoading(GettingBannerLoadingKey));

  const horizontalOptions = [
    {
      label: t('left', { ns: 'banner' }),
      value: BannerHorizontal.LEFT,
    },
    {
      label: t('center', { ns: 'banner' }),
      value: BannerHorizontal.CENTER,
    },
    {
      label: t('right', { ns: 'banner' }),
      value: BannerHorizontal.RIGHT,
    },
  ];

  const verticalOptions = [
    {
      label: t('top', { ns: 'banner' }),
      value: BannerVertical.TOP,
    },
    {
      label: t('middle', { ns: 'banner' }),
      value: BannerVertical.MIDDLE,
    },
    {
      label: t('bottom', { ns: 'banner' }),
      value: BannerVertical.BOTTOM,
    },
  ];

  useEffect(() => {
    if (locale && selectedBanner) {
      dispatch(bannerActions.getBannerRequest({ bannerId: selectedBanner.id }));
    }
  }, [locale, selectedBanner]);

  useEffect(() => {
    if (selectedBannerDetail) {
      form.setFieldsValue(selectedBannerDetail);
    } else {
      form.resetFields();
    }
  }, [selectedBannerDetail]);

  const handleSaveBanner = (values: any) => {
    const inputData = {
      ...values,
      photoUrl: bannerPhotoUrl,
    };
    if (selectedBanner) {
      // prettier-ignore
      dispatch(bannerActions.updateBannerRequest({ bannerId: selectedBanner.id, banner: { ...selectedBanner, ...inputData }}));
      return;
    }
    dispatch(bannerActions.createBannerRequest({ banner: inputData }));
  };

  const onImageDelete = () => {
    form.setFieldsValue({ upload: undefined });
    dispatch(bannerActions.setBannerPhotoUrl(undefined));
  };

  return (
    <div className='p-4'>
      <Link
        to={'/admin/banners'}
        className={'d-flex flex-row align-items-center gap-1 mb-1'}
      >
        <ArrowLeftOutlined style={{ fontSize: 12 }} />
        {t('Back', { ns: 'common' })}
      </Link>
      <div className='d-flex flex-row justify-content-between align-items-center'>
        <div>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {selectedBanner
              ? t('Update banner', { ns: 'banner' })
              : t('Create banner', { ns: 'banner' })}
          </Typography.Title>
        </div>
        <div>
          <Button type='primary' loading={isSubmmiting} onClick={form.submit}>
            {t('OkText', { ns: 'common' })}
          </Button>
        </div>
      </div>
      <Form form={form} layout='vertical' onFinish={handleSaveBanner}>
        <Spin spinning={isLoading}>
          <Row gutter={[10, 10]} className='mt-2'>
            <Col span={16}>
              <div className='w-full border-b-gray-500 rounded-2 bg-white p-4 shadow-sm'>
                <Form.Item
                  name='upload'
                  label={t('Photo', { ns: 'banner' })}
                  valuePropName='fileList'
                  getValueFromEvent={normFile}
                  rules={[
                    {
                      required: !bannerPhotoUrl,
                      message: t('Photo required', { ns: 'banner' }),
                    },
                  ]}
                >
                  <BannerPhotoUrlUploader onImageDelete={onImageDelete} />
                </Form.Item>
                <Form.Item
                  label={
                    <div>
                      <span>{t('Title', { ns: 'banner' })}</span>
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
                <Row gutter={[10, 10]}>
                  <Col sm={24} md={12}>
                    <Form.Item
                      label={
                        <div>
                          <span>{t('Button label', { ns: 'banner' })}</span>
                          {' - '}
                          <span className='text-uppercase text-danger'>
                            {locale}
                          </span>
                        </div>
                      }
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
                  </Col>
                  <Col sm={24} md={12}>
                    <Form.Item
                      label={t('Button link', { ns: 'banner' })}
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
                  </Col>
                </Row>
                <Form.Item
                  label={
                    <div>
                      <span>{t('Description', { ns: 'banner' })}</span>
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
                  label={t('Horizontal', { ns: 'banner' })}
                  name='horizontal'
                >
                  <Select options={horizontalOptions} />
                </Form.Item>
                <Form.Item
                  label={t('Vertical', { ns: 'banner' })}
                  name='vertical'
                >
                  <Select options={verticalOptions} />
                </Form.Item>
                <Form.List name='pageUrls'>
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      <div className='w-100 d-flex flex-row justify-content-between align-items-center'>
                        <Typography.Text className='ant-form-item-label'>
                          {t('Page url', { ns: 'banner' })}
                        </Typography.Text>
                        <Button
                          type='primary'
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          {t('Add page url', { ns: 'banner' })}
                        </Button>
                      </div>

                      {fields.map((field) => (
                        <div
                          key={field.key}
                          className='d-flex flex-row justify-content-between my-3 gap-2'
                        >
                          <Form.Item
                            {...field}
                            validateTrigger={['onChange', 'onBlur']}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message: t('Url required', { ns: 'banner' }),
                              },
                            ]}
                            noStyle
                          >
                            <Input
                              placeholder={t('Url placeholder', {
                                ns: 'banner',
                              })}
                            />
                          </Form.Item>
                          <MinusCircleOutlined
                            className='dynamic-delete-button'
                            onClick={() => remove(field.name)}
                          />
                        </div>
                      ))}
                      <Form.ErrorList errors={errors} />
                    </>
                  )}
                </Form.List>
              </div>
            </Col>
            <Col span={8}>
              <BannerInformation />
            </Col>
          </Row>
        </Spin>
      </Form>
    </div>
  );
};
