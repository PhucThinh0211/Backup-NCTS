import { MenuProps } from 'antd';
import { UniqueIdentifier } from '@dnd-kit/core';

export type LanguageType = 'vi' | 'en';

export const TopNavHeight = 75;
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

export const defaultPagingParams = {
  paging: true,
  page: 1,
  pageSize: 20,
};

export const largePagingParams = {
  paging: true,
  page: 1,
  pageSize: 2000,
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
