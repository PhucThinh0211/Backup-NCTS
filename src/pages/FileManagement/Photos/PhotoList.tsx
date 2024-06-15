import { MediaType } from '@/services/FileService';
import { useAppDispatch } from '@/store/hooks';
import { mediaActions } from '@/store/media';
import React, { useEffect } from 'react';
import { CreateUpdateFileModal } from '../CreateUpdateFileModal';
import { CreateUpdateFolderModal } from '../CreateUpdateFolderModal';
import { PhotoListHeader } from './PhotoListHeader';
import { PhotoListTable } from './PhotoListTable';

export const PhotoList = () => {
  const mediaType = MediaType.PHOTOS;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(mediaActions.setFolderPath([]));
    dispatch(
      mediaActions.getFoldersRequest({
        params: {
          Type: mediaType,
        },
      })
    );
    dispatch(mediaActions.setMediaType(mediaType));
  }, []);

  return (
    <>
      <PhotoListHeader />
      <PhotoListTable />
      <CreateUpdateFileModal />
      <CreateUpdateFolderModal />
    </>
  );
};
