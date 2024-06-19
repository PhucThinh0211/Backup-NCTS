import { InvoicesLookup } from '@/components/QuickLookup/InvoicesLookup';
import { Divider } from 'antd';

export const InvoiceLookupResult = () => {
  return (
    <>
      <div
        className='mx-auto my-2'
        style={{
          maxWidth: 450,
          backgroundColor: 'white',
          borderRadius: 8,
          filter: 'drop-shadow(0 14px 30px rgba(0, 0, 0, .1))',
          padding: '25px 30px',
        }}
      >
        <InvoicesLookup />
      </div>
      <Divider />
    </>
  );
};