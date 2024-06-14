import { useEffect } from 'react';
import { MediaType } from '@/services/FileService';
import { useAppDispatch } from '@/store/hooks';
import { mediaActions } from '@/store/media';

import { CreateUpdateFileModal } from '../CreateUpdateFileModal';
import { CreateUpdateFolderModal } from '../CreateUpdateFolderModal';
import { VideoListHeader } from './VideoListHeader';
import { VideoListTable } from './VideoListTable';

export const VideoList = () => {
  const mediaType = MediaType.VIDEOS;
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
      <VideoListHeader />
      <VideoListTable />
      <CreateUpdateFileModal />
      <CreateUpdateFolderModal />
    </>
  );
};
