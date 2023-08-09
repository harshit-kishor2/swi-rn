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
import socket from './helper/socket';

const App = () => {
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);
  useEffect(() => {
    socket.connect();
    function onConnect() {
      console.log('Socket Connected');
    }

    function onDisconnect() {
      console.log('Socket Disconnected');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

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
