import { NewsListHeader } from './NewsListHeader';
import { NewsListTable } from './NewsListTable';
import { NewsListToolbar } from './NewsListToolbar';
import './NewsPage.css';

export const NewsList = () => {
  return (
    <>
      <NewsListHeader />
      <NewsListToolbar />
      <NewsListTable />
    </>
  );
};
