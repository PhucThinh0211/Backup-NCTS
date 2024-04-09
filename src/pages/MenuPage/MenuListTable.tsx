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

import type {
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useEffect, useMemo, useState } from 'react';
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
    ...(isDragging ? { position: 'relative', zIndex: '9999' } : {}),
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
const indentationWidth = 30;

export const MenuListTable = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [modal, contextHolder] = useModal();
  const { t } = useTranslation(['common', 'menu']);
  const [offsetLeft, setOffsetLeft] = useState(0);

  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const dispatch = useAppDispatch();

  const menus = useAppSelector(getMenus());
  const isLoading = useAppSelector(
    getLoading([GettingMenuListLoadingKey, RemovingMenuLoadingKey])
  );

  const flattenedItems = useMemo(() => {
    const flattenedTree = Utils.flatten(dataSource || []);

    return flattenedTree;
  }, [dataSource]);

  const projected =
    activeId && overId
      ? Utils.getProjection(
          flattenedItems,
          activeId,
          overId,
          offsetLeft,
          indentationWidth
        )
      : null;

  useEffect(() => {
    if (menus) {
      setDataSource(Utils.buildTree(menus || []));
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

  const columns: TableColumnsType<MenuResponse> = [
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
      key: 'sort',
      width: 40,
      fixed: 'right',
      align: 'center',
    },
    {
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

  const getIds = () => {
    return flattenedItems.map((item) => item.id);
  };

  return (
    <div style={{ padding: 10 }}>
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
      >
        <SortableContext
          // rowKey array
          items={getIds()}
          strategy={verticalListSortingStrategy}
        >
          {contextHolder}
          {dataSource?.length && (
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
              pagination={false}
              loading={isLoading}
              expandable={{
                indentSize: indentationWidth,
                defaultExpandAllRows: true,
              }}
            />
          )}
        </SortableContext>
      </DndContext>
    </div>
  );

  function handleDragStart({ active: { id: activeId } }: DragStartEvent) {
    setActiveId(activeId.toString());
    setOverId(activeId.toString());

    document.body.style.setProperty('cursor', 'grabbing');
  }

  function handleDragMove({ delta }: DragMoveEvent) {
    setOffsetLeft(delta.x);
  }

  function handleDragOver({ over }: DragOverEvent) {
    setOverId(over?.id.toString() ?? null);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    resetState();

    if (projected && over) {
      const { depth, parentId } = projected;
      const clonedItems: any[] = JSON.parse(
        JSON.stringify(Utils.flatten(dataSource))
      );
      const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
      const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
      const activeTreeItem = clonedItems[activeIndex];

      clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };

      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
      const newItems = Utils.buildTree(sortedItems);

      setDataSource(newItems);
    }
  }

  function handleDragCancel() {
    resetState();
  }
  function resetState() {
    setOverId(null);
    setActiveId(null);

    document.body.style.setProperty('cursor', '');
  }
};
