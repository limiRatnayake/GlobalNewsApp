import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  categoryList: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    listOfCategories: (state, action) => {
      state.categoryList = action.payload;
    },
  },
});

export const {listOfCategories} = categorySlice.actions;

export default categorySlice.reducer;
