import React, {useEffect} from 'react';
import {Text} from 'react-native';
import { signOut } from '../services/auth';

const HomeScreen = () => {
  useEffect(() => {
    // signZOut();
  }, []);

  const signZOut = async () => {
    try {
      let userDetails = await signOut();
      console.log('signOut');
    } catch (error) {
      console.log('Login Error', error.message);
    }
  };

  return <Text>Home Screen</Text>;
};
export default HomeScreen;
