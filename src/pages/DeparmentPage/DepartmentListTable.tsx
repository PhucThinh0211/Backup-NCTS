import  {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Table, TableColumnsType, Tooltip } from 'antd';
import useModal from 'antd/es/modal/useModal';

import {
  GettingDepartmentListLoadingKey,
  RemovingDepartmentLoadingKey,
} from '@/common/loadingKey';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import { getDepartments, departmentActions } from '@/store/department';
import { DepartmentResponse } from '@/services/DepartmentService';
import { getLanguage, persistStateActions } from '@/store/persistState';
import Utils from '@/utils';
import { SortableRow } from '@/components/SortableRow';

import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export const DepartmentListTable = () => {
  const [dataSource, setDataSource] = useState<DepartmentResponse[]>([]);
  const [modal, contextHolder] = useModal();
  const { t } = useTranslation(['common', 'department']);

  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const dispatch = useAppDispatch();

  const language = useAppSelector(getLanguage());
  const departments = useAppSelector(getDepartments());
  const isLoading = useAppSelector(
    getLoading([GettingDepartmentListLoadingKey, RemovingDepartmentLoadingKey])
  );

  useEffect(() => {
    dispatch(departmentActions.getDepartmentsRequest({}));
  }, [language]);

  useEffect(() => {
    if (departments) {
      const sortedDepartments: DepartmentResponse[] = Utils.deepClone(departments?.items || [])
      sortedDepartments.sort((a, b) => 
        a.sortSeq - b.sortSeq
      )
      setDataSource(sortedDepartments);
    }
  }, [departments]);

  const getMoreActions = (record: DepartmentResponse) => {
    return [
      {
        key: 'edit',
        label: t('Edit', { ns: 'common' }),
        icon: <EditOutlined style={{ color: '#1890ff' }} />,
        onClick: () => editDepartment(record)
      },
      {
        key: 'remove',
        label: t('Remove', { ns: 'common' }),
        icon: <DeleteOutlined style={{ color: '#ff4d4f' }} />,
        onClick: () => confirmRemoveDepartment(record),
      },
    ];
  }

  const editDepartment = (department: DepartmentResponse) => {
    dispatch(persistStateActions.setLocale(language));
    dispatch(departmentActions.setSelectedDepartment(department));
    navigate('/admin/contacts/create-or-edit');
  };

  const confirmRemoveDepartment = (department: DepartmentResponse) => {
    modal.confirm({
      title: t('Notification'),
      content: (
        <div
          dangerouslySetInnerHTML={{
            __html: t('ConfirmRemove', {
              name: `<strong>"${department.name}"</strong>`,
            }),
          }}
        />
      ),
      centered: true,
      closable: true,
      onOk: (close) => {
        handleRemoveDepartment(department.id);
        close();
      },
    });
  };

  const handleRemoveDepartment = (departmentId: string) => {
    dispatch(departmentActions.removeDepartmentRequest({ departmentId }));
  };

  const columns: TableColumnsType<DepartmentResponse> = [
    {
      title: t('Name', { ns: 'department' }),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('Code', { ns: 'department' }),
      dataIndex: 'code',
      key: 'code',
    },
    {
      key: 'sort',
      width: 40,
      fixed: 'right',
      align: 'center',
    },
    {
      fixed: 'right',
      align: 'center',
      width: '70px',
      render: (_: any, record: DepartmentResponse) => {
        return (
          <Space>
            {getMoreActions(record).map((action) => (
              action.label ? 
                <Tooltip title={action.label}>
                  <Button
                    {...action}
                    type='text'
                    size='small'
                  />
                </Tooltip>
              :
              <Button
                {...action}
                type='text'
                size='small'
              />
            ))}
          </Space>
        );
      },
    },
  ];

  const getIds = () => {
    return dataSource.map((item) => item.id);
  };

  return (
    <div style={{ padding: 10 }}>
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          // rowKey array
          items={getIds()}
          strategy={verticalListSortingStrategy}
        >
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
            components={{
              body: {
                row: SortableRow,
              },
            }}
          />
        </SortableContext>
      </DndContext>
    </div>
  );

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex(({ id }) => id === active.id);
        const overIndex = previous.findIndex(({ id }) => id === over?.id);

        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  }
};
