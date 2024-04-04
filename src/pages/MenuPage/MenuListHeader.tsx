import { PlusOutlined } from '@ant-design/icons';
import { Button, Row, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { getActiveMenu } from '@/store/app';
import { useAppSelector } from '@/store/hooks';
import { useNavigate } from 'react-router-dom';

export const MenuListHeader = () => {
  const { t } = useTranslation('menu');
  const navigate = useNavigate();
  const activeMenu = useAppSelector(getActiveMenu());

  const createMenu = () => {
    navigate('/admin/menu/create');
  };

  return (
    <Row style={{ padding: 10, backgroundColor: 'white' }}>
      <Space style={{ flex: 1 }}>
        <Typography.Title style={{ margin: 0 }} level={4}>
          {activeMenu?.label}
        </Typography.Title>
      </Space>
      <Space>
        <Button type='primary' icon={<PlusOutlined />} onClick={createMenu}>
          {t('Add new menu')}
        </Button>
        {/* <Button
          icon={<DashOutlined />}
          onClick={() => {
            Utils.developingNotification();
          }}
        /> */}
      </Space>
    </Row>
  );
};
