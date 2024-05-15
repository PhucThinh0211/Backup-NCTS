import { catchError, concat, filter, switchMap } from "rxjs";
import { RootEpic } from "../types";
import { publicCmsActions } from "./publicCmsSlice";
import { startLoading, stopLoading } from "../loading";
import { GettingMenuListLoadingKey } from "@/common";
import { PublicCmsService } from "@/services/PublicCmsService";
import Utils from "@/utils";

const getMenuListRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(publicCmsActions.getMenuListRequest.match),
    switchMap(() => {
      return concat(
        [startLoading({ key: GettingMenuListLoadingKey })],
        PublicCmsService.Get.getMenuList().pipe(
          switchMap(menus => {
            return [publicCmsActions.setMenuList(menus)];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [publicCmsActions.setMenuList(undefined)];
          })
        ),
        [stopLoading({ key: GettingMenuListLoadingKey })]
      );
    })
  );
}

export const publicCmsEpics = [getMenuListRequest$];