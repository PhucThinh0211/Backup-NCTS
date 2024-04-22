import {
  catchError,
  concat,
  filter,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs';

import { departmentActions } from './departmentSlice';
import { startLoading, stopLoading } from '../loading';
import { RootEpic } from '../types';
import { defaultPagingParams } from '@/common/define';
import {
  GettingDepartmentListLoadingKey,
  RemovingDepartmentLoadingKey,
  SavingDepartmentLoadingKey,
  GettingDepartmentLoadingKey,
} from '@/common/loadingKey';
import { DepartmentService } from '@/services/DepartmentService';
import Utils from '@/utils';

const getDepartmentsRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(departmentActions.getDepartmentsRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { params } = action.payload;
      const search = {
        ...defaultPagingParams,
        ...state.department.queryParams,
        ...params,
      };

      return concat(
        [startLoading({ key: GettingDepartmentListLoadingKey })],
        DepartmentService.Get.getAllDepartments({
          search,
        }).pipe(
          mergeMap((departments) => {
            return [
              departmentActions.setQueryParams(search),
              departmentActions.setDepartments(departments),
            ];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [departmentActions.setDepartments(undefined)];
          })
        ),
        [stopLoading({ key: GettingDepartmentListLoadingKey })]
      );
    })
  );
};

const createDepartmentRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(departmentActions.createDepartmentRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { department } = action.payload;
      const { locale } = state.persistApp;
      const totalCount = state.department.departments?.totalCount || 0;
      const search = {
        ...defaultPagingParams,
        ...state.department.queryParams,
      };
      return concat(
        [startLoading({ key: SavingDepartmentLoadingKey })],
        DepartmentService.Post.createDepartment({
          ...department,
          sortSeq: totalCount + 1,
        }).pipe(
          switchMap((createdDepartment) => {
            const createTranslationInput = {
              language: locale,
              name: createdDepartment.name,
            };
            return DepartmentService.Post.createDepartmentTranslations(
              createdDepartment.id,
              createTranslationInput
            ).pipe(
              mergeMap(() => {
                return DepartmentService.Get.getAllDepartments({
                  search,
                }).pipe(
                  mergeMap((departmentsResult) => {
                    Utils.successNotification();
                    return [
                      departmentActions.setDepartments(departmentsResult),
                      departmentActions.setSelectedDepartment(undefined),
                    ];
                  }),
                  catchError((errors) => {
                    Utils.errorHandling(errors);
                    return [departmentActions.setDepartments(undefined)];
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
        [stopLoading({ key: SavingDepartmentLoadingKey })]
      );
    })
  );
};

const updateDepartmentRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(departmentActions.updateDepartmentRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { departmentId, department } = action.payload;
      const { locale } = state.persistApp;
      const search = {
        ...defaultPagingParams,
        ...state.department.queryParams,
      };
      return concat(
        [startLoading({ key: SavingDepartmentLoadingKey })],
        DepartmentService.Put.updateDepartment(departmentId, department).pipe(
          switchMap((updatedDepartment) => {
            const createTranslationInput = {
              language: locale,
              name: department.name
            };
            return DepartmentService.Post.createDepartmentTranslations(
              updatedDepartment.id,
              createTranslationInput
            ).pipe(
              mergeMap(() => {
                return DepartmentService.Get.getAllDepartments({
                  search,
                }).pipe(
                  mergeMap((departmentsResult) => {
                    Utils.successNotification();
                    return [departmentActions.setDepartments(departmentsResult)];
                  }),
                  catchError((errors) => {
                    Utils.errorHandling(errors);
                    return [departmentActions.setDepartments(undefined)];
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
        [stopLoading({ key: SavingDepartmentLoadingKey })]
      );
    })
  );
};

const removeDepartmentRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(departmentActions.removeDepartmentRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { departmentId } = action.payload;
      const search = {
        ...defaultPagingParams,
        ...state.department.queryParams,
        page: 1,
      };
      return concat(
        [startLoading({ key: RemovingDepartmentLoadingKey })],
        DepartmentService.delete.removeDepartment(departmentId).pipe(
          switchMap(() => {
            return DepartmentService.Get.getAllDepartments({
              search,
            }).pipe(
              mergeMap((departmentsResult) => {
                Utils.successNotification('Removed successfully');
                return [
                  departmentActions.setDepartments(departmentsResult),
                  departmentActions.setSelectedDepartment(undefined),
                ];
              }),
              catchError((errors) => {
                Utils.errorHandling(errors);
                return [departmentActions.setDepartments(undefined)];
              })
            );
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: RemovingDepartmentLoadingKey })]
      );
    })
  );
};

const getDepartmentRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(departmentActions.getDepartmentRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { departmentId } = action.payload;
      const { locale } = state.persistApp;
      const options = {
        headers: {
          'Accept-Language': locale || 'vi',
        },
      };
      return concat(
        [startLoading({ key: GettingDepartmentLoadingKey })],
        DepartmentService.Get.getDepartmentById(departmentId, options).pipe(
          mergeMap((department) => {
            return [departmentActions.setSelectedDepartmentDetail(department)];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: GettingDepartmentLoadingKey })]
      );
    })
  );
};

export const departmentEpics = [
  getDepartmentsRequest$,
  createDepartmentRequest$,
  updateDepartmentRequest$,
  removeDepartmentRequest$,
  getDepartmentRequest$,
];
