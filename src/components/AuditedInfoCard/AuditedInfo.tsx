import { Typography } from 'antd';
import { ReactNode } from 'react';

interface AuditedInfoProps {
  label: string;
  value: ReactNode;
}
export const AuditedInfo = ({
  label,
  value,
}: AuditedInfoProps) => {
  return (
    <div className='w-100 d-flex flex-row justify-content-between gap-2'>
      <Typography.Text strong style={{ whiteSpace: 'nowrap' }}>
        {label}
      </Typography.Text>
      {typeof value === 'string' ? (
        <Typography.Text className={'text-end'}>{value}</Typography.Text>
      ) : (
        value
      )}
    </div>
  );
};
