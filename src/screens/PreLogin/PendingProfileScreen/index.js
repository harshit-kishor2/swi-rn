import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {
  Container,
  CustomIcon,
  CustomInput,
  KeyboardAwareView,
  SubmitButton,
} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {Avatar} from 'react-native-paper';
import ImageContainer from './ImageContainer';

import {connect} from 'react-redux';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {showAlert} from '@app/helper/commonFunction';
import {updateProfileAction} from '@app/store/authSlice';

//Validation Schema for formik
const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required.')
    .email('Please enter a valid email.'),
  name: Yup.string().required('Name is required.'),
  phone: Yup.string().required('Mobile is required.'),
});

const PendingProfileScreen = props => {
  const {authReducer, onUpdateProfile} = props;
  console.log('AuthReducer===', authReducer);

  // Initial Values for  formik
  const initialValues = {
    email: authReducer?.userProfileDetails?.email ?? '',
    name: authReducer?.userProfileDetails?.name ?? '',
    phone: authReducer?.userProfileDetails?.mobile ?? '',
    about: authReducer?.userProfileDetails?.bio ?? '',
    image: '',
    path: authReducer?.userProfileDetails?.image ?? '',
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
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (val, {setErrors}) => {
      try {
        Keyboard.dismiss();
        const formData = new FormData();
        if (values?.image) {
          const d = values.image?.path?.split('/');
          const name = d[d.length - 1];
          formData.append(`image`, {
            name: name ?? 'Image' + index + '.jpg',
            type: values.image?.mime,
            uri:
              Platform.OS === 'ios'
                ? values.image?.path.replace('file://', '')
                : values.image?.path,
          });
        }
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('mobile', values.phone);
        formData.append('about', values.about);
        console.log('Test====', formData);
        // const params = {
        //   name: values.name,
        //   email: values.email,
        //   mobile: values.phone,
        // };
        onUpdateProfile(formData).then(res => {
          if (res?.type.includes('fulfilled')) {
            resetForm();
          }
          if (res?.type.includes('rejected')) {
            showAlert({
              title: 'Error',
              message: res?.payload?.message ?? 'Internal server error!',
            });
          }
        });
      } catch (err) {
        console.log('Error', err);
        setErrors({serverError: err.message});
      }
    },
  });
  return (
    <Container useSafeAreaView={true}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 50,
          paddingHorizontal: 25,
        }}>
        <ImageContainer handleChange={setFieldValue} value={values.path} />
        <View
          style={{
            paddingTop: 50,
          }}>
          <CustomInput
            label="Name"
            placeholder="Enter name"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            error={errors?.name && touched?.name}
            errorText={errors?.name}
          />
          <CustomInput
            label="Email"
            placeholder="Enter email address"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            error={errors?.email && touched?.email}
            errorText={errors?.email}
          />
          <CustomInput
            label="Phone Number"
            placeholder="Enter phone number"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            value={values.phone}
            error={errors?.phone && touched?.phone}
            errorText={errors?.phone}
          />
          <CustomInput
            label="About (Max 500 words)"
            placeholder="Enter about"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={handleChange('about')}
            onBlur={handleBlur('about')}
            value={values.about}
            error={errors?.about && touched?.about}
            errorText={errors?.about}
            multiline={true}
            maxLength={500}
          />
          <SubmitButton
            // loading={}
            // disabled={}
            lable="Save Changes"
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
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
  onUpdateProfile: params => dispatch(updateProfileAction(params)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PendingProfileScreen);

const styles = StyleSheet.create({});
