import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../../styles/theme';
import globalStyles from '../../styles/GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import { deleteNotification, getNotifications } from '../services/user';

const NotificationScreen = props => {
  const [notifications, setNotifications] = useState([]);
  const {notificationCount} = useSelector(state => state.notification);
  const dispatch = useDispatch();

  const loadNotifications = async () => {
    try {
      const storedNotifications = await getNotifications();
      console.log(storedNotifications, 'storedNotifications');
      
      if (storedNotifications) {
        setNotifications( storedNotifications);
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  };

  const deleteNotifications = async () => {
    try {
      await AsyncStorage.removeItem('notifications');
      await deleteNotification()
      setNotifications([]);
    } catch (error) {
      console.log('Failed to load notifications:', error);
      return error
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [notificationCount]);

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Icon
        name="notifications-outline"
        size={24}
        color="#555"
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={globalStyles.header}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={theme.color.primary} />
          </TouchableOpacity>
          <Text style={globalStyles.headerTitle}>Notifications</Text>
        </View>
        <TouchableOpacity
          style={globalStyles.header}
          onPress={() => deleteNotifications()}>
          <Icon name="trash" size={24} color={theme.color.primary} />
          <Text style={styles.headerTitle}>Delete All</Text>
        </TouchableOpacity>
      </View>
      {notifications?.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.noBookmarksText}>No notifications available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: '#666',
  },
  noBookmarksText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5%',
  },
  headerTitle: {
    color: theme.color.black,
  },
});

export default NotificationScreen;
