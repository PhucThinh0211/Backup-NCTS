import { Typography } from 'antd';
import { ReactNode } from 'react';

interface InformationDescriptionProps {
  label: string;
  value: ReactNode;
}
export const InformationDescription = ({
  label,
  value,
}: InformationDescriptionProps) => {
  return (
    <div className='w-full flex flex-row justify-between items-center'>
      <Typography.Text strong>{label}</Typography.Text>
      {typeof value === 'string' ? (
        <Typography.Text>{value}</Typography.Text>
      ) : (
        value
      )}
    </div>
  );
};
