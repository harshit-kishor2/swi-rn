import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  FreshFindScreen,
  NotificationScreen,
  PostedSuccessfully,
  ProductDetails,
} from '@app/screens';

import MainTabNavigator from './MainTabNavigator';
import {RoutesName} from '@app/helper/strings';

const Stack = createNativeStackNavigator();
const PostLoginNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={RoutesName.MAIN_TAB_NAVIGATOR}
        component={MainTabNavigator}
      />
      {/* <Stack.Screen
        name="FreshFind"
        component={FreshFindScreen}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name={RoutesName.NOTIFICATION_SCREEN}
        component={NotificationScreen}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{headerShown: false}}
      /> */}

      {/* <Stack.Screen name="PostedSuccessfully" component={PostedSuccessfully} /> */}
    </Stack.Navigator>
  );
};
export default PostLoginNavigator;
