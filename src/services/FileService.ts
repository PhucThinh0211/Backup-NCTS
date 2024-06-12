import HttpClient from './HttpClient';
import { RequestOptions } from './types';
import { PagingResponse } from '@/common/define';
import { getEnvVars } from '@/enviroment';

const { apiUrl } = getEnvVars();

export interface FilesPagingResponse extends PagingResponse {
  items: FileResponse[];
}

export enum MediaType {
  DOCUMENTS = 'Documents',
  PHOTOS = 'Photos',
  VIDEOS = 'Videos',
  CERTIFICATES = 'Certificates',
  LOGOS = 'Logos',
}

export interface FileResponse {
  id: string;
  creationTime: string;
  creatorId: string;
  lastModificationTime: string;
  lastModifierId: string;
  isDeleted: boolean;
  deleterId: string;
  deletionTime: string;
  type: string;
  code: string;
  name: string;
  description: string;
  fileName: string;
  fileSize: number;
  sizeOnDisk: string;
  fileExtension: string;
  location: string;
  public: boolean;
}

export interface FolderResponse {
  id: string;
  creationTime: string;
  creatorId: string;
  lastModificationTime: string;
  lastModifierId: string;
  isDeleted: boolean;
  deleterId: string;
  deletionTime: string;
  type: string;
  location: string;
  name: string;
  description: string;
  parentId: string;
  files: FileResponse[];
}

export interface CreateUpdateFolderPayload {
  type: MediaType;
  location?: string;
  name: string;
  description?: string;
  parentId?: string;
}

class FileController {
  public Get = {
    getAllFolders: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/file/folders`, options);
    },
  };

  public Post = {
    uploadFile: (input: FormData, options?: RequestOptions) => {
      return HttpClient.post(`${apiUrl}/api/app/file/upload`, input, options);
    },
    createFolder: (
      input: CreateUpdateFolderPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(`${apiUrl}/api/app/file/folder`, input, options);
    },
  };

  public Put = {};

  public delete = {};
}

export const FileService = new FileController();
