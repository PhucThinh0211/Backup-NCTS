import { PlusOutlined } from '@ant-design/icons';
import { Button, Row, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { CreateUpdateMenuModalName } from '@/common/define';
import { getActiveMenu } from '@/store/app';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { showModal } from '@/store/modal';

export const MenuListHeader = () => {
  const { t } = useTranslation('menu');
  const dispatch = useAppDispatch();
  const activeMenu = useAppSelector(getActiveMenu());

  const createMenu = () => {
    dispatch(showModal({ key: CreateUpdateMenuModalName }));
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
