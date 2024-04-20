import { PageContentListHeader } from './PageContentListHeader';
import { PageContentListTable } from './PageContentListTable';
import { PageContentListToolbar } from './PageContentListToolbar';
import './PageContent.css'

export const PageContentList = () => {
  return (
    <>
      <PageContentListHeader />
      <PageContentListToolbar />
      <PageContentListTable />
    </>
  );
};
