import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Navigator from '@app//navigations/Navigator';
import {stayLoginAction, userProfile} from '@app/store/authSlice';
import SplashView from './SplashView';
import {SharedPreference} from '@app/helper';
import WalkThroughScreen from '../WalkThroughScreen';
import {getFCMToken} from '@app/services/firebaseServices';
import {
  notificationListner,
  requestUserPermission,
} from '@app/services/notificationService';

import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const SplashScreen = props => {
  const {checkIsLoggedInUser, getUserProfile} = props;

  const [isSplashEnd, setIsSplashEnd] = useState(false);
  const [walkthroughDisable, setWalkthroughDisable] = useState(false);

  useEffect(() => {
    requestUserPermission();
    notificationListner();
    SharedPreference.getItem(
      SharedPreference.keys.WALKTHROUGH_DISABLE,
      'false',
    ).then(res => {
      let val = res == 'true' ? true : false;
      setWalkthroughDisable(val);
    });
  }, [walkthroughDisable]);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashEnd(true);
    }, 3000);
    checkIsLoggedInUser();
    getUserProfile();
  }, []);
  console.log('Hello', walkthroughDisable);
  return isSplashEnd ? (
    walkthroughDisable ? (
      <Navigator />
    ) : (
      <WalkThroughScreen setWalkthroughDisable={setWalkthroughDisable} />
    )
  ) : (
    <SplashView />
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state?.authReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  checkIsLoggedInUser: () => dispatch(stayLoginAction()),
  getUserProfile: () => dispatch(userProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
