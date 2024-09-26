import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import sampleReducer from './sampleFeature/slice';
import authSliceReducer from './authFeature/authSlice';
import usersSliceReducer from './usersFeature/usersSlice';
import workoutsSliceReducer from './workoutsFeature/workoutsSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  sampleSlice: sampleReducer,
  authReducer: authSliceReducer,
  usersReducer: usersSliceReducer,
  workoutsReducer: workoutsSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
