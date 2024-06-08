import { PlusOutlined } from '@ant-design/icons';
import { Button, Row, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { getActiveMenu } from '@/store/app';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { IdentityModalEnum, identityActions } from '@/store/identity';
import { showModal } from '@/store/modal';

export const RoleListHeader = () => {
  const { t } = useTranslation('role');
  const activeMenu = useAppSelector(getActiveMenu());
  const dispatch = useAppDispatch();

  const createRole = () => {
    dispatch(identityActions.setRoleSelected(undefined));

    dispatch(showModal({ key: IdentityModalEnum.createUpdateRoleModal }));
  };

  return (
    <Row style={{ padding: 10, backgroundColor: 'white' }}>
      <Space style={{ flex: 1 }}>
        <Typography.Title style={{ margin: 0 }} level={4}>
          {activeMenu?.label}
        </Typography.Title>
      </Space>
      <Space>
        <Button type='primary' icon={<PlusOutlined />} onClick={createRole}>
          {t('Add new')}
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
