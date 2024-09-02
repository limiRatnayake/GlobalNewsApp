import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  networkAvailability: true,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    updateNetworkAvailability: (state, action) => {
      state.networkAvailability = action.payload;
    },
  },
});

export const {updateNetworkAvailability} = loaderSlice.actions;

export default loaderSlice.reducer;
