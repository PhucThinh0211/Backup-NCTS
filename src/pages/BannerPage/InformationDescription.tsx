import { Typography } from 'antd';

interface InformationDescriptionProps {
  label: string;
  value: string;
}
export const InformationDescription = ({
  label,
  value,
}: InformationDescriptionProps) => {
  return (
    <div className='w-full flex flex-row justify-between items-center'>
      <Typography.Text strong>{label}</Typography.Text>
      <Typography.Text>{value}</Typography.Text>
    </div>
  );
};
