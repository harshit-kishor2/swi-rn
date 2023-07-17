import React from 'react';
import {
  CreateAccountScreen,
  ForgetPassword,
  LoginOptions,
  LoginScreen,
  SignupScreen,
  TermsandcondtionScreen,
  WalkThroughScreen,
} from '@app/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RoutesName } from '@app/helper/strings';

const Stack = createNativeStackNavigator();

const PreLoginNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={ { headerShown: false } }
      initialRouteName={ RoutesName.WALK_THROUGH_SCREEN }>
      <Stack.Screen
        name={ RoutesName.WALK_THROUGH_SCREEN }
        component={ WalkThroughScreen }
      />
      <Stack.Screen
        name={ RoutesName.CREATE_ACCOUNT_SCREEN }
        component={ CreateAccountScreen }
      />
      <Stack.Screen
        name={ RoutesName.LOGIN_OPTIONS_SCREEN }
        component={ LoginOptions }
      />
      <Stack.Screen
        name={ RoutesName.TERM_AND_CONDITION_SCREEN }
        component={ TermsandcondtionScreen }
      />
      <Stack.Screen name={ RoutesName.SIGNUP_SCREEN } component={ SignupScreen } />

      <Stack.Screen name={ RoutesName.LOGIN_SCREEN } component={ LoginScreen } />

      <Stack.Screen
        name={ RoutesName.FORGOT_PASSWORD_SCREEN }
        component={ ForgetPassword }
      />
    </Stack.Navigator>
  );
};

export default PreLoginNavigator;
