/* eslint-disable react-native/no-inline-styles */
import {FontsConst} from '@app/assets/assets';
import {CustomIcon, CustomText} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {RoutesName} from '@app/helper/strings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Pressable, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  ChatScreen,
  ExploreScreen,
  FreshFindScreen,
  MyProfileScreen,
  SellScreen,
} from '@app/screens';
import useKeyboardVisible from '@app/hooks/useKeyboardVisible';
import SellStackNavigator from './SellStackNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {userProfile} from '@app/store/authSlice';

const Tab = createBottomTabNavigator();

const CustomsellButton = ({children, onPress, accessibilityState}) => {
  const keyboardVisible = useKeyboardVisible();
  console.log('keyboardVisible', keyboardVisible);
  return (
    <Pressable
      onPress={onPress}
      style={{
        top: keyboardVisible ? 0 : -20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: 60,
          width: 60,
          borderRadius: 10,
          backgroundColor: '#000',
        }}>
        {children}
      </View>
      <CustomText
        style={{
          fontSize: 12,
          fontFamily: FontsConst.Cabin_SemiBold,
          color: accessibilityState?.selected ? '#00958C' : '#000000',
        }}>
        Sell
      </CustomText>
    </Pressable>
  );
};

const screenOptions = ({route}) => ({
  headerShown: false,
  tabBarActiveTintColor: '#00958C',
  tabBarInactiveTintColor: '#000000',
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  unmountOnBlur: true,
  tabBarItemStyle: {
    width: 80,
    // paddingHorizontal: 0,
    // padding: 0,
    paddingTop: 20,
    height: 80,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontFamily: FontsConst.Cabin_SemiBold,
  },
  tabBarStyle: {
    width: 'auto',
    height: 80,
  },
  tabBarIcon: ({focused, color, size}) => {
    let iconName;
    let origin;
    switch (route.name) {
      case RoutesName.EXPLORE_TAB:
        iconName = 'search';
        origin = ICON_TYPE.FEATHER_ICONS;
        break;
      case RoutesName.FRESH_FINDS_TAB:
        iconName = 'zap';
        origin = ICON_TYPE.FEATHER_ICONS;
        break;
      case RoutesName.SELL_TAB:
        iconName = 'plus';
        origin = ICON_TYPE.OCTICONS;
        color = focused ? color : '#ffffff';
        break;
      case RoutesName.CHAT_TAB:
        iconName = 'message-square';
        origin = ICON_TYPE.FEATHER_ICONS;
        break;
      case RoutesName.PROFILE_TAB:
        iconName = 'user';
        origin = ICON_TYPE.FEATHER_ICONS;
        break;
      default:
        return;
    }
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <CustomIcon origin={origin} name={iconName} size={size} color={color} />
        {route.name !== RoutesName.SELL_TAB ? (
          <CustomText
            style={{
              fontSize: 10,
              color: color,
            }}>
            {route.name}
          </CustomText>
        ) : null}
      </View>
    );
  },
});

const MainTabNavigator = () => {
  const dispatch = useDispatch();
  const {userProfileDetails} = useSelector(state => state.authReducer);
  console.log(userProfileDetails, 'jhgghjgjhjgj');
  // useEffect(() => {
  //   dispatch(userProfile());
  // }, []);

  return (
    <Tab.Navigator
      sceneAnimationEnabled={false}
      screenOptions={props => screenOptions(props)}>
      <Tab.Screen name={RoutesName.EXPLORE_TAB} component={ExploreScreen} />
      <Tab.Screen
        name={RoutesName.FRESH_FINDS_TAB}
        component={FreshFindScreen}
      />

      {userProfileDetails.role === 'seller' && (
        <Tab.Screen
          name={RoutesName.SELL_TAB}
          component={SellStackNavigator}
          options={{
            tabBarHideOnKeyboard: true,
            tabBarButton: props => {
              return <CustomsellButton {...props} />;
            },
          }}
        />
      )}

      <Tab.Screen
        name={RoutesName.CHAT_TAB}
        component={ChatScreen}
        listeners={{
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
          },
        }}
      />
      <Tab.Screen name={RoutesName.PROFILE_TAB} component={MyProfileScreen} />
    </Tab.Navigator>
  );
};
export default MainTabNavigator;
