import { InvoicesLookup } from '@/components/QuickLookup/InvoicesLookup';
import { Divider } from 'antd';

export const InvoiceLookupResult = () => {
  return (
    <>
      <div
        className='mx-auto my-2 px-3 py-2 px-md-4 py-md-3'
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          filter: 'drop-shadow(0 14px 30px rgba(0, 0, 0, .1))',
        }}
      >
        <InvoicesLookup />
      </div>
      <Divider />
    </>
  );
};
