/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import {name as appName} from './app.json';
import App from './src/App';
import 'react-native-reanimated';

AppRegistry.registerComponent(appName, () => App);
