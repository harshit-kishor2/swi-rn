import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SplashScreen from './screens/splash';
import WalkThroughScreen from './screens/walkThroughScreen'

const App = () => {
  return (
    <View>
      {/* <Text>App</Text> */}
      {/* <SplashScreen /> */}

      <WalkThroughScreen />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
