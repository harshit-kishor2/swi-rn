import React from 'react';
import CreateAccountScreen from '../screens/createAccountScreen';
import SignupScreen from '../screens/signupScreen';
import LoginScreen from '../screens/loginScreen';
import ForgetPasswordScreen from '../screens/forgetPasswordScreen';
import TermsandcondtionScreen from '../screens/termsandcondtionScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WalkThroughScreen from '../screens/walkThroughScreen';

const Stack = createNativeStackNavigator();
const PreloginNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="WalkThroughScreen">
      <Stack.Screen name="WalkThroughScreen" component={WalkThroughScreen} />
      <Stack.Screen
        name='CreateAccountScreen'
        component={CreateAccountScreen}
      />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="ForgetPasswordScreen"
        component={ForgetPasswordScreen}
      />
      <Stack.Screen
        name="TermsandcondtionScreen"
        component={TermsandcondtionScreen}
      />
    </Stack.Navigator>
  );
};

export default PreloginNavigator;
