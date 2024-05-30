import { PlusOutlined } from '@ant-design/icons';
import { Button, Row, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { getActiveMenu } from '@/store/app';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useNavigate } from 'react-router-dom';
import { newsTypeActions } from '@/store/newsType';
import { getLanguage, persistStateActions } from '@/store/persistState';

export const NewsTypeListHeader = () => {
  const { t } = useTranslation('newsType');
  const navigate = useNavigate();
  const activeMenu = useAppSelector(getActiveMenu());
  const dispatch = useAppDispatch();
  const language = useAppSelector(getLanguage());

  const createNewsType = () => {
    dispatch(newsTypeActions.setSelectedNewsType(undefined));
    dispatch(newsTypeActions.setSelectedNewsTypeDetail(undefined));

    dispatch(persistStateActions.setLocale(language));
    navigate('/admin/news-type/create-or-edit');
  };

  return (
    <Row style={{ padding: 10, backgroundColor: 'white' }}>
      <Space style={{ flex: 1 }}>
        <Typography.Title style={{ margin: 0 }} level={4}>
          {activeMenu?.label}
        </Typography.Title>
      </Space>
      <Space>
        <Button type='primary' icon={<PlusOutlined />} onClick={createNewsType}>
          {t('Add new newsType')}
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
