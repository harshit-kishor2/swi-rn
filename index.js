/**
 * @format
 */

import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { name as appName } from './app.json';
import App from './src/App';
import { SellerProfileQR } from '@app/screens/PostLogin/SellersProfile/SellerProfileQR/Index';






AppRegistry.registerComponent(appName, () => SellerProfileQR);
