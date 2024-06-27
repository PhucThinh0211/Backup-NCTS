import { FolderOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  getDocumentTypes,
  getFolderPath,
  getFolders,
  mediaActions,
} from '@/store/media';
import { FileResponse, FolderResponse } from '@/services/FileService';
import {
  Button,
  Modal,
  Space,
  Table,
  TableColumnsType,
  Typography,
} from 'antd';
import Utils from '@/utils';
import { useTranslation } from 'react-i18next';
import { DocumentListToolbar } from './DocumentListToolbar';
import { useEffect, useState } from 'react';
import { GettingMediaListLoadingKey } from '@/common';
import { getLoading } from '@/store/loading';

export const DocumentListTable = () => {
  const { t } = useTranslation(['media', 'common']);
  const dispatch = useAppDispatch();
  const [dataSource, setDataSource] = useState<any[]>([]);

  const folderPath = useAppSelector(getFolderPath());
  const folders = useAppSelector(getFolders());
  const documentTypes = useAppSelector(getDocumentTypes());
  const isLoading = useAppSelector(getLoading(GettingMediaListLoadingKey));

  const currentPath = folderPath[folderPath.length - 1];

  const setFolderPath = (folderPath: FolderResponse[]) => {
    dispatch(mediaActions.setFolderPath(folderPath));
  };

  const openFolder = (folder: any) => {
    // dispatch(documentActions.getLabelRequest({ documentId: document.id, params: defaultPagingParams }));
    setFolderPath([...folderPath, folder]);
  };

  const handleDeleteFile = (fileId: string) => {
    dispatch(mediaActions.deleteFileRequest({ fileId }));
  };

  const confirmDeleteFile = (file: FileResponse) => {
    Modal.confirm({
      title: t('Notification', { ns: 'common' }),
      content: (
        <div
          dangerouslySetInnerHTML={{
            __html: t('ConfirmRemove', {
              name: `<strong>"${file.name}"</strong>`,
              ns: 'common',
            }),
          }}
        />
      ),
      centered: true,
      closable: true,
      onOk: (close) => {
        handleDeleteFile(file.id);
        close();
      },
    });
  };

  const moreActions = [
    {
      key: 'remove',
      label: t('Remove', { ns: 'common' }),
      icon: <DeleteOutlined style={{ color: '#ff4d4f' }} />,
    },
  ];

  const handleMoreActionClick = (key: any, record: FileResponse) => {
    switch (key) {
      case 'remove':
        confirmDeleteFile(record);
        break;
      default:
        confirmDeleteFile(record);
        break;
    }
  };

  const columns: TableColumnsType<any> = [
    {
      title: t('Name'),
      key: 'name',
      width: 360,
      render: (value, record) => {
        return !record.isFolder ? (
          <>{record.fileName}</>
        ) : (
          <div
            className='d-flex gap-2 align-items-center'
            onClick={() => openFolder(record)}
          >
            <FolderOutlined
              style={{
                fontSize: 20,
                cursor: 'pointer',
              }}
            />
            <Typography.Text style={{ cursor: 'pointer' }}>
              {record.name}
            </Typography.Text>
          </div>
        );
      },
    },
    {
      title: t('Document type', { ns: 'media' }),
      dataIndex: 'category',
      key: 'category',
      render: (value, record) =>
        !record.isFolder && (
          <>
            {
              (documentTypes?.items || []).find(
                (documentType) => documentType.id === value
              )?.name
            }
          </>
        ),
    },
    {
      title: t('Public', { ns: 'common' }),
      dataIndex: 'public',
      key: 'public',
      render: (value, record) =>
        !record.isFolder && (
          <>
            {value
              ? t('Public', { ns: 'common' })
              : t('Non Public', { ns: 'common' })}
          </>
        ),
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
          !record.isFolder && (
            <Space>
              {moreActions.map((action) => (
                <Button
                  type='text'
                  icon={action.icon}
                  key={action.key}
                  onClick={() => handleMoreActionClick(action.key, record)}
                />
              ))}
            </Space>
          )
        );
      },
    },
  ];

  useEffect(() => {
    const newFolders = folders.filter(
      (folder) =>
        (!currentPath && !folder.parentId) ||
        folder.parentId === currentPath?.id
    );
    const currentFolder = folders.find(
      (folder) => folder.id === currentPath?.id
    );
    let newDataSource = [...newFolders, ...(currentFolder?.files || [])];
    setDataSource(newDataSource);
  }, [currentPath, folders]);

  return (
    <div style={{ padding: 10 }}>
      <DocumentListToolbar />
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={'id'}
        loading={isLoading}
      />
    </div>
  );
};
