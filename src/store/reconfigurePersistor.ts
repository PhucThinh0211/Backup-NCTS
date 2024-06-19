import { persistReducer } from 'redux-persist';
import { createPersistConfig } from './configureStore';
import { store, persistor } from './';
import rootReducers from './reducers';

export const reconfigurePersistor = (whitelist: string[]) => {
  localStorage.setItem('persistWhitelist', JSON.stringify(whitelist));
  const newPersistConfig = createPersistConfig(whitelist);
  const newPersistedReducer = persistReducer(newPersistConfig, rootReducers);
  store.replaceReducer(newPersistedReducer);
  persistor.persist();
};