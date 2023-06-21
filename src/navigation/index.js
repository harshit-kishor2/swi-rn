import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navigation-utilities';
import PreloginNavigator from './preloginNavigator';
const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <PreloginNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
