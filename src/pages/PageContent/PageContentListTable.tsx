import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { Button, PaginationProps, Space, Table, TableColumnsType } from 'antd';
import { useTranslation } from 'react-i18next';

import {
  GettingPageContentListLoadingKey,
  RemovingPageContentLoadingKey,
} from '@/common/loadingKey';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import {
  getPageContentQueryParams,
  getPageContents,
  pageContentActions,
} from '@/store/pageContent';
import useModal from 'antd/es/modal/useModal';
import { useNavigate } from 'react-router-dom';
import { PageContentResponse } from '@/services/PageContentService';
import { defaultPagingParams } from '@/common';
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

export const PageContentListTable = () => {
  const [dataSource, setDataSource] = useState<PageContentResponse[]>([]);
  const [modal, contextHolder] = useModal();
  const { t } = useTranslation(['common', 'pageContent']);
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const dispatch = useAppDispatch();

  const language = useAppSelector(getLanguage());
  const pageContents = useAppSelector(getPageContents());
  const queryParams = useAppSelector(getPageContentQueryParams());
  const isLoading = useAppSelector(
    getLoading([
      GettingPageContentListLoadingKey,
      RemovingPageContentLoadingKey,
    ])
  );

  useEffect(() => {
    dispatch(
      pageContentActions.getPageContentsRequest({
        params: queryParams || defaultPagingParams,
      })
    );
  }, [language]);

  useEffect(() => {
    if (pageContents) {
      setDataSource(pageContents?.items || []);
    }
  }, [pageContents]);

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

  const handleMoreActionClick = (key: any, record: PageContentResponse) => {
    switch (key) {
      case 'edit':
        editPageContent(record);
        break;
      default:
        confirmRemovePageContent(record);
        break;
    }
  };

  const editPageContent = (pageContent: PageContentResponse) => {
    dispatch(pageContentActions.setSelectedPageContent(pageContent));

    dispatch(persistStateActions.setLocale(language));
    navigate('/admin/pages/create-or-edit');
  };

  const confirmRemovePageContent = (pageContent: PageContentResponse) => {
    modal.confirm({
      title: t('Notification'),
      content: (
        <div
          dangerouslySetInnerHTML={{
            __html: t('ConfirmRemove', {
              name: `<strong>"${pageContent.title}"</strong>`,
            }),
          }}
        />
      ),
      centered: true,
      closable: true,
      onOk: (close) => {
        handleRemovePageContent(pageContent.id);
        close();
      },
    });
  };

  const handleRemovePageContent = (pageContentId: string) => {
    dispatch(pageContentActions.removePageContentRequest({ pageContentId }));
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
      pageContentActions.getPageContentsRequest({
        params: {
          SkipCount: (page - 1) * pageSize,
          MaxResultCount: pageSize,
        },
      })
    );
  };

  const columns: TableColumnsType<PageContentResponse> = [
    {
      title: t('Title', { ns: 'pageContent' }),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('Slug', { ns: 'pageContent' }),
      dataIndex: 'slug',
      key: 'slug',
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
                total: pageContents?.totalCount,
                responsive: true,
                onChange: onPagingChange,
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
        console.log({ active, over });

        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  }
};
