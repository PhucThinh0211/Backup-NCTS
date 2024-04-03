import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { Button, Modal, Space, Table } from 'antd';
import { useTranslation } from 'react-i18next';

import {
  CreateUpdateMenuModalName,
  GettingMenuList,
  RemovingMenu,
} from '@/common/define';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLoading } from '@/store/loading';
import { showModal } from '@/store/modal';

export const MenuListTable = () => {
  const { t } = useTranslation('menu');
  const windowSize = useWindowSize();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getLoading(GettingMenuList));
  const isRemoving = useAppSelector(getLoading(RemovingMenu));

  const moreActions = [
    {
      key: 'edit',
      label: t('Edit'),
      icon: <EditOutlined style={{ color: '#1890ff' }} />,
    },
    {
      key: 'remove',
      label: t('Remove'),
      icon: <DeleteOutlined style={{ color: '#ff4d4f' }} />,
    },
  ];

  const handleMoreActionClick = ({ key }: any, record: any) => {
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
    console.log(menu);
    dispatch(showModal({ key: CreateUpdateMenuModalName }));
  };

  const confirmRemoveMenu = (menu: any) => {
    Modal.confirm({
      title: t('Notification'),
      content: (
        <div
          dangerouslySetInnerHTML={{
            __html: t('confirmRemove', {
              name: `<strong>"${menu.name}"</strong>`,
            }),
          }}
        />
      ),
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

  const columns = [
    {
      title: t('ID'),
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('Name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('Url'),
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
      <Table
        rowKey={(record) => record.id}
        dataSource={[]}
        columns={columns}
        style={{ width: '100%' }}
        size='small'
        scroll={{ x: 1000, y: windowSize[1] - 310 }}
        // pagination={{
        //   current: params?.page || defaultPagingParams.page,
        //   pageSize: params?.pageSize || defaultPagingParams.pageSize,
        //   total: menus?.queryCount || 0,
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
