import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
});

export const addUsers = createAsyncThunk('users/addUsers', async (newUser) => {
  const response = await axios.post(`${API_URL}/users`, newUser);
  return response.data;
});

export const deleteUsers = createAsyncThunk('users/deleteUsers', async (id) => {
  await axios.delete(`${API_URL}/users/${id}`);
  return id;
});
export const updateUsers = createAsyncThunk(
  'users/updateUsers',
  async (updatedUser) => {
    const response = await axios.put(
      `${API_URL}/users/${updatedUser.id}`,
      updatedUser
    );
    return response.data;
  }
);
