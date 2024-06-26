import { useEffect, useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Row, Space, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  getPageContentQueryParams,
  pageContentActions,
} from '@/store/pageContent';

export const PageContentListToolbar = () => {
  const { t } = useTranslation('pageContent');
  const dispatch = useAppDispatch();
  const [searchStr, setSearchStr] = useState();
  const [timer, setTimer] = useState<any>(null);

  const params = useAppSelector(getPageContentQueryParams());

  const onSearchChange = (evt: any) => {
    const search = evt.target.value;
    setSearchStr(search);
    clearTimeout(timer);
    const timeoutId = setTimeout(() => {
      dispatch(
        pageContentActions.getPageContentsRequest({
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
          placeholder={t('Find page')}
          suffix={searchStr ? null : <SearchOutlined />}
          style={{ width: 300 }}
        />
      </Space>
    </Row>
  );
};
