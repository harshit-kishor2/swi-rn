import React, {useEffect} from 'react';
import {AlertBox} from 'react-native-alertbox';
// import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {SplashScreen as CustomSplash} from './screens';
import store from './store';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {PaperProvider} from 'react-native-paper';

const App = () => {
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PaperProvider>
        <Provider store={store}>
          <StatusBar
            barStyle="light-content"
            // backgroundColor={'#00958C'}
          />
          <CustomSplash />
          <AlertBox />
        </Provider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default App;
