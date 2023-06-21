import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
// import SplashScreen from './screens/splash';
import AppNavigator from './navigation';
import WalkThroughScreen from './screens/walkThroughScreen';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* <Text>App</Text> */}
      {/* <AppNavigator /> */}
      <WalkThroughScreen />

    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
