/**
 * @format
 */

import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { name as appName } from './app.json';

import messaging from '@react-native-firebase/messaging';
import App from './src/App';
import 'react-native-reanimated';
import { BuyCoins } from '@app/screens/PostLogin/Coin/BuyCoins';
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
AppRegistry.registerComponent(appName, () => App);

