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
import ItemComparison from '@app/screens/PostLogin/ItemComparison';
import MyFavourites from '@app/screens/PostLogin/MyFavourites.js/Index';
import SearchScreen from '@app/screens/PostLogin/Searching/SearchScreen';
import SellerProfileViewByOther from '../../screens/PostLogin/SellersProfile/ViewedbyOthers/Index'

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
        name={RoutesName.SELLERSPROFILE_VIEWBYOTHERS}
        component={SellerProfileViewByOther}
      />
      <Stack.Screen name={RoutesName.COIN_HISTORY} component={CoinHistory} />
      <Stack.Screen
        name={RoutesName.ITEM_COMPARISON}
        component={ItemComparison}
      />
      <Stack.Screen
        name={RoutesName.MY_FAVOURITES}
        component={MyFavourites}
      />
      <Stack.Screen name={RoutesName.SEARCH_SCREEN} component={SearchScreen} />

      {/* <Stack.Screen
        name="FreshFind"
        component={FreshFindScreen}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name={RoutesName.NOTIFICATION_SCREEN}
        component={NotificationScreen}
        options={{headerShown: false}}
      />
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
