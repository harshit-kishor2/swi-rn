import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
// import SplashScreen from './screens/splash';
import AppNavigator from './navigation';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import store from './store';
import { AlertBox } from 'react-native-alertbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <AppNavigator />
      </View>
      <AlertBox />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
