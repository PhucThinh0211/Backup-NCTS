import { persistReducer } from 'redux-persist';
import { createPersistConfig } from './configureStore';
import { store, persistor } from './';
import rootReducers from './reducers';

export const reconfigurePersistor = async (whitelist: string[]) => {
  localStorage.setItem('persistWhitelist', JSON.stringify(whitelist));
  const newPersistConfig = await createPersistConfig(whitelist);
  const newPersistedReducer = await persistReducer(newPersistConfig, rootReducers);
  await store.replaceReducer(newPersistedReducer);
  await persistor.persist();
};