import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import SplashScreen from './screens/splash';
import AppNavigator from './navigation';

const App = () => {
  return (
    <View>
      {/* <Text>App</Text> */}
      <AppNavigator />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
