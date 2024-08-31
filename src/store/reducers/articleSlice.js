import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isBookmarked: false,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setIsBookmarked: (state, action) => {
      state.isBookmarked = action.payload;
    },
  },
});

export const {setIsBookmarked} = articleSlice.actions;

export default articleSlice.reducer;
