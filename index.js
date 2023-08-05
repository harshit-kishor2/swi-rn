/**
 * @format
 */

import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { name as appName } from './app.json';
import App from './src/App';
import { EditSellerProfile } from '@app/screens/PostLogin/SellersProfile/SellerProfileEdit';






AppRegistry.registerComponent(appName, () => EditSellerProfile);
