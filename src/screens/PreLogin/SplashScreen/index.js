import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Navigator from '@app//navigations/Navigator';
import {stayLoginAction, userProfile} from '@app/store/authSlice';
import SplashView from './SplashView';

const SplashScreen = props => {
  const {checkIsLoggedInUser, getUserProfile} = props;

  const [isSplashEnd, setIsSplashEnd] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashEnd(true);
    }, 3000);
    checkIsLoggedInUser();
    getUserProfile();
  }, []);

  return isSplashEnd ? <Navigator /> : <SplashView />;
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
