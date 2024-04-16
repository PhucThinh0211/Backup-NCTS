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
    <div className='w-full flex flex-row justify-between gap-2'>
      <Typography.Text strong className='whitespace-nowrap'>
        {label}
      </Typography.Text>
      {typeof value === 'string' ? (
        <Typography.Text className={'text-right'}>{value}</Typography.Text>
      ) : (
        value
      )}
    </div>
  );
};
