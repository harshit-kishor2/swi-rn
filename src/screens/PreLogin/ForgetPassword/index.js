import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  View
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { forgetPassword } from '../../../redux/auth.slice';
import { COLORS, IMAGES, SPACING } from '../../../resources';
import styles from './styles';
import {
  Custombutton,
  CustomTextInput,
  NavigationBar,
  StoryScreen
} from '../../../components';



const ForgetPassword = props => {
  //used to prevent second tap on the button
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const popAction = StackActions.pop(1);

  const { forgetPasswordLoader, forgetData, forgetPasswordError } = useSelector(
    state => state.AuthReducer,
  );
  // console.log(
  //   forgetPasswordLoader,
  //   forgetData,
  //   forgetPasswordError,
  //   'PPPPPPPPPPPP',
  // );

  let ForgotValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Required *'),
  });

  const registerData = values => {
    console.log('E mail is-', values);
  };
  return (
    // <Formik
    //   initialValues={{
    //     email: '',
    //   }}
    //   enableReinitialize
    //   validationSchema={ForgotValidationSchema}
    //   onSubmit={values => {
    //     registerData(values);
    //   }}>

    <StoryScreen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <NavigationBar
          leftSource={IMAGES.BACKARROW}
          leftAction={() => {
            props.navigation.goBack();
          }}
          flexDirection="row"
        />
        <View style={styles.container}>
          <View style={styles.topBox}>
            <Text style={styles.headline} adjustsFontSizeToFit={true}>
              Forgot Password
            </Text>
            <Text style={styles.subheadline}>
              Enter email address for the link
            </Text>
          </View>
          <View style={styles.TextView}>
            <CustomTextInput
              icon={IMAGES.Email}
              placeholder={'Enter email address'}
              Width={SPACING.SCALE_239}
              onChangeText={value => {
                setEmail(value);
                console.log(email);
                console.log(value);
              }}
              //value={formik.values.email}
              autoCapitalize={'none'}
            />

            <View>
              <Text
                style={{
                  color: COLORS.DANGER,
                  fontFamily: 'OpenSans-Regular',
                }}>
                {/* {formik.errors.email && formik.touched.email
                  ? formik.errors.email
                  : null} */}
              </Text>
            </View>
          </View>
          {forgetPasswordLoader === true ? (
            <ActivityIndicator size={20} />
          ) : (
            <Custombutton
              title="Send link"
              marginTop={14}
              height={51}
              width={241}
              marginHorizontal={20}
              //disabled={buttonDisabled}
              onPress={() => {
                if (email != '') {
                  setButtonDisabled(true);
                  dispatch(
                    forgetPassword({
                      email: email,
                      type: 'user',
                    }),
                  );
                  // console.log(
                  //   forgetPasswordLoader,
                  //   forgetData,
                  //   forgetPasswordError,
                  //   'PPPPPPPPPPPP',
                  // );
                  //navigation.dispatch(popAction);
                } else {
                  Alert.alert('', 'Please enter email.');
                }
              }}
            // onPress={formik.onSubmit}
            />
          )}
        </View>
      </ScrollView>
    </StoryScreen>
  );
};

export default ForgetPassword;
