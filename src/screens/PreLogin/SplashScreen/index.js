import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Navigator from '@app//navigations/Navigator';
import { stayLoginAction } from '@app/store/authSlice';
import SplashView from './SplashView';

const SplashScreen = props => {
  const { checkIsLoggedInUser } = props;

  const [ isSplashEnd, setIsSplashEnd ] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashEnd(true);
    }, 3000);
    checkIsLoggedInUser();
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
