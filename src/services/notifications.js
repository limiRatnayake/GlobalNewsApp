import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import { getTotalNotificationCount } from '../store/actions/notificationAction'; 
import store from '../store/store';
import { notificationService } from './pushNotification';
import { addNotification } from './user';
 
// Request user permission for notifications
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Notification permission enabled:', authStatus);
    getFCMToken();
  }
}

// Get FCM Token
export async function getFCMToken() {
  const token = await messaging().getToken();
  if (token) {
    console.log('FCM Token:', token); 
    return token
  } else {
    console.log('Failed to get FCM token');
  }
}

export async function storeNotification(notification) { 
  //store notification
  try {
    const storedNotifications = await AsyncStorage.getItem('notifications');
    const notifications = storedNotifications
      ? JSON.parse(storedNotifications)
      : [];
    notifications.push(notification);
    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
    store.dispatch(getTotalNotificationCount(notifications.length))
    addNotification(notification);
    notificationService.showNotification(
      notification.title,
      notification.message,
    );
  } catch (error) {
    console.log('Failed to store notification:', error);
    return error
  }
}

// Listener for foreground messages
export function notificationListener() {
  messaging().onMessage(async remoteMessage => {
    console.log('Foreground message received:', remoteMessage);
    // Alert.alert(
    //   remoteMessage.notification.title,
    //   remoteMessage.notification.body,
    // );
    await storeNotification({
      id: remoteMessage.messageId,
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body,
      receivedAt: new Date().toISOString(),
    });
  });
}

// Handler for background and quit state messages
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background message received:', remoteMessage);
  await storeNotification({
    id: remoteMessage.messageId,
    title: remoteMessage.notification.title,
    message: remoteMessage.notification.body,
    receivedAt: new Date().toISOString(),
  });
});
