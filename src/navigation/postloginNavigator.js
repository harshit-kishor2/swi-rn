// import React, {useEffect, useCallback, useState} from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
// import GenderSelection from '../Screens/Gender';
// import HeightSelector from '../Screens/BodyHeight';
// import PersonalityScreen from '../Screens/Personality';
// import ActiveStatusScreen from '../Screens/ActiveStatus';
// import PreferencesScreen from '../Screens/PreferenceScreen';
// import DiagnosedScreen from '../Screens/Diagnosed';
// import Progress from '../Screens/ProjectedProgress';
// import WeightScreen from '../Screens/Weight';
// import RewindScreen from '../Screens/RewindScreen';
// import ResDetail from '../Screens/RestrauntDetail';
// import CookingScreen from '../Screens/CookingScreen';
// import SearchScreen from '../Screens/Search';
// import MyTabs from './tab-navigator';
// import {connect, useDispatch} from 'react-redux';
// import {
//   getUserProfile,
//   getUserProfileData,
//   getUserProfileLoading,
// } from '../redux/userProfile.slice';
// import {
//   getProfileAuthorizationLoading,
//   getIsProfileData,
//   getProfileAuthorization,
// } from '../redux/auth.slice';
// import {checkAuthorization} from '../redux/auth.slice';
// import {
//   getQuestionLoadingStatus,
//   utilsAction,
//   getProfileKeyLoadingStatus,
// } from '../redux/utils.slice';
// import {useFocusEffect} from '@react-navigation/native';
// import {ActivityIndicator, View} from 'react-native';
// import {COLORS} from '../Resources';
// import EditProfile from '../Screens/EditProfile';
// import ResetPassword from '../Screens/ResetPassword';
// import SettingScreen from '../Screens/SettingScreen';
// import NotificationScreen from '../Screens/NotificationScreen';
// import ContactUs from '../Screens/ContactUs';
// import DeleteAccount from '../Screens/DeleteAccount';
// import StaticScreens from '../Screens/StaticScreens';
// import GoogleMapScreen from '../Screens/GoogleMapScreen';

// const Stack = createStackNavigator();

// const PostloginNavigator = props => {
//   const dispatch = useDispatch();
//   const [focus, setFocus] = useState(false);

//   useFocusEffect(
//     useCallback(() => {
//       dispatch(getProfileAuthorization());
//       setFocus(true);
//       return () => {
//         setFocus(false);
//       };
//     }, [dispatch]),
//   );

//   useEffect(() => {
//     dispatch(getUserProfile());
//   }, [dispatch]);

//   useEffect(() => {
//     if (props.profileLoadingStatus === 'loaded') {
//       dispatch(utilsAction.updateProfileKey());
//       dispatch(getProfileAuthorization());
//     }
//   }, [dispatch, props.profileLoadingStatus]);

//   if (props.profileLoading) {
//     return (
//       <View style={{flex: 1, backgroundColor: COLORS.BLACK}}>
//         <ActivityIndicator
//           size="large"
//           color={COLORS.WHITE}
//           style={{
//             flex: 1,
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//           }}
//         />
//       </View>
//     );
//   }

//   if (focus && props.profileData === 'false') {
//     return (
//       <Stack.Navigator
//         screenOptions={{headerShown: false}}
//         initialRouteName={props.initialRouteName}>
//         <Stack.Screen name="GenderSelection" component={GenderSelection} />
//         <Stack.Screen name="HeightSelector" component={HeightSelector} />
//         <Stack.Screen name="WeightScreen" component={WeightScreen} />
//         <Stack.Screen name="PersonalityScreen" component={PersonalityScreen} />
//         <Stack.Screen
//           name="ActiveStatusScreen"
//           component={ActiveStatusScreen}
//         />
//         <Stack.Screen name="DiagnosedScreen" component={DiagnosedScreen} />
//         <Stack.Screen name="Progress" component={Progress} />
//       </Stack.Navigator>
//     );
//   } else if (focus && props.profileData == 'true') {
//     return <AuthorizedNavigation initialRouteName={props.initialRouteName} />;
//   } else {
//     <View style={{flex: 1, backgroundColor: COLORS.BLACK}}>
//       <ActivityIndicator
//         size="large"
//         color={COLORS.WHITE}
//         style={{
//           flex: 1,
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//         }}
//       />
//     </View>;
//   }
// };

// const AuthorizedNavigation = props => {
//   return (
//     <Stack.Navigator
//       screenOptions={{headerShown: false}}
//       initialRouteName={props.initialRouteName}>
//       <Stack.Screen name="MyTabs" component={MyTabs} />
//       <Stack.Screen name="PreferencesScreen" component={PreferencesScreen} />
//       <Stack.Screen name="RewindScreen" component={RewindScreen} />
//       <Stack.Screen name="ResDetail" component={ResDetail} />
//       <Stack.Screen name="CookingScreen" component={CookingScreen} />
//       <Stack.Screen name="EditProfile" component={EditProfile} />
//       <Stack.Screen name="ResetPassword" component={ResetPassword} />
//       <Stack.Screen name="SettingScreen" component={SettingScreen} />
//       <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
//       <Stack.Screen name="ContactUs" component={ContactUs} />
//       <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
//       <Stack.Screen name="StaticScreens" component={StaticScreens} />
//       <Stack.Screen name="GoogleMapScreen" component={GoogleMapScreen} />
//       <Stack.Screen name="SearchScreen" component={SearchScreen} />
//     </Stack.Navigator>
//   );
// };
// const mapStateToProps = state => ({
//   userData: getUserProfileData(state),
//   userLoading: getUserProfileLoading(state),
//   questionLoadingStatus: getQuestionLoadingStatus(state),
//   isAuthorized: checkAuthorization(state),
//   profileLoading: getProfileAuthorizationLoading(state),
//   profileData: getIsProfileData(state),
//   profileLoadingStatus: getProfileKeyLoadingStatus(state),
// });

// export default connect(mapStateToProps)(PostloginNavigator);

