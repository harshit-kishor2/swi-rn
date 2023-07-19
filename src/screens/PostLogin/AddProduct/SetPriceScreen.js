/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/core';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import * as yup from 'yup';
import {Custombutton} from '@app/components';
import {pID, updateThirdProductDetail} from '@app/store/addProduct.slice';
import {COLORS, SPACING} from '@app/resources';
import {RoutesName} from '@app/helper/strings';
import NavigationService from '../../../navigations/NavigationService';

const SetPriceScreen = ({DataFromParent, setFormNumber}) => {
  const [price, setPrice] = useState();
  const [formattedValue, setFormattedValue] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // console.log(DataFromParent, 'data from parent ======>>>>>>>>>>>>>>>>>');

  let loginValidationSchema = yup.object().shape({
    price: yup.number().positive().required('Price is required'),
  });
  const postForm = value => {
    console.log('final form data', value);
    dispatch(updateThirdProductDetail(value));
    console.log('navigation===================>>>>>>>>>>>>>>>>>>>>>>>', value);
    NavigationService.navigate(RoutesName.SUCCESS_SCREEN);
  };
  
  const handleChangeText = (text) => {
    // Remove any non-digit characters from the input
    const numericValue = text.replace(/[^0-9]/g, '');
    setPrice(numericValue);

    // Format the numeric value with commas every three digits
    const formattedNumber = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
 
    // console.log(price,"Price Value ====================>>>>>>>>>>>>>>")
    setFormattedValue(formattedNumber);
    // console.log(formattedValue,"formatted Value ====================>>>>>>>>>>>>>>")
  };
  return (
    <Pressable
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <Formik
        initialValues={{
          price: price,
          productID: DataFromParent.productID,
        }}
        enableReinitialize
        validationSchema={loginValidationSchema}
        onSubmit={values => {
          postForm(values);
          console.log("Value from post data ==================>>>>>",values);
        }}>
        {formik => (
          <View
            style={{
              marginTop: SPACING.SCALE_30,
              height: '100%',
              color: COLORS.PageBackground,
            }}>
            <View
              style={{
                color: COLORS.PageBackground,
                backgroundColor: '#F0F2FA',
              }}>
              <View style={{}}>
                <Text
                  style={{
                    color: COLORS.HYPERLINK,
                    alignSelf: 'center',
                    marginTop: 30,
                    fontFamily: 'OpenSans-Regular',
                    fontSize: 16,
                  }}>
                  Set Price
                </Text>
                <Text
                  style={{
                    color: COLORS.BLACK,
                    marginLeft: 5,
                    fontFamily: 'OpenSans-SemiBold',
                    fontSize: 14,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  {DataFromParent.title}
                </Text>
                <Text
                  style={{
                    color: COLORS.HYPERLINK,
                    marginLeft: 5,
                    fontFamily: 'OpenSans-Regular',
                    fontSize: 16,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: 20,
                  }}>
                  SDG{' '}
                </Text>
              </View>
              <View
                style={[
                  styles.container,
                  {
                    width: '55%',
                    height: 80,
                  },
                ]}>
                <TextInput
                  keyboardType="number-pad"
                  maxLength={10}
                  textAlign="center"
                  style={{fontFamily: 'OpenSans-Regular', width: '100%'}}
                  fontSize={40}
                  autoFocus={true}
                  value={formattedValue}
                  onChangeText={handleChangeText}
                />
                <View>
                  <Text
                    style={{
                      color: COLORS.RED,
                    }}>
                    {formik.errors.price && formik.touched.price
                      ? formik.errors.price
                      : null}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                  marginBottom: 50,
                }}>
                <Text
                  style={{
                    fontFamily: 'OpenSans-Regular',
                    color: COLORS.BLACK,
                    fontSize: 14,
                  }}>
                  Get your watch listed on top {''}
                </Text>
                <Text
                  style={{
                    fontFamily: 'OpenSans-Regular',
                    color: COLORS.HYPERLINK,
                    fontSize: 14,
                    textDecorationLine: 'underline',
                  }}>
                  Boost Now
                </Text>
              </View>
              <Custombutton
                title={'Post now'}
                width={'80%'}
                fontSize={20}
                onPress={() => {
                  setFormNumber('1');
                  formik.handleSubmit();
                }}
              />
            </View>
          </View>
        )}
      </Formik>
    </Pressable>
  );
};
const mapStateToProps = state => ({
  product_ID: pID(state),
});
export default connect(mapStateToProps)(SetPriceScreen);

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    alignSelf: 'center',
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderColor: COLORS.HYPERLINK,
  },
});
