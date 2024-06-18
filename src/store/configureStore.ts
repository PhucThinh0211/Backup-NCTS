import { UnknownAction, configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootEpics from './epics';
import rootReducers from './reducers';
import { RootState } from './types';

export const createPersistConfig = (whitelist: string[]) => ({
  key: 'root',
  storage,
  whitelist,
});

const storeConfig = (config: any) => {
  const whitelistSaved =
    localStorage.getItem('remember') === 'true'
      ? JSON.parse(localStorage.getItem('persistWhitelist') || '[]')
      : [];
  const persistConfig = {
    key: 'root',
    storage,
    ...config,
    whitelist: [...config.whitelist, ...whitelistSaved],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducers);
  const epicMiddleware = createEpicMiddleware<UnknownAction, UnknownAction, RootState>();

  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => {
      const middlewares = getDefaultMiddleware({
        serializableCheck: false,
      }).concat(epicMiddleware);

      return middlewares;
    },
  });

  epicMiddleware.run(rootEpics);

  const persistor = persistStore(store);

  return { store, persistor };
};

export default storeConfig;
