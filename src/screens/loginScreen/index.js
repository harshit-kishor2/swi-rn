import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import StoryScreen from '../../components/StoryScreen';
import NavigationBar from '../../components/NavigationBar';
import {COLORS, IMAGES, SPACING} from '../../resources';

import CustomTextInput from '../../components/CustomtextInput';
import Custombutton from '../../components/Button1';
import {useDispatch, useSelector} from 'react-redux';
import {userLogin} from '../../redux/auth.slice';
import {Formik} from 'formik';
import G_Recaptcha from '../../components/Recaptcha';
import {getFCMToken} from '../../services/firebaseServices';
import LocationInput from '../../LocationInput';

const LoginScreen = props => {
  const dispatch = useDispatch();
  const [password, Setpassword] = useState();
  const [email, Setemail] = useState();
  const [fcmToken, setFcmToken] = useState();

  useEffect(() => {
    getFCMToken().then(token => {
      setFcmToken(token);
    });
  }, []);

  const loginloader = useSelector(state => state.AuthReducer.loginloader);
  console.log(loginloader);

  const registerData = values => {
    console.log('userLogin All values', values);
    dispatch(userLogin(values));
  };
  return (
    <Formik
      initialValues={{
        email: email,
        password: password,
        device_type: Platform.OS,
        device_token: fcmToken,
        login_type: '',
        name: '',
      }}
      enableReinitialize
      // validationSchema={loginValidationSchema}
      onSubmit={values => {
        registerData(values);
      }}>
      {formik => (
        <StoryScreen>
          <NavigationBar
            leftSource={IMAGES.BACKARROW}
            leftAction={() => {
              props.navigation.goBack();
            }}
            flexDirection="row"
          />
          <View style={styles.container}>
            <View style={styles.topBox}>
              <Text style={styles.headline}>Welcome!</Text>
              <Text style={styles.subheadline}>Sign in to your account</Text>
            </View>
            <View style={{marginTop: '10%'}}>
              <CustomTextInput
                icon={IMAGES.Email}
                placeholder={'Enter email address'}
                Width={SPACING.SCALE_239}
                onChangeText={e => {
                  Setemail(e);
                }}
                value={formik.values.email}
                autoCapitalize={false}
              />
              <View style={{height: 20}} />
              <CustomTextInput
                secureTextEntry={true}
                icon={IMAGES.Lock1}
                placeholder={'Enter password'}
                Width={SPACING.SCALE_239}
                onChangeText={e => {
                  Setpassword(e);
                }}
                value={formik.values.password}
              />
            </View>
            <LocationInput />
            <View
              style={{alignSelf: 'flex-end', marginRight: 50, marginTop: 10}}>
              <TouchableOpacity>
                <Text
                  style={{
                    fontFamily: 'OpenSans-Regular',
                    color: COLORS.HYPERLINK,
                  }}
                  onPress={() => {
                    props.navigation.navigate('ForgetPassword');
                  }}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* <G_Recaptcha /> */}
            <View
              style={{flexDirection: 'row', margin: 50, alignSelf: 'center'}}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#4E4E4E',
                  fontFamily: 'OpenSans-Regular',
                }}>
                I agree to the
              </Text>
              <TouchableOpacity style={{marginLeft: 4}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#00958C',
                    fontFamily: 'OpenSans-SemiBold',
                  }}
                  onPress={() => {
                    props.navigation.navigate('SignupScreen');
                  }}>
                  Terms and conditions
                </Text>
              </TouchableOpacity>
            </View>

            <Custombutton
              title="Sign in"
              marginTop={80}
              height={51}
              width={241}
              marginHorizontal={SPACING.SCALE_50}
              onPress={formik.handleSubmit}
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 30,
                alignSelf: 'center',
              }}>
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
                    props.navigation.navigate('SignupScreen');
                  }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </StoryScreen>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    textAlign: 'center',
    fontFamily: 'Open Sans',
    // fontWeight: 'bold',
    fontSize: 40,
    marginTop: 10,
    width: 300,
    color: '#000000',
  },
  subheadline: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Open Sans',
    width: 300,
    marginTop: 20,
    color: '#00958C',
  },
  topBox: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default LoginScreen;
