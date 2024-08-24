import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native'; 
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
 

const AppNavigator = () => {
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
export default AppNavigator;
