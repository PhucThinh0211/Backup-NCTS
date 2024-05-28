import HttpClient from './HttpClient';
import { RequestOptions } from './types';
import { PagingResponse } from '@/common/define';
import { getEnvVars } from '@/enviroment';

const { apiUrl } = getEnvVars();

export interface DocumentTypesPagingResponse extends PagingResponse {
  items: DocumentTypeResponse[];
}

export interface DocumentTypeResponse {
  id: string;
  creationTime: string;
  creatorId: string | null;
  lastModificationTime: string;
  lastModifierId: string | null;
  isDeleted: boolean;
  deleterId: string | null;
  deletionTime: string | null;
  code: string | null;
  name: string | null;
  sortSeq: number;
  language: string | null;
}
export interface CreateUpdateDocumentTypePayload {
  code: string;
  name: string;
  sortSeq?: number;
}
export interface CreateUpdateDocumentTypeTranslationPayload {
  language: string;
  name: string;
}

class DocumentTypeController {
  public Get = {
    getAllDocumentTypes: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/document-type`, options);
    },
    getDocumentTypeById: (documentTypeId: string, options?: RequestOptions) => {
      return HttpClient.get(
        `${apiUrl}/api/app/document-type/${documentTypeId}`,
        options
      );
    },
  };

  public Post = {
    createDocumentType: (
      input: CreateUpdateDocumentTypePayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(`${apiUrl}/api/app/document-type`, input, options);
    },
    createDocumentTypeTranslations: (
      documentTypeId: string,
      input: CreateUpdateDocumentTypeTranslationPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(
        `${apiUrl}/api/app/document-type/${documentTypeId}/translations`,
        input,
        options
      );
    },
  };

  public Put = {
    updateDocumentType: (
      documentTypeId: string,
      input: CreateUpdateDocumentTypePayload,
      options?: RequestOptions
    ) => {
      return HttpClient.put(
        `${apiUrl}/api/app/document-type/${documentTypeId}`,
        input,
        options
      );
    },
  };

  public delete = {
    removeDocumentType: (documentTypeId: string, options?: RequestOptions) => {
      return HttpClient.delete(
        `${apiUrl}/api/app/document-type/${documentTypeId}`,
        options
      );
    },
  };
}

export const DocumentTypeService = new DocumentTypeController();
