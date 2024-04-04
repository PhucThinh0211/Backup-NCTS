import { MenuListHeader } from './MenuListHeader';
import { MenuListTable } from './MenuListTable';
import { MenuListToolbar } from './MenuListToolbar';
import { CreateUpdateMenuModal } from './CreateUpdateMenuModal';
import { CreateUpdateMenuModalName } from '@/common/modalName';
import { useAppSelector } from '@/store/hooks';
import { getModalVisible } from '@/store/modal';

export const MenuList = () => {
  const isModalOpen = useAppSelector(
    getModalVisible(CreateUpdateMenuModalName)
  );

  return (
    <>
      <MenuListHeader />
      <MenuListToolbar />
      <MenuListTable />
      {isModalOpen && <CreateUpdateMenuModal />}
    </>
  );
};
