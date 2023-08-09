import {
  BackHeader,
  Container,
  CustomIcon,
  CustomInput,
  SubmitButton,
} from '@app/components';
import { ICON_TYPE } from '@app/components/CustomIcon';
import { COLORS, IMAGES } from '@app/resources';
import LoginHeader from '@app/screens/atoms/LoginHeader';
import { changePasswordAction } from '@app/store/authSlice';
import { useFormik } from 'formik';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import * as Yup from 'yup';

export const ChangePassword = (props) => {
  const { updatePassword, authReducer } = props;
  console.log(props)
  const validationSchema = Yup.object({
    current_password: Yup.string()
      .trim()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .max(15, ({ max }) => `Password must not exceed ${max} characters`)
      .required('Required*')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character.',
      ),
    new_password: Yup.string()
      .trim()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .max(15, ({ max }) => `Password must not exceed ${max} characters`)
      .required('Required*')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character.',
      ),
    confirm_password: Yup.string()
      .required('Required*')
      .oneOf([Yup.ref('new_password')], 'Password does not match'),
  });
  const initialValues = {
    current_password: '',
    new_password: '',
    confirm_password: '',
  };

  const {
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    errors,
    values,
    touched,
  } = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: val => {
      console.log('VAlues =========================', val);

      updatePassword({
        current_password: val?.current_password,
        new_password: val?.new_password,
        confirm_password: val?.confirm_password
      })


    },
  });
  // console.log(values);

  return (
    <Container useSafeAreaView={true}>
      <ScrollView style={{ margin: 15 }} showsVerticalScrollIndicator={false}>
        <BackHeader />

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <LoginHeader title={'Change Password'} />
        </View>
        <View
          style={{
            // // alignContent: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            marginHorizontal: 50,
          }}>
          <CustomInput
            placeholder="Enter old Password"
            value={values.current_password}
            onChangeText={handleChange('current_password')}
            error={errors?.current_password && touched?.current_password}
            errorText={errors?.current_password}
            secureTextEntry={true}
            leftIcon={
              <CustomIcon
                origin={ICON_TYPE.FEATHER_ICONS}
                name={'lock'}
                color={COLORS.BLACK}
                style={{
                  marginRight: 10,

                  // width: 240
                }}
              />
            }
          />
          <CustomInput
            placeholder="Enter New Password"
            returnKeyType="next"
            value={values.new_password}
            onChangeText={handleChange('new_password')}
            secureTextEntry={true}
            error={errors?.new_password && touched?.new_password}
            errorText={errors?.new_password}
            leftIcon={
              <CustomIcon
                origin={ICON_TYPE.FEATHER_ICONS}
                name={'lock'}
                color={COLORS.BLACK}
                style={{ marginRight: 10 }}
              />
            }
          />



          <CustomInput
            placeholder="Confirm New Password"
            returnKeyType="next"
            value={values.confirm_password}
            onChangeText={handleChange('confirm_password')}
            error={errors?.confirm_password && touched?.confirm_password}
            errorText={errors?.confirm_password}
            secureTextEntry={true}
            leftIcon={
              <CustomIcon
                origin={ICON_TYPE.FEATHER_ICONS}
                name={'lock'}
                color={COLORS.BLACK}
                style={{ marginRight: 10 }}
              />
            }
          />
          <SubmitButton lable="Change" onPress={handleSubmit} />
          {/* <Pressable style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, height: 50, borderRadius: 20, backgroundColor: 'black' }}
            onPress={handleSubmit}>
            <Text style={{ fontFamily: 'OpenSans-SemiBold', color: 'white' }}>Change Password</Text>
          </Pressable> */}
        </View>
      </ScrollView>
    </Container>
  );
};


const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,

  };
};
const mapDispatchToProps = dispatch => ({
  updatePassword: params => dispatch(changePasswordAction(params)),

});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
