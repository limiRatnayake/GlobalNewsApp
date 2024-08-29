import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  notificationCount: 0,
};

const notificationSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    totalNotificationCount: (state, action) => {
      state.notificationCount = action.payload;
    },
  },
});

export const {totalNotificationCount} = notificationSlice.actions;

export default notificationSlice.reducer;
