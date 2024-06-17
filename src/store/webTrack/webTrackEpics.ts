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
import { GettingCarriersLoadingKey, lookupAwbLoadingKey } from '@/common';
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
            console.log(awb);
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

export const webTrackEpics = [lookupAwbRequest, getCarriersRequest$];
