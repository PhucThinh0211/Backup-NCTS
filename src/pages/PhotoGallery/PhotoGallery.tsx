import { useEffect, useState } from 'react';

import { Divider, Image, Breadcrumb, Row, Col } from 'antd';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { PictureOutlined } from '@ant-design/icons';

import { uploadedFileUrl } from '@/common';
import { FolderResponse } from '@/services/FileService';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  getPhotoAlbumPath,
  getPhotos,
  getSelectedPageDetail,
  publicCmsActions,
} from '@/store/publicCms';
import { Album } from '@/components/Album/Album';

export const PhotoGallery = () => {
  const dispatch = useAppDispatch();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItemType[]>([]);

  const pageDetail = useAppSelector(getSelectedPageDetail());
  const photos = useAppSelector(getPhotos());
  const photoAlbumPath = useAppSelector(getPhotoAlbumPath());

  const currentPhotoAlbum = photoAlbumPath[photoAlbumPath.length - 1];
  const childrenPhotoAlbum = photos?.filter(
    (photo) => photo.parentId === currentPhotoAlbum?.id
  );

  const setPhotoAlbumPath = (photoAlbumPath: FolderResponse[]) => {
    dispatch(publicCmsActions.setPhotoAlbumPath(photoAlbumPath));
  };

  useEffect(() => {
    dispatch(publicCmsActions.getPhotosRequest({}));
  }, []);

  useEffect(() => {
    const breadcrumbItems: BreadcrumbItemType[] = [];
    if (photoAlbumPath.length > 0) {
      photoAlbumPath.forEach((p, index) => {
        breadcrumbItems.push({
          title: <span style={{ cursor: 'pointer' }}>{`${p.name}`}</span>,
          onClick: () => {
            if (index < photoAlbumPath.length - 1)
              // dispatch(documentActions.getLabelRequest({ documentId: p.id, params: defaultPagingParams }));
              setPhotoAlbumPath(photoAlbumPath.slice(0, index + 1));
          },
        });
      });
    }
    setBreadcrumbs(breadcrumbItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoAlbumPath]);

  const openAlbum = (album: any) => {
    // dispatch(documentActions.getLabelRequest({ documentId: document.id, params: defaultPagingParams }));
    setPhotoAlbumPath([...photoAlbumPath, album]);
  };

  return (
    <div style={{ backgroundColor: '#80808008' }}>
      <div className='container py-2 py-md-5  p-3 p-lg-5'>
        {!!photoAlbumPath.length ? (
          <Breadcrumb items={breadcrumbs} style={{ padding: '0 0 12px' }} />
        ) : (
          <div style={{ width: 1 }}></div>
        )}
        <div className='h5 text-orange'>{pageDetail?.title}</div>
        <Divider style={{ marginTop: 4 }} />
        {!!currentPhotoAlbum?.files?.length && (
          <div>
            <Image.PreviewGroup>
              <Row gutter={[30, 40]}>
                {currentPhotoAlbum?.files.map((file) => (
                  <Col span={24} sm={12} lg={8} xl={6} key={file.id}>
                    <Image
                      src={uploadedFileUrl(`${file.location}/${file.fileName}`)}
                      alt={file.fileName}
                    />
                  </Col>
                ))}
                {(childrenPhotoAlbum || []).map(
                  (album) =>
                    !!album.files?.length && (
                      <Col span={24} sm={12} lg={8} xl={6} key={album.id}>
                        <Album album={album} onClick={() => openAlbum(album)} />
                      </Col>
                    )
                )}
              </Row>
            </Image.PreviewGroup>
          </div>
        )}
      </div>
    </div>
  );
};
