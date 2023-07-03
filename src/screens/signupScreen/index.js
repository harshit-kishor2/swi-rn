import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import StoryScreen from '../../components/StoryScreen';
import NavigationBar from '../../components/NavigationBar';
import {COLORS, IMAGES, SPACING} from '../../resources';
import CustomTextInput from '../../components/CustomtextInput';
import Custombutton from '../../components/Button1';
import {Formik} from 'formik';
import {userSignup} from '../../redux/auth.slice';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';

const SignupScreen = props => {
  const dispatch = useDispatch();
  // const [username, Setusername] = useState();
  // const [password, Setpassword] = useState();
  // const [cnfpassword, Setcnfpassword] = useState();
  // const [email, Setemail] = useState();

  let loginValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Required *')
      .matches(
        // /^[aA-zZ][aA-zZ\d]+$/,
        /^[a-zA-Z0-9_][aA-zZ)-9\s]*$/,
        'Only alphanumeric characters are allowed with first character can only be an alphabet',
      )
      .test('len', 'Name should not be more than 20 characters', val =>
        val ? val.toString().length <= 20 : false,
      ),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Required *'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .max(15, ({max}) => `Password must not exceed ${max} characters`)
      .required('Required *')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character.',
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Password  and confirm does not match')
      .required('Required *'),
  });

  const registerData = values => {
    dispatch(userSignup(values));
  };
  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
      }}
      enableReinitialize
      validationSchema={loginValidationSchema}
      onSubmit={values => {
        registerData(values);
      }}>
      {formik => (
        <StoryScreen>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
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
                <Text style={styles.subheadline}>
                  Sign up with your email address
                </Text>
              </View>
          <View style={{alignSelf:'center', marginTop:40}}>
          <CustomTextInput
                icon={IMAGES.User}
                placeholder={'Enter name'}
                Width={SPACING.SCALE_239}
                onChangeText={formik.handleChange('name')}
                value={formik.values.name}
              />
              <View>
                <Text
                  style={{
                    marginLeft: SPACING.SCALE__110,
                    color: COLORS.DANGER,
                  }}>
                  {formik.errors.name && formik.touched.name
                    ? formik.errors.name
                    : null}
                </Text>
              </View>
              <CustomTextInput
                icon={IMAGES.Email}
                placeholder={'Enter email address'}
                Width={SPACING.SCALE_239}
                onChangeText={formik.handleChange('email')}
                value={formik.values.email}
              />
              <View>
                <Text
                  style={{
                    marginLeft: SPACING.SCALE__110,
                    color: COLORS.DANGER,
                  }}>
                  {formik.errors.email && formik.touched.email
                    ? formik.errors.email
                    : null}
                </Text>
              </View>
              <CustomTextInput
                icon={IMAGES.Lock1}
                placeholder={'Set password'}
                Width={SPACING.SCALE_239}
                onChangeText={formik.handleChange('password')}
                value={formik.values.password}
                errors={
                  formik.errors.password && formik.touched.password
                    ? formik.errors.password
                    : null
                }
              />
              <View>
                <Text
                  style={{
                    marginLeft: SPACING.SCALE__110,
                    color: COLORS.DANGER,
                  }}>
                  {formik.errors.password && formik.touched.password
                    ? formik.errors.password
                    : null}
                </Text>
              </View>
              <CustomTextInput
                icon={IMAGES.Lock2}
                placeholder={'Confirm password'}
                Width={SPACING.SCALE_239}
                onChangeText={formik.handleChange('confirmPassword')}
                value={formik.values.confirmPassword}
              />
              <View>
                <Text
                  style={{
                    marginLeft: SPACING.SCALE__110,
                    color: COLORS.DANGER,
                  }}>
                  {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword
                    ? formik.errors.confirmPassword
                    : null}
                </Text>
              </View>
          </View>
              <Custombutton
                title="Create Now"
                marginTop={114}
                height={51}
                width={241}
                marginHorizontal={20}
                onPress={formik.handleSubmit}
              />
              <View style={{flexDirection: 'row', margin: 50}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#4E4E4E',
                    fontFamily: 'Open Sans',
                  }}>
                  Already have an account?
                </Text>
                <TouchableOpacity style={{marginLeft: 4}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#00958C',
                      fontFamily: 'Open Sans',
                    }}
                    onPress={() => {
                      props.navigation.navigate('LoginScreen');
                    }}>
                    Sign In now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
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
    // fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'Open Sans',
    marginTop: 10,
    width: 240,
    color: '#000000',
  },
  subheadline: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Open Sans',
    width: 600,
    marginTop: 20,
    color: '#00958C',
  },
  topBox: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default SignupScreen;
