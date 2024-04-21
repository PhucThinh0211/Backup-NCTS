import { DepartmentListHeader } from './DepartmentListHeader';
import { DepartmentListTable } from './DepartmentListTable';
import { DepartmentListToolbar } from './DepartmentListToolbar';

export const DepartmentList = () => {
  return (
    <>
      <DepartmentListHeader />
      <DepartmentListToolbar />
      <DepartmentListTable />
    </>
  );
};
