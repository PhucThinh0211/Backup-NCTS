import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import {
  Button,
  PaginationProps,
  Space,
  Table,
  TableColumnsType,
  TableProps,
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
import { defaultPagingParams } from '@/common';
import { useEffect } from 'react';

export const BannerListTable = () => {
  const [modal, contextHolder] = useModal();
  const { t } = useTranslation(['common', 'banner']);
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const dispatch = useAppDispatch();

  const params = useAppSelector(getBannerQueryParams());
  const banners = useAppSelector(getBanners());
  const isLoading = useAppSelector(
    getLoading([GettingBannerListLoadingKey, RemovingBannerLoadingKey])
  );

  useEffect(() => {
    dispatch(bannerActions.getBannersRequest({}));
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
    navigate('/admin/banners/edit');
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
    console.log(bannerId);

    // dispatch(bannerActions.removeBannerRequest({ bannerId, projectId: selectedProject?.id }));
  };

  const handleTableChange: TableProps<any>['onChange'] = (pagination) => {
    const { current, pageSize } = pagination;
    const search = { ...params, page: current, pageSize };
    dispatch(bannerActions.getBannersRequest({ params: search }));
  };

  const showTotal: PaginationProps['showTotal'] = (total, range) =>
    t('banner.pagingTotal', { range1: range[0], range2: range[1], total });

  const columns: TableColumnsType<BannerResponse> = [
    {
      title: t('Title', { ns: 'banner' }),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('Photo url', { ns: 'banner' }),
      dataIndex: 'photoUrl',
      key: 'photoUrl',
    },
    {
      title: t('Description', { ns: 'banner' }),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
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

  return (
    <div style={{ padding: 10 }}>
      {contextHolder}
      <Table
        rowKey={(record) => record.id}
        dataSource={banners?.items}
        columns={columns}
        style={{ width: '100%' }}
        size='small'
        scroll={{ x: 1000, y: windowSize[1] - 310 }}
        pagination={{
          current: params?.page || defaultPagingParams.page,
          pageSize: params?.pageSize || defaultPagingParams.pageSize,
          total: params?.queryCount || 0,
          responsive: true,
          showTotal,
        }}
        loading={isLoading}
        onChange={handleTableChange}
        rowSelection={{ columnWidth: 50 }}
      />
    </div>
  );
};
