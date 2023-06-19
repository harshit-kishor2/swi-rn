// import * as React from 'react';
// import {Image, View} from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import HomeScreen from '../Screens/HomeScreen';
// import NutritionScreen from '../Screens/NutritionScreen';
// import ExploreScreen from '../Screens/ExploreScreen';
// import FavouriteScreen from '../Screens/FavouriteScreen';
// import MyProfileScreen from '../Screens/MyProfileScreen';
// import MyTabBar from '../Screens/MyTabBar';
// import {IMAGES, COLORS, SPACING, FONTS, TYPOGRAPHY} from '../Resources';
// import {NavigationContainer} from '@react-navigation/native';
// import {LinearGradientText} from 'react-native-linear-gradient-text';

// const Tab = createBottomTabNavigator();

// const screenOptions = ({route}) => ({
//   headerShown: false,
//   lazy: false,
//   tabBarInactiveTintColor: COLORS.WHITE,
//   tabBarHideOnKeyboard: true,
//   tabBarStyle: {backgroundColor: COLORS.WHITE},
//   tabBarIcon: ({focused, color}) => {
//     let icon;
//     let tabName;
//     switch (route.name) {
//       case 'Home':
//         icon = IMAGES.onHomeTabIcon;
//         tabName = 'Home';
//         break;
//       case 'NutritionScreen':
//         icon = IMAGES.onNutritionTabIcon;
//         tabName = 'Nutrition';
//         break;
//       case 'ExploreScreen':
//         icon = IMAGES.onExploreIcon;
//         tabName = 'Explore';
//         break;
//       case 'FavouriteScreen':
//         icon = IMAGES.onFavouriteIcon;
//         tabName = 'Favourites';
//         break;
//       case 'MyProfileScreen':
//         icon = IMAGES.onProfileIcon;
//         tabName = 'Profile';
//         break;
//       default:
//         icon = IMAGES.profileIcon;
//         break;
//     }

//     return (
//       <View style={{justifyContent: 'center', alignItems: 'center'}}>
//         <Image
//           resizeMode="center"
//           style={{
//             tintColor: color,
//             height: SPACING.SCALE_20,
//             width: SPACING.SCALE_25,
//           }}
//           source={icon}
//         />
//         <LinearGradientText
//           colors={
//             color == '#FFFFFF' ? ['#FFFFFF', '#FFFFFF'] : ['#41D6C7', '#B396F3']
//           }
//           text={tabName}
//           start={{x: 0.8, y: 0.2}}
//           end={{x: 0.7, y: 0.99}}
//           style={{
//             marginTop: SPACING.SCALE_4,
//             fontFamily: FONTS.medium,
//             fontSize: TYPOGRAPHY.FONT_SIZE_12,
//           }}
//         />
//       </View>
//     );
//   },
// });

// const MyTabs = () => {
//   return (
//     <Tab.Navigator
//       tabBar={props => <MyTabBar {...props} />}
//       screenOptions={screenOptions}>
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{headerShown: false}}
//       />
//       <Tab.Screen
//         name="NutritionScreen"
//         component={NutritionScreen}
//         options={{headerShown: false}}
//       />
//       <Tab.Screen
//         name="ExploreScreen"
//         component={ExploreScreen}
//         options={{tabBarShowLabel: false}}
//       />
//       <Tab.Screen
//         name="FavouriteScreen"
//         component={FavouriteScreen}
//         options={{tabBarShowLabel: false}}
//       />
//       <Tab.Screen
//         name="MyProfileScreen"
//         component={MyProfileScreen}
//         options={{tabBarShowLabel: false}}
//       />
//     </Tab.Navigator>
//   );
// };

// export default MyTabs;
