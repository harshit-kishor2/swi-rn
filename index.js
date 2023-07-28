/**
 * @format
 */

import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { name as appName } from './app.json';
import App from './src/App';
import { RatingAndReviews } from '@app/screens/PostLogin/RatingAndReviews/Index';



AppRegistry.registerComponent(appName, () => RatingAndReviews);
