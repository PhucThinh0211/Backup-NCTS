import HttpClient from './HttpClient';
import { RequestOptions } from './types';
import { PagingResponse } from '@/common/define';
// import { getEnvVars } from '@/environment';

// const { apiUrl } = getEnvVars();
const apiUrl = '';

export type MenuStyle = 'None' | 'Button';

export interface MenusPagingResponse extends PagingResponse {
  results: MenuResponse[];
}

export interface MenuLink {
  id: string;
  label: string;
  url: string;
  icon?: string;
  style?: MenuStyle;
  sortSeq: number;
}

export interface MegaMenuType {
  id: string;
  label: string;
  links: MenuLink[];
  sortSeq: number;
}

export enum MenuType {
  Link = 'Link',
  Dropdown = 'Dropdown',
  Group = 'Group',
}

export interface MenuResponse {
  id: string;
  label: string;
  type: MenuType;
  icons?: string | null;
  url?: string | null;
  links?: MenuLink[];
  groups?: MegaMenuType[];
  sortSeq: number;
  parentId?: string | null;
  parent?: MenuResponse | null;
  style?: string | null;
  language?: string | null;
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
