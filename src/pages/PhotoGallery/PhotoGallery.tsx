import { uploadedFileUrl } from '@/common';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  getPhotos,
  getSelectedPageDetail,
  getSelectedPhotoAlbum,
  publicCmsActions,
} from '@/store/publicCms';
import { Divider, Image } from 'antd';
import { useEffect } from 'react';

export const PhotoGallery = () => {
  const dispatch = useAppDispatch();

  const pageDetail = useAppSelector(getSelectedPageDetail());
  const photos = useAppSelector(getPhotos());
  const selectedPhotoAlbum = useAppSelector(getSelectedPhotoAlbum());

  useEffect(() => {
    dispatch(publicCmsActions.getPhotosRequest({}));
  }, []);

  return (
    <div style={{ backgroundColor: '#80808008' }}>
      <div className='container py-2 py-md-5  p-3 p-lg-5'>
        <div className='h5 text-orange'>{pageDetail?.title}</div>
        <Divider style={{ marginTop: 4 }} />
        {selectedPhotoAlbum?.files?.length && (
          <div>
            <Image.PreviewGroup>
              {selectedPhotoAlbum?.files.map((file) => (
                <Image
                  src={uploadedFileUrl(`${file.location}/${file.fileName}`)}
                />
              ))}
            </Image.PreviewGroup>
          </div>
        )}
      </div>
    </div>
  );
};
