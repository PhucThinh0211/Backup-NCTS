import { CompanyResponse } from '@/services/CompanyService';

interface CompanyProps {
  company: CompanyResponse;
}

export const Company = ({ company }: CompanyProps) => {
  return <div>{company.name}</div>;
};
