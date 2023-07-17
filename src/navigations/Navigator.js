import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {isMountedRef, navigationRef} from './NavigationService';
import PostLoginNavigator from './stack/PostLoginNavigator';
import PreLoginNavigator from './stack/PreLoginNavigator';
import {DeepLinkng} from '@app/components';

const Navigator = props => {
  const {authReducer} = props;

  // check naviagtion mounted or not
  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  console.log('isAuthenticate', authReducer?.isAuthenticate);
  return (
    <NavigationContainer ref={navigationRef}>
      <DeepLinkng />
      {authReducer?.isAuthenticate ? (
        <PostLoginNavigator />
      ) : (
        <PreLoginNavigator />
      )}
    </NavigationContainer>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state?.authReducer,
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
