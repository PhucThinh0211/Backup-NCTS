import { BannerListHeader } from './BannerListHeader';
import { BannerListTable } from './BannerListTable';
import { BannerListToolbar } from './BannerListToolbar';

export const BannerList = () => {
  return (
    <>
      <BannerListHeader />
      <BannerListToolbar />
      <BannerListTable />
    </>
  );
};
