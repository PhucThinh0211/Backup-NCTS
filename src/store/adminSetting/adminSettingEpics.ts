import {
  catchError,
  concat,
  filter,
  mergeMap,
  switchMap,
  withLatestFrom,
} from "rxjs";

import { adminSettingActions } from "./adminSettingSlice";
import { startLoading, stopLoading } from "../loading";
import { RootEpic } from "../types";
import { defaultPagingParams } from "@/common/define";
import {
  GettingCompanyListLoadingKey,
  RemovingCompanyLoadingKey,
  SavingCompanyLoadingKey,
  GettingCompanyLoadingKey,
  GettingEmailSettingLoadingKey,
  SavingEmailSettingLoadingKey,
} from "@/common/loadingKey";
import { CompanyService } from "@/services/CompanyService";
import Utils from "@/utils";
import { EmailSettingService } from "@/services/EmailSettingService";

const getEmailSettingRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(adminSettingActions.getEmailSettingRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { params } = action.payload;
      const search = {
        ...state.adminSetting.queryParams,
        ...params,
      };

      return concat(
        [startLoading({ key: GettingEmailSettingLoadingKey })],
        EmailSettingService.Get.getEmailSetting({
          search,
        }).pipe(
          mergeMap((emailSetting) => {
            return [
              adminSettingActions.setQueryParams(search),
              adminSettingActions.setEmailSetting(emailSetting),
            ];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [adminSettingActions.setEmailSetting(undefined)];
          })
        ),
        [stopLoading({ key: GettingEmailSettingLoadingKey })]
      );
    })
  );
};

const createEmailSettingRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(adminSettingActions.createEmailSettingRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { input } = action.payload;
      const search = {
        ...state.adminSetting.queryParams,
      };
      return concat(
        [startLoading({ key: SavingEmailSettingLoadingKey })],
        EmailSettingService.Post.createEmailSetting(input).pipe(
          mergeMap((emailSetting) => {
            return [
              adminSettingActions.getEmailSettingRequest({ params: search }),
            ];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: SavingEmailSettingLoadingKey })]
      );
    })
  );
};

export const adminSettingEpics = [
  getEmailSettingRequest$,
  createEmailSettingRequest$,
];
