import { ArrowLeftOutlined } from '@ant-design/icons';
import { getSelectedMenu } from '@/store/menu';
import { useAppSelector } from '@/store/hooks';
import { Button, Col, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MenuForm } from './MenuForm';
import { MenuInformation } from './MenuInformation';

export const CreateUpdateMenuPage = () => {
  const { t } = useTranslation(['common', 'menu']);
  const selectedMenu = useAppSelector(getSelectedMenu());
  return (
    <div className='p-4'>
      <Link to={'/admin/menu'} className={'flex flex-row items-center gap-1'}>
        <ArrowLeftOutlined style={{ fontSize: 12 }} />
        {t('Back', { ns: 'common' })}
      </Link>
      <div className='flex flex-row justify-between items-center'>
        <div>
          <Typography.Title level={4}>
            {selectedMenu ? 'Update menu' : 'Create menu'}
          </Typography.Title>
        </div>
        <div>
          <Button type='primary'>{t('OkText', { ns: 'common' })}</Button>
        </div>
      </div>
      <Row gutter={[10, 10]} className='mt-4'>
        <Col span={16}>
          <MenuForm />
        </Col>
        <Col span={8}>
          <MenuInformation />
        </Col>
      </Row>
    </div>
  );
};
