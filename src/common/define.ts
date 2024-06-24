import { MenuProps } from 'antd';
import { UniqueIdentifier } from '@dnd-kit/core';
import { getEnvVars } from '@/enviroment';
import { JwtPayload } from 'jwt-decode';
const { apiUrl } = getEnvVars();

export type LanguageType = 'vi' | 'en';

export const TopNavHeight = 100;

export const TopNavHeightAdmin = 75;
export const LeftPanelWidth = 256;

export type MenuItem = Required<MenuProps>['items'][number];
export interface CustomIconComponentProps {
  width?: string | number;
  height?: string | number;
  fill?: string;
  viewBox?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ALL_OPTIONS = 'ALL_OPTIONS';

export const defaultNctsPagingParams = {
  pageSize: 20,
  pageNumber: 1,
};
export const defaultPagingParams = {
  SkipCount: 0,
  MaxResultCount: 25,
};

export const largePagingParams = {
  SkipCount: 0,
  MaxResultCount: 1000,
};

export interface PagingResponse {
  totalCount: number;
}
export type TreeItem<T> = {
  children?: TreeItem<T>[];
  id: UniqueIdentifier;
} & T;

export type FlattenedItem<T> = {
  parentId: UniqueIdentifier | null;
  /*
  How deep in the tree is current item.
  0 - means the item is on the Root level,
  1 - item is child of Root level parent,
  etc.
   */
  depth: number;
  index: number;

  parent: FlattenedItem<T> | null;
} & TreeItem<T>;

export let currentPath = '';
export const setCurrentPath = (path: string) => {
  currentPath = path;
}

export const preloadImages = new Map<string, HTMLImageElement>();

export const uploadedPhotoUrl = (fileName: string) =>
  fileName ? `${apiUrl}/api/photo/dowload/${fileName}` : '';

export const dateTimeFormat = 'HH:mm DD-MM-YYYY';
export const timeFormat = 'HH:mm';
export const dateFormat = 'DD-MM-YYYY';

export const bootstrapBreakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

export interface JwtDecoded extends JwtPayload {
  profile: string;
  role: string[];
  orgRoles: string[];
  orgId: string;
  CompanyId: number;
}

export const NCTS_InvoiceUrl =
  'https://hanghoanoibai-tt78.vnpt-invoice.com.vn/HomeNoLogin/SearchByFkey';
export const rememberMe = 'remember_me';
