/* eslint-disable no-unused-vars */
// DELETE THIS AFTER YOU CREATE THE FIRST FILE INSIDE THE STORE FOLDER

import { createSlice } from '@reduxjs/toolkit';
import { MY_DATA_CONSTANT } from '../../constants';

const initialState = {
  myData: [],
};

export const sampleSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {
    getMyData(state) {
      state.myData = MY_DATA_CONSTANT;
    },
  },
  extraReducers: (builder) => {
    // HERE YOU WILL PUT REDUCERS FETCHED IN THE THUNKS FILE FROM THE API
  },
});

export const { getMyData } = sampleSlice.actions;

export default sampleSlice.reducer;
