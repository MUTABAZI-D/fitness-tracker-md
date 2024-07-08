import { createSlice } from '@reduxjs/toolkit';
import { addUsers, deleteUsers, fetchUsers, updateUsers } from './usersThunk';

const initialState = {
  status: 'idle',
  users: [],
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(addUsers.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });
    builder.addCase(deleteUsers.fulfilled, (state, action) => {
      console.log(action.payload);
      state.users = state.users.filter((user) => user.id !== action.payload);
    });
    builder.addCase(updateUsers.fulfilled, (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      state.users[index] = action.payload;
    });
  },
});

export default userSlice.reducer;
