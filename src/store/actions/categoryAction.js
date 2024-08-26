import {listOfCategories} from '../reducers/categorySlice';

export const addCategoryList = (list) => (dispatch, getState) => {
    console.log(list, "list");
    
    dispatch(listOfCategories(list));
};
