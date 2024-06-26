import React, { useEffect, useState } from 'react';

import { Divider, Breadcrumb, Row, Col } from 'antd';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { PictureOutlined } from '@ant-design/icons';

import { uploadedFileUrl } from '@/common';
import { FolderResponse } from '@/services/FileService';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  getVideoAlbumPath,
  getVideos,
  getSelectedPageDetail,
  publicCmsActions,
} from '@/store/publicCms';
import { Album } from '@/components/Album/Album';
import ReactPlayer from 'react-player/lazy';

export const VideoGallery = () => {
  const dispatch = useAppDispatch();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItemType[]>([]);

  const pageDetail = useAppSelector(getSelectedPageDetail());
  const videos = useAppSelector(getVideos());
  const videoAlbumPath = useAppSelector(getVideoAlbumPath());

  const currentVideoAlbum = videoAlbumPath[videoAlbumPath.length - 1];
  const childrenVideoAlbum = videos?.filter(
    (video) => video.parentId === currentVideoAlbum?.id
  );

  const setVideoAlbumPath = (videoAlbumPath: FolderResponse[]) => {
    dispatch(publicCmsActions.setVideoAlbumPath(videoAlbumPath));
  };

  useEffect(() => {
    dispatch(publicCmsActions.getVideosRequest({}));
  }, []);

  useEffect(() => {
    const breadcrumbItems: BreadcrumbItemType[] = [];
    if (videoAlbumPath.length > 0) {
      videoAlbumPath.forEach((p, index) => {
        breadcrumbItems.push({
          title: <span style={{ cursor: 'pointer' }}>{`${p.name}`}</span>,
          onClick: () => {
            if (index < videoAlbumPath.length - 1)
              // dispatch(documentActions.getLabelRequest({ documentId: p.id, params: defaultPagingParams }));
              setVideoAlbumPath(videoAlbumPath.slice(0, index + 1));
          },
        });
      });
    }
    setBreadcrumbs(breadcrumbItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoAlbumPath]);

  const openAlbum = (album: any) => {
    // dispatch(documentActions.getLabelRequest({ documentId: document.id, params: defaultPagingParams }));
    setVideoAlbumPath([...videoAlbumPath, album]);
  };

  return (
    <div style={{ backgroundColor: '#80808008' }}>
      <div className='container py-2 py-md-5  p-3 p-lg-5'>
        {!!videoAlbumPath.length ? (
          <Breadcrumb items={breadcrumbs} style={{ padding: '0 0 12px' }} />
        ) : (
          <div style={{ width: 1 }}></div>
        )}
        <div className='h5 text-orange'>{pageDetail?.title}</div>
        <Divider style={{ marginTop: 4 }} />
        {!!currentVideoAlbum?.files?.length && (
          <div>
            <Row gutter={[30, 40]}>
              {currentVideoAlbum?.files.map((file) => (
                <Col span={24} sm={12} lg={8} xxl={6} key={file.id}>
                  <ReactPlayer
                    controls
                    width={'100%'}
                    height={192}
                    // url='https://test-videos.co.uk/vids/bigbuckbunny/webm/vp8/360/Big_Buck_Bunny_360_10s_1MB.webm'
                    url={uploadedFileUrl(`${file.location}/${file.fileName}`)}
                  />
                </Col>
              ))}
              {(childrenVideoAlbum || []).map(
                (album) =>
                  !!album.files?.length && (
                    <Col span={24} sm={12} lg={8} xxl={6} key={album.id}>
                      <Album
                        album={album}
                        onClick={() => openAlbum(album)}
                        type='video'
                      />
                    </Col>
                  )
              )}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};
