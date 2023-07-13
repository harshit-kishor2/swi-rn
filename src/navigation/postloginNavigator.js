import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigations from './tab-navigators';
import NotificationScreen from '../screens/Notifications/NotificationScreen';
import ProductDetails from '../screens/ProductDetails/Index';
import FreshFind from '../screens/freshFindScreen';
import PostedSuccessfully from '../screens/AddProduct/PostedSuccessfully';

const Stack = createNativeStackNavigator();
const PostloginNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigations"
        component={TabNavigations}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FreshFind"
        component={FreshFind}
        options={{headerShown: false}}
      />
      <Stack.Screen name="PostedSuccessfully" component={PostedSuccessfully} />
    </Stack.Navigator>
  );
};
export default PostloginNavigator;
