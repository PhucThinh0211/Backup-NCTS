import { useEffect } from 'react';

import { Avatar, Button, Col, Form, Input, Row, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
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
import { SavingBannerLoadingKey } from '@/common';
import { BannerPhotoUrlUploader } from './BannerPhotoUrlUploader';
import vi from '@/assets/vn.svg';
import en from '@/assets/us.svg';
import { getLocale } from '@/store/persistState';

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

export const CreateUpdateBannerPage = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation(['common', 'banner']);
  const dispatch = useAppDispatch();

  const locale = useAppSelector(getLocale());
  const selectedBanner = useAppSelector(getSelectedBanner());
  const selectedBannerDetail = useAppSelector(getSelectedBannerDetail());
  const bannerPhotoUrl = useAppSelector(getBannerPhotoUrl());
  const isSubmmiting = useAppSelector(getLoading(SavingBannerLoadingKey));

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
      pageUrls: [],
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
        className={'flex flex-row items-center gap-1 mb-4'}
      >
        <ArrowLeftOutlined style={{ fontSize: 12 }} />
        {t('Back', { ns: 'common' })}
      </Link>
      <div className='flex flex-row justify-between items-center'>
        <div>
          <Typography.Title level={4}>
            {selectedBanner ? 'Update banner' : 'Create banner'}
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
        onFinish={handleSaveBanner}
      >
        <Row gutter={[10, 10]} className='mt-4'>
          <Col span={16}>
            <div className='w-full border-b-gray-500 rounded-md bg-white p-4 shadow-sm'>
              <Form.Item
                label={t('Title', { ns: 'banner' })}
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
                <Input suffix={<Avatar size={18} src={locale ? flag[locale] : flag['vi']} />}/>
              </Form.Item>
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
                label={t('Description', { ns: 'banner' })}
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
            </div>
          </Col>
          <Col span={8}>
            <BannerInformation />
          </Col>
        </Row>
      </Form>
    </div>
  );
};
