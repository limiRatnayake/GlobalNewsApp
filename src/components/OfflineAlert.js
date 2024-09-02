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
    <Modal transparent={true} visible={isOffline} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>No Internet Connection</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '10%',
    width: '100%',
  },
  alertBox: {
    width: '80%',
    padding: 10,
    backgroundColor: theme.color.warning,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold', 
    textAlign: 'center',
    color: '#fff',
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
