import { FolderOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getFolderPath, getFolders, mediaActions } from '@/store/media';
import { FolderResponse } from '@/services/FileService';
import { Table, TableColumnsType, Typography } from 'antd';
import Utils from '@/utils';
import { useTranslation } from 'react-i18next';
import { CertificateListToolbar } from './CertificateListToolbar';
import { useEffect, useState } from 'react';
import { getLoading } from '@/store/loading';
import { GettingMediaListLoadingKey } from '@/common';

export const CertificateListTable = () => {
  const { t } = useTranslation(['media']);
  const dispatch = useAppDispatch();
  const [dataSource, setDataSource] = useState<any[]>([]);

  const folderPath = useAppSelector(getFolderPath());
  const folders = useAppSelector(getFolders());
  const isLoading = useAppSelector(getLoading(GettingMediaListLoadingKey));

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
      title: t('Name'),
      key: 'name',
      width: 400,
      render: (value, record) => {
        return !record.isFolder ? (
          <>{record.fileName}</>
        ) : (
          <div
            className='d-flex gap-2 align-items-center'
            onDoubleClick={() => openFolder(record)}
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
      <CertificateListToolbar />
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={'id'}
        loading={isLoading}
      />
    </div>
  );
};
