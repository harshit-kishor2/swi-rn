/**
 * @format
 */

import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { name as appName } from './app.json';

import messaging from '@react-native-firebase/messaging';
import App from './src/App';
// import { EditSellerProfile } from '@app/screens/PostLogin/SellersProfile/SellerProfileEdit';


AppRegistry.registerComponent(appName, () => EditSellerProfile);
import 'react-native-reanimated';
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
AppRegistry.registerComponent(appName, () => App);
