import { createSlice } from '@reduxjs/toolkit';
import { addUsers, deleteUsers, fetchUsers, updateUsers } from './usersThunk';

const initialState = {
  status: 'idle',
  users: [],
  error: null,
  userToEdit: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserToEdit: (state, action) => {
      state.userToEdit = state.users.find((user) => user.id === action.payload);
    },
    removeUserToEDit: (state) => {
      state.userToEdit = null;
    },
  },
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

export const { setUserToEdit, removeUserToEDit } = userSlice.actions;
