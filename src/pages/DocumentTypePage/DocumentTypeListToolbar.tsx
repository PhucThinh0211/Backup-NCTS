import { useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Row, Space, Input } from 'antd';
import { useTranslation } from 'react-i18next';

export const DocumentTypeListToolbar = () => {
  const { t } = useTranslation('documentType');
  const [searchStr, setSearchStr] = useState();
  const [timer, setTimer] = useState<any>(null);

  const onSearchChange = (evt: any) => {
    const search = evt.target.value;
    setSearchStr(search);
    clearTimeout(timer);
    const timeoutId = setTimeout(() => {
      // dispatch(documentTypeActions.getDocumentTypesRequest({ params: { ...params, page: 1, search }, projectId: selectedProject?.id }));
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
          placeholder={t('Find documentType')}
          suffix={searchStr ? null : <SearchOutlined />}
          style={{ width: 300 }}
        />
      </Space>
    </Row>
  );
};
