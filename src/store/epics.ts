import { combineEpics } from 'redux-observable';

import { persistStateEpics } from './persistState';

const rootEpics = combineEpics(
  ...persistStateEpics
);

export default rootEpics;
