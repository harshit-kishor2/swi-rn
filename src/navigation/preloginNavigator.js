import React from 'react';
import { CreateAccountScreen, ForgetPassword, LoginOptions, LoginScreen, SignupScreen, TermsandcondtionScreen, WalkThroughScreen } from '../screens';
import ProductViewComponent from '../components/ProductViewComponent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const PreloginNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="WalkThroughScreen">
      <Stack.Screen name="WalkThroughScreen" component={WalkThroughScreen} />
      <Stack.Screen
        name="CreateAccountScreen"
        component={CreateAccountScreen}
      />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />

      <Stack.Screen
        name="TermAndConditions"
        component={TermsandcondtionScreen}
      />

      <Stack.Screen name="ProductView" component={ProductViewComponent} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="TermsandcondtionScreen"
        component={TermsandcondtionScreen}
      />
      <Stack.Screen name="LoginOptions" component={LoginOptions} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  );
};

export default PreloginNavigator;
