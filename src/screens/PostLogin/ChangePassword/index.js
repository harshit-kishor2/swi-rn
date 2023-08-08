import {
  BackHeader,
  Container,
  CustomIcon,
  CustomInput,
  SubmitButton,
} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {COLORS, IMAGES} from '@app/resources';
import LoginHeader from '@app/screens/atoms/LoginHeader';
import {useFormik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import * as Yup from 'yup';

export const ChangePassword = () => {
  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .trim()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .max(15, ({max}) => `Password must not exceed ${max} characters`)
      .required('Required*')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character.',
      ),
    newPassword: Yup.string()
      .trim()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .max(15, ({max}) => `Password must not exceed ${max} characters`)
      .required('Required*')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character.',
      ),
    confirmPassword: Yup.string()
      .required('Required*')
      .oneOf([Yup.ref('password')], 'Password does not match'),
  });
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
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
    onSubmit: async val => {
      console.log('VAlues ', val);
    },
  });
  console.log(values);

  return (
    <Container useSafeAreaView={true}>
      <View style={{margin: 15}}>
        <BackHeader />

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
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
            value={values.oldPassword}
            onchangeText={value => setFieldValue('oldPassword', value)}
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
            value={values.newPassword}
            onchangeText={value => setFieldValue('newPassword', value)}
            secureTextEntry={true}
            leftIcon={
              <CustomIcon
                origin={ICON_TYPE.FEATHER_ICONS}
                name={'lock'}
                color={COLORS.BLACK}
                style={{marginRight: 10}}
              />
            }
          />
          <CustomInput
            placeholder="Confirm New Password"
            returnKeyType="next"
            value={values.confirmPassword}
            onchangeText={value => setFieldValue('confirmPassword', value)}
            secureTextEntry={true}
            leftIcon={
              <CustomIcon
                origin={ICON_TYPE.FEATHER_ICONS}
                name={'lock'}
                color={COLORS.BLACK}
                style={{marginRight: 10}}
              />
            }
          />
          <SubmitButton lable="Change Password" onPress={handleSubmit} />
        </View>
      </View>
    </Container>
  );
};
