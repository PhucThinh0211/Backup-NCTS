import {
  catchError,
  concat,
  filter,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs';

import { menuActions } from './menuSlice';
import { startLoading, stopLoading } from '../loading';
import { hideModal } from '../modal';
import { RootEpic } from '../types';
import { CreateUpdateMenuModalName } from '@/common/modalName';
import { defaultPagingParams } from '@/common/define';
import {
  GettingMenuListLoadingKey,
  RemovingMenuLoadingKey,
  SavingMenuLoadingKey,
} from '@/common/loadingKey';
import { MenuService } from '@/services/MenuService';
import Utils from '@/utils';

const getMenusRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(menuActions.getMenusRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { params } = action.payload;
      const search = {
        ...defaultPagingParams,
        ...state.menu.queryParams,
        ...params,
      };
      return concat(
        [startLoading({ key: GettingMenuListLoadingKey })],
        MenuService.Get.getAllMenus({
          search,
        }).pipe(
          mergeMap((menus) => {
            return [
              menuActions.setQueryParams(search),
              menuActions.setMenus(menus),
            ];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [menuActions.setMenus(undefined)];
          })
        ),
        [stopLoading({ key: GettingMenuListLoadingKey })]
      );
    })
  );
};

const createMenuRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(menuActions.createMenuRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { menu } = action.payload;
      const search = {
        ...defaultPagingParams,
        ...state.menu.queryParams,
      };
      return concat(
        [startLoading({ key: SavingMenuLoadingKey })],
        MenuService.Post.createMenu(menu).pipe(
          switchMap(() => {
            return MenuService.Get.getAllMenus({
              search,
            }).pipe(
              mergeMap((menusResult) => {
                Utils.successNotification();
                return [
                  menuActions.setMenus(menusResult),
                  menuActions.setSelectedMenu(undefined),
                  hideModal({ key: CreateUpdateMenuModalName }),
                ];
              }),
              catchError((errors) => {
                Utils.errorHandling(errors);
                return [menuActions.setMenus(undefined)];
              })
            );
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: SavingMenuLoadingKey })]
      );
    })
  );
};

const updateMenuRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(menuActions.updateMenuRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { menuId, menu } = action.payload;
      const search = {
        ...defaultPagingParams,
        ...state.menu.queryParams,
      };
      return concat(
        [startLoading({ key: SavingMenuLoadingKey })],
        MenuService.Put.updateMenu(menuId, menu).pipe(
          switchMap(() => {
            return MenuService.Get.getAllMenus({
              search,
            }).pipe(
              mergeMap((menusResult) => {
                Utils.successNotification();
                return [
                  menuActions.setMenus(menusResult),
                  menuActions.setSelectedMenu(undefined),
                  hideModal({ key: CreateUpdateMenuModalName }),
                ];
              }),
              catchError((errors) => {
                Utils.errorHandling(errors);
                return [menuActions.setMenus(undefined)];
              })
            );
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: SavingMenuLoadingKey })]
      );
    })
  );
};

const removeMenuRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(menuActions.removeMenuRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { menuId } = action.payload;
      const search = {
        ...defaultPagingParams,
        ...state.menu.queryParams,
        page: 1,
      };
      return concat(
        [startLoading({ key: RemovingMenuLoadingKey })],
        MenuService.delete.removeMenu(menuId).pipe(
          switchMap(() => {
            return MenuService.Get.getAllMenus({
              search,
            }).pipe(
              mergeMap((menusResult) => {
                Utils.successNotification('Removed successfully');
                return [
                  menuActions.setMenus(menusResult),
                  menuActions.setSelectedMenu(undefined),
                  hideModal({ key: CreateUpdateMenuModalName }),
                ];
              }),
              catchError((errors) => {
                Utils.errorHandling(errors);
                return [menuActions.setMenus(undefined)];
              })
            );
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: RemovingMenuLoadingKey })]
      );
    })
  );
};

export const menuEpics = [
  getMenusRequest$,
  createMenuRequest$,
  updateMenuRequest$,
  removeMenuRequest$,
];
