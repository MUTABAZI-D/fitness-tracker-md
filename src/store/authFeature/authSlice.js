import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
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
export const { login, logout, generateToken, deleteToken, setIsLoading } =
  authSlice.actions;
