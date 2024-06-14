import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { mediaActions } from '@/store/media';
import { DocumentListTable } from './DocumentListTable';
import { DocumentListHeader } from './DocumentListHeader';
import { MediaType } from '@/services/FileService';
import { CreateUpdateFileModal } from '../CreateUpdateFileModal';
import { CreateUpdateFolderModal } from '../CreateUpdateFolderModal';
import { getLanguage } from '@/store/persistState';
import { largePagingParams } from '@/common';

export const DocumentList = () => {
  const mediaType = MediaType.DOCUMENTS;
  const dispatch = useAppDispatch();

  const lang = useAppSelector(getLanguage());

  useEffect(() => {
    dispatch(
      mediaActions.getDocumentTypesRequest({ params: largePagingParams })
    );
  }, [lang]);

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
      <DocumentListHeader />
      <DocumentListTable />
      <CreateUpdateFileModal />
      <CreateUpdateFolderModal />
    </>
  );
};
