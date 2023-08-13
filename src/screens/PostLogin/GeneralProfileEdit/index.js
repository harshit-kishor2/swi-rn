import {
  BackHeader,
  Container,
  CustomInput,
  CustomText,
  Custombutton,
  SubmitButton,
} from '@app/components';
import {COLORS, IMAGES} from '@app/resources';
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Image} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {
  getGeneralProfile,
  updateGeneralProfile,
} from '@app/store/GeneralProfile/GeneralProfile.action';
import {connect} from 'react-redux';
import {showAlert} from '@app/helper/commonFunction';
import ImageContainer from './imageContainer';

// validation Schema

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required.')
    .email('Please enter a valid email.'),
  name: Yup.string()
    .required('Name is required.')
    .max(30, 'Name cannot exceed more than 30 characters.'),
  mobile: Yup.string()
    .required('Phone Number is required.')
    .matches(/^[0-9]{8,14}$/, 'Enter valid phone number.'),
});

const GeneralProfileEdit = props => {
  const {
    navigation,
    route,
    getGeneralProfile,
    updateGeneralProfile,
    generalProfileReducer,
  } = props;
  const item = generalProfileReducer?.getGeneralProfile;

  console.log('GENERAL_PROFILE===>', props);
  console.log('SDVSGEDGSRES ITME', item);
  initialValues = {
    name: item?.name,
    email: item?.email,
    mobile: item?.mobile,
    bio: item?.bio,
    path: item?.image,
    serverError: '',
  };
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
      console.log('Onsubmit Button VALUE IS ', val);
      try {
        Keyboard.dismiss();
        if (!values.path) {
          showAlert({
            title: 'Please upload profile Picture.',
          });
          return;
        } else {
          const formData = new FormData();
          if (values?.image) {
            const d = values.image?.path?.split('/');
            const name = d[d.length - 1];
            formData.append('image', {
              name: name ?? 'Image ' + 'index' + '.jpg',
              type: values.image?.mime,
              uri:
                Platform === 'ios'
                  ? values.image?.path.replace('file://', '')
                  : values.image?.path,
            });
          }
          formData.append('name', values.name);
          formData.append('email', values.email);
          formData.append('mobile', values.mobile);
          formData.append('bio', val.bio);
          updateGeneralProfile(formData).then(res => {
            if (res?.type.includes('fulfilled')) {
              showAlert({
                title: 'Success',
                message: 'Update Successfully',
              });
            }
            if (res?.type.includes('rejected')) {
              showAlert({
                title: 'Error',
                message: res?.payload?.message ?? 'Internal server error!',
              });
            }
          });
        }
      } catch (err) {
        console.log('Erroe', err);
        setErrors({serverError: err.message});
      }
    },
  });

  useEffect(() => {
    getGeneralProfile();
  }, []);

  return (
    <Container useSafeAreaView={true}>
      <BackHeader />
      <KeyboardAvoidingView
        enabled
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        behavior={Platform.OS == 'ios' ? 'padding' : null}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={{margin: 15}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageContainer
                handleChange={setFieldValue}
                value={values.path}
              />
            </View>
            <View style={{}}>
              <Text style={style.text}>Name</Text>
              <CustomInput
                // label="Name"
                placeholder="Enter your Name"
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                error={errors?.name && touched?.name}
                errorText={errors?.name}
              />
              <Text style={style.text}>Email</Text>
              <CustomInput
                style={style.inputText}
                placeholder="immyvan9778@gmail.com"
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={errors?.email && touched?.email}
                errorText={errors?.email}
              />
              <Text style={style.text}>Phone Number </Text>
              <CustomInput
                placeholder="+65 6549796565"
                keyboardType="phone-pad"
                returnKeyType="next"
                onChangeText={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
                value={values.mobile}
                //maxLength={12}
                error={errors?.mobile && touched?.mobile}
                errorText={errors?.mobile}
                style={{
                  backgroundColor: '#fff',
                  paddingHorizontal: 0,
                }}
              />
              {/* <HelperText type="error" visible={errors.phone && touched?.phone}>
                {errors.phone}
              </HelperText> */}
              <CustomInput
                label="About (Max 500 words)"
                placeholder="Enter about"
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={handleChange('bio')}
                onBlur={handleBlur('bio')}
                value={values.bio}
                error={errors?.bio && touched?.bio}
                errorText={errors?.bio}
                multiline={true}
                maxLength={500}
              />
            </View>
            <View style={{marginTop: 10}}>
              <SubmitButton lable="Save Changes" onPress={handleSubmit} />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize: 16,
                  color: '#00958C',
                }}>
                Not now, I’ll do it later
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

const style = StyleSheet.create({
  text: {
    fontSize: 14,
    color: '#7C7C7C',
    fontFamily: 'OpenSans-Regular',
  },
  inputText: {
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
    color: COLORS.BLACK,
  },
});

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
    generalProfileReducer: state.generalProfileReducer,
  };
};
const mapDispatchToProps = dispatch => ({
  getGeneralProfile: params => dispatch(getGeneralProfile()),
  updateGeneralProfile: params => dispatch(updateGeneralProfile(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(GeneralProfileEdit);
