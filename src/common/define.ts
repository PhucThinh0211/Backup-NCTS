import { MenuProps } from "antd";

export type LanguageType = "vi" | "en";

export const TopNavHeight = 75;
export const LeftPanelWidth = 256;

export type MenuItem = Required<MenuProps>["items"][number];
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

export const CreateUpdateMenuModalName = "CreateUpdateMenuModal";
export const GettingMenuList = "GettingMenuList";
export const SavingMenu = "SavingMenu";
export const RemovingMenu = "RemovingMenu";
