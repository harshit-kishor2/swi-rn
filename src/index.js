import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
// import SplashScreen from './screens/splash';
import AppNavigator from './navigation';
import WalkThroughScreen from './screens/walkThroughScreen';
import SplashScreen from './screens/splash';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* <Text>App</Text> */}
      {/* <AppNavigator /> */}
      <WalkThroughScreen />
      {/* <SplashScreen/> */}

    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
