import { configureStore } from '@reduxjs/toolkit';

import sampleReducer from './sampleFeature/slice';
import authSliceReducer from './authFeature/authSlice';

export const store = configureStore({
  reducer: {
    sampleSlice: sampleReducer,
    authReducer: authSliceReducer,
  },
});
