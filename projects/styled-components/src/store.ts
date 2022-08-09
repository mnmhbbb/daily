import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './rootReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const persistConfig = {
  key: 'test',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type AppDispatch = typeof store.dispatch;
export default store;
export const persistor = persistStore(store);
