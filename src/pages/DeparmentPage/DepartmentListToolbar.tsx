import { useEffect, useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Row, Space, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getDepartmentQueryParams, departmentActions } from '@/store/department';

export const DepartmentListToolbar = () => {
  const { t } = useTranslation('department');
  const [searchStr, setSearchStr] = useState();
  const [timer, setTimer] = useState<any>(null);
  const dispatch = useAppDispatch();
  const queryParams = useAppSelector(getDepartmentQueryParams());

  useEffect(() => {
    if (queryParams?.search) {
      setSearchStr(queryParams.search);
    }
  }, [queryParams]);

  const onSearchChange = (evt: any) => {
    const search = evt.target.value;
    setSearchStr(search);
    clearTimeout(timer);
    const timeoutId = setTimeout(() => {
      dispatch(
        departmentActions.setQueryParams({
          ...queryParams,
          search: search,
        })
      );
      // dispatch(departmentActions.getDepartmentsRequest({ params: { ...params, page: 1, search }, projectId: selectedProject?.id }));
    }, 500);
    setTimer(timeoutId);
  };

  return (
    <Row style={{ padding: 10 }}>
      <Space style={{ flex: 1 }}>
        <Input
          value={searchStr}
          onChange={onSearchChange}
          allowClear
          placeholder={t('Find department')}
          suffix={searchStr ? null : <SearchOutlined />}
          style={{ width: 300 }}
        />
      </Space>
    </Row>
  );
};
