import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { Button, Space, Table } from 'antd';
import { useTranslation } from 'react-i18next';

import {
  GettingBannerListLoadingKey,
  RemovingBannerLoadingKey,
} from '@/common/loadingKey';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import { getBanners, bannerActions } from '@/store/banner';
import useModal from 'antd/es/modal/useModal';
import { useNavigate } from 'react-router-dom';

export const BannerListTable = () => {
  const [modal, contextHolder] = useModal();
  const { t } = useTranslation(['common', 'banner']);
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const dispatch = useAppDispatch();
  const banners = useAppSelector(getBanners());
  const isLoading = useAppSelector(getLoading(GettingBannerListLoadingKey));
  const isRemoving = useAppSelector(getLoading(RemovingBannerLoadingKey));

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
        editBanner(record);
        break;
      default:
        confirmRemoveBanner(record);
        break;
    }
  };

  const editBanner = (banner: any) => {
    dispatch(bannerActions.setSelectedBanner(banner));
    navigate('/admin/banners/edit');
  };

  const confirmRemoveBanner = (banner: any) => {
    modal.confirm({
      title: t('Notification'),
      content: (
        <div
          dangerouslySetInnerHTML={{
            __html: t('ConfirmRemove', {
              name: `<strong>"${banner.label}"</strong>`,
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

  const handleRemoveBanner = (bannerId: number) => {
    console.log(bannerId);

    // dispatch(bannerActions.removeBannerRequest({ bannerId, projectId: selectedProject?.id }));
  };

  // const handleTableChange: TableProps<any>['onChange'] = (
  //   pagination,
  //   filters,
  //   sorter
  // ) => {
  // const { current, pageSize } = pagination;
  // const search = { ...params, page: current, pageSize };
  // if (selectedProject) {
  //   dispatch(bannerActions.getBannersRequest({ params: search, projectId: selectedProject.id }));
  // }
  // };

  // const showTotal: PaginationProps['showTotal'] = (total, range) =>
  //   t('banner.pagingTotal', { range1: range[0], range2: range[1], total });

  const columns = [
    {
      title: t('ID', { ns: 'banner' }),
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('Name', { ns: 'banner' }),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('Url', { ns: 'banner' }),
      dataIndex: 'url',
      key: 'url',
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
        dataSource={banners?.results}
        columns={columns}
        style={{ width: '100%' }}
        size='small'
        scroll={{ x: 1000, y: windowSize[1] - 310 }}
        // pagination={{
        //   current: params?.page || defaultPagingParams.page,
        //   pageSize: params?.pageSize || defaultPagingParams.pageSize,
        //   total: banners?.queryCount || 0,
        //   responsive: true,
        //   showTotal,
        // }}
        loading={isLoading || isRemoving}
        // onChange={handleTableChange}
        rowSelection={{ columnWidth: 50 }}
      />
    </div>
  );
};
