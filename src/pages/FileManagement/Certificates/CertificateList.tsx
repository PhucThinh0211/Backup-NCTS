import { useEffect } from 'react';

import { largePagingParams } from '@/common';
import { MediaType } from '@/services/FileService';
import { useAppDispatch } from '@/store/hooks';
import { mediaActions } from '@/store/media';

import { CreateUpdateFileModal } from '../CreateUpdateFileModal';
import { CreateUpdateFolderModal } from '../CreateUpdateFolderModal';
import { CertificateListHeader } from './CertificateListHeader';
import { CertificateListTable } from './CertificateListTable';

export const CertificateList = () => {
  const mediaType = MediaType.CERTIFICATES;
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
      <CertificateListHeader />
      <CertificateListTable />
      <CreateUpdateFileModal />
      <CreateUpdateFolderModal />
    </>
  );
};
