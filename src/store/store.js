import { configureStore } from '@reduxjs/toolkit';

import sampleReducer from './sampleFeature/slice';

export const store = configureStore({
  reducer: {
    sampleSlice: sampleReducer,
  },
});
