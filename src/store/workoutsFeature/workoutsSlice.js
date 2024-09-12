import { createSlice } from '@reduxjs/toolkit';
import {
  addWorkouts,
  deleteWorkouts,
  fetchWorkouts,
  updateWorkouts,
} from './workoutsThunks';

const initialState = {
  status: 'idle',
  workouts: [],
  error: null,
};

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWorkouts.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchWorkouts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.workouts = action.payload;
    });
    builder.addCase(fetchWorkouts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(addWorkouts.fulfilled, (state, action) => {
      state.workouts.push(action.payload);
    });
    builder.addCase(deleteWorkouts.fulfilled, (state, action) => {
      state.workouts = state.workouts.filter(
        (workout) => workout.id !== action.payload
      );
    });
    builder.addCase(updateWorkouts.fulfilled, (state, action) => {
      const index = state.workouts.findIndex(
        (workout) => workout.id === action.payload.id
      );
      state.workouts[index] = action.payload;
    });
  },
});

export default workoutsSlice.reducer;
