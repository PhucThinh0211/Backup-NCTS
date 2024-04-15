import { PlusOutlined } from '@ant-design/icons';
import { Button, Row, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { getActiveMenu } from '@/store/app';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useNavigate } from 'react-router-dom';
import { menuActions } from '@/store/menu';
import { getLanguage, persistStateActions } from '@/store/persistState';

export const MenuListHeader = () => {
  const { t } = useTranslation('menu');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activeMenu = useAppSelector(getActiveMenu());
  const language = useAppSelector(getLanguage());

  const createMenu = () => {
    dispatch(menuActions.setSelectedMenu(undefined));
    dispatch(menuActions.setSelectedMenuDetail(undefined));

    dispatch(persistStateActions.setLocales(language));
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
