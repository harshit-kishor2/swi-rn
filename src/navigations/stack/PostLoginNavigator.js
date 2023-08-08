import {
  AccountSetting,
  ChatDetailScreen,
  InterestList,
  MyFavourites,
  NotificationScreen,
  ProductDetails,
  ProfileSection,
  SellerProfileQR,
} from '@app/screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RoutesName} from '@app/helper/strings';
import CoinHistory from '@app/screens/PostLogin/Coin/CoinHistory/Index';
import ItemComparison from '@app/screens/PostLogin/ItemComparison';
import SearchScreen from '@app/screens/PostLogin/Searching/SearchScreen';
import SellersProfileViewByOwn from '@app/screens/PostLogin/SellersProfile/ViewedbyOwn/Index';
import SellerProfileViewByOther from '../../screens/PostLogin/SellersProfile/ViewedbyOthers/Index';
import MainTabNavigator from './MainTabNavigator';
import {ChangePassword} from '@app/screens/PostLogin/ChangePassword';
import SellerProfileEdit from '@app/screens/PostLogin/SellersProfile/SellerProfileEdit';

const Stack = createNativeStackNavigator();
const PostLoginNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={RoutesName.MAIN_TAB_NAVIGATOR}
        component={MainTabNavigator}
      />
      <Stack.Screen
        name={RoutesName.CHAT_DETAIL_SCREEN}
        component={ChatDetailScreen}
      />
      <Stack.Screen
        name={RoutesName.INTERESTLIST_SCREEN}
        component={InterestList}
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
      <Stack.Screen name={RoutesName.MY_FAVOURITES} component={MyFavourites} />
      <Stack.Screen name={RoutesName.SEARCH_SCREEN} component={SearchScreen} />
      <Stack.Screen
        name={RoutesName.PROFILE_QR_SCREEN}
        component={SellerProfileQR}
      />
      <Stack.Screen
        name={RoutesName.NOTIFICATION_SCREEN}
        component={NotificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RoutesName.ACCOUNT_SETTING_SCREEN}
        component={AccountSetting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RoutesName.PROFILE_SECTION_SCREEN}
        component={ProfileSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RoutesName.CHANGE_PASSWORD_SCREEN}
        component={ChangePassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RoutesName.EDIT_SELLER_PROFILE}
        component={SellerProfileEdit}
        options={{headerShown: false}}
      />

      {/* <Stack.Screen name="PostedSuccessfully" component={PostedSuccessfully} /> */}
    </Stack.Navigator>
  );
};
export default PostLoginNavigator;
