import HttpClient from './HttpClient';
import { RequestOptions } from './types';
import { PagingResponse } from '@/common/define';
import { getEnvVars } from '@/enviroment';

const { apiUrl } = getEnvVars();

export interface DepartmentsPagingResponse extends PagingResponse {
  items: DepartmentResponse[];
}

export type ContactType =
  | 'Phone'
  | 'Ext'
  | 'Fax'
  | 'Email';

export interface ContactResponse {
  id: string;
  creationTime: string;
  creatorId: string | null;
  lastModificationTime: string;
  lastModifierId: string | null;
  isDeleted: boolean;
  deleterId: string | null;
  deletionTime: string | null;
  type: ContactType;
  code: string | null;
  title: string | null;
  contactNum: string | null;
  sortSeq: number;
  departmentId: string;
  language: string;
}

export interface DepartmentResponse {
  id: string;
  creationTime: string;
  creatorId: string | null;
  lastModificationTime: string;
  lastModifierId: string | null;
  isDeleted: boolean;
  deleterId: string | null;
  deletionTime: string | null;
  code: string;
  name: string;
  sortSeq: number;
  language: string;
  contacts: ContactResponse[]
}
export interface CreateUpdateDepartmentPayload {
  code: string;
  name: string;
  sortSeq?: number;
  contacts?: CreateUpdateContactPayload[]
}
export interface CreateUpdateContactPayload {
  type: ContactType;
  code: string | null;
  title: string | null;
  contactNum: string | null;
  sortSeq: number;
}
export interface CreateUpdateDepartmentTranslationPayload {
  language: string;
  name: string;
}

class DepartmentController {
  public Get = {
    getAllDepartments: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/department`, options);
    },
    getDepartmentById: (departmentId: string, options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/department/${departmentId}`, options);
    },
  };

  public Post = {
    createDepartment: (
      input: CreateUpdateDepartmentPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(`${apiUrl}/api/app/department`, input, options);
    },
    createDepartmentTranslations: (
      departmentId: string,
      input: CreateUpdateDepartmentTranslationPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(
        `${apiUrl}/api/app/department/${departmentId}/translations`,
        input,
        options
      );
    },
  };

  public Put = {
    updateDepartment: (
      departmentId: string,
      input: CreateUpdateDepartmentPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.put(
        `${apiUrl}/api/app/department/${departmentId}`,
        input,
        options
      );
    },
  };

  public delete = {
    removeDepartment: (departmentId: string, options?: RequestOptions) => {
      return HttpClient.delete(
        `${apiUrl}/api/app/department/${departmentId}`,
        options
      );
    },
  };
}

export const DepartmentService = new DepartmentController();
