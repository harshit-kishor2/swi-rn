// import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
// import OtpScreen from '../Screens/OTP';
// import Congratulation from '../Screens/Congratulation';
// import LoginScreen from '../Screens/Login';
// import SignUp from '../Screens/SignUp';
// import ForgotPassword from '../Screens/Forgot_Password/index';
// import InformationScreen from '../Screens/InformationScreen';
// import {connect} from 'react-redux';
// import {getGoToLogOut} from '../redux/auth.slice';
// import {checkAuthorization} from '../redux/auth.slice';
// import OnBoardingScreen from '../Screens/OnBoarding/OnBoardingScreen';
// import StaticScreens from '../Screens/StaticScreens';

// const Stack = createStackNavigator();

 //   return (
//     <Stack.Navigator
//       screenOptions={{headerShown: false}}
//       initialRouteName={props.goto}>
//       <Stack.Screen name="InformationScreen" component={InformationScreen} />
//       <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
//       <Stack.Screen name="SignUp" component={SignUp} />
//       <Stack.Screen name="OtpScreen" component={OtpScreen} />
//       <Stack.Screen name="Congratulation" component={Congratulation} />
//       <Stack.Screen name="LoginScreen" component={LoginScreen} />
//       <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
//       <Stack.Screen name="StaticScreens" component={StaticScreens} />
//     </Stack.Navigator>
//   );
// };
// const mapStateToProps = state => ({
//   authorized: checkAuthorization(state),
//   goto: getGoToLogOut(state),
// });

// export default connect(mapStateToProps)(PreloginNavigator);

