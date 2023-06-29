import {
    View,
    Text,
    StyleSheet,
    Alert,
    Button,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  import StoryScreen from '../../components/StoryScreen';
  import NavigationBar from '../../components/NavigationBar';
  import {IMAGES, SPACING} from '../../resources';
  import Custombutton from '../../components/Button1';
  import Custombutton2 from '../../components/Button2';
  import {appleAuth} from '@invertase/react-native-apple-authentication';
  
  const LoginOptions = props => {
    // Apple log in code
    async function onAppleButtonPress() {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      console.log('authres---->>>', appleAuthRequestResponse);
  
      // get current authentication state for user
      // // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      // const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
  
      // // use credentialState response to ensure the user is authenticated
      // if (credentialState === appleAuth.State.AUTHORIZED) {
      //   // user is authenticated
      // }
    }
  
    return (
      <StoryScreen>
        <NavigationBar
          leftSource={IMAGES.BACKARROW}
          leftAction={() => {
            console.log('first');
            props.navigation.navigate('WalkThroughScreen');
          }}
          flexDirection="row"
        />
        <View style={styles.container}>
          <View style={styles.topBox}>
            <Text style={styles.headline}>Hello there!</Text>
            <Text style={styles.subheadline}>Log in to your account</Text>
          </View>
          <Custombutton
            title="Login via Email"
            marginTop={50}
            height={51}
            width={241}
            marginHorizontal={20}
            onPress={() => {
              props.navigation.navigate('LoginScreen');
            }}
          />
          <Custombutton
            title="Login via Singpass"
            marginTop={13}
            width={241}
            height={51}
            marginHorizontal={20}
            onPress={() => {
              Alert.alert('rrr');
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 50,
              marginLeft: 80,
              marginRight: 80,
            }}>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            <View>
              <Text
                style={{
                  width: 25,
                  textAlign: 'center',
                  color: '#00958C',
                  fontSize: 16,
                  fontFamily: 'Cabin-Bold',
                }}>
                Or
              </Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          </View>
          <Custombutton2
            title={'Login with Facebook'}
            marginTop={50}
            width={241}
            height={51}
            marginHorizontal={20}
            onPress={() => {
              Alert.alert('rrr');
            }}
          />
          <Custombutton2
            title={'Login with Google'}
            marginTop={15}
            width={241}
            height={51}
            marginHorizontal={20}
            onPress={() => {
              Alert.alert('rrr');
            }}
          />
          <Custombutton2
            title={'Login with Apple ID'}
            marginTop={15}
            width={241}
            height={51}
            marginHorizontal={20}
            onPress={onAppleButtonPress}
          />
          <View style={{flexDirection: 'row', marginTop: SPACING.SCALE_25}}>
            <Text
              style={{fontSize: 14, color: '#4E4E4E', fontFamily: 'OpenSans-Regular'}}>
              Don’t have an account yet?
            </Text>
            <TouchableOpacity style={{marginLeft: 4}}>
              <Text
                style={{fontSize: 14, color: '#00958C', fontFamily: 'OpenSans-Regular'}}
                onPress={() => {
                  props.navigation.navigate('CreateAccountScreen');
                }}>
                Sign up now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </StoryScreen>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    },
    headline: {
      textAlign: 'center',
      // fontWeight: 'bold',
      fontFamily: 'Cabin-Bold',
      fontSize: 18,
      marginTop: 10,
      width: 200,
      color: '#000000',
    },
    subheadline: {
      textAlign: 'center',
      fontSize: 18,
      fontFamily: 'OpenSans-Regular',
      width: 300,
      marginTop: 7,
      color: '#00958C',
    },
    topBox: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  });
  
  export default LoginOptions;
  