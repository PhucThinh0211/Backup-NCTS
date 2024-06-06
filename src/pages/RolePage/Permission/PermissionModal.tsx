import {
  PermissionGroupResult,
  PermissionQueryParams,
  PermissionResult,
  UpdatePermissionDto,
} from '@/services/IdentityService';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  IdentityLoadingEnum,
  IdentityModalEnum,
  createPermissionGroupsSelector,
  createRoleSelectedSelector,
  identityActions,
} from '@/store/identity';
import { getLoading } from '@/store/loading';
import { getModalVisible, hideModal } from '@/store/modal';
import { Checkbox, Col, Divider, Form, Modal, Row, Spin } from 'antd';
import React, { useEffect } from 'react';
import { PermissionGroup } from './PermissionGroup';
import './Permission.scss';

export const PermissionModal = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const visible = useAppSelector(
    getModalVisible(IdentityModalEnum.permissionModal)
  );
  const selectedRole = useAppSelector(createRoleSelectedSelector());
  const permissionGroups = useAppSelector(createPermissionGroupsSelector());
  const [selectedGroup, setSelectedGroup] = React.useState<
    PermissionGroupResult | undefined
  >();
  const confirmLoading = useAppSelector(
    getLoading(IdentityLoadingEnum.updatePermissions)
  );
  const loadingPermissions = useAppSelector(
    getLoading(IdentityLoadingEnum.getAllPermissions)
  );

  useEffect(() => {
    if (selectedRole) {
      dispatch(
        identityActions.getAllPermissionsRequest({
          providerName: 'R',
          providerKey: selectedRole.name,
        })
      );
    }
  }, [selectedRole]);

  useEffect(() => {
    if (selectedGroup && permissionGroups) {
      setSelectedGroup(
        permissionGroups.find((x) => x.name === selectedGroup.name)
      );
    } else {
      setSelectedGroup(permissionGroups?.[0]);
    }
  }, [permissionGroups, selectedGroup]);

  const handleClose = () => {
    dispatch(hideModal({ key: IdentityModalEnum.permissionModal }));
  };

  const handleGroupItemClick = (group: PermissionGroupResult) => {
    setSelectedGroup(group);
  };

  const displayGroupName = (group: PermissionGroupResult) => {
    if (group.numOfGranted) {
      return `${group.displayName} (${group.numOfGranted})`;
    }
    return group.displayName;
  };

  const storePermissionGroups = (group: PermissionGroupResult) => {
    if (!selectedGroup?.permissions || !selectedRole) {
      return;
    }
    const groups: PermissionGroupResult[] = JSON.parse(
      JSON.stringify(permissionGroups)
    );
    const idx = groups.findIndex((x) => x.name === group.name);
    if (idx > -1) {
      groups[idx] = group;
    }
    dispatch(
      identityActions.setPermissions({
        entityDisplayName: selectedRole.name,
        groups,
      })
    );
  };

  const handleCheckGroup = (permission: PermissionResult) => {
    if (!selectedGroup?.permissions) {
      return;
    }
    const group: PermissionGroupResult = JSON.parse(
      JSON.stringify(selectedGroup)
    );
    const per = group.permissions.find((x) => x.name === permission.name)!;
    per.isGranted = !permission.isGranted;
    if (per.isGranted && per.parentName) {
      const parent = group.permissions.find((x) => x.name === per.parentName)!;
      parent.isGranted = true;
    }
    //
    storePermissionGroups(group);
  };

  const handleCheckAllGroup = (evt: any) => {
    if (!selectedGroup?.permissions) {
      return;
    }
    const group: PermissionGroupResult = JSON.parse(
      JSON.stringify(selectedGroup)
    );
    group.permissions.forEach((x) => {
      x.isGranted = !group.isGrantAllPermissions;
    });
    //
    storePermissionGroups(group);
  };

  const handelGrantAllPermissions = (evt: any) => {
    const isGrantedAll =
      permissionGroups?.filter((x) => x.isGrantAllPermissions).length ===
      permissionGroups?.length;
    const groups: PermissionGroupResult[] = JSON.parse(
      JSON.stringify(permissionGroups)
    );
    groups.forEach((group) => {
      group.permissions.forEach((permisstion) => {
        permisstion.isGranted = !isGrantedAll;
      });
    });
    dispatch(
      identityActions.setPermissions({
        entityDisplayName: selectedRole!.name,
        groups,
      })
    );
  };

  const handleUpdatePermissions = () => {
    if (!selectedRole) {
      return;
    }
    const inputData: UpdatePermissionDto = {
      permissions: [],
    };
    permissionGroups?.forEach((group) => {
      group.permissions.forEach((permission) => {
        inputData.permissions.push({
          name: permission.name,
          isGranted: permission.isGranted,
        });
      });
    });
    const params: PermissionQueryParams = {
      providerName: 'R',
      providerKey: selectedRole.name,
    };
    dispatch(
      identityActions.updatePermissionsRequest({ params, input: inputData })
    );
  };

  return (
    <Modal
      title={`Permission - ${selectedRole?.name}`}
      open={visible}
      confirmLoading={confirmLoading}
      onCancel={handleClose}
    >
      <Spin spinning={loadingPermissions}>
        <Row gutter={[10, 10]}>
          <Col span={24} md={10}>
            <div className='p-1'>
              <div>
                <Checkbox
                  checked={
                    permissionGroups?.filter((x) => x.isGrantAllPermissions)
                      .length === permissionGroups?.length
                  }
                  indeterminate={
                    permissionGroups?.filter((x) => x.numOfGranted).length !==
                      0 &&
                    permissionGroups?.filter((x) => x.isGrantAllPermissions)
                      .length !== permissionGroups?.length
                  }
                  onClick={handelGrantAllPermissions}
                >
                  Grant all permission
                </Checkbox>
              </div>
              <Divider className='my-2' />
              <div className='d-flex flex-column gap-2'>
                {permissionGroups?.map((group) => (
                  <PermissionGroup
                    selected={
                      group.displayNameKey === selectedGroup?.displayNameKey
                    }
                    key={group.displayNameKey}
                    label={displayGroupName(group)}
                    handleClick={() => handleGroupItemClick(group)}
                  />
                ))}
              </div>
            </div>
          </Col>
          <Col span={24} md={14}>
            <div className='p-1'>
              <div>
                <Checkbox
                  checked={!!selectedGroup?.isGrantAllPermissions}
                  indeterminate={
                    selectedGroup?.numOfGranted !== 0 &&
                    !selectedGroup?.isGrantAllPermissions
                  }
                  onClick={handleCheckAllGroup}
                >
                  Select all
                </Checkbox>
              </div>
              <Divider className='my-2' />
              <div>
                {selectedGroup?.permissions
                  ?.filter((x) => !x.parentName)
                  ?.map((per) => (
                    <React.Fragment key={per.name}>
                      <Checkbox
                        checked={per.isGranted}
                        onClick={() => handleCheckGroup(per)}
                      >
                        {per.displayName}
                      </Checkbox>
                      <div className='d-flex flex-column gap-2 ms-4 mt-2 my-3'>
                        {selectedGroup?.permissions
                          ?.filter((x) => x.parentName?.includes(per.name))
                          ?.map((childPer) => (
                            <Checkbox
                              key={childPer.name}
                              checked={childPer.isGranted}
                              onClick={() => handleCheckGroup(childPer)}
                            >
                              {childPer.displayName}
                            </Checkbox>
                          ))}
                      </div>
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </Col>
        </Row>
      </Spin>
    </Modal>
  );
};
