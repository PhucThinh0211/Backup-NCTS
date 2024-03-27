import configureStore from './configureStore';

export const persistConfigStorage = {
  whitelist: ['persistState'],
};
export const defaultPersistConfig = { whitelist: ['persist'] };

export const initialStoreCongig = configureStore(defaultPersistConfig);
export const store = initialStoreCongig.store;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
