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
import {
  GettingMenuListLoadingKey,
  GettingMenuLoadingKey,
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
      const { params, headers } = action.payload;
      const search = {
        ...state.menu.queryParams,
        ...params,
      };
      return concat(
        [startLoading({ key: GettingMenuListLoadingKey })],
        MenuService.Get.getAllMenus({
          search,
          headers
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
      const { locale } = state.persistApp;
      const totalCount = state.menu.menus?.totalCount || 0;
      const search = {
        ...state.menu.queryParams,
      };
      return concat(
        [startLoading({ key: SavingMenuLoadingKey })],
        MenuService.Post.createMenu({
          ...menu,
          sortSeq: totalCount + 1,
        }).pipe(
          switchMap((createdMenu) => {
            const createTranslationInput = {
              language: locale,
              label: menu.label,
            };
            return MenuService.Post.createMenuTranslations(
              createdMenu.id,
              createTranslationInput
            ).pipe(
              mergeMap(() => {
                return MenuService.Get.getAllMenus({
                  search,
                }).pipe(
                  mergeMap((menusResult) => {
                    Utils.successNotification();
                    return [
                      menuActions.setMenus(menusResult),
                      menuActions.setSelectedMenu(createdMenu),
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
      const { locale } = state.persistApp;
      const search = {
        ...state.menu.queryParams,
      };
      return concat(
        [startLoading({ key: SavingMenuLoadingKey })],
        MenuService.Put.updateMenu(menuId, menu).pipe(
          switchMap((updatedMenu) => {
            const createTranslationInput = {
              language: locale,
              label: menu.label,
            };
            return MenuService.Post.createMenuTranslations(
              updatedMenu.id,
              createTranslationInput
            ).pipe(
              mergeMap(() => {
                return MenuService.Get.getAllMenus({
                  search,
                }).pipe(
                  mergeMap((menusResult) => {
                    Utils.successNotification();
                    return [
                      menuActions.setMenus(menusResult),
                      menuActions.setSelectedMenu(updatedMenu),
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

const getMenuRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(menuActions.getMenuRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { menuId } = action.payload;
      const { locale } = state.persistApp;
      const options = {
        headers: {
          'Accept-Language': locale || 'vi',
        },
      };
      return concat(
        [startLoading({ key: GettingMenuLoadingKey })],
        MenuService.Get.getMenuById(menuId, options).pipe(
          mergeMap((menu) => {
            return [menuActions.setSelectedMenuDetail(menu)];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: GettingMenuLoadingKey })]
      );
    })
  );
};

export const menuEpics = [
  getMenusRequest$,
  createMenuRequest$,
  updateMenuRequest$,
  removeMenuRequest$,
  getMenuRequest$,
];
