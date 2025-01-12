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

  static concatFullName = (firstName: string, middleName: string, lastName: string) => {
    return [lastName?.trim(), middleName?.trim(), firstName?.trim()].filter(x => x).join(' ');
  };
}
