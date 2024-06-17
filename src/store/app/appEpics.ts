import {
  catchError,
  concat,
  filter,
  finalize,
  mergeMap,
  switchMap,
} from 'rxjs';

import { appActions } from './appSlice';
import { startLoading, stopLoading } from '../loading';
import { RootEpic } from '../types';
import { setToken } from '@/services/HttpClient';
import { login } from '@/services/IdentityService';
import Utils from '@/utils';
import { getApplicationConfiguration } from '@/services/AppConfigService';
import { publicCmsActions } from '../publicCms';

const loginRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(appActions.loginRequest.match),
    switchMap((action) => {
      const { input, callback } = action.payload;
      let success = false;
      return concat(
        [startLoading({ key: 'login' })],
        login(input).pipe(
          switchMap((loginResponse) => {
            if (loginResponse.errorCode) {
              Utils.errorHandling(loginResponse);
              return [stopLoading({ key: 'login' })];
            }
            success = true;
            const actionMap = [
              appActions.loginSuccess({ loginResponse, loginData: input }),
              stopLoading({ key: 'login' }),
            ];
            if (input.password) {
              setToken(loginResponse.access_token);
            }
            return getApplicationConfiguration({
              token: loginResponse.access_token,
            }).pipe(
              mergeMap((config) => [
                ...actionMap,
                appActions.setAppConfig(config),
                appActions.setCurrentUser(config?.currentUser),
              ])
            );
          }),
          catchError((error) => {
            Utils.errorHandling(error, 'webTrack');
            return [publicCmsActions.getCaptchaRequest(), stopLoading({ key: 'login' })];
          }),
          finalize(() => {
            if (success && callback) {
              callback();
            }
          })
        )
      );
    })
  );
};
export const appEpics = [loginRequest$];
