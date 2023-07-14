/**
 * @format
 */

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import App from './src';
import LocationInput from './src/LocationInput';
import ImageView from './src/imageView';
import WatchBrands from './src/multiselect';
import DollarTextField from './src/multiselect';

AppRegistry.registerComponent(appName, () => App);
