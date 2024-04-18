import { NewsListHeader } from './NewsListHeader';
import { NewsListTable } from './NewsListTable';
import { NewsListToolbar } from './NewsListToolbar';

export const NewsList = () => {
  return (
    <>
      <NewsListHeader />
      <NewsListToolbar />
      <NewsListTable />
    </>
  );
};
