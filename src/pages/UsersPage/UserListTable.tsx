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

import { UserResponse } from '@/services/IdentityService';
import {
  IdentityLoadingEnum,
  IdentityModalEnum,
  createUsersSelector,
  identityActions,
  usernameAdmin,
} from '@/store/identity';
import { showModal } from '@/store/modal';
import { defaultPagingParams } from '@/common';
import { getCurrentUser } from '@/store/app';
export const UserListTable = () => {
  const [dataSource, setDataSource] = useState<UserResponse[]>([]);
  const [modal, contextHolder] = useModal();
  const { t } = useTranslation(['common']);
  const windowSize = useWindowSize();
  const dispatch = useAppDispatch();

  const users = useAppSelector(createUsersSelector());
  const isLoading = useAppSelector(getLoading([IdentityLoadingEnum.getUsers]));
  const currentUser = useAppSelector(getCurrentUser());

  useEffect(() => {
    dispatch(identityActions.getUsersRequest(defaultPagingParams));
  }, []);

  useEffect(() => {
    if (users) {
      setDataSource(users?.items || []);
    }
  }, [users]);

  const getMoreActions = (record: UserResponse) => {
    const moreActions = [
      {
        key: 'edit',
        label: t('Edit', { ns: 'common' }),
        icon: <EditOutlined style={{ color: '#1890ff' }} />,
        onClick: () => editUser(record),
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
        onClick: () => confirmRemoveUser(record),
        disabled: record.name === usernameAdmin,
      },
    ];
    return moreActions;
  };

  const editUser = (user: UserResponse) => {
    dispatch(identityActions.setUserSelected(user));
    dispatch(showModal({ key: IdentityModalEnum.userModal }));
  };

  const confirmRemoveUser = (user: UserResponse) => {
    modal.confirm({
      title: t('Notification'),
      content: (
        <div
          dangerouslySetInnerHTML={{
            __html: t('ConfirmRemove', {
              name: `<strong>"${user.name}"</strong>`,
            }),
          }}
        />
      ),
      centered: true,
      closable: true,
      onOk: (close) => {
        handleRemoveUser(user.id);
        close();
      },
    });
  };

  const handleRemoveUser = (userId: string) => {
    dispatch(identityActions.removeUserRequest(userId));
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
  //     userActions.getUsersRequest({
  //       params: {
  //         SkipCount: (page - 1) * pageSize,
  //         MaxResultCount: pageSize,
  //       },
  //     })
  //   );
  // };

  const columns: TableColumnsType<UserResponse> = [
    {
      title: t('username', { ns: 'common' }),
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      fixed: 'right',
      align: 'right',
      width: '120px',
      render: (_, record) => {
        return (
          <Space>
            {getMoreActions(record).map(({ key, ...rest }) => (
              <Tooltip title={t(key, { ns: 'common' })}>
                <Button {...rest} type='text' />
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
        dataSource={dataSource.filter(
          (record) => currentUser.name === 'admin' || record.name !== 'admin'
        )}
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
