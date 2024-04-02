import { combineReducers } from "@reduxjs/toolkit";

import { persistStateReducer } from "./persistState";
import { loadingReducer } from "./loading";
import { modalReducer } from "./modal";
import { appReducer } from "./app";

const mainReducer = combineReducers({
  persistApp: persistStateReducer,
  loading: loadingReducer,
  modal: modalReducer,
  app: appReducer,
});

const rootReducers = (state: any, action: any) => {
  // reset store if logout
  if (action.type === "app/logout") {
    state = {
      persistApp: state.persistApp,
    };
  }

  return mainReducer(state, action);
};

export default rootReducers;
