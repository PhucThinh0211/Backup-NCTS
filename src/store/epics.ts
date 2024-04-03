import { combineEpics } from 'redux-observable';

import { persistStateEpics } from './persistState';
import { appEpics } from './app';
import { menuEpics } from './menu';

const rootEpics = combineEpics(...persistStateEpics, ...appEpics, ...menuEpics);

export default rootEpics;
