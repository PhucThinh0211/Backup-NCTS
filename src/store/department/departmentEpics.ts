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
  SavingContactLoadingKey,
  RemovingContactLoadingKey,
} from '@/common/loadingKey';
import { DepartmentService } from '@/services/DepartmentService';
import Utils from '@/utils';
import { hideModal } from '../modal';
import { CreateUpdateContactModalName } from '@/common';

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
                      departmentActions.setSelectedDepartment(createdDepartment),
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
              name: department.name,
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
                    return [
                      departmentActions.setDepartments(departmentsResult),
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
const createContactRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(departmentActions.createContactRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { contact, departmentId } = action.payload;
      const { locale } = state.persistApp;
      return concat(
        [startLoading({ key: SavingContactLoadingKey })],
        DepartmentService.Post.createContacts(departmentId, [contact]).pipe(
          switchMap((createdContact) => {
            const createTranslationInput = {
              language: locale,
              title: createdContact.title,
            };
            return DepartmentService.Post.createContactTranslations(
              createdContact.id,
              createTranslationInput
            ).pipe(
              mergeMap(() => {
                return DepartmentService.Get.getDepartmentById(
                  departmentId
                ).pipe(
                  mergeMap((department) => {
                    Utils.successNotification();
                    return [
                      departmentActions.setSelectedDepartment(department),
                      hideModal({ key: CreateUpdateContactModalName }),
                    ];
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
            );
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: SavingContactLoadingKey })]
      );
    })
  );
};

const updateContactRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(departmentActions.updateContactRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { contact, contactId, departmentId } = action.payload;
      const { locale } = state.persistApp;
      return concat(
        [startLoading({ key: SavingContactLoadingKey })],
        DepartmentService.Put.updateContact(contactId, contact).pipe(
          switchMap(() => {
            const createTranslationInput = {
              language: locale,
              title: contact.title,
            };
            return DepartmentService.Post.createContactTranslations(
              contactId,
              createTranslationInput
            ).pipe(
              mergeMap(() => {
                return DepartmentService.Get.getDepartmentById(
                  departmentId
                ).pipe(
                  mergeMap((department) => {
                    Utils.successNotification();
                    return [
                      departmentActions.setSelectedDepartment(department),
                      hideModal({ key: CreateUpdateContactModalName }),
                    ];
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
            );
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: SavingContactLoadingKey })]
      );
    })
  );
};

const removeContactRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(departmentActions.removeContactRequest.match),
    withLatestFrom(state$),
    switchMap(([action]) => {
      const { contactId, departmentId } = action.payload;
      return concat(
        [startLoading({ key: RemovingContactLoadingKey })],
        DepartmentService.delete.removeContact(contactId).pipe(
          switchMap(() => {
            return DepartmentService.Get.getDepartmentById(departmentId).pipe(
              mergeMap((department) => {
                Utils.successNotification();
                return [
                  departmentActions.setSelectedDepartment(department),
                  hideModal({ key: CreateUpdateContactModalName }),
                ];
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
        [stopLoading({ key: RemovingContactLoadingKey })]
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
  createContactRequest$,
  updateContactRequest$,
  removeContactRequest$,
];
