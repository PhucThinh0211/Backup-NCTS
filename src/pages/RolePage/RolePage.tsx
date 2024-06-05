import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { IdentityModalEnum, identityActions } from '@/store/identity';
import { getModalVisible } from '@/store/modal';
import { useEffect } from 'react';
import { RoleListHeader } from './RoleListHeader';
import { RoleListTable } from './RoleListTable';
import { CreateUpdateRoleModal } from './CreateUpdateRoleModal';

export const RolePage = () => {
  const dispatch = useAppDispatch();
  const roleModalVisible = useAppSelector(
    getModalVisible(IdentityModalEnum.createUpdateRoleModal)
  );

  useEffect(() => {
    dispatch(identityActions.getAllRoles());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {roleModalVisible && <CreateUpdateRoleModal />}
      <RoleListHeader />
      <RoleListTable />
    </>
  );
};
