import AsyncStorage from '@react-native-async-storage/async-storage';
import { totalNotificationCount } from '../reducers/notificationSlice';

export const getTotalNotificationCount = count => async(dispatch, getState) => {
    const storedNotifications = await AsyncStorage.getItem('notifications');
    const notifications = storedNotifications
      ? JSON.parse(storedNotifications)
      : []; 

  dispatch(totalNotificationCount(notifications.length));
};
