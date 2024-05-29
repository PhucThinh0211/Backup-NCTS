import { useEffect } from 'react';

import { PageContentListHeader } from './PageContentListHeader';
import { PageContentListTable } from './PageContentListTable';
import { PageContentListToolbar } from './PageContentListToolbar';
import './PageContent.css'
import { largePagingParams } from '@/common';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { pageContentActions } from '@/store/pageContent';
import { getLanguage } from '@/store/persistState';

export const PageContentList = () => {
  const dispatch = useAppDispatch();

  const language = useAppSelector(getLanguage());

  useEffect(() => {
    dispatch(pageContentActions.getNewsTypesRequest({ params: largePagingParams }));
    dispatch(pageContentActions.getDocumentTypesRequest({ params: largePagingParams }));
    dispatch(pageContentActions.getMenusRequest({ params: largePagingParams }));
  }, [language]);

  return (
    <>
      <PageContentListHeader />
      <PageContentListToolbar />
      <PageContentListTable />
    </>
  );
};
