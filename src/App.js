import React, {useEffect} from 'react';
import {AlertBox} from 'react-native-alertbox';
// import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {SplashScreen as CustomSplash} from './screens';
import store from './store';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

const App = () => {
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <StatusBar
          barStyle="light-content"
          // backgroundColor={'#00958C'}
        />
        <CustomSplash />
        <AlertBox />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
