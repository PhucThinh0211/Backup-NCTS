import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { IdentityModalEnum } from '@/store/identity';
import { getModalVisible } from '@/store/modal';
import { UserListHeader } from './UserListHeader';
import { UserListTable } from './UserListTable';
import { CreateUpdateUserModal } from './CreateUpdateUserModal';
export const UserPage = () => {
  const userModalVisible = useAppSelector(
    getModalVisible(IdentityModalEnum.userModal)
  );

  return (
    <>
      {userModalVisible && <CreateUpdateUserModal />}
      <UserListHeader />
      <UserListTable />
    </>
  );
};
