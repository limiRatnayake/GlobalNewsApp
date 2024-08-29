import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar, 
  useColorScheme,
} from 'react-native'; 
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppNavigator from './src/navigation/AppNavigator';
import globalStyles from './styles/GlobalStyles';
import store from './src/store/store';
import { Provider } from 'react-redux';
import { notificationListener, requestUserPermission } from './src/services/notifications';
 
function App() { 
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

   useEffect(() => { 
     requestUserPermission();

   
     notificationListener();
   }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={globalStyles.mainContainer}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <AppNavigator />
      </SafeAreaView>
    </Provider>
  );
}

 

export default App;
