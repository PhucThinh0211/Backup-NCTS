import { NewsTypeListHeader } from './NewsTypeListHeader';
import { NewsTypeListTable } from './NewsTypeListTable';
import { NewsTypeListToolbar } from './NewsTypeListToolbar';

export const NewsTypeList = () => {
  return (
    <>
      <NewsTypeListHeader />
      <NewsTypeListToolbar />
      <NewsTypeListTable />
    </>
  );
};
