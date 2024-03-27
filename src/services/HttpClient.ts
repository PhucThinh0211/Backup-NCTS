import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { ajax, AjaxError, AjaxResponse } from 'rxjs/ajax';
import { catchError, finalize, map, switchMap, take } from 'rxjs/operators';

import { buildRequestUrl, extractHeaders, removeCustomKeys } from './HttpHelper';
import { RequesterConfig, RequestOptions } from './types';
import { AppStore } from '@/store';

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

let store: AppStore;
export const injectStore = (reduxStore: AppStore) => {
  store = reduxStore;
}

const mapResponse = map((x: AjaxResponse<any>, index) => x.response);

const tokenSubject = new BehaviorSubject<string | null>(null);
let isRefreshing = false;
const requestQueue: any[] = [];

export const setToken = (token: string | null) => {
  tokenSubject.next(token);
};

// const handleTokenRefresh = (): Observable<string> => {
//   const state = store.getState();
//   const { refresh_token } = state.app.auth;
//   const { preferences } = state.user;
//   const loginData = {
//     grant_type: 'refresh_token',
//     refresh_token,
//     remember: true,
//     orgId: preferences?.defaultOrganization
//   };
//   return IdentityService.Post.login(loginData).pipe(
//     map((tokenRes: any) => {
//       setToken(tokenRes.access_token);
//       const { dispatch } = store;
//       dispatch(appActions.loginSuccess({ loginResponse: tokenRes, loginData }));
//       return tokenRes.access_token as string;
//     }),
//     catchError((refreshError) => throwError(() => refreshError))
//   );
// };

const sendHttpRequest = (url: string, options: RequestOptions, headers?: any) => {
  const ajaxRequest = removeCustomKeys(options);
  return ajax({ url, headers, ...ajaxRequest }).pipe(mapResponse);
};

const httpRequest = (url: string, options: RequestOptions): Observable<any> => {
  const mergedConfig: RequesterConfig = { includeJSONHeaders: true };
  const rUrl = buildRequestUrl(url, options.search);
  const rHeaders = extractHeaders(options, Boolean(mergedConfig.includeJSONHeaders));
  
  return tokenSubject.pipe(
    take(1),
    switchMap((token) => {
      const headersWithToken = token ? { ...rHeaders, Authorization: `Bearer ${token}` } : rHeaders;
      return sendHttpRequest(rUrl, options, headersWithToken).pipe(
        catchError((error: AjaxError) => {
          const state = store.getState();
          // const { auth } = state.app;
          // if (error.status === 401 && auth?.remember) {
          //   if (!isRefreshing) {
          //     isRefreshing = true;
          //     return handleTokenRefresh().pipe(
          //       switchMap((newToken: string) => {
          //         isRefreshing = false;
          //         const updatedHeaders = { ...rHeaders, Authorization: `Bearer ${newToken}` };
          //         return sendHttpRequest(rUrl, options, updatedHeaders);
          //       }),
          //       catchError((refreshError) => {
          //         isRefreshing = false;
          //         return throwError(() => refreshError);
          //       }),
          //       finalize(() => {
          //         isRefreshing = false;
          //         const newRequests = requestQueue.map((queuedRequest) => {
          //           return () => queuedRequest();
          //         });
          //         requestQueue.length = 0;
          //         newRequests.forEach((queuedRequest) => queuedRequest());
          //       })
          //     );
          //   } else {
          //     return new Observable<any>((observer) => {
          //       requestQueue.push(() => httpRequest(url, options).subscribe(observer));
          //     });
          //   }
          // }
          // if (error.status === 401) {
          //   const { dispatch } = store;
          //   dispatch(appActions.logout({}));
          // }
          return throwError(() => error);
        })
      );
    })
  );
};

class HttpInterceptor {
  request(method: HttpMethod, url: string, body?: any, options?: RequestOptions) {
    return httpRequest(url, { ...options, method, body });
  }

  get(url: string, options?: RequestOptions) {
    return this.request(HttpMethod.GET, url, undefined, options);
  }

  post(url: string, body?: any, options?: RequestOptions) {
    return this.request(HttpMethod.POST, url, body, options);
  }

  put(url: string, body?: any, options?: RequestOptions) {
    return this.request(HttpMethod.PUT, url, body, options);
  }

  delete(url: string, options?: RequestOptions) {
    return this.request(HttpMethod.DELETE, url, undefined, options);
  }
}

const HttpClient = new HttpInterceptor();
export default HttpClient;
