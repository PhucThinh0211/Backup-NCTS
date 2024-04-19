import HttpClient from './HttpClient';
import { RequestOptions } from './types';
import { PagingResponse } from '@/common/define';
import { getEnvVars } from '@/enviroment';

const { apiUrl } = getEnvVars();

export interface CompaniesPagingResponse extends PagingResponse {
  items: CompanyResponse[];
}

export interface CompanyResponse {
  id: string;
  creationTime: string;
  creatorId: string | null;
  lastModificationTime: string;
  lastModifierId: string | null;
  isDeleted: boolean;
  deleterId: string | null;
  deletionTime: string | null;
  name: string | null;
  businessCode: string | null;
  infoRegistered: string | null;
  address: string | null;
  phone: string | null;
  fax: string | null;
  sita: string | null;
  email: string | null;
  website: string | null;
  bankName: string | null;
  bankBranch: string | null;
  accountVnd: string | null;
  accountUsd: string | null;
  googleMapsEmbed: string | null;
  language: string | null;
}
export interface CreateUpdateCompanyPayload {
  name: string;
  address: string;
  businessCode?: string | null;
  infoRegistered?: string | null;
  phone?: string | null;
  fax?: string | null;
  sita?: string | null;
  email?: string | null;
  website?: string | null;
  bankName?: string | null;
  bankBranch?: string | null;
  accountVnd?: string | null;
  accountUsd?: string | null;
  googleMapsEmbed?: string | null;
}
export interface CreateUpdateCompanyTranslationPayload {
  language: string;
  name: string;
  address: string;
  bankName?: string | null;
  bankBranch?: string | null;
}

class CompanyController {
  public Get = {
    getAllCompanies: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/company`, options);
    },
    getCompanyById: (companyId: string, options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/company/${companyId}`, options);
    },
  };

  public Post = {
    createCompany: (
      input: CreateUpdateCompanyPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(`${apiUrl}/api/app/company`, input, options);
    },
    createCompanyTranslations: (
      companyId: string,
      input: CreateUpdateCompanyTranslationPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(
        `${apiUrl}/api/app/company/${companyId}/translations`,
        input,
        options
      );
    },
  };

  public Put = {
    updateCompany: (
      companyId: string,
      input: CreateUpdateCompanyPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.put(
        `${apiUrl}/api/app/company/${companyId}`,
        input,
        options
      );
    },
  };

  public delete = {
    removeCompany: (companyId: string, options?: RequestOptions) => {
      return HttpClient.delete(
        `${apiUrl}/api/app/company/${companyId}`,
        options
      );
    },
  };
}

export const CompanyService = new CompanyController();
