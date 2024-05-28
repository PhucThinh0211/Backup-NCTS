import { FlattenedItem, TreeItem } from '@/common';
import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { notification } from 'antd';
import i18next from 'i18next';
import { jwtDecode } from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';

export default class Utils {
  static deepClone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }

  static getPersistAppState() {
    const persistState = localStorage.getItem('persist:root');
    const rootState = persistState ? JSON.parse(persistState) : {};
    /* prettier-ignore */
    const persistAppState: any = rootState['persistApp'] ? JSON.parse(rootState['persistApp']) : {};
    return persistAppState;
  }

  static isTokenValid(token: string) {
    if (!token || typeof token !== 'string') {
      return false;
    }

    const decoded = jwtDecode(token);

    if (!decoded.exp) {
      return false;
    }

    const now = new Date().valueOf();

    return now < decoded.exp * 1000;
  }

  static convertISODateToLocalTime(isoDateString: string) {
    const date = new Date(isoDateString);
    const timestampWithOffset = date.getTime();
    const offset = date.getTimezoneOffset() * 60 * 1000;
    const timestampWithoutOffset = timestampWithOffset - offset;
    const dateWithoutOffset = new Date(timestampWithoutOffset);
    return dateWithoutOffset;
  }

  static createUUID = () => uuidv4();

  static stringToColour = (str?: string) => {
    if (!str) {
      str = uuidv4();
    }
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colour = (hash & 0x00ffffff).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - colour.length) + colour;
  };

  static spitFullNameIntoFirstMiddleLastName = (name: string) => {
    const parts = name.split(' ');
    const firstName = parts.length > 0 ? parts.pop()?.trim() : '';
    const lastName = parts.length > 0 ? parts.shift()?.trim() : '';
    const middleName = parts.join(' ')?.trim();
    return {
      firstName,
      middleName,
      lastName,
    };
  };

  static errorHandling(error: any, ns = 'common') {
    console.log(JSON.stringify(error));
    if (error.errorCode && error.msg) {
      notification.error({
        message: i18next.t('notification', { ns }),
        description: i18next.t(error.msg, { ns }),
      });
      return;
    }
    if (typeof error.response === 'string') {
      notification.error({
        message: i18next.t('notification', { ns }),
        description: i18next.t(error.response, { ns }),
      });
      return;
    }
    if (error.status === 401) {
      notification.error({
        message: i18next.t('notification', { ns }),
        description: i18next.t('Token expired', { ns }),
      });
      return;
    }
    if (error.status === 404) {
      notification.error({
        message: i18next.t('notification', { ns }),
        description: i18next.t(error.message || 'Not Found', { ns }),
      });
      return;
    }
    if (error.status === 403) {
      notification.error({
        message: i18next.t('notification', { ns }),
        description: i18next.t('Forbidden', { ns }),
      });
      return;
    }
    if (error?.response?.error_description) {
      notification.error({
        message: i18next.t('notification', { ns }),
        description: i18next.t(error.response.error_description, { ns }),
      });
      return;
    }
    if (error.response?.error) {
      notification.error({
        message: i18next.t('notification', { ns }),
        description: i18next.t(error.response?.error.details, { ns }),
      });
      return;
    }
    // TODO:
    notification.error({
      message: i18next.t('notification', { ns }),
      description: i18next.t(
        'An error occurred while processing your request',
        { ns }
      ),
    });
  }

  static successNotification(message?: string, ns = 'common') {
    notification.success({
      message: i18next.t('notification', { ns }),
      description: i18next.t(message || 'Saved successfully', { ns }),
    });
  }

  static checkChildren(items: any[]): any[] {
    return items.map((item: any) => ({
      ...item,
      children: item.children?.length
        ? Utils.checkChildren(item.children)
        : undefined,
    }));
  }
  static findItem(items: any[], itemId: string) {
    return items.find(({ id }) => id === itemId);
  }

  static concatFullName = (
    firstName: string,
    middleName: string,
    lastName: string
  ) => {
    return [lastName?.trim(), middleName?.trim(), firstName?.trim()]
      .filter((x) => x)
      .join(' ');
  };

  static getDragDepth(offset: number, indentationWidth: number) {
    return Math.round(offset / indentationWidth);
  }
  static getProjection<T>(
    items: FlattenedItem<T>[],
    activeId: UniqueIdentifier,
    overId: UniqueIdentifier,
    dragOffset: number,
    indentationWidth: number
  ) {
    const overItemIndex = items.findIndex(({ id }) => id === overId);
    const activeItemIndex = items.findIndex(({ id }) => id === activeId);
    const activeItem = items[activeItemIndex];
    const newItems = arrayMove(items, activeItemIndex, overItemIndex);
    const previousItem = newItems[overItemIndex - 1];
    const nextItem = newItems[overItemIndex + 1];
    const dragDepth = Utils.getDragDepth(dragOffset, indentationWidth);
    const projectedDepth = activeItem.depth + dragDepth;
    const maxDepth = Utils.getMaxDepth({
      previousItem,
    });
    const minDepth = Utils.getMinDepth({ nextItem });
    let depth = projectedDepth;

    if (projectedDepth >= maxDepth) {
      depth = maxDepth;
    } else if (projectedDepth < minDepth) {
      depth = minDepth;
    }

    return { depth, maxDepth, minDepth, parentId: getParentId() };

    function getParentId() {
      if (depth === 0 || !previousItem) {
        return null;
      }

      if (depth === previousItem.depth) {
        return previousItem.parentId;
      }

      if (depth > previousItem.depth) {
        return previousItem.id;
      }

      const newParent = newItems
        .slice(0, overItemIndex)
        .reverse()
        .find((item) => item.depth === depth)?.parentId;

      return newParent ?? null;
    }
  }

  static getMaxDepth({ previousItem }: { previousItem: any }) {
    if (previousItem) {
      return previousItem.depth + 1;
    }

    return 0;
  }

  static getMinDepth({ nextItem }: { nextItem: any }) {
    if (nextItem) {
      return nextItem.depth;
    }

    return 0;
  }
  static flatten<T extends Record<string, any>>(
    items: TreeItem<T>[],
    parentId: UniqueIdentifier | null = null,
    depth = 0,
    parent: TreeItem<T> | null = null
  ): any[] {
    return items.reduce<any[]>((acc, item, index) => {
      const flattenedItem: any = {
        ...item,
        parentId,
        depth,
        index,
        isLast: items.length === index + 1,
        parent: parent,
      };
      return [
        ...acc,
        flattenedItem,
        ...Utils.flatten(
          item.children ?? [],
          item.id,
          depth + 1,
          flattenedItem
        ),
      ];
    }, []);
  }
  static buildTree(flattenedItems: any[]) {
    const root = { id: 'root', children: [] } as any;
    const nodes = { [root.id]: root };
    const items = flattenedItems.map((item) => ({ ...item, children: [] }));

    for (const item of items) {
      const { id } = item;
      const parentId = item.parentId ?? root.id;
      const parent = nodes[parentId] ?? Utils.findItem(items, parentId);
      item.parent = null;
      nodes[id] = item;
      parent?.children?.push(item);
    }

    return Utils.checkChildren(root.children ?? []);
  }
  static createSlug = (input: string) => {
    return input
      .toLowerCase()
      .trim()
      .replace(/[\s_-]+/g, '-') // Xóa khoảng trắng thay bằng ký tự -
      .replace(/^-+|-+$/g, '') // xóa phần dư - ở đầu & cuối
      .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
      .replace(/[\u0300-\u036f]/g, '') // xóa các ký tự dấu sau khi tách tổ hợp
      .replace(/[đĐ]/g, 'd') // Thay ký tự đĐ
      .replace(/([^0-9a-z-\s])/g, '') // xóa ký tự đặt biệt
      .replace(/-+/g, '-'); // Xóa ký tự - liên tiếp
  };
  static getHexStringFromEvent = (e: any) => {
    return e.toHexString();
  };
}

export const trimAll = (obj: any) => {
  if (!obj) {
    return obj;
  }
  const objType = typeof obj;
  if (objType === 'string') {
    return obj ? obj.trim() : '';
  }
  if (objType === 'object' && !Array.isArray(obj)) {
    const newObj = Utils.deepClone(obj);
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        newObj[key] = value ? value.trim() : '';
      } else if (typeof value === 'object') {
        newObj[key] = trimAll(value);
      }
    }
    return newObj;
  }
  if (Array.isArray(obj)) {
    const newArray = Utils.deepClone(obj);
    for (let index = 0; index < newArray.length; index++) {
      const value = newArray[index];
      if (typeof value === 'string') {
        newArray[index] = value ? value.trim() : '';
      } else if (typeof value === 'object') {
        newArray[index] = trimAll(value);
      }
    }
    return newArray;
  }
  return obj;
};
