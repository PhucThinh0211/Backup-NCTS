import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { Button, Space, Table, TableColumnsType, TableProps } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { dateFormat, invalidDateStrings } from '@/common';
import { FileResponse } from '@/services/FileService';
import { useAppDispatch } from '@/store/hooks';
import { publicCmsActions } from '@/store/publicCms';

interface ReportsTableProps extends TableProps {
  dataSource: FileResponse[];
}
export const ReportsTable = (props: ReportsTableProps) => {
  const { t } = useTranslation(['common', 'media']);
  const dispatch = useAppDispatch();

  const handleDownloadDocument = (record: FileResponse) => {
    dispatch(publicCmsActions.downloadFileRequest({ document: record }));
  };

  const columns: TableColumnsType<FileResponse> = [
    {
      title: t('Name', { ns: 'media' }),
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: t('Publish date', { ns: 'media' }),
      key: 'issueDate',
      dataIndex: 'issueDate',
      render(value, record, index) {
        if (value && !invalidDateStrings.includes(value)) {
          return <>{dayjs(value).format(dateFormat)}</>;
        }
      },
    },
    {
      key: 'Action',
      width: 40,
      render: (_, record) => (
        <Space>
          <Button
            icon={<DownloadOutlined style={{ color: '#eca42e' }} />}
            type='text'
            onClick={() => handleDownloadDocument(record)}
          />
        </Space>
      ),
    },
  ];
  return <Table columns={columns} {...props} />;
};
