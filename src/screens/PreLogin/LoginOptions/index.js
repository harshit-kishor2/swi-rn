import {BackHeader, Container, Spacer, SubmitButton} from '@app/components';
import {Config} from '@app/helper/config';
import {LoadingStatus, RoutesName} from '@app/helper/strings';
import NavigationService from '@app/navigations/NavigationService';
import LinkNavigationRow from '@app/screens/atoms/LinkNavigationRow';
import LoginHeader from '@app/screens/atoms/LoginHeader';
import Seprator from '@app/screens/atoms/Seprator';
import {userSigninAction} from '@app/store/authSlice';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import jwt_decode from 'jwt-decode';
import {useEffect, useState} from 'react';
import {Platform, View} from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import {connect} from 'react-redux';

const LoginOptions = props => {
  const {authReducer, onUserLogin} = props;
  const [buttonDisabled, setButtonDisabled] = useState(false);

  //  Configure google client id
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.GOOGLE_CLIENT_ID,
    });
  }, []);

  //! Function for apple login
  const _onAppleLogin = async () => {
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
      const params = {
        email: appleAuthRequestResponse?.email,
        name: appleAuthRequestResponse?.givenName,
        login_type: 'apple',
        device_token: 'fcmToken',
        device_type: Platform.OS,
        //name:durgesh
        //social_id:sdasdasd
      };
      onUserLogin(params).then(res => {
        if (res?.type.includes('fulfilled')) {
          setButtonDisabled(false);
        }
        if (res?.type.includes('rejected')) {
          setButtonDisabled(false);
          showAlert({
            title: 'Error',
            message: res?.payload?.message ?? 'Internal server error!',
          });
        }
      });
    }

    // get current authentication state for user
    // // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    // const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    // // use credentialState response to ensure the user is authenticated
    // if (credentialState === appleAuth.State.AUTHORIZED) {
    //   // user is authenticated
    // }
  };

  //! Function for facebook login
  const _onFacebookLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async function (result) {
        if (result.isCancelled) {
          console.log('SignUp Cancelled');
        } else {
          let token = await AccessToken.getCurrentAccessToken();
          if (token) {
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
                  let params = {
                    email: result?.email,
                    device_type: Platform.OS,
                    device_token: 'fcmToken',
                    login_type: 'google',
                    name: result?.name,
                    facebook_id: result?.id,
                  };
                  onUserLogin(params).then(res => {
                    if (res?.type.includes('fulfilled')) {
                      setButtonDisabled(false);
                    }
                    if (res?.type.includes('rejected')) {
                      setButtonDisabled(false);
                      showAlert({
                        title: 'Error',
                        message:
                          res?.payload?.message ?? 'Internal server error!',
                      });
                    }
                  });
                }
              },
            );
            new GraphRequestManager().addRequest(profileRequest).start();
          }
          console.log('You have Registered In Successfully');
        }
      },
      function (error) {
        alert('Login failed with error: ' + error);
      },
    );
  };

  //! Function for google login
  const _onGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log('Google Auth Value', userInfo?.user);
      if (userInfo) {
        let params = {
          email: userInfo?.user?.email,
          device_type: Platform.OS,
          device_token: 'fcmToken',
          login_type: 'google',
          name: userInfo?.user?.name,
          google_id: userInfo?.user?.id,
        };
        onUserLogin(params).then(res => {
          if (res?.type.includes('fulfilled')) {
            setButtonDisabled(false);
          }
          if (res?.type.includes('rejected')) {
            setButtonDisabled(false);
            showAlert({
              title: 'Error',
              message: res?.payload?.message ?? 'Internal server error!',
            });
          }
        });
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

  return (
    <Container
      useSafeAreaView={true}
      loading={authReducer?.signinLoadingStatus === LoadingStatus.LOADING}>
      <BackHeader />
      <View
        style={{
          paddingHorizontal: '15%',
          alignSelf: 'center',
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <LoginHeader
            title={'Hello there!'}
            description={'Log in to your account'}
            descriptionStyle={{color: '#00958C'}}
          />
          <Spacer height={30} />
          <View>
            <SubmitButton
              lable="Log in via Email"
              onPress={() => {
                NavigationService.navigate(RoutesName.LOGIN_SCREEN);
              }}
            />
            {/* <SubmitButton
              lable="Log in via Singpass"
              onPress={() => {
                // NavigationService.navigate(RoutesName.LOGIN_SCREEN);
              }}
            /> */}
          </View>
          <Seprator />
          <View>
            {Platform.OS === 'ios' ?? (
              <SubmitButton
                type="outlined"
                lable="Log in with Apple ID"
                onPress={_onAppleLogin}
              />
            )}

            <SubmitButton
              type="outlined"
              lable="Log in with Google"
              onPress={_onGoogleLogin}
            />

            <SubmitButton
              type="outlined"
              lable="Log in with Facebook"
              onPress={_onFacebookLogin}
            />
          </View>
        </View>

        <LinkNavigationRow
          title={'Don’t have an account yet?'}
          linkTitle={'Sign Up'}
          onPress={() =>
            NavigationService.navigate(RoutesName.CREATE_ACCOUNT_SCREEN)
          }
        />
        <Spacer height={30} />
      </View>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state?.authReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  onUserLogin: params => dispatch(userSigninAction(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginOptions);
