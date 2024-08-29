import { totalNotificationCount } from '../reducers/notificationSlice';

export const getTotalNotificationCount = count => (dispatch, getState) => {
  console.log(count, 'getTotalNotificationCount');

  dispatch(totalNotificationCount(count));
};
