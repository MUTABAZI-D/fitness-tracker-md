import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchWorkouts = createAsyncThunk(
  'workouts/fetchWorkouts',
  async () => {
    const response = await axios.get(`${API_URL}/workouts`);
    return response.data;
  }
);

export const addWorkouts = createAsyncThunk(
  'workouts/addWorkouts',
  async (newWorkout) => {
    const response = await axios.post(`${API_URL}/workouts`, newWorkout);
    return response.data;
  }
);

export const deleteWorkouts = createAsyncThunk(
  'workouts/deleteWorkouts',
  async (id) => {
    await axios.delete(`${API_URL}/workouts/${id}`);
    return id;
  }
);

export const updateWorkouts = createAsyncThunk(
  'workouts/updateWorkouts',
  async (updateWorkout) => {
    const response = await axios.put(
      `${API_URL}/workouts/${updateWorkout.id}`,
      updateWorkout
    );
    return response.data;
  }
);
