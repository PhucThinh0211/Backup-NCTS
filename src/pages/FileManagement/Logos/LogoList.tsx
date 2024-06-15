import { useEffect } from 'react';

import { MediaType } from '@/services/FileService';
import { useAppDispatch } from '@/store/hooks';
import { mediaActions } from '@/store/media';

import { CreateUpdateFileModal } from '../CreateUpdateFileModal';
import { CreateUpdateFolderModal } from '../CreateUpdateFolderModal';
import { LogoListHeader } from './LogoListHeader';
import { LogoListTable } from './LogoListTable';

export const LogoList = () => {
  const mediaType = MediaType.LOGOS;
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
      <LogoListHeader />
      <LogoListTable />
      <CreateUpdateFileModal />
      <CreateUpdateFolderModal />
    </>
  );
};
