import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigation-utilities';
import PreloginNavigator from './preloginNavigator';
import PostloginNavigator from './postloginNavigator';
import {
  getLoginLoader,
  getLoginToken,
  getTrustAuthorization,
} from '../redux/auth.slice';
import { connect, useDispatch } from 'react-redux';
import DeepLinkng from '../components/DeepLinkng';
const AppNavigator = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getTrustAuthorization());
  }, [dispatch]);

  useEffect(() => {
    if (props.loginStatus === 'loading') {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [props.loginStatus]);
  if (loading) {
    LoadingComponent();
  }
  return (
    <NavigationContainer ref={navigationRef} onReady={() => setLoading(false)}>
      <DeepLinkng isAuth={props.isLogin === 'true' ? true : false} />
      {props.isLogin === 'true' ? (
        <PostloginNavigator />
      ) : (
        <PreloginNavigator />
      )}
    </NavigationContainer>
  );
};
const LoadingComponent = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const mapStateToProps = state => ({
  isLogin: getLoginToken(state),
  loginStatus: getLoginLoader(state),
});
export default connect(mapStateToProps)(AppNavigator);

const styles = StyleSheet.create({});
//getTrustAuthorization
