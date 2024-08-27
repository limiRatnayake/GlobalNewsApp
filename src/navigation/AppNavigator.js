import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import auth from '@react-native-firebase/auth';
import BootSplash from 'react-native-bootsplash';

const AppNavigator = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //listen to the authChange
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;  
  }, []);

  const onAuthStateChanged = user => {
    setUser(user);
    if (user) {
      console.log('User is signed in with email:', user.email);
 
      user.getIdToken().then(token => {
        // console.log('User token:', token);
      });
    } else {
      console.log('User is signed out');
      setUser(null);
    }
  };

  return (
    <NavigationContainer onReady={() => BootSplash.hide({fade: true})}>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
export default AppNavigator;
