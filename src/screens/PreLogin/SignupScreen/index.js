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
import {userSignupAction} from '@app/store/authSlice';
import {useFormik} from 'formik';
import {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

//Validation Schema for formik
const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required('Required*')
    .max(30, 'Name should exceed 30 character'),
  email: Yup.string()
    .required('Required*')
    .email('Please enter a valid email.'),
  password: Yup.string()
    .trim()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .max(15, ({max}) => `Password must not exceed ${max} characters`)
    .required('Required*')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character.',
    ),
  confirm_password: Yup.string()
    .required('Required*')
    .oneOf([Yup.ref('password')], 'Password does not match'),
});

const SignupScreen = props => {
  const {authReducer, onUserSignup} = props;
  const [isChecked, setIsChecked] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Initial Values for  formik
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
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
    onSubmit: async (val, {setErrors, setSubmitting}) => {
      try {
        Keyboard.dismiss();
        if (isChecked) {
          setButtonDisabled(true);
          let params = {
            name: val?.name,
            email: val?.email,
            password: val?.password,
          };
          onUserSignup(params).then(res => {
            if (res?.type.includes('fulfilled')) {
              resetForm();
              setButtonDisabled(false);
              showAlert({
                title: 'Success',
                message: res?.payload?.message ?? 'Success!',
              });
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
  console.log('BUtton', {buttonDisabled});
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
            paddingHorizontal: '20%',
            paddingBottom: 40,
          }}>
          <Container>
            <LoginHeader
              title={'Welcome!'}
              description={'Sign up with your email address'}
              descriptionStyle={{color: '#00958C'}}
            />
            <Spacer height={40} />
            <CustomInput
              placeholder="Enter name"
              returnKeyType="next"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              error={errors?.name && touched?.name}
              errorText={errors?.name}
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
              placeholder="Set password"
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
            <CustomInput
              placeholder="Confirm password"
              onChangeText={handleChange('confirm_password')}
              onBlur={handleBlur('confirm_password')}
              value={values?.confirm_password}
              error={errors?.confirm_password && touched?.confirm_password}
              errorText={errors?.confirm_password}
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
            <TermsConditionRow
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />
            <SubmitButton
              disabled={buttonDisabled}
              loading={buttonDisabled}
              lable="Confirm"
              onPress={handleSubmit}
            />
            <Spacer height={25} />
          </Container>

          <Spacer height={25} />
          <LinkNavigationRow
            title={'Already have an account?'}
            linkTitle={'Sign In now'}
            onPress={() => {
              resetForm();
              NavigationService.navigate(RoutesName.LOGIN_OPTIONS_SCREEN);
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
  onUserSignup: params => dispatch(userSignupAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);

const styles = StyleSheet.create({});
