import {
  BackHeader,
  Container,
  CustomInput,
  CustomText,
  Custombutton,
  SubmitButton,
} from '@app/components';
import {COLORS, IMAGES} from '@app/resources';
import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Image} from 'react-native';
import ImageContainer from './imageContainer';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {HelperText} from 'react-native-paper';

// validation Schema

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required.')
    .email('Please enter a valid email.'),
  name: Yup.string()
    .required('Name is required.')
    .max(30, 'Name cannot exceed more than 30 characters.'),
  phone: Yup.string()
    .required('Phone Number is required.')
    .matches(/^[0-9]{8,14}$/, 'Enter valid phone number.'),
});

const GeneralProfileEdit = props => {
  initialValues = {
    name: '',
    email: '',
    mobile: '',
    bio: '',
    path: '',
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
      // try{
      //   Keyboard.dismiss();
      //   const formData = new FormData();
      //   if(values)

      // }
    },
  });
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
              <Image source={IMAGES.Ellipse7} />
              {/* <ImageContainer value={rIMAGES.Ellipse7}></ImageContainer> */}
            </View>
            <View style={{}}>
              <Text style={style.text}>Name</Text>
              <CustomInput
                // label="Name"
                placeholder="Enter your Name"
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={value => setFieldValue('name', value)}
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
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                //maxLength={12}
                error={errors?.phone && touched?.phone}
                errorText={errors?.phone}
                style={{
                  backgroundColor: '#fff',
                  paddingHorizontal: 0,
                }}
              />
              {/* <HelperText type="error" visible={errors.phone && touched?.phone}>
                {errors.phone}
              </HelperText> */}

              <Text style={style.text}>About</Text>
              <CustomInput
                label="About (Max 500 words)"
                placeholder="Enter about"
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={handleChange('bio')}
                onBlur={handleBlur('bio')}
                value={values.bio}
                error={errors?.bio && touched?.bio}
                errorText={errors?.about}
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

export default GeneralProfileEdit;
