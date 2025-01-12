import { UnknownAction, configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootEpics from './epics';
import rootReducers from './reducers';
import { RootState } from './types';

const storeConfig = (config: any) => {
  const persistConfig = {
    key: 'root',
    storage,
    ...config,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducers);
  const epicMiddleware = createEpicMiddleware<UnknownAction, UnknownAction, RootState>();

  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => {
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
