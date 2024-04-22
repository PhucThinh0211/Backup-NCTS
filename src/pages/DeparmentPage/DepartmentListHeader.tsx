import { PlusOutlined } from '@ant-design/icons';
import { Button, Row, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { getActiveMenu } from '@/store/app';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useNavigate } from 'react-router-dom';
import { departmentActions } from '@/store/department';
import { getLanguage, persistStateActions } from '@/store/persistState';

export const DepartmentListHeader = () => {
  const { t } = useTranslation('department');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activeMenu = useAppSelector(getActiveMenu());
  const language = useAppSelector(getLanguage());

  const createDepartment = () => {
    dispatch(departmentActions.setSelectedDepartment(undefined));
    dispatch(departmentActions.setSelectedDepartmentDetail(undefined));

    dispatch(persistStateActions.setLocale(language));
    navigate('/admin/contacts/create');
  };

  return (
    <Row style={{ padding: 10, backgroundColor: 'white' }}>
      <Space style={{ flex: 1 }}>
        <Typography.Title style={{ margin: 0 }} level={4}>
          {activeMenu?.label}
        </Typography.Title>
      </Space>
      <Space>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={createDepartment}
        >
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
