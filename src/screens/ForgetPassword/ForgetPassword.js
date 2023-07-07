import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import styles from './styles';
import React, {useState} from 'react';
import StoryScreen from '../../components/StoryScreen';
import NavigationBar from '../../components/NavigationBar';
import {COLORS, IMAGES, SPACING} from '../../resources';
import CustomTextInput from '../../components/CustomtextInput';
import Custombutton from '../../components/Button1';
import {Formik} from 'formik';
import {forgetPassword, userSignup} from '../../redux/auth.slice';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import ForgetPasswordScreen from '../forgetPasswordScreen';
import {useNavigation} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import {fire} from 'react-native-alertbox';

const ForgetPassword = props => {
  //used to prevent second tap on the button
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const popAction = StackActions.pop(1);

  const {forgetPasswordLoader, forgetData, forgetPasswordError} = useSelector(
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
          <Custombutton
            title="Send link"
            marginTop={114}
            height={51}
            width={241}
            marginHorizontal={20}
            disabled={buttonDisabled}
            onPress={() => {
              if (email != '') {
                setButtonDisabled(true);
                dispatch(
                  forgetPassword({
                    email: email,
                  }),
                ).then(() => {
                  if (forgetData?.status === 200) {
                    fire({
                      message: forgetData?.message,
                      actions: [
                        {
                          text: 'Ok',
                          style: 'cancel',
                        },
                      ],
                    });
                    navigation.dispatch(popAction);
                  }
                });
                console.log(
                  forgetPasswordLoader,
                  forgetData,
                  forgetPasswordError,
                  'PPPPPPPPPPPP',
                );
                //navigation.dispatch(popAction);
              } else {
                Alert.alert('', 'Please enter email.');
              }
            }}
            // onPress={formik.onSubmit}
          />
        </View>
      </ScrollView>
    </StoryScreen>
  );
};

export default ForgetPassword;
