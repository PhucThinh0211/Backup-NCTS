import { combineReducers } from '@reduxjs/toolkit';

import { persistStateReducer } from './persistState';
import { loadingReducer } from './loading';
import { modalReducer } from './modal';
import { appReducer } from './app';
import { menuReducer } from './menu';
import { bannerReducer } from './banner';
import { contentReducer } from './content';
import { companyReducer } from './company';
import { pageContentReducer } from './pageContent';
import { departmentReducer } from './department';
import { homeReducer } from './publicCms';

const mainReducer = combineReducers({
  persistApp: persistStateReducer,
  loading: loadingReducer,
  modal: modalReducer,
  app: appReducer,
  menu: menuReducer,
  home: homeReducer,
  banner: bannerReducer,
  content: contentReducer,
  company: companyReducer,
  pageContent: pageContentReducer,
  department: departmentReducer
});

const rootReducers = (state: any, action: any) => {
  // reset store if logout
  if (action.type === 'app/logout') {
    state = {
      persistApp: state.persistApp,
    };
  }

  return mainReducer(state, action);
};

export default rootReducers;
