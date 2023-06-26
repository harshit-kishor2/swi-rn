import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import StoryScreen from '../../components/StoryScreen';
import NavigationBar from '../../components/NavigationBar';
import {IMAGES, SPACING} from '../../resources';
import CustomTextInput from '../../components/CustomtextInput';
import Custombutton from '../../components/Button1';
import {Formik} from 'formik';
import {userSignup} from '../../redux/auth.slice';
import {useDispatch} from 'react-redux';

const SignupScreen = props => {
  const dispatch = useDispatch();
  const [username, Setusername] = useState();
  const [password, Setpassword] = useState();
  const [cnfpassword, Setcnfpassword] = useState();
  const [email, Setemail] = useState();

  const registerData = values => {
    dispatch(userSignup(values));
  };
  return (
    <Formik
      initialValues={{
        email: email,
        username: username,
        password: password,
        // cnfpassword: cnfpassword,
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
          />
          <View style={styles.container}>
            <View style={styles.topBox}>
              <Text style={styles.headline}>Welcome!</Text>
              <Text style={styles.subheadline}>
                Sign up with your email address
              </Text>
            </View>
            <CustomTextInput
              icon={IMAGES.User}
              placeholder={'Enter name'}
              Width={SPACING.SCALE_239}
              onChangeText={e => {
                Setusername(e);
              }}
              value={formik.values.username}
            />
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
              placeholder={'Set password'}
              Width={SPACING.SCALE_239}
              onChangeText={e => {
                Setpassword(e);
              }}
              value={formik.values.password}
            />
            {/* <CustomTextInput
              icon={IMAGES.Lock2}
              placeholder={'Confirm password'}
              Width={SPACING.SCALE_239}
              onChangeText={e => {
                Setcnfpassword(e);
              }}
              value={formik.values.confirmPassword}
            /> */}
            <Custombutton
              title="Create Now"
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
                    props.navigation.navigate('LoginScreen');
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

export default SignupScreen;
