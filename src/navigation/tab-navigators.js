import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ExploreScreen from '../screens/exploreScreen';
import FreshFind from '../screens/freshFindScreen';
import SellScreen from '../screens/AddProduct';
import ChatScreen from '../screens/chatScreen';
import MyProfileScreen from '../screens/profileScreen';
import {COLORS, IMAGES, SPACING, TYPOGRAPHY} from '../resources';
import {Image, Text, TouchableOpacity, View} from 'react-native';

const TabNavigations = () => {
  const Tab = createBottomTabNavigator();
  const CustomsellButton = ({children, onPress}) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        top: SPACING.SCALE__10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: SPACING.SCALE_70,
          height: SPACING.SCALE_70,
          borderRadius: SPACING.SCALE_10,
          // backgroundColor: COLORS.WHITE,
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
  return (
    //tabBarOptions is depricated instead screenOptions is used here.
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: SPACING.SCALE_50,
          backgroundColor: COLORS.BOTTOMTABBACKGROUND,
        },
      }}>
      <Tab.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, size}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  // top: SPACING.SCALE_10,
                }}>
                <Image
                  source={IMAGES.Exploreicon}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? '#00958C' : '#000000',
                    width: size,
                    height: size,
                  }}
                />
                <Text
                  style={{
                    color: focused ? '#00958C' : '#000000',
                    fontSize: 11,
                    fontFamily: 'Cabin-Regular',
                  }}>
                  Explore
                </Text>
              </View>
            );
          },
          headerTitleAlign: 'center',
          headerTintColor: '',
        }}
      />
      <Tab.Screen
        name="FreshFind"
        component={FreshFind}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, size}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  // top: SPACING.SCALE_10,
                }}>
                <Image
                  source={IMAGES.FFicon}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? '#00958C' : '#000000',
                    width: size,
                    height: size,
                  }}
                />
                <Text
                  style={{
                    color: focused ? '#00958C' : '#000000',
                    fontSize: 11,
                    fontFamily: 'Cabin-Regular',
                  }}>
                  Fresh Finds
                </Text>
              </View>
            );
          },
          headerTitleAlign: 'center',
          headerTintColor: '',
        }}
      />
      <Tab.Screen
        name="SellScreen"
        component={SellScreen}
        options={{
          headerShown: false,
          tabBarStyle: {display: 'none'},
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={IMAGES.Sellicon}
                resizeMode="contain"
                style={{
                  width: SPACING.SCALE_60,
                  height: SPACING.SCALE_60,
                }}
              />
              <Text
                style={{
                  color: focused ? '#00958C' : '#000000',
                  fontSize: TYPOGRAPHY.FONT_SIZE_13,
                  // marginTop: SPACING.SCALE_10,
                  marginBottom: SPACING.SCALE_12,
                  fontFamily: 'Cabin-Regular',
                  textAlign: 'center',
                }}>
                Sell
              </Text>
            </View>
          ),

          tabBarButton: props => <CustomsellButton {...props} />,
        }}
      />
      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, size}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  // top: SPACING.SCALE_10,
                }}>
                <Image
                  source={IMAGES.Chaticon}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? '#00958C' : '#000000',
                    width: size,
                    height: size,
                  }}
                />
                <Text
                  style={{
                    color: focused ? '#00958C' : '#000000',
                    fontSize: 11,
                    fontFamily: 'Cabin-Regular',
                  }}>
                  Chat
                </Text>
              </View>
            );
          },
          headerTitleAlign: 'center',
          headerTintColor: '',
        }}
      />
      <Tab.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, size}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  // top: SPACING.SCALE_10,
                }}>
                <Image
                  source={IMAGES.Profileicon}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? '#00958C' : '#000000',
                    width: size,
                    height: size,
                  }}
                />
                <Text
                  style={{
                    color: focused ? '#00958C' : '#000000',
                    fontSize: 11,
                    fontFamily: 'Cabin-Regular',
                  }}>
                  Profile
                </Text>
              </View>
            );
          },
          headerTitleAlign: 'center',
          headerTintColor: '',
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigations;
