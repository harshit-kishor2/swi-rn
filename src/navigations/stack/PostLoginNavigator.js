import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  FreshFindScreen,
  NotificationScreen,
  PostedSuccessfully,
  ProductDetails,
} from '@app/screens';

import MainTabNavigator from './MainTabNavigator';
import {RoutesName} from '@app/helper/strings';
import SellersProfileViewByOwn from '@app/screens/PostLogin/SellersProfile/ViewedbyOwn/Index';
import CoinHistory from '@app/screens/PostLogin/Coin/CoinHistory/Index';

const Stack = createNativeStackNavigator();
const PostLoginNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={RoutesName.MAIN_TAB_NAVIGATOR}
        component={MainTabNavigator}
      />
      <Stack.Screen
        name={RoutesName.PRODUCT_DETAILS}
        component={ProductDetails}
      />
      <Stack.Screen 
       name={RoutesName.SELLERSPROFILE_VIEWBYOWN}
       component={SellersProfileViewByOwn}
      />
      <Stack.Screen 
       name={RoutesName.COIN_HISTORY}
       component={CoinHistory}
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
