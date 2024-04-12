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
import { getMenuQueryParams, getMenus, menuActions } from '@/store/menu';
import useModal from 'antd/es/modal/useModal';
import Utils from '@/utils';
import type { TableColumnsType } from 'antd';
import { MenuResponse } from '@/services/MenuService';

import type {
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
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
import { TreeItem } from '@/common';
interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const searchItemDeep = (
  search: string,
  item: TreeItem<MenuResponse>
): boolean => {
  const { label, url, children } = item;

  if (
    label?.toLowerCase().includes(search) ||
    url?.toLowerCase().includes(search)
  ) {
    return true;
  }

  if (children?.length) {
    for (const item of children) {
      return searchItemDeep(search, item);
    }
  }
  return false;
};

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
    transform: CSS.Transform.toString(
      transform && { ...transform, scaleY: 1, x: 1 }
    ),
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
  const [dataSource, setDataSource] = useState<TreeItem<MenuResponse>[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
  const [modal, contextHolder] = useModal();
  const { t } = useTranslation(['common', 'menu']);
  const [offsetLeft, setOffsetLeft] = useState(0);

  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const dispatch = useAppDispatch();

  const menus = useAppSelector(getMenus());
  const queryParams = useAppSelector(getMenuQueryParams());
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
    dispatch(menuActions.getMenusRequest({}));
  }, []);

  useEffect(() => {
    if (menus) {
      const newDataSource = Utils.buildTree(menus.items || []);
      if (queryParams?.search) {
        setDataSource(
          newDataSource.filter((item) =>
            searchItemDeep(queryParams?.search.toLowerCase(), item)
          )
        );
      } else {
        setDataSource(newDataSource);
      }
    }
  }, [menus, queryParams]);

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

  const handleMoreActionClick = (key: any, record: TreeItem<MenuResponse>) => {
    switch (key) {
      case 'edit':
        editMenu(record);
        break;
      default:
        confirmRemoveMenu(record);
        break;
    }
  };

  const editMenu = (menu: TreeItem<MenuResponse>) => {
    dispatch(menuActions.setSelectedMenu(menu));
    navigate('/admin/menu/edit');
  };

  const confirmRemoveMenu = (menu: TreeItem<MenuResponse>) => {
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

  const handleRemoveMenu = (menuId: string) => {
    dispatch(menuActions.removeMenuRequest({ menuId }));
  };

  const columns: TableColumnsType<TreeItem<MenuResponse>> = [
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
      render: (_: any, record: TreeItem<MenuResponse>) => {
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
          {
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
          }
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
