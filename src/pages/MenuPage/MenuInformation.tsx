import { InformationTimestamp } from '@/components/InformationTimestamp';
import { useState } from 'react';

export const MenuInformation = () => {
  const [locale, setLocale] = useState<string>('vi');
  const props = {
    createdAt: '2 years ago',
    createdBy: 'Admin',
    updatedAt: '2 years ago',
    updatedBy: 'Admin',
  };
  return (
    <InformationTimestamp
      {...props}
      locale={locale}
      onChangeLocale={setLocale}
    />
  );
};
