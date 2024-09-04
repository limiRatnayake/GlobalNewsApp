import { updateNetworkAvailability } from "../reducers/loaderSlice";

export const setNetworkStatus = (isConnected) => async (dispatch, getState) => { 

  dispatch(updateNetworkAvailability(isConnected));
};
