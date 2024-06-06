import configureStore from "./configureStore";

export const persistConfigStorage = {};

export const defaultPersistConfig = { whitelist: ["persistApp", "app"] };

export const initialStoreCongig = configureStore(defaultPersistConfig);
export const store = initialStoreCongig.store;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
