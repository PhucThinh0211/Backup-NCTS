import { ReactNode } from 'react';

import { Typography } from 'antd';
import { useAppSelector } from '@/store/hooks';
import { getCurrentCompany } from '@/store/publicCms';

interface CompanyInformationProps {
  iconClass: string;
  children: ReactNode;
}
const CompanyInformation = ({
  iconClass,
  children,
}: CompanyInformationProps) => {
  return (
    <div className='d-flex flex-row gap-2 align-items-center'>
      <div
        className='d-flex align-items-center justify-content-center'
        style={{ minWidth: 15 }}
      >
        <i className={`${iconClass}`} aria-hidden='true'></i>
      </div>
      <div className={'d-flex flex-column'}>{children}</div>
    </div>
  );
};

export const CompanySection = () => {
  const company = useAppSelector(getCurrentCompany());

  return (
    <div>
      <div className='d-flex flex-column gap-2 mb-4'>
        {company?.name && <p className='h4 text-orange'>{company.name}</p>}
        {company?.email && (
          <CompanyInformation iconClass='fa-solid fa-envelope'>
            <Typography.Text>{company.email}</Typography.Text>
          </CompanyInformation>
        )}
        {company?.phone && (
          <CompanyInformation iconClass='fa-solid fa-phone'>
            <Typography.Text>{company.phone}</Typography.Text>
          </CompanyInformation>
        )}
        {company?.address && (
          <CompanyInformation iconClass='fa-solid fa-location-dot'>
            <Typography.Text>{company.address}</Typography.Text>
          </CompanyInformation>
        )}
        {company?.website && (
          <CompanyInformation iconClass='fa-solid fa-earth-europe'>
            <Typography.Text>{company.website}</Typography.Text>
          </CompanyInformation>
        )}
      </div>
      {company?.googleMapsEmbed && (
        <div className='d-flex flex-column'>
          <div
            className='google-maps rounded-4'
            dangerouslySetInnerHTML={{ __html: company.googleMapsEmbed || '' }}
          />
        </div>
      )}
    </div>
  );
};
