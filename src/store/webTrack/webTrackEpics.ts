import {
  catchError,
  concat,
  filter,
  finalize,
  mergeMap,
  switchMap,
} from 'rxjs';

import { RootEpic } from '../types';
import { webTrackActions } from './webTrackSlice';
import { startLoading, stopLoading } from '../loading';
import {
  EstimatingChargeLoadingKey,
  GettingCarriersLoadingKey,
  GettingClassListLoadingKey,
  lookupAwbLoadingKey,
  lookupFlightLoadingKey,
} from '@/common';
import { WebTrackService } from '@/services/WebTrackService';
import { publicCmsActions } from '../publicCms';
import Utils from '@/utils';

const lookupAwbRequest: RootEpic = (action$) => {
  return action$.pipe(
    filter(webTrackActions.lookupAwbRequest.match),
    switchMap((action) => {
      const { lookupInput, navigate } = action.payload;
      const options = {
        search: lookupInput,
      };
      return concat(
        [startLoading({ key: lookupAwbLoadingKey })],
        WebTrackService.Get.lookupAwb(options).pipe(
          mergeMap((awb) => {
            return [
              webTrackActions.setLookupAwbResults(awb),
              publicCmsActions.getCaptchaRequest(),
            ];
          }),
          catchError((error) => {
            Utils.errorHandling(error, 'webTrack');
            return [
              webTrackActions.setLookupAwbResults(undefined),
              publicCmsActions.getCaptchaRequest(),
            ];
          }),
          finalize(() => {
            if (navigate) {
              navigate('/tra-cuu-thong-tin');
            }
          })
        ),
        [stopLoading({ key: lookupAwbLoadingKey })]
      );
    })
  );
};

const lookupFlightRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(webTrackActions.lookupFlightRequest.match),
    switchMap((action) => {
      const { lookupInput, navigate } = action.payload;
      const options = {
        search: lookupInput,
      };
      return concat(
        [startLoading({ key: lookupFlightLoadingKey })],
        WebTrackService.Get.lookupFlights(options).pipe(
          mergeMap((flights) => {
            return [
              webTrackActions.setLookupFlightResults(flights),
              publicCmsActions.getCaptchaRequest(),
            ];
          }),
          catchError((error) => {
            Utils.errorHandling(error, 'webTrack');
            return [
              webTrackActions.setLookupFlightResults(undefined),
              publicCmsActions.getCaptchaRequest(),
            ];
          }),
          finalize(() => {
            if (navigate) {
              navigate('/tra-cuu-thong-tin');
            }
          })
        ),
        [stopLoading({ key: lookupFlightLoadingKey })]
      );
    })
  );
};

const getCarriersRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(webTrackActions.getCarriersRequest.match),
    switchMap((action) => {
      return concat(
        [startLoading({ key: GettingCarriersLoadingKey })],
        WebTrackService.Get.getCarriers().pipe(
          mergeMap((carriers) => {
            return [webTrackActions.setCarriers(carriers)];
          }),
          catchError((error) => {
            Utils.errorHandling(error, 'webTrack');
            return [webTrackActions.setCarriers([])];
          })
        ),
        [stopLoading({ key: GettingCarriersLoadingKey })]
      );
    })
  );
};

const getClassListRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(webTrackActions.getClassListRequest.match),
    switchMap((action) => {
      return concat(
        [startLoading({ key: GettingClassListLoadingKey })],
        WebTrackService.Get.getClassList().pipe(
          mergeMap((classList) => {
            return [webTrackActions.setClassList(classList)];
          }),
          catchError((error) => {
            Utils.errorHandling(error, 'webTrack');
            return [webTrackActions.setClassList([])];
          })
        ),
        [stopLoading({ key: GettingClassListLoadingKey })]
      );
    })
  );
};

const estimateFreightRequest$: RootEpic = (action$) => {
  return action$.pipe(
    filter(webTrackActions.estimateFreightRequest.match),
    switchMap((action) => {
      const { input, navigate } = action.payload;

      return concat(
        [startLoading({ key: EstimatingChargeLoadingKey })],
        WebTrackService.Post.estimateFreight(input).pipe(
          mergeMap((result) => {
            return [
              webTrackActions.setFreightEstimateResults(result),
              publicCmsActions.getCaptchaRequest(),
            ];
          }),
          catchError((error) => {
            Utils.errorHandling(error, 'webTrack');
            return [
              webTrackActions.setFreightEstimateResults(undefined),
              publicCmsActions.getCaptchaRequest(),
            ];
          }),
          finalize(() => {
            if (navigate) {
              navigate('/tinh-phi-hang-nhap');
            }
          })
        ),
        [stopLoading({ key: EstimatingChargeLoadingKey })]
      );
    })
  );
};

export const webTrackEpics = [
  lookupAwbRequest,
  getCarriersRequest$,
  getClassListRequest$,
  lookupFlightRequest$,
  estimateFreightRequest$,
];
