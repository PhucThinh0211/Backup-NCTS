import { EditOutlined, DeleteOutlined, DragOutlined } from '@ant-design/icons';

import { Button, Space, Table } from 'antd';
import { useTranslation } from 'react-i18next';

import {
  GettingMenuListLoadingKey,
  RemovingMenuLoadingKey,
} from '@/common/loadingKey';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import { getMenus, menuActions } from '@/store/menu';
import useModal from 'antd/es/modal/useModal';
import Utils from '@/utils';
import type { TableColumnsType } from 'antd';
import { MenuResponse } from '@/services/MenuService';

import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row = ({ children, ...props }: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if ((child as React.ReactElement).key === 'sort') {
          return React.cloneElement(child as React.ReactElement, {
            children: (
              <DragOutlined
                ref={setActivatorNodeRef}
                style={{ touchAction: 'none', cursor: 'move', marginLeft: 10 }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

export const MenuListTable = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [modal, contextHolder] = useModal();
  const { t } = useTranslation(['common', 'menu']);

  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const dispatch = useAppDispatch();

  const menus = useAppSelector(getMenus());
  const isLoading = useAppSelector(getLoading(GettingMenuListLoadingKey));
  const isRemoving = useAppSelector(getLoading(RemovingMenuLoadingKey));

  useEffect(() => {
    if (menus) {
      setDataSource(Utils.buildTree(menus.results || []));
    }
  }, []);

  const moreActions = [
    {
      key: 'edit',
      label: t('Edit', { ns: 'common' }),
      icon: <EditOutlined style={{ color: '#1890ff' }} />,
    },
    {
      key: 'remove',
      label: t('Remove', { ns: 'common' }),
      icon: <DeleteOutlined style={{ color: '#ff4d4f' }} />,
    },
  ];

  const handleMoreActionClick = (key: any, record: any) => {
    switch (key) {
      case 'edit':
        editMenu(record);
        break;
      default:
        confirmRemoveMenu(record);
        break;
    }
  };

  const editMenu = (menu: any) => {
    dispatch(menuActions.setSelectedMenu(menu));
    navigate('/admin/menu/edit');
  };

  const confirmRemoveMenu = (menu: any) => {
    modal.confirm({
      title: t('Notification'),
      content: (
        <div
          dangerouslySetInnerHTML={{
            __html: t('ConfirmRemove', {
              name: `<strong>"${menu.label}"</strong>`,
            }),
          }}
        />
      ),
      centered: true,
      closable: true,
      onOk: (close) => {
        handleRemoveMenu(menu.id);
        close();
      },
    });
  };

  const handleRemoveMenu = (menuId: number) => {
    console.log(menuId);

    // dispatch(menuActions.removeMenuRequest({ menuId, projectId: selectedProject?.id }));
  };

  // const handleTableChange: TableProps<any>['onChange'] = (
  //   pagination,
  //   filters,
  //   sorter
  // ) => {
  // const { current, pageSize } = pagination;
  // const search = { ...params, page: current, pageSize };
  // if (selectedProject) {
  //   dispatch(menuActions.getMenusRequest({ params: search, projectId: selectedProject.id }));
  // }
  // };

  // const showTotal: PaginationProps['showTotal'] = (total, range) =>
  //   t('menu.pagingTotal', { range1: range[0], range2: range[1], total });

  const columns: TableColumnsType<MenuResponse> = [
    {
      key: 'sort',
      width: '150px',
    },
    {
      title: t('Name', { ns: 'menu' }),
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: t('Url', { ns: 'menu' }),
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Action',
      fixed: 'right',
      align: 'center',
      width: '80px',
      render: (_: any, record: any) => {
        return (
          <Space>
            {moreActions.map((action) => (
              <Button
                type='text'
                icon={action.icon}
                key={action.key}
                onClick={() => handleMoreActionClick(action.key, record)}
              />
            ))}
          </Space>
        );
      },
    },
  ];

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    console.log(active, over);
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const flattenItems = Utils.flatten(previous);
        const activeIndex = flattenItems.findIndex((i) => i.id === active.id);
        const overIndex = flattenItems.findIndex((i) => i.id === over?.id);
        console.log(
          Utils.buildTree(arrayMove(flattenItems, activeIndex, overIndex))
        );

        return Utils.buildTree(arrayMove(flattenItems, activeIndex, overIndex));
      });
    }
  };

  const getIds = () => {
    const ids: string[] = [];
    dataSource.forEach((data) => {
      ids.push(data.id);
      if (data.children) {
        data.children.forEach((child: any) => {
          ids.push(child.id);
          if (child.children) {
            child.children.forEach((subChild: any) => {
              ids.push(subChild.id);
            });
          }
        });
      }
    });
    return ids;
  };

  return (
    <div style={{ padding: 10 }}>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
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
            components={{
              body: {
                row: Row,
              },
            }}
            // pagination={{
            //   current: params?.page || defaultPagingParams.page,
            //   pageSize: params?.pageSize || defaultPagingParams.pageSize,
            //   total: menus?.queryCount || 0,
            //   responsive: true,
            //   showTotal,
            // }}
            loading={isLoading || isRemoving}
            expandable={{
              indentSize: 30,
            }}
            // onChange={handleTableChange}
          />
        </SortableContext>
      </DndContext>
    </div>
  );
};
