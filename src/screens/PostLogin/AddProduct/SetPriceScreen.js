import { useNavigation } from '@react-navigation/core';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import * as yup from 'yup';
import Custombutton from '../../../components/Button1';
import { pID, updateThirdProductDetail } from '../../../redux/addProduct.slice';
import { COLORS, SPACING } from '../../../resources';

const SetPriceScreen = ({ title, product_ID }) => {
  const [price, setPrice] = useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();


  let loginValidationSchema = yup.object().shape({
    price: yup.number().positive().required('Price is required'),
  });
  const postForm = value => {
    console.log('final form data', value);
    dispatch(updateThirdProductDetail(value));
    console.log('navigation', navigation);
    navigation.navigate('PostedSuccessfully');
  };
  return (
    <Formik
      initialValues={{
        price: price,
        productID: product_ID,
      }}
      enableReinitialize
      validationSchema={loginValidationSchema}
      onSubmit={values => {
        postForm(values);
      }}>
      {formik => (
        <View style={{ marginTop: SPACING.SCALE_30 }}>
          <View
            style={{ color: COLORS.PageBackground, backgroundColor: '#F0F2FA' }}>
            <View style={{}}>
              <Text
                style={{
                  color: COLORS.HYPERLINK,
                  alignSelf: 'center',
                  marginTop: 30,
                  fontFamily: 'OpenSans-Regular',
                  fontSize: 16,
                }}>
                SetPrice
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
                {title}
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
                style={{ fontFamily: 'OpenSans-Regular', width: '100%' }}
                fontSize={40}
                autoFocus={true}
                onChangeText={e => {
                  setPrice(e);
                  console.log(price);
                }}
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
                Get your watch listed on top
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
              onPress={formik.handleSubmit}
            />
          </View>
        </View>
      )}
    </Formik>
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
