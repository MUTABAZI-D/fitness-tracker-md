import { configureStore } from '@reduxjs/toolkit';

import sampleReducer from './sampleFeature/slice';
import authSliceReducer from './authFeature/authSlice';
import usersSliceReducer from './usersFeature/usersSlice';
import workoutsSliceReducer from './workoutsFeature/workoutsSlice';

const store = configureStore({
  reducer: {
    sampleSlice: sampleReducer,
    authReducer: authSliceReducer,
    usersReducer: usersSliceReducer,
    workoutsReducer: workoutsSliceReducer,
  },
});

export default store;
