import { Table } from 'antd';

export const ReportsTable = () => {
  const columns = [
    {
      title: 'Title',
      key: 'title',
    },
    {
      title: 'Published date',
      key: 'publishedDate',
    },
    {
      render: () => <>Download</>,
    },
  ];
  return <Table dataSource={[]} columns={columns} />;
};
