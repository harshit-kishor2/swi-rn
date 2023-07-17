import React, {useEffect} from 'react';
import {AlertBox} from 'react-native-alertbox';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {SplashScreen as CustomSplash} from './screens';
import store from './store';
import {StatusBar} from 'react-native';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar
        barStyle="light-content"
        // backgroundColor={'#00958C'}
      />
      <CustomSplash />
      <AlertBox />
    </Provider>
  );
};

export default App;
