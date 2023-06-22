import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
// import SplashScreen from './screens/splash';
import AppNavigator from './navigation';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <View style={{flex: 1}}>
      <AppNavigator />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
