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
  import {userSignup} from '../../redux/auth.slice';
  import {useDispatch} from 'react-redux';
  import * as yup from 'yup';
import ForgetPasswordScreen from '../forgetPasswordScreen';
  
  const ForgetPassword = props => {
    const dispatch = useDispatch();
    // const [username, Setusername] = useState();
    // const [password, Setpassword] = useState();
    // const [cnfpassword, Setcnfpassword] = useState();
    // const [email, Setemail] = useState();
  
    let ForgotValidationSchema = yup.object().shape({
     
      email: yup
        .string()
        .email('Please enter valid email')
        .required('Required *'),
      });
  
    const registerData = values => {
      console.log("E mail is-",values);
    };
    return (
      <Formik
        initialValues={{
          email: '',
          
        }}
        enableReinitialize
        validationSchema={ForgotValidationSchema}
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
                  <Text style={styles.headline} adjustsFontSizeToFit={true}>Forgot Password</Text>
                  <Text style={styles.subheadline}>
                  Enter email address for the link
                  </Text>
                </View>
            <View style={styles.TextView}>
          
                <CustomTextInput
                  icon={IMAGES.Email}
                  placeholder={'Enter email address'}
                  Width={SPACING.SCALE_239}
                  onChangeText={formik.handleChange('email')}
                  value={formik.values.email}
                  autoCapitalize={'none'}
                  
                />
               
                <View>
                  <Text
                    style={{
                      color: COLORS.DANGER,
                      fontFamily:'OpenSans-Regular'
                    }}>
                    {formik.errors.email && formik.touched.email
                      ? formik.errors.email
                      : null}
                  </Text>
                </View>
            
               
                
            </View>
                <Custombutton
                  title="Send link"
                  marginTop={114}
                  height={51}
                  width={241}
                  marginHorizontal={20}
                  onPress={formik.handleSubmit}
                />
                
              </View>
            </ScrollView>
          </StoryScreen>
        )}
      </Formik>
    );
  };
  
  
  
  export default ForgetPassword;
  