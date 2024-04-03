import { combineEpics } from 'redux-observable';

import { persistStateEpics } from './persistState';
import { appEpics } from './app';
import { menuEpics } from './menu';
import { bannerEpics } from './banner';

const rootEpics = combineEpics(
  ...persistStateEpics,
  ...appEpics,
  ...menuEpics,
  ...bannerEpics
);

export default rootEpics;
