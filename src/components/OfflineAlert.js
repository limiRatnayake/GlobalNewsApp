import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, Modal} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import theme from '../../styles/theme';
import {useDispatch} from 'react-redux';
import {setNetworkStatus} from '../store/actions/loaderAction';

const OfflineAlert = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
      dispatch(setNetworkStatus(state.isConnected));
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isOffline ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isOffline, fadeAnim]);

  if (!isOffline) {
    return null;
  }

  return (
    <View style={styles.alertContainer}>
      <View style={styles.alertBox}>
        <Text style={styles.title}>No Internet Connection</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    bottom: '5%',
    left: 0,
    right: 0, 
    justifyContent: 'center',
    alignItems: 'center', 
    alignSelf: 'center',
    zIndex: 1000, 
    height: '8%', 
  },
  alertBox: {
    width: '80%',
    padding: 10,
    backgroundColor: theme.color.warning,
    borderRadius: theme.borderRadius, 
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000',  
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold', 
    textAlign: 'center',
    color: theme.color.white
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default OfflineAlert;
