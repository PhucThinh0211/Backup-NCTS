import { DocumentTypeListHeader } from './DocumentTypeListHeader';
import { DocumentTypeListTable } from './DocumentTypeListTable';
import { DocumentTypeListToolbar } from './DocumentTypeListToolbar';

export const DocumentTypeList = () => {
  return (
    <>
      <DocumentTypeListHeader />
      <DocumentTypeListToolbar />
      <DocumentTypeListTable />
    </>
  );
};
