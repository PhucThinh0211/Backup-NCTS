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
  GettingNewsTypeListLoadingKey,
  RemovingNewsTypeLoadingKey,
} from '@/common/loadingKey';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import {
  getNewsTypeQueryParams,
  getNewsTypes,
  newsTypeActions,
} from '@/store/newsType';
import useModal from 'antd/es/modal/useModal';
import { useNavigate } from 'react-router-dom';
import { NewsTypeResponse } from '@/services/NewsTypeService';
import { defaultPagingParams, uploadedPhotoUrl } from '@/common';
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

export const NewsTypeListTable = () => {
  const [dataSource, setDataSource] = useState<NewsTypeResponse[]>([]);
  const [modal, contextHolder] = useModal();
  const { t } = useTranslation(['common', 'newsType']);
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const dispatch = useAppDispatch();

  const language = useAppSelector(getLanguage());
  const newsTypes = useAppSelector(getNewsTypes());
  const queryParams = useAppSelector(getNewsTypeQueryParams());
  const isLoading = useAppSelector(
    getLoading([GettingNewsTypeListLoadingKey, RemovingNewsTypeLoadingKey])
  );

  useEffect(() => {
    dispatch(
      newsTypeActions.getNewsTypesRequest({
        params: queryParams || defaultPagingParams,
      })
    );
  }, [language]);

  useEffect(() => {
    if (newsTypes) {
      setDataSource(newsTypes?.items || []);
    }
  }, [newsTypes]);

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

  const handleMoreActionClick = (key: any, record: NewsTypeResponse) => {
    switch (key) {
      case 'edit':
        editNewsType(record);
        break;
      default:
        confirmRemoveNewsType(record);
        break;
    }
  };

  const editNewsType = (newsType: NewsTypeResponse) => {
    dispatch(newsTypeActions.setSelectedNewsType(newsType));

    dispatch(persistStateActions.setLocale(language));
    navigate('/admin/news-type/create-or-edit');
  };

  const confirmRemoveNewsType = (newsType: NewsTypeResponse) => {
    modal.confirm({
      title: t('Notification'),
      content: (
        <div
          dangerouslySetInnerHTML={{
            __html: t('ConfirmRemove', {
              name: `<strong>"${newsType.name}"</strong>`,
            }),
          }}
        />
      ),
      centered: true,
      closable: true,
      onOk: (close) => {
        handleRemoveNewsType(newsType.id);
        close();
      },
    });
  };

  const handleRemoveNewsType = (newsTypeId: string) => {
    dispatch(newsTypeActions.removeNewsTypeRequest({ newsTypeId }));
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
      newsTypeActions.getNewsTypesRequest({
        params: {
          SkipCount: (page - 1) * pageSize,
          MaxResultCount: pageSize,
        },
      })
    );
  };

  const columns: TableColumnsType<NewsTypeResponse> = [
    {
      title: t('Code', { ns: 'common' }),
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: t('Name', { ns: 'newsType' }),
      dataIndex: 'name',
      key: 'name',
    },
    {
      key: 'sort',
      width: 40,
      fixed: 'right',
      align: 'center',
    },
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
              scroll={{ x: 500, y: windowSize[1] - 310 }}
              pagination={{
                ...Utils.parseParamsToPagination(
                  queryParams || defaultPagingParams
                ),
                total: newsTypes?.totalCount,
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
