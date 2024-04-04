import HttpClient from './HttpClient';
import { RequestOptions } from './types';
import { PagingResponse } from '@/common/define';
// import { getEnvVars } from '@/environment';

// const { apiUrl } = getEnvVars();
const apiUrl = '';

export interface MenusPagingResponse extends PagingResponse {
  results: MenuResponse[];
}

export enum MenuType {
  Link = 'Link',
  Dropdown = 'Dropdown',
  Group = 'Group',
}

export interface MenuResponse {
  id: number;
  label: string;
  url?: string;
  icons?: string;
  parentId?: string;
  type: MenuType;
  style: string;
}
export interface CreateUpdateMenuPayload {
  label: string;
  url?: string;
  icons?: string;
  parentId?: string;
  type: MenuType;
  style: string;
  sortSeq?: number;
}

class MenuController {
  public Get = {
    getAllMenus: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/Menu`, options);
    },
    getMenuById: (menuId: number, options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/Menu/${menuId}`, options);
    },
  };

  public Post = {
    createMenu: (input: CreateUpdateMenuPayload, options?: RequestOptions) => {
      return HttpClient.post(`${apiUrl}/api/Menu`, input, options);
    },
  };

  public Put = {
    updateMenu: (
      menuId: number,
      input: CreateUpdateMenuPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.put(`${apiUrl}/api/Menu/${menuId}`, input, options);
    },
  };

  public delete = {
    removeMenu: (menuId: number, options?: RequestOptions) => {
      return HttpClient.delete(`${apiUrl}/api/Menu/${menuId}`, options);
    },
  };
}

export const MenuService = new MenuController();
