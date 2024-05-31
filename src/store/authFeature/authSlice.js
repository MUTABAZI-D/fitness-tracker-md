import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  error: false,
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      const token = Math.random().toString(36).substring(2);
      localStorage.setItem('token', token);
      state.isAuthenticated = true;
      state.error = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    handleToken: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        state.isAuthenticated = true;
      }
      state.isAuthChecked = true;
    },
  },
});

export default authSlice.reducer;
export const { login, logout, handleToken } = authSlice.actions;
