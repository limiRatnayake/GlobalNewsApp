import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  networkAvailability: true,
  checkForBookmarks: false,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    updateNetworkAvailability: (state, action) => {
      state.networkAvailability = action.payload;
    },
    updateCheckBookmark: (state, action) => {
      state.checkForBookmarks = action.payload;
    },
  },
});

export const {updateNetworkAvailability, updateCheckBookmark} = loaderSlice.actions;

export default loaderSlice.reducer;
