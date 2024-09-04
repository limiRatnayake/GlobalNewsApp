import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

class NotificationService {
  constructor() {
    this.configure();
    this.createDefaultChannels();
  }

  configure() {
    PushNotification.configure({ 
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
 
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
 
      popInitialNotification: true,

      requestPermissions: Platform.OS === 'ios',
    });
  }

  createDefaultChannels() {
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'default-channel-id', 
          channelName: 'Default Channel', 
          channelDescription: 'A default channel', 
          playSound: true,  
          soundName: 'default', 
          importance: 4, 
          vibrate: true,
        },
        created => console.log(`createChannel returned '${created}'`),
      );
    }
  }

  showNotification(title, message) {
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title: title,
      message: message,
      playSound: true,
      soundName: 'default',
      importance: 'high',
      vibrate: true,
    });
  }
  
  sendNotification(message) {
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title: message.title,
      message: message.message,
      playSound: true,
      soundName: 'default',
      importance: 'high',
      vibrate: true,
    });
  }
}

export const notificationService = new NotificationService();
