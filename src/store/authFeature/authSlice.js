import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    generateToken: () => {
      const token = Math.random().toString(36).substring(2);
      localStorage.setItem('token', token);
    },
    deleteToken: () => {
      localStorage.removeItem('token');
    },
  },
});

export default authSlice.reducer;
export const { login, logout, generateToken, deleteToken } = authSlice.actions;
