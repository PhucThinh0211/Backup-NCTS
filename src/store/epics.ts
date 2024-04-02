import { combineEpics } from "redux-observable";

import { persistStateEpics } from "./persistState";
import { appEpics } from "./app";

const rootEpics = combineEpics(...persistStateEpics, ...appEpics);

export default rootEpics;
