import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { IdentityModalEnum } from '@/store/identity';
import { getModalVisible } from '@/store/modal';
import { RoleListHeader } from './RoleListHeader';
import { RoleListTable } from './RoleListTable';
import { CreateUpdateRoleModal } from './CreateUpdateRoleModal';
import { PermissionModal } from './Permission/PermissionModal';

export const RolePage = () => {
  const dispatch = useAppDispatch();
  const roleModalVisible = useAppSelector(
    getModalVisible(IdentityModalEnum.createUpdateRoleModal)
  );
  const permissionModalVisible = useAppSelector(
    getModalVisible(IdentityModalEnum.permissionModal)
  );

  return (
    <>
      {roleModalVisible && <CreateUpdateRoleModal />}
      {permissionModalVisible && <PermissionModal />}
      {/* <RoleListHeader /> */}
      <RoleListTable />
    </>
  );
};
