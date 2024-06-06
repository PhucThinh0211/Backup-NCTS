import {
  filter,
  switchMap,
  mergeMap,
  withLatestFrom,
  catchError,
  concat,
  map,
} from 'rxjs';
import {
  IdentityLoadingEnum,
  IdentityModalEnum,
  identityActions,
} from './identitySlice';
import { IdentityService } from '@/services/IdentityService';
import { startLoading, stopLoading } from '../loading';

import { RootEpic } from '../types';
import Utils from '@/utils';
import { hideModal } from '../modal';
import { defaultPagingParams } from '@/common';

const getAllRoles$: RootEpic = (action$) => {
  return action$.pipe(
    filter(identityActions.getAllRoles.match),
    switchMap(() => {
      return concat(
        [startLoading({ key: IdentityLoadingEnum.fetchAllRoles })],
        IdentityService.Get.fetchAllRoles().pipe(
          mergeMap((rolesResult) => {
            return [identityActions.setRoles(rolesResult)];
          }),
          catchError((error) => {
            Utils.errorHandling(error);
            return [];
          })
        ),
        [stopLoading({ key: IdentityLoadingEnum.fetchAllRoles })]
      );
    })
  );
};

const createRoleRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(identityActions.createRoleRequest.match),
    withLatestFrom(state$),
    switchMap(([action]) => {
      return concat(
        [startLoading({ key: IdentityLoadingEnum.createRole })],
        IdentityService.Post.createRole(action.payload).pipe(
          switchMap(() => {
            return IdentityService.Get.fetchAllRoles().pipe(
              mergeMap((rolesResult) => {
                Utils.successNotification();
                return [
                  identityActions.setRoles(rolesResult),
                  hideModal({ key: IdentityModalEnum.createUpdateRoleModal }),
                ];
              })
            );
          }),
          catchError((error) => {
            Utils.errorHandling(error);
            return [];
          })
        ),
        [stopLoading({ key: IdentityLoadingEnum.createRole })]
      );
    })
  );
};

const updateRoleRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(identityActions.updateRoleRequest.match),
    withLatestFrom(state$),
    switchMap(([action]) => {
      const { id, input } = action.payload;
      return concat(
        [startLoading({ key: IdentityLoadingEnum.updateRole })],
        IdentityService.Put.updateRole(id, input).pipe(
          switchMap(() => {
            return IdentityService.Get.fetchAllRoles().pipe(
              mergeMap((rolesResult) => {
                Utils.successNotification();
                return [
                  identityActions.setRoles(rolesResult),
                  hideModal({ key: IdentityModalEnum.createUpdateRoleModal }),
                ];
              })
            );
          }),
          catchError((error) => {
            Utils.errorHandling(error);
            return [];
          })
        ),
        [stopLoading({ key: IdentityLoadingEnum.updateRole })]
      );
    })
  );
};

const deleteRoleRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(identityActions.deleteRoleRequest.match),
    withLatestFrom(state$),
    switchMap(([action]) => {
      const id = action.payload;
      return concat(
        [startLoading({ key: IdentityLoadingEnum.deleteRole })],
        IdentityService.Delete.deleteRole(id).pipe(
          switchMap(() => {
            return IdentityService.Get.fetchAllRoles().pipe(
              mergeMap((rolesResult) => {
                Utils.successNotification();
                return [
                  identityActions.setRoleSelected(),
                  identityActions.setRoles(rolesResult),
                ];
              })
            );
          }),
          catchError((error) => {
            Utils.errorHandling(error);
            return [];
          })
        ),
        [stopLoading({ key: IdentityLoadingEnum.deleteRole })]
      );
    })
  );
};

const getAllPermissionsRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(identityActions.getAllPermissionsRequest.match),
    withLatestFrom(state$),
    switchMap(([action]) => {
      const search = {
        ...action.payload,
      };
      return concat(
        [startLoading({ key: IdentityLoadingEnum.getAllPermissions })],
        IdentityService.Get.fetchAllPermissions({ search }).pipe(
          mergeMap((permissions) => {
            return [identityActions.setPermissions(permissions)];
          }),
          catchError((error) => {
            Utils.errorHandling(error);
            return [];
          })
        ),
        [stopLoading({ key: IdentityLoadingEnum.getAllPermissions })]
      );
    })
  );
};

const updatePermissionsRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(identityActions.updatePermissionsRequest.match),
    withLatestFrom(state$),
    switchMap(([action]) => {
      const { params, input } = action.payload;
      const search = {
        ...params,
      };
      return concat(
        [startLoading({ key: IdentityLoadingEnum.updatePermissions })],
        IdentityService.Put.updatePermission(input, { search }).pipe(
          mergeMap(() => {
            Utils.successNotification();
            return [hideModal({ key: IdentityModalEnum.permissionModal })];
          }),
          catchError((error) => {
            Utils.errorHandling(error);
            return [];
          })
        ),
        [stopLoading({ key: IdentityLoadingEnum.updatePermissions })]
      );
    })
  );
};

const getUsersRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(identityActions.getUsersRequest.match),
    switchMap((action) => {
      return IdentityService.Get.fetchUsers(action.payload).pipe(
        mergeMap((users) => {
          return [
            identityActions.setUsers(users),
            stopLoading({ key: IdentityLoadingEnum.getUsers }),
          ];
        }),
        catchError((error) => {
          Utils.errorHandling(error);
          return [stopLoading({ key: IdentityLoadingEnum.getUsers })];
        })
      );
    })
  );
};

const getAssignableRolesRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(identityActions.getAssignableRolesRequest.match),
    switchMap(() => {
      return concat(
        [startLoading({ key: IdentityLoadingEnum.getAssignableRoles })],
        IdentityService.Get.fetchAssignableRoles().pipe(
          map((res) => identityActions.setAssignableRoles(res.items)),
          catchError((error) => {
            console.log(error);
            return [];
          })
        ),
        [stopLoading({ key: IdentityLoadingEnum.getAssignableRoles })]
      );
    })
  );
};

const getUserRoles$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(identityActions.getUserRoles.match),
    switchMap((action) => {
      return concat(
        [startLoading({ key: IdentityLoadingEnum.getUserRoles })],
        IdentityService.Get.fetchUserRoles(action.payload).pipe(
          map((res) => identityActions.setUserRoles(res.items)),
          catchError((error) => {
            console.log(error);
            return [];
          })
        ),
        [stopLoading({ key: IdentityLoadingEnum.getUserRoles })]
      );
    })
  );
};

const createUserRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(identityActions.createUserRequest.match),
    switchMap((action) => {
      return concat(
        [startLoading({ key: IdentityLoadingEnum.createUser })],
        IdentityService.Post.createUser(action.payload).pipe(
          mergeMap((res) => {
            Utils.successNotification();
            return concat(
              [identityActions.saveUserSuccess()],
              IdentityService.Get.fetchUsers({
                search: defaultPagingParams,
              }).pipe(
                mergeMap((users) => [
                  identityActions.setUsers(users),
                  identityActions.setUserSelected(),
                  identityActions.setUserRoles([]),
                  hideModal({ key: IdentityModalEnum.userModal }),
                ]),
                catchError((error) => {
                  console.log(error);
                  return [];
                })
              )
            );
          }),
          catchError((error) => {
            Utils.errorHandling(error);
            return [];
          })
        ),
        [stopLoading({ key: IdentityLoadingEnum.createUser })]
      );
    })
  );
};

const updateUserRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(identityActions.updateUserRequest.match),
    switchMap((action) => {
      const { id, data } = action.payload;
      return concat(
        [startLoading({ key: IdentityLoadingEnum.updateUser })],
        IdentityService.Put.updateUser(id, data).pipe(
          mergeMap((res) => {
            Utils.successNotification();
            return IdentityService.Get.fetchUsers({
              search: defaultPagingParams,
            }).pipe(
              mergeMap((users) => [
                identityActions.setUsers(users),
                identityActions.setUserSelected(),
                identityActions.setUserRoles([]),
                hideModal({ key: IdentityModalEnum.userModal }),
              ]),
              catchError((error) => {
                console.log(error);
                return [];
              })
            );
          }),
          catchError((error) => {
            Utils.errorHandling(error);
            return [];
          })
        ),
        [stopLoading({ key: IdentityLoadingEnum.updateUser })]
      );
    })
  );
};

const removeUserRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(identityActions.removeUserRequest.match),
    switchMap((action) => {
      return concat(
        [startLoading({ key: IdentityLoadingEnum.removeUser })],
        IdentityService.Delete.removeUser(action.payload).pipe(
          mergeMap((res) => {
            Utils.successNotification();
            return IdentityService.Get.fetchUsers({
              search: defaultPagingParams,
            }).pipe(
              mergeMap((users) => [
                identityActions.setUsers(users),
                identityActions.setUserSelected(),
                identityActions.setUserRoles([]),
                hideModal({ key: IdentityModalEnum.userModal }),
              ]),
              catchError((error) => {
                console.log(error);
                return [];
              })
            );
          }),
          catchError((error) => {
            Utils.errorHandling(error);
            return [];
          })
        ),
        [stopLoading({ key: IdentityLoadingEnum.removeUser })]
      );
    })
  );
};

export const identityEpics = [
  getAllRoles$,
  createRoleRequest$,
  updateRoleRequest$,
  deleteRoleRequest$,
  getAllPermissionsRequest$,
  updatePermissionsRequest$,
  getUsersRequest$,
  getAssignableRolesRequest$,
  getUserRoles$,
  createUserRequest$,
  updateUserRequest$,
  removeUserRequest$,
];
