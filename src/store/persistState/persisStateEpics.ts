import { filter, mergeMap } from 'rxjs';
import { RootEpic } from '../types';

import { persistStateActions } from './persistStateSlice';

const pingRequest: RootEpic = (action$) => {
  return action$.pipe(
    filter(persistStateActions.setLanguage.match),
    mergeMap(() => [])
  );
};
export const persistStateEpics = [pingRequest];
