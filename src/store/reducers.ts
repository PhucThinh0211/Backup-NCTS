import { combineReducers } from '@reduxjs/toolkit';
import { persistStateReducer } from './persistState';

const mainReducer = combineReducers({
  persist: persistStateReducer,
});

const rootReducers = (state: any, action: any) => {
  // reset store if logout
  if (action.type === 'app/logout') {
    state = {
      app: {
        language: state.app.language,
      },
    };
  }

  return mainReducer(state, action);
};

export default rootReducers;
