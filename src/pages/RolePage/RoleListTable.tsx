import {
  EditOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

import { Button, Space, Table, TableColumnsType, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import { useWindowSize } from '@/hooks/useWindowSize';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';

import useModal from 'antd/es/modal/useModal';
import { useEffect, useState } from 'react';

import { IRole } from '@/services/IdentityService';
import {
  IdentityLoadingEnum,
  IdentityModalEnum,
  createRolesSelector,
  identityActions,
  usernameAdmin,
} from '@/store/identity';
import { showModal } from '@/store/modal';
export const RoleListTable = () => {
  const [dataSource, setDataSource] = useState<IRole[]>([]);
  const [modal, contextHolder] = useModal();
  const { t } = useTranslation(['common']);
  const windowSize = useWindowSize();
  const dispatch = useAppDispatch();

  const roles = useAppSelector(createRolesSelector());
  const isLoading = useAppSelector(
    getLoading([IdentityLoadingEnum.fetchAllRoles])
  );

  useEffect(() => {
    dispatch(identityActions.getAllRoles());
  }, []);

  useEffect(() => {
    if (roles) {
      setDataSource(roles?.items || []);
    }
  }, [roles]);

  const getMoreActions = (record: IRole) => {
    const moreActions = [
      {
        key: 'edit',
        label: t('Edit', { ns: 'common' }),
        icon: <EditOutlined style={{ color: '#1890ff' }} />,
        onClick: () => editRole(record),
      },
      {
        key: 'permissions',
        label: t('Permissions', { ns: 'common' }),
        icon: <UnorderedListOutlined style={{ color: '#1890ff' }} />,
        onClick: () => showRolePermission(record),
      },
      {
        key: 'remove',
        label: t('Remove', { ns: 'common' }),
        icon: (
          <DeleteOutlined
            style={{
              color: record.name === usernameAdmin ? 'grey' : '#ff4d4f',
            }}
          />
        ),
        onClick: () => confirmRemoveRole(record),
        disabled: record.name === usernameAdmin,
      },
    ];
    return moreActions;
  };

  const editRole = (role: IRole) => {
    dispatch(identityActions.setRoleSelected(role));
    dispatch(showModal({ key: IdentityModalEnum.createUpdateRoleModal }));
  };

  const showRolePermission = (role: IRole) => {
    dispatch(identityActions.setRoleSelected(role));
    dispatch(showModal({ key: IdentityModalEnum.permissionModal }));
  };

  const confirmRemoveRole = (role: IRole) => {
    modal.confirm({
      title: t('Notification'),
      content: (
        <div
          dangerouslySetInnerHTML={{
            __html: t('ConfirmRemove', {
              name: `<strong>"${role.name}"</strong>`,
            }),
          }}
        />
      ),
      centered: true,
      closable: true,
      onOk: (close) => {
        handleRemoveRole(role.id);
        close();
      },
    });
  };

  const handleRemoveRole = (roleId: string) => {
    dispatch(identityActions.deleteRoleRequest(roleId));
  };

  // const showTotal: PaginationProps['showTotal'] = (total, range) =>
  //   t('PagingTotal', {
  //     range1: range[0],
  //     range2: range[1],
  //     total,
  //     ns: 'common',
  //   });

  // const onPagingChange: PaginationProps['onChange'] = (page, pageSize) => {
  //   dispatch(
  //     roleActions.getRolesRequest({
  //       params: {
  //         SkipCount: (page - 1) * pageSize,
  //         MaxResultCount: pageSize,
  //       },
  //     })
  //   );
  // };

  const columns: TableColumnsType<IRole> = [
    {
      title: t('Role name', { ns: 'common' }),
      dataIndex: 'name',
      key: 'name',
    },
    {
      fixed: 'right',
      align: 'right',
      width: '120px',
      render: (_, record) => {
        return (
          <Space>
            {getMoreActions(record).map((action) => (
              <Tooltip title={t(action.key, { ns: 'common' })}>
                <Button {...action} type='text' />
              </Tooltip>
            ))}
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{ padding: 10 }}>
      {contextHolder}
      <Table
        rowKey={(record) => record.id}
        dataSource={dataSource}
        columns={columns}
        style={{ width: '100%' }}
        size='small'
        scroll={{ x: 1000, y: windowSize[1] - 310 }}
        pagination={false}
        loading={isLoading}
      />
    </div>
  );
};
