import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import {
  Button,
  PaginationProps,
  Space,
  Table,
  TableColumnsType,
  Image,
} from 'antd';
import { useTranslation } from 'react-i18next';

import {
  GettingContentListLoadingKey,
  RemovingContentLoadingKey,
} from '@/common/loadingKey';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import {
  getContents,
  contentActions,
  getContentQueryParams,
} from '@/store/content';
import useModal from 'antd/es/modal/useModal';
import { useNavigate } from 'react-router-dom';
import { ContentResponse } from '@/services/ContentService';
import { defaultPagingParams, largePagingParams } from '@/common';
import { useEffect, useState } from 'react';
import { getLanguage, persistStateActions } from '@/store/persistState';
import { SortableRow } from '@/components/SortableRow';

import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Utils from '@/utils';

export const NewsListTable = () => {
  const [dataSource, setDataSource] = useState<ContentResponse[]>([]);
  const [modal, contextHolder] = useModal();
  const { t } = useTranslation(['common', 'news']);
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const dispatch = useAppDispatch();

  const language = useAppSelector(getLanguage());
  const contents = useAppSelector(getContents());
  const queryParams = useAppSelector(getContentQueryParams());
  const isLoading = useAppSelector(
    getLoading([GettingContentListLoadingKey, RemovingContentLoadingKey])
  );

  useEffect(() => {
    dispatch(
      contentActions.getContentsRequest({
        params: queryParams || defaultPagingParams,
      })
    );
    dispatch(contentActions.getNewsTypeRequest({ params: largePagingParams }));
  }, [language]);

  useEffect(() => {
    if (contents) {
      setDataSource(contents?.items || []);
    }
  }, [contents]);

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

  const handleMoreActionClick = (key: any, record: ContentResponse) => {
    switch (key) {
      case 'edit':
        editContent(record);
        break;
      default:
        confirmRemoveContent(record);
        break;
    }
  };

  const editContent = (content: ContentResponse) => {
    dispatch(contentActions.setSelectedContent(content));

    dispatch(persistStateActions.setLocale(language));
    navigate('/admin/news/create-or-edit');
  };

  const confirmRemoveContent = (content: ContentResponse) => {
    modal.confirm({
      title: t('Notification'),
      content: (
        <div
          dangerouslySetInnerHTML={{
            __html: t('ConfirmRemove', {
              name: `<strong>"${content.title}"</strong>`,
            }),
          }}
        />
      ),
      centered: true,
      closable: true,
      onOk: (close) => {
        handleRemoveContent(content.id);
        close();
      },
    });
  };

  const handleRemoveContent = (contentId: string) => {
    dispatch(contentActions.removeContentRequest({ contentId }));
  };

  const showTotal: PaginationProps['showTotal'] = (total, range) =>
    t('PagingTotal', {
      range1: range[0],
      range2: range[1],
      total,
      ns: 'common',
    });

  const onPagingChange: PaginationProps['onChange'] = (page, pageSize) => {
    dispatch(
      contentActions.getContentsRequest({
        params: {
          SkipCount: (page - 1) * pageSize,
          MaxResultCount: pageSize,
        },
      })
    );
  };

  const columns: TableColumnsType<ContentResponse> = [
    {
      title: t('Title', { ns: 'news' }),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('Description', { ns: 'news' }),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('Publish', { ns: 'common' }),
      dataIndex: 'published',
      key: 'published',
      render: (published) => {
        return published
          ? t('Published', { ns: 'common' })
          : t('Draft', { ns: 'common' });
      },
    },
    // {
    //   key: 'sort',
    //   width: 40,
    //   fixed: 'right',
    //   align: 'center',
    // },
    {
      fixed: 'right',
      align: 'right',
      width: '80px',
      render: (_, record) => {
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
          {
            <Table
              rowKey={(record) => record.id}
              dataSource={dataSource}
              columns={columns}
              style={{ width: '100%' }}
              size='small'
              scroll={{ x: 1000, y: windowSize[1] - 310 }}
              pagination={{
                ...Utils.parseParamsToPagination(
                  queryParams || defaultPagingParams
                ),
                total: dataSource?.length || 0,
                onChange: onPagingChange,
                responsive: true,
                showTotal,
              }}
              components={{
                body: {
                  row: SortableRow,
                },
              }}
              loading={isLoading}
            />
          }
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
