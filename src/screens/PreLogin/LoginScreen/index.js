/* eslint-disable react/react-in-jsx-scope */
import {
  BackHeader,
  Container,
  CustomIcon,
  CustomInput,
  Spacer,
  SubmitButton,
} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {showAlert} from '@app/helper/commonFunction';
import {RoutesName} from '@app/helper/strings';
import NavigationService from '@app/navigations/NavigationService';
import LinkNavigationRow from '@app/screens/atoms/LinkNavigationRow';
import LoginHeader from '@app/screens/atoms/LoginHeader';
import TermsConditionRow from '@app/screens/atoms/TermsConditionRow';
import {userSigninAction} from '@app/store/authSlice';
import {useFormik} from 'formik';
import {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import SharedPreference from '../../../helper/SharedPreference';

//Validation Schema for formik
const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required.')
    .email('Please enter a valid email.'),
  password: Yup.string().required('Password is required.'),
});

const LoginScreen = props => {
  const {authReducer, onUserLogin} = props;

  const [isChecked, setIsChecked] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Initial Values for  formik
  const initialValues = {
    email: '',
    password: '',
    serverError: '',
  };

  // destructure formik values from formik hook
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    resetForm,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (val, {setErrors}) => {
      try {
        Keyboard.dismiss();
        if (isChecked) {
          setButtonDisabled(true);
          const deviceToken = await SharedPreference.getItem(
            SharedPreference.keys.DEVICE_TOKEN,
            '',
          );
          console.log('Login device token==', deviceToken);
          let params = {
            // name: val?.name,
            email: val?.email,
            password: val?.password,
            // login_type: '',
            device_token: deviceToken ?? '',
            device_type: Platform.OS,
          };
          onUserLogin(params).then(res => {
            if (res?.type.includes('fulfilled')) {
              resetForm();
              setButtonDisabled(false);
              if (res.payload?.data?.isProfileCompleted === 'no') {
                NavigationService.navigate(RoutesName.PENDING_PROFILE_SCREEN);
              }
            }
            if (res?.type.includes('rejected')) {
              setButtonDisabled(false);
              showAlert({
                title: 'Error',
                message: res?.payload?.message ?? 'Internal server error!',
              });
            }
          });
        } else {
          showAlert({
            title: 'Please accept terms & conditions',
          });
        }
      } catch (err) {
        setErrors({serverError: err.message});
        setButtonDisabled(false);
      }
    },
  });

  return (
    <Container useSafeAreaView={true}>
      <BackHeader />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={Platform.OS === 'ios' && {flex: 1}}
        keyboardVerticalOffset={30}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 150,
            paddingHorizontal: '20%',
          }}>
          <Container>
            <LoginHeader
              title={'Welcome!'}
              description={'Log in to your account'}
              descriptionStyle={{color: '#00958C'}}
            />
            <Spacer height={40} />
            <CustomInput
              placeholder="Enter email address"
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={errors?.email && touched?.email}
              errorText={errors?.email}
              leftIcon={
                <CustomIcon
                  origin={ICON_TYPE.FEATHER_ICONS}
                  name="user"
                  color={'black'}
                  size={20}
                />
              }
            />
            <CustomInput
              placeholder="Enter password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values?.password}
              error={errors?.password && touched?.password}
              errorText={errors?.password}
              secureTextEntry={true}
              leftIcon={
                <CustomIcon
                  origin={ICON_TYPE.FEATHER_ICONS}
                  name="lock"
                  color={'black'}
                  size={20}
                />
              }
            />
            <View style={{alignSelf: 'flex-end'}}>
              <LinkNavigationRow
                title={''}
                linkTitle={'Forgot password?'}
                onPress={() => {
                  resetForm();
                  NavigationService.navigate(RoutesName.FORGOT_PASSWORD_SCREEN);
                  resetForm();
                }}
              />
            </View>
            <Spacer height={40} />
            <TermsConditionRow
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              onPress={() => {
                resetForm();
                NavigationService.navigate(
                  RoutesName.TERM_AND_CONDITION_SCREEN,
                );
              }}
            />
            <Spacer height={50} />
            <SubmitButton
              lable="Confirm"
              onPress={handleSubmit}
              disabled={buttonDisabled}
              loading={buttonDisabled}
            />
            <Spacer height={25} />
          </Container>
          <LinkNavigationRow
            title={'Don’t have an account yet?'}
            linkTitle={'Sign Up'}
            onPress={() => {
              NavigationService.navigate(RoutesName.CREATE_ACCOUNT_SCREEN);
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({});
