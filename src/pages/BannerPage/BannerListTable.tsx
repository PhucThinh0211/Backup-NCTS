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
  GettingBannerListLoadingKey,
  RemovingBannerLoadingKey,
} from '@/common/loadingKey';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import {
  getBanners,
  bannerActions,
  getBannerQueryParams,
} from '@/store/banner';
import useModal from 'antd/es/modal/useModal';
import { useNavigate } from 'react-router-dom';
import { BannerResponse } from '@/services/BannerService';
import {
  defaultPagingParams,
  largePagingParams,
  uploadedPhotoUrl,
} from '@/common';
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

export const BannerListTable = () => {
  const [dataSource, setDataSource] = useState<BannerResponse[]>([]);
  const [modal, contextHolder] = useModal();
  const { t } = useTranslation(['common', 'banner']);
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const dispatch = useAppDispatch();

  const language = useAppSelector(getLanguage());
  const banners = useAppSelector(getBanners());
  const queryParams = useAppSelector(getBannerQueryParams());
  const isLoading = useAppSelector(
    getLoading([GettingBannerListLoadingKey, RemovingBannerLoadingKey])
  );

  useEffect(() => {
    dispatch(
      bannerActions.getBannersRequest({
        params: queryParams || defaultPagingParams,
      })
    );
    dispatch(bannerActions.getMenusRequest({ params: largePagingParams }));
  }, [language]);

  useEffect(() => {
    if (banners) {
      setDataSource(banners?.items || []);
    }
  }, [banners]);

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

  const handleMoreActionClick = (key: any, record: BannerResponse) => {
    switch (key) {
      case 'edit':
        editBanner(record);
        break;
      default:
        confirmRemoveBanner(record);
        break;
    }
  };

  const editBanner = (banner: BannerResponse) => {
    dispatch(bannerActions.setSelectedBanner(banner));

    dispatch(persistStateActions.setLocale(language));
    navigate('/admin/banners/create-or-edit');
  };

  const confirmRemoveBanner = (banner: BannerResponse) => {
    modal.confirm({
      title: t('Notification'),
      content: (
        <div
          dangerouslySetInnerHTML={{
            __html: t('ConfirmRemove', {
              name: `<strong>"${banner.title}"</strong>`,
            }),
          }}
        />
      ),
      centered: true,
      closable: true,
      onOk: (close) => {
        handleRemoveBanner(banner.id);
        close();
      },
    });
  };

  const handleRemoveBanner = (bannerId: string) => {
    dispatch(bannerActions.removeBannerRequest({ bannerId }));
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
      bannerActions.getBannersRequest({
        params: {
          SkipCount: (page - 1) * pageSize,
          MaxResultCount: pageSize,
        },
      })
    );
  };

  const columns: TableColumnsType<BannerResponse> = [
    {
      title: t('Photo', { ns: 'banner' }),
      dataIndex: 'photoUrl',
      key: 'photoUrl',
      // align: 'center',
      render(value) {
        return (
          value && (
            <Image
              src={`${uploadedPhotoUrl(value)}`}
              style={{
                backgroundColor: '#00000073',
              }}
              height={80}
            />
          )
        );
      },
    },
    {
      title: t('Title', { ns: 'banner' }),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('Description', { ns: 'banner' }),
      dataIndex: 'description',
      key: 'description',
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
              scroll={{ x: 1000, y: windowSize[1] - 310 }}
              pagination={{
                ...Utils.parseParamsToPagination(
                  queryParams || defaultPagingParams
                ),
                total: banners?.totalCount,
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

        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  }
};
