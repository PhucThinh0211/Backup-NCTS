import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Table, TableColumnsType, Tooltip } from 'antd';
import useModal from 'antd/es/modal/useModal';

import { RemovingContactLoadingKey } from '@/common/loadingKey';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import { getSelectedDepartment, departmentActions } from '@/store/department';
import { ContactResponse } from '@/services/DepartmentService';
import Utils from '@/utils';
import { showModal } from '@/store/modal';
import { CreateUpdateContactModalName } from '@/common';

export const ContactListTable = () => {
  const [dataSource, setDataSource] = useState<ContactResponse[]>([]);
  const [modal, contextHolder] = useModal();
  const { t } = useTranslation(['common', 'contact']);

  const windowSize = useWindowSize();
  const dispatch = useAppDispatch();

  const selectedDepartment = useAppSelector(getSelectedDepartment());
  const isLoading = useAppSelector(getLoading([RemovingContactLoadingKey]));

  useEffect(() => {
    if (selectedDepartment) {
      const sortedContacts: ContactResponse[] = Utils.deepClone(
        selectedDepartment.contacts || []
      );
      sortedContacts.sort((a, b) => a.sortSeq - b.sortSeq);
      setDataSource(sortedContacts);
    }
  }, [selectedDepartment]);

  const getMoreActions = (record: ContactResponse) => {
    return [
      {
        key: 'edit',
        label: t('Edit', { ns: 'common' }),
        icon: <EditOutlined style={{ color: '#1890ff' }} />,
        onClick: () => editContact(record),
      },
      {
        key: 'remove',
        label: t('Remove', { ns: 'common' }),
        icon: <DeleteOutlined style={{ color: '#ff4d4f' }} />,
        onClick: () => confirmRemoveContact(record),
      },
    ];
  };

  const editContact = (contact: ContactResponse) => {
    dispatch(departmentActions.setSelectedContact(contact));
    dispatch(showModal({ key: CreateUpdateContactModalName }));
  };

  const confirmRemoveContact = (contact: ContactResponse) => {
    modal.confirm({
      title: t('Notification'),
      content: (
        <div
          dangerouslySetInnerHTML={{
            __html: t('ConfirmRemove', {
              name: `<strong>"${contact.title}"</strong>`,
            }),
          }}
        />
      ),
      centered: true,
      closable: true,
      onOk: (close) => {
        handleRemoveContact(contact.id);
        close();
      },
    });
  };

  const handleRemoveContact = (contactId: string) => {
    if (selectedDepartment) {
      dispatch(
        departmentActions.removeContactRequest({
          contactId,
          departmentId: selectedDepartment.id,
        })
      );
    }
  };

  const columns: TableColumnsType<ContactResponse> = [
    {
      title: t('Code', { ns: 'department' }),
      dataIndex: 'code',
      key: 'name',
    },
    {
      title: t('Title', { ns: 'department' }),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('Contact num', { ns: 'department' }),
      dataIndex: 'contactNum',
      key: 'contactNum',
    },
    {
      fixed: 'right',
      align: 'center',
      width: '70px',
      render: (_: any, record: ContactResponse) => {
        return (
          <Space>
            {getMoreActions(record).map((action) =>
              action.label ? (
                <Tooltip title={action.label}>
                  <Button {...action} type='text' size='small' />
                </Tooltip>
              ) : (
                <Button {...action} type='text' size='small' />
              )
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div className='py-2'>
      {contextHolder}
      <Table
        rowKey={(record) => record.id}
        dataSource={dataSource}
        columns={columns}
        style={{ width: '100%' }}
        size='small'
        scroll={{ x: 600, y: windowSize[1] - 310 }}
        pagination={false}
        loading={isLoading}
      />
    </div>
  );
};
