import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import {
  Button,
  PaginationProps,
  Space,
  Table,
  TableColumnsType,
  TableProps,
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
import { defaultPagingParams, uploadedPhotoUrl } from '@/common';
import { useEffect } from 'react';
import { getLanguage, persistStateActions } from '@/store/persistState';

export const BannerListTable = () => {
  const [modal, contextHolder] = useModal();
  const { t } = useTranslation(['common', 'banner']);
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const dispatch = useAppDispatch();

  const language = useAppSelector(getLanguage());
  const params = useAppSelector(getBannerQueryParams());
  const banners = useAppSelector(getBanners());
  const isLoading = useAppSelector(
    getLoading([GettingBannerListLoadingKey, RemovingBannerLoadingKey])
  );

  useEffect(() => {
    dispatch(bannerActions.getBannersRequest({}));
  }, [language]);

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
    dispatch(bannerActions.removeBannerRequest({ bannerId }));
  };

  const handleTableChange: TableProps<BannerResponse>['onChange'] = (
    pagination
  ) => {
    const { current, pageSize } = pagination;
    const search = { ...params, page: current, pageSize };
    dispatch(bannerActions.getBannersRequest({ params: search }));
  };

  const showTotal: PaginationProps['showTotal'] = (total, range) =>
    t('PagingTotal', {
      range1: range[0],
      range2: range[1],
      total,
      ns: 'common',
    });

  const columns: TableColumnsType<BannerResponse> = [
    {
      title: t('Title', { ns: 'banner' }),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('Photo', { ns: 'banner' }),
      dataIndex: 'photoUrl',
      key: 'photoUrl',
      render(value) {
        return (
          value && (
            <Image
              src={`${uploadedPhotoUrl(value)}`}
              style={{
                backgroundColor: '#00000073',
              }}
            />
          )
        );
      },
    },
    {
      title: t('Description', { ns: 'banner' }),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
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
      />
    </div>
  );
};
