import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Navigator from '@app//navigations/Navigator';
import {stayLoginAction, userProfile} from '@app/store/authSlice';
import SplashView from './SplashView';
import {SharedPreference} from '@app/helper';
import WalkThroughScreen from '../WalkThroughScreen';

const SplashScreen = props => {
  const {checkIsLoggedInUser} = props;

  const [isSplashEnd, setIsSplashEnd] = useState(false);
  const [walkthroughDisable, setWalkthroughDisable] = useState(false);

  useEffect(() => {
    SharedPreference.getItem(
      SharedPreference.keys.WALKTHROUGH_DISABLE,
      'false',
    ).then(res => {
      let val = res == 'true' ? true : false;
      setWalkthroughDisable(val);
    });
  }, [walkthroughDisable]);

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
