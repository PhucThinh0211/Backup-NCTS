import { useState } from 'react';
import { InformationTimestamp } from '@/components/InformationTimestamp';

export const BannerInformation = () => {
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
