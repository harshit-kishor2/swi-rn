import {
  View,
  Text,
  StyleSheet,
  Alert,
  Button,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import StoryScreen from '../../components/StoryScreen';
import NavigationBar from '../../components/NavigationBar';
import {IMAGES, SPACING} from '../../resources';
import Custombutton from '../../components/Button1';
import Custombutton2 from '../../components/Button2';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import jwt_decode from 'jwt-decode';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import {userLogin} from '../../redux/auth.slice';
import {useDispatch} from 'react-redux';
import {getFCMToken} from '../../services/firebaseServices';
import {signUp} from '../createAccountScreen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import LocationInput from '../../LocationInput';

const LoginOptions = props => {
  const dispatch = useDispatch();
  const [fcmToken, setFcmToken] = useState();
  useEffect(() => {
    getFCMToken().then(token => {
      setFcmToken(token);
    });
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '866067850894-qf7rd1sg94urtsbhuvfo4g6c7hq1tmgt.apps.googleusercontent.com',
    });
  }, []);

  const signUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log('Google Auth Value', userInfo?.user);
      if (userInfo) {
        let params = {
          email: userInfo?.user?.email,
          device_type: Platform.OS,
          device_token: fcmToken,
          login_type: 'google',
          name: userInfo?.user?.name,
          google_id: userInfo?.user?.id,
        };
        dispatch(userLogin(params));
      }
    } catch (error) {
      //  console.log('error', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
  };

  // Apple log in code
  async function onAppleButtonPress() {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    console.log('authres---->>>', appleAuthRequestResponse);
    const {email, email_verified, is_private_email, sub} = jwt_decode(
      appleAuthRequestResponse.identityToken,
    );

    if (email && appleAuthRequestResponse.user) {
      dispatch(
        userLogin({
          email: appleAuthRequestResponse?.email,
          name: appleAuthRequestResponse?.givenName,

          login_type: 'apple',
          device_token: fcmToken,
          device_type: Platform.OS,
          //name:durgesh
          //social_id:sdasdasd
        }),
      );
      console.log(
        'email && appleAuthRequestResponse.user',
        email,
        appleAuthRequestResponse.user,
      );
    }

    // get current authentication state for user
    // // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    // const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    // // use credentialState response to ensure the user is authenticated
    // if (credentialState === appleAuth.State.AUTHORIZED) {
    //   // user is authenticated
    // }
  }
  const getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name,  email',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          console.log('result:', result);
          let params = {
            email: result?.email,
            device_type: Platform.OS,
            device_token: fcmToken,
            login_type: 'google',
            name: result?.name,
            facebook_id: result?.id,
          };
          dispatch(userLogin(params));
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  return (
    <StoryScreen>
      <NavigationBar
        leftSource={IMAGES.BACKARROW}
        leftAction={() => {
          console.log('first');
          props.navigation.navigate('CreateAccountScreen');
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
            LoginManager.logInWithPermissions(['public_profile', 'email']).then(
              async function (result) {
                if (result.isCancelled) {
                  console.log('SignUp Cancelled');
                } else {
                  let token = await AccessToken.getCurrentAccessToken();
                  if (token) {
                    getInfoFromToken(token);
                  }
                  console.log('You have Registered In Successfully');
                }
              },
              function (error) {
                alert('Login failed with error: ' + error);
              },
            );
          }}
        />
        <Custombutton2
          title={'Login with Google'}
          marginTop={15}
          width={241}
          height={51}
          marginHorizontal={20}
          onPress={signUp}
        />
        {Platform.OS === 'ios' && (
          <Custombutton2
            title={'Sign up with Apple ID'}
            marginTop={15}
            width={241}
            height={51}
            marginHorizontal={20}
            onPress={onAppleButtonPress}
          />
        )}
        <View style={{flexDirection: 'row', marginTop: SPACING.SCALE_25}}>
          <Text
            style={{
              fontSize: 14,
              color: '#4E4E4E',
              fontFamily: 'OpenSans-Regular',
            }}>
            Don’t have an account yet?
          </Text>
          <TouchableOpacity style={{marginLeft: 4}}>
            <Text
              style={{
                fontSize: 14,
                color: '#00958C',
                fontFamily: 'OpenSans-Regular',
              }}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    textAlign: 'center',
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
