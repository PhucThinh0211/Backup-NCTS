import { ArrowLeftOutlined } from '@ant-design/icons';
import { bannerActions, getSelectedBanner } from '@/store/banner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BannerInformation } from './BannerInformation';
import { getLoading } from '@/store/loading';
import { SavingBannerLoadingKey } from '@/common';

export const CreateUpdateBannerPage = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation(['common', 'banner']);
  const dispatch = useAppDispatch();

  const selectedBanner = useAppSelector(getSelectedBanner());
  const isSubmmiting = useAppSelector(getLoading(SavingBannerLoadingKey));

  const handleSaveBanner = (values: any) => {
    const inputData = {
      ...values,
    };
    if (selectedBanner) {
      // prettier-ignore
      dispatch(bannerActions.updateBannerRequest({ bannerId: selectedBanner.id, banner: { ...selectedBanner, ...inputData }}));
      return;
    }
    dispatch(bannerActions.createBannerRequest({ banner: inputData }));
  };

  return (
    <div className='p-4'>
      <Link
        to={'/admin/banners'}
        className={'flex flex-row items-center gap-1'}
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
        initialValues={{
          ...selectedBanner,
        }}
        onFinish={handleSaveBanner}
      >
        <Row gutter={[10, 10]} className='mt-4'>
          <Col span={16}>
            <div className='w-full border-b-gray-500 rounded-md bg-white p-4 shadow-sm'>
              <Form.Item
                label={'Title'}
                name='title'
                rules={[{ required: true, message: t('Title required') }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label={'Description'} name='description'>
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
