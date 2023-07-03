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
import {IMAGES, SPACING} from '../../resources';

import CustomTextInput from '../../components/CustomtextInput';
import Custombutton from '../../components/Button1';
import {useDispatch, useSelector} from 'react-redux';
import {userLogin} from '../../redux/auth.slice';
import {Formik} from 'formik';
import G_Recaptcha from '../../components/Recaptcha';
import {getFCMToken} from '../../services/firebaseServices';

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
        name: 'radhesh',
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
            <CustomTextInput
              icon={IMAGES.Email}
              placeholder={'Enter email address'}
              Width={SPACING.SCALE_239}
              onChangeText={e => {
                Setemail(e);
              }}
              value={formik.values.email}
            />
            <CustomTextInput
              icon={IMAGES.Lock1}
              placeholder={'Enter password'}
              Width={SPACING.SCALE_239}
              onChangeText={e => {
                Setpassword(e);
              }}
              value={formik.values.password}
            />
            <G_Recaptcha />
            <View style={{flexDirection: 'row', margin: 50}}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#4E4E4E',
                  fontFamily: 'Open Sans',
                }}>
                I agree to the
              </Text>
              <TouchableOpacity style={{marginLeft: 4}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#00958C',
                    fontFamily: 'Open Sans',
                  }}
                  onPress={() => {
                    props.navigation.navigate('SignupScreen');
                  }}>
                  Terms and conditions
                </Text>
              </TouchableOpacity>
            </View>

            <Custombutton
              title="Confirm"
              marginTop={80}
              height={51}
              width={241}
              marginHorizontal={SPACING.SCALE_50}
              onPress={formik.handleSubmit}
            />
            <View style={{flexDirection: 'row', margin: 50}}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#4E4E4E',
                  fontFamily: 'Open Sans',
                }}>
                Don’t have an account yet?
              </Text>
              <TouchableOpacity style={{marginLeft: 4}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#00958C',
                    fontFamily: 'Open Sans',
                  }}
                  onPress={() => {
                    props.navigation.navigate('SignupScreen');
                  }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{marginLeft: 4}}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#00958C',
                  fontFamily: 'Open Sans',
                }}
                onPress={() => {
                  props.navigation.navigate('postedSuccessfullyScreen');
                }}>
                PostedSuccessfully Screen
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 4}}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#00958C',
                  fontFamily: 'Open Sans',
                }}
                onPress={() => {
                  props.navigation.navigate('TermAndConditions');
                }}>
                TermAndConditions
              </Text>
            </TouchableOpacity>
            
          </View>
        </StoryScreen>
      )}
    </Formik>
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
    marginTop: 7,
    color: '#00958C',
  },
  topBox: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default LoginScreen;
