import { FolderOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getFolderPath, getFolders, mediaActions } from '@/store/media';
import { FolderResponse } from '@/services/FileService';
import { Table, TableColumnsType, Typography } from 'antd';
import Utils from '@/utils';
import { useTranslation } from 'react-i18next';
import { DocumentListToolbar } from './DocumentListToolbar';
import { useEffect, useState } from 'react';

export const DocumentListTable = () => {
  const { t } = useTranslation(['media']);
  const dispatch = useAppDispatch();
  const [dataSource, setDataSource] = useState<any[]>([]);

  const folderPath = useAppSelector(getFolderPath());
  const folders = useAppSelector(getFolders());

  const currentPath = folderPath[folderPath.length - 1];

  const setFolderPath = (folderPath: FolderResponse[]) => {
    dispatch(mediaActions.setFolderPath(folderPath));
  };

  const openFolder = (folder: any) => {
    // dispatch(documentActions.getLabelRequest({ documentId: document.id, params: defaultPagingParams }));
    setFolderPath([...folderPath, folder]);
  };

  const columns: TableColumnsType<any> = [
    {
      dataIndex: 'type',
      key: 'type',
      width: '30px',
      align: 'center',
      render: (value, record) => {
        return !record.isFolder ? (
          <></>
        ) : (
          <FolderOutlined
            onDoubleClick={() => openFolder(record)}
            style={{ fontSize: 20, cursor: 'pointer', margin: 'auto' }}
          />
        );
      },
    },
    {
      title: t('Name'),
      key: 'name',
      width: 400,
      render: (value, record) => {
        return !record.isFolder ? (
          <>{record.fileName}</>
        ) : (
          <Typography.Text
            style={{ cursor: 'pointer' }}
            onDoubleClick={() => openFolder(record)}
          >
            {record.name}
          </Typography.Text>
        );
      },
    },
    {
      title: t('Size'),
      dataIndex: 'fileSize',
      key: 'fileSize',
      render: (size) => <>{size ? Utils.readableFileSize(size) : ''}</>,
    },
    {
      fixed: 'right',
      align: 'center',
      width: '80px',
      key: 'action',
      render: (_, record) => {
        return (
          <></>
          // !!getMoreActions(record).length && (
          //   <Dropdown menu={{ items: getMoreActions(record) }}>
          //     <Button icon={<DashOutlined style={{ fontSize: 12 }} />} shape="circle" />
          //   </Dropdown>
          // )
        );
      },
    },
  ];

  useEffect(() => {
    let newDataSource = [
      ...folders.filter(
        (folder) =>
          (!currentPath && !folder.parentId) ||
          folder.parentId === currentPath?.id
      ),
      ...(currentPath?.files || []),
    ];
    setDataSource(newDataSource);
  }, [currentPath, folders]);

  return (
    <div style={{ padding: 10 }}>
      <DocumentListToolbar />
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};
