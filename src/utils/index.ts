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
    const persistAppState: any = rootState['app'] ? JSON.parse(rootState['app']) : {};
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
    let colour = (hash & 0x00ffffff).toString(16).toUpperCase();
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

  static errorHandling(error: any) {
    console.log(JSON.stringify(error));
    if (error.errorCode && error.msg) {
      notification.error({
        message: i18next.t('notification'),
        description: i18next.t(error.msg),
      });
      return;
    }
    if (typeof error.response === 'string') {
      notification.error({
        message: i18next.t('notification'),
        description: i18next.t(error.response),
      });
      return;
    }
    if (error.status === 401) {
      notification.error({
        message: i18next.t('notification'),
        description: i18next.t('Token expired'),
      });
      return;
    }
    if (error.status === 404) {
      notification.error({
        message: i18next.t('notification'),
        description: i18next.t(error.message || 'Not Found'),
      });
      return;
    }
    if (error.status === 403) {
      notification.error({
        message: i18next.t('notification'),
        description: i18next.t('Forbidden'),
      });
      return;
    }
    if (error?.response?.error_description) {
      notification.error({
        message: i18next.t('notification'),
        description: i18next.t(error.response.error_description),
      });
      return;
    }
    if (error.response?.error) {
      notification.error({
        message: i18next.t('notification'),
        description: i18next.t(error.response?.error),
      });
      return;
    }
    // TODO:
    notification.error({
      message: i18next.t('notification'),
      description: i18next.t('An error occurred while processing your request'),
    });
  }

  static successNotification(message?: string) {
    notification.success({
      message: i18next.t('notification'),
      description: i18next.t(message || 'Saved successfully'),
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
  static getProjection(
    items: any[],
    activeId: string,
    overId: string,
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
  static flatten(
    items: any[],
    parentId: string | null = null,
    depth = 0,
    parent: any | null = null
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
}
