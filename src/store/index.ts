import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
  Storage,
} from 'redux-persist';
import { MMKV } from 'react-native-mmkv';
import { setupListeners } from '@reduxjs/toolkit/query';
import { toastLogger } from './toastLogger';

import { api } from '../services/api';
import auth from './auth';
import categories from './categories';
import preferences from './preferences';
import priorities from './priorities';
import theme from './theme';
import toast from './toast';
import transactions from './transactions';
import user from './user';

const reducers = combineReducers({
  auth,
  categories,
  preferences,
  priorities,
  theme,
  toast,
  transactions,
  user,
  [api.reducerPath]: api.reducer,
});

const storage = new MMKV();

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export type RootState = ReturnType<typeof reducers>;

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: [
    'theme',
    'auth',
    'user',
    'categories',
    'priorities',
    'preferences',
    'transactions',
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(api.middleware)
      .concat(toastLogger);

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default;
      middlewares.push(createDebugger());
    }

    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };
