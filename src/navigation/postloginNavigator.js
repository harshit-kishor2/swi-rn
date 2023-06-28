import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigations from './tab-navigators';

const Stack = createNativeStackNavigator();
const PostloginNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigations"
        component={TabNavigations}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default PostloginNavigator;
