import configureStore from './configureStore';

export const persistConfigStorage = { whitelist: ['persistApp', 'app'] };

export const defaultPersistConfig = { whitelist: ['persistApp'] };

export const initialStoreCongig = configureStore(defaultPersistConfig);
export const store = initialStoreCongig.store;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
