import { useEffect, useState } from 'react';

import { HomeOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { FolderResponse } from '@/services/FileService';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getFolderPath, mediaActions } from '@/store/media';
import { Row, Breadcrumb, Space, Button } from 'antd';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { useTranslation } from 'react-i18next';
import { showModal } from '@/store/modal';
import {
  CreateUpdateFileModalName,
  CreateUpdateFolderModalName,
} from '@/common';

export const PhotoListToolbar = () => {
  const { t } = useTranslation(['media']);
  const dispatch = useAppDispatch();

  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItemType[]>([]);

  const folderPath = useAppSelector(getFolderPath());

  const setFolderPath = (folderPath: FolderResponse[]) => {
    dispatch(mediaActions.setFolderPath(folderPath));
  };

  useEffect(() => {
    const breadcrumbItems: BreadcrumbItemType[] = [
      {
        title: <HomeOutlined />,
        // onClick: () => {
        //   if (folderPath.length > 0) {
        //     // dispatch(documentActions.getLabelRequest({ documentId: folderRootId, params }));
        //     setFolderPath([]);
        //   }
        // },
      },
    ];
    if (folderPath.length > 0) {
      folderPath.forEach((p, index) => {
        breadcrumbItems.push({
          title: <span style={{ cursor: 'pointer' }}>{`${p.name}`}</span>,
          onClick: () => {
            if (index < folderPath.length - 1)
              // dispatch(documentActions.getLabelRequest({ documentId: p.id, params: defaultPagingParams }));
              setFolderPath(folderPath.slice(0, index + 1));
          },
        });
      });
    }
    setBreadcrumbs(breadcrumbItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderPath]);

  const openUploadFile = () =>
    dispatch(showModal({ key: CreateUpdateFileModalName }));
  const createFolder = () =>
    dispatch(showModal({ key: CreateUpdateFolderModalName }));

  return (
    <Row style={{ marginBottom: 10 }}>
      <Space style={{ flex: 1 }}>
        {!!folderPath.length ? (
          <Breadcrumb items={breadcrumbs} style={{ padding: '0 18px 12px' }} />
        ) : (
          <div style={{ width: 1 }}></div>
        )}
      </Space>
      <Space>
        <Button icon={<UploadOutlined />} onClick={openUploadFile}>
          {t('Upload')}
        </Button>
        <Button icon={<PlusOutlined />} onClick={createFolder} type='primary'>
          {t('Create album')}
        </Button>
      </Space>
    </Row>
  );
};
