import React from 'react';
import CreateAccountScreen from '../screens/createAccountScreen';
import SignupScreen from '../screens/signupScreen';
import LoginScreen from '../screens/loginScreen';
import ForgetPasswordScreen from '../screens/forgetPasswordScreen';
import TermsandcondtionScreen from '../screens/termsandcondtionScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WalkThroughScreen from '../screens/walkThroughScreen';
import PostedSuccessfully from '../screens/AddProduct/PostedSuccessfully';
import FreshFind from '../screens/freshFindScreen';
import ProductViewComponent from '../components/ProductViewComponent';
const Stack = createNativeStackNavigator();
const PreloginNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="WalkThroughScreen">
      <Stack.Screen name="WalkThroughScreen" component={WalkThroughScreen} />
      <Stack.Screen
        name="CreateAccountScreen"
        component={CreateAccountScreen}
      />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="postedSuccessfullyScreen" component={PostedSuccessfully} />
      <Stack.Screen name="TermAndConditions" component={TermsandcondtionScreen} />
      <Stack.Screen name="FreshFind" component={FreshFind} />
      <Stack.Screen name="ProductView" component={ProductViewComponent} />
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
