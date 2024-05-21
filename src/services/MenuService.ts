import HttpClient from './HttpClient';
import { RequestOptions } from './types';
import { LanguageType, PagingResponse } from '@/common/define';
import { getEnvVars } from '@/enviroment';

const { apiUrl } = getEnvVars();

export type MenuStyle = 'None' | 'Button';

export interface MenusPagingResponse extends PagingResponse {
  items: MenuResponse[];
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
  Mega = 'Mega'
}

export type MenuItemType = 'Mega' | 'Dropdown' | 'Group' | 'Link';

export interface MenuResponse {
  id: string;
  label: string;
  type: MenuItemType;
  icons?: string | null;
  iconColor?: string;
  url?: string | null;
  sortSeq: number;
  parentId?: string | null;
  style?: string | null;
  language?: LanguageType;
  creationTime: string;
  creatorId: string | null;
  lastModificationTime: string;
  lastModifierId: string | null;
}
export interface MenuNode {
  label: string;
  url: string;
  icons?: string | null;
  children: Record<string, MenuNode>;
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

export interface CreateUpdateMenuTranslationPayload {
  language: string;
  label: string;
}

class MenuController {
  public Get = {
    getAllMenus: (options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/menu`, options);
    },
    getMenuById: (menuId: string, options?: RequestOptions) => {
      return HttpClient.get(`${apiUrl}/api/app/menu/${menuId}`, options);
    },
  };

  public Post = {
    createMenu: (input: CreateUpdateMenuPayload, options?: RequestOptions) => {
      return HttpClient.post(`${apiUrl}/api/app/menu`, input, options);
    },
    createMenuTranslations: (
      menuId: string,
      input: CreateUpdateMenuTranslationPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.post(
        `${apiUrl}/api/app/menu/${menuId}/translations`,
        input,
        options
      );
    },
  };

  public Put = {
    updateMenu: (
      menuId: string,
      input: CreateUpdateMenuPayload,
      options?: RequestOptions
    ) => {
      return HttpClient.put(`${apiUrl}/api/app/menu/${menuId}`, input, options);
    },
  };

  public delete = {
    removeMenu: (menuId: string, options?: RequestOptions) => {
      return HttpClient.delete(`${apiUrl}/api/app/menu/${menuId}`, options);
    },
  };
}

export const MenuService = new MenuController();
