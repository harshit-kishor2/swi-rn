import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import StoryScreen from '../../components/StoryScreen';
import NavigationBar from '../../components/NavigationBar';
import {IMAGES, SPACING} from '../../resources';

import CustomTextInput from '../../components/CustomtextInput';
import Custombutton from '../../components/Button1';
import {useDispatch} from 'react-redux';
import {userLogin} from '../../redux/auth.slice';
import {Formik} from 'formik';
import G_Recaptcha from '../../components/Recaptcha';

const LoginScreen = props => {
  const dispatch = useDispatch();
  const [password, Setpassword] = useState();
  const [email, Setemail] = useState();

  const registerData = values => {
    dispatch(userLogin(values));
  };
  return (
    <Formik
      initialValues={{
        email: email,
        password: password,
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
            <Custombutton
              title="Confirm"
              marginTop={114}
              height={51}
              width={241}
              marginHorizontal={20}
              onPress={formik.handleSubmit}
            />
            <View style={{flexDirection: 'row', margin: 50}}>
              <Text style={{fontSize: 14, color: '#4E4E4E'}}>
                Already have an account?
              </Text>
              <TouchableOpacity style={{marginLeft: 4}}>
                <Text
                  style={{fontSize: 14, color: '#00958C'}}
                  onPress={() => {
                    props.navigation.navigate('SignupScreen');
                  }}>
                  Sign In now
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
    flexDirection: 'column',
    alignItems: 'center',
  },
  headline: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Cabin-Italic',
    marginTop: 10,
    width: 200,
    color: '#000000',
  },
  subheadline: {
    textAlign: 'center',
    fontSize: 18,
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
