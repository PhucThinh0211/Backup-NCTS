import { useEffect, useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Row, Space, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { contentActions, getContentQueryParams } from '@/store/content';

export const NewsListToolbar = () => {
  const { t } = useTranslation('news');
  const dispatch = useAppDispatch();
  const [searchStr, setSearchStr] = useState();
  const [timer, setTimer] = useState<any>(null);

  const params = useAppSelector(getContentQueryParams());

  const onSearchChange = (evt: any) => {
    const search = evt.target.value;
    setSearchStr(search);
    clearTimeout(timer);
    const timeoutId = setTimeout(() => {
      dispatch(
        contentActions.getContentsRequest({
          params: { ...params, SkipCount: 0, Search: search },
        })
      );
    }, 500);
    setTimer(timeoutId);
  };

  useEffect(() => {
    setSearchStr(params?.Search || '');
  }, [params]);

  return (
    <Row style={{ padding: 10 }}>
      <Space style={{ flex: 1 }}>
        <Input
          value={searchStr}
          onChange={onSearchChange}
          allowClear
          placeholder={t('Find news')}
          suffix={searchStr ? null : <SearchOutlined />}
          style={{ width: 300 }}
        />
      </Space>
    </Row>
  );
};
