import {
  catchError,
  concat,
  filter,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs';

import { companyActions } from './companySlice';
import { startLoading, stopLoading } from '../loading';
import { RootEpic } from '../types';
import { defaultPagingParams } from '@/common/define';
import {
  GettingCompanyListLoadingKey,
  RemovingCompanyLoadingKey,
  SavingCompanyLoadingKey,
  GettingCompanyLoadingKey,
} from '@/common/loadingKey';
import { CompanyService } from '@/services/CompanyService';
import Utils from '@/utils';
import { SeoService } from '@/services/SEOService';

const getCompaniesRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(companyActions.getCompaniesRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { params } = action.payload;
      const search = {
        ...defaultPagingParams,
        ...state.company.queryParams,
        ...params,
      };

      return concat(
        [startLoading({ key: GettingCompanyListLoadingKey })],
        CompanyService.Get.getAllCompanies({
          search,
        }).pipe(
          mergeMap((companys) => {
            return [
              companyActions.setQueryParams(search),
              companyActions.setCompanies(companys),
            ];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [companyActions.setCompanies(undefined)];
          })
        ),
        [stopLoading({ key: GettingCompanyListLoadingKey })]
      );
    })
  );
};

const createCompanyRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(companyActions.createCompanyRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { company } = action.payload;
      const { locale } = state.persistApp;
      const search = {
        ...defaultPagingParams,
        ...state.company.queryParams,
      };
      return concat(
        [startLoading({ key: SavingCompanyLoadingKey })],
        CompanyService.Post.createCompany({
          ...company,
        }).pipe(
          switchMap((createdCompany) => {
            const createTranslationInput = {
              language: locale,
              name: createdCompany.name,
              address: createdCompany.address,
              bankName: createdCompany.bankName,
              bankBranch: createdCompany.bankBranch,
            };
            return CompanyService.Post.createCompanyTranslations(
              createdCompany.id,
              createTranslationInput
            ).pipe(
              mergeMap(() => {
                return CompanyService.Get.getAllCompanies({
                  search,
                }).pipe(
                  mergeMap((companysResult) => {
                    Utils.successNotification();
                    return [
                      companyActions.setCompanies(companysResult),
                      companyActions.setSelectedCompany(undefined),
                    ];
                  }),
                  catchError((errors) => {
                    Utils.errorHandling(errors);
                    return [companyActions.setCompanies(undefined)];
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
        [stopLoading({ key: SavingCompanyLoadingKey })]
      );
    })
  );
};

const updateCompanyRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(companyActions.updateCompanyRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { companyId, company } = action.payload;
      const { locale } = state.persistApp;
      const search = {
        ...defaultPagingParams,
        ...state.company.queryParams,
      };
      return concat(
        [startLoading({ key: SavingCompanyLoadingKey })],
        CompanyService.Put.updateCompany(companyId, company).pipe(
          switchMap((updatedCompany) => {
            const createTranslationInput = {
              language: locale,
              name: company.name,
              address: company.address,
              bankName: company.bankName,
              bankBranch: company.bankBranch,
            };
            return CompanyService.Post.createCompanyTranslations(
              updatedCompany.id,
              createTranslationInput
            ).pipe(
              mergeMap(() => {
                return CompanyService.Get.getAllCompanies({
                  search,
                }).pipe(
                  mergeMap((companysResult) => {
                    Utils.successNotification();
                    return [companyActions.setCompanies(companysResult)];
                  }),
                  catchError((errors) => {
                    Utils.errorHandling(errors);
                    return [companyActions.setCompanies(undefined)];
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
        [stopLoading({ key: SavingCompanyLoadingKey })]
      );
    })
  );
};

const removeCompanyRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(companyActions.removeCompanyRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { companyId } = action.payload;
      const search = {
        ...defaultPagingParams,
        ...state.company.queryParams,
        page: 1,
      };
      return concat(
        [startLoading({ key: RemovingCompanyLoadingKey })],
        CompanyService.delete.removeCompany(companyId).pipe(
          switchMap(() => {
            return CompanyService.Get.getAllCompanies({
              search,
            }).pipe(
              mergeMap((companysResult) => {
                Utils.successNotification('Removed successfully');
                return [
                  companyActions.setCompanies(companysResult),
                  companyActions.setSelectedCompany(undefined),
                ];
              }),
              catchError((errors) => {
                Utils.errorHandling(errors);
                return [companyActions.setCompanies(undefined)];
              })
            );
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: RemovingCompanyLoadingKey })]
      );
    })
  );
};

const getCompanyRequest$: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(companyActions.getCompanyRequest.match),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      const { companyId } = action.payload;
      const { locale } = state.persistApp;
      const options = {
        headers: {
          'Accept-Language': locale || 'vi',
        },
      };
      return concat(
        [startLoading({ key: GettingCompanyLoadingKey })],
        CompanyService.Get.getCompanyById(companyId, options).pipe(
          mergeMap((company) => {
            return [companyActions.setSelectedCompanyDetail(company)];
          }),
          catchError((errors) => {
            Utils.errorHandling(errors);
            return [];
          })
        ),
        [stopLoading({ key: GettingCompanyLoadingKey })]
      );
    })
  );
};

export const companyEpics = [
  getCompaniesRequest$,
  createCompanyRequest$,
  updateCompanyRequest$,
  removeCompanyRequest$,
  getCompanyRequest$,
];
