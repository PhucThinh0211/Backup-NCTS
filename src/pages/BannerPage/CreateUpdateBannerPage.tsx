import { ArrowLeftOutlined } from '@ant-design/icons';
import { getSelectedBanner } from '@/store/banner';
import { useAppSelector } from '@/store/hooks';
import { Button, Col, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BannerForm } from './BannerForm';
import { BannerInformation } from './BannerInformation';

export const CreateUpdateBannerPage = () => {
  const { t } = useTranslation(['common', 'banner']);
  const selectedBanner = useAppSelector(getSelectedBanner());
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
          <Button type='primary'>{t('OkText', { ns: 'common' })}</Button>
        </div>
      </div>
      <Row gutter={[10, 10]} className='mt-4'>
        <Col span={16}>
          <BannerForm />
        </Col>
        <Col span={8}>
          <BannerInformation />
        </Col>
      </Row>
    </div>
  );
};
