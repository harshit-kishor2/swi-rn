import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CustomText, SubmitButton, CustomInput, Spacer} from '@app/components';
import {FontsConst} from '@app/assets/assets';
import {TextInput} from 'react-native-paper';
import {showAlert} from '@app/helper/commonFunction';
import NavigationService from '@app/navigations/NavigationService';
import {LoadingStatus, RoutesName} from '@app/helper/strings';

const AddProductPrice = ({onNextClick, ...props}) => {
  const {
    productReducer,
    updateProductPrice,
    productState,
    onAddProductPrice,
    resetProductState,
  } = props;
  console.log(productState?.productDetails, 'productState');

  const onButtonSubmit = () => {
    if (!productState?.productPrice) {
      showAlert({title: 'Please enter price.'});
      return;
    } else if (productState?.productPrice <= 0) {
      showAlert({title: 'Amount should be greater that 0. '});
      return;
    } else {
      const numericValue = productState?.productPrice.replace(/[^0-9.]/g, '');
      const props = {
        price: numericValue,
        productID: productState?.productDetails?.productID,
      };
      onAddProductPrice(props).then(res => {
        if (res?.type.includes('fulfilled')) {
          onNextClick();
          NavigationService.navigate(RoutesName.SUCCESS_SCREEN, {
            productID: productState?.productDetails?.productID,
          });
          resetProductState();
        } else if (res?.type.includes('rejected')) {
          showAlert({
            title: 'Server error !',
          });
        }
      });
    }
  };
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 30,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: '#F0F2FA',
      }}>
      <View>
        <CustomText
          style={{
            color: '#00958C',
            fontFamily: FontsConst.OpenSans_SemiBold,
            alignSelf: 'center',
            paddingBottom: 10,
          }}>
          Set Price
        </CustomText>
        <CustomText
          style={{
            fontFamily: FontsConst.OpenSans_SemiBold,
            alignSelf: 'center',
            paddingBottom: 10,
          }}>
          {productState?.productDetails?.gender_type}{' '}
          {productState?.productDetails?.title} Watch
        </CustomText>
        <CustomText
          style={{
            color: '#00958C',
            fontFamily: FontsConst.OpenSans_SemiBold,
            alignSelf: 'center',
            paddingBottom: 10,
          }}>
          SGD
        </CustomText>
        <TextInput
          keyboardType="numeric"
          mode="flat"
          style={{
            backgroundColor: '#F0F2FA',
            alignSelf: 'center',
            minWidth: 150,
            paddingBottom: 10,
          }}
          contentStyle={{
            alignSelf: 'center',
            fontSize: 40,
            color: '#00958C',
          }}
          value={productState?.productPrice}
          onChangeText={v => {
            const numericValue = v.replace(/[^0-9.]/g, '');

            // Format the numeric value with commas every three digits
            const formattedNumber = numericValue.replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ',',
            );

            // console.log(price,"Price Value ====================>>>>>>>>>>>>>>")
            if (v.length <= 12) {
              updateProductPrice(formattedNumber);
            }
          }}
        />
      </View>
      <Spacer height={40} />
      {/* <CustomText
        style={{
          alignSelf: 'center',
          paddingVertical: 20,
          fontFamily: FontsConst.OpenSans_Regular,
          color: '#4E4E4E',
        }}>
        Get your watch listed on top{' '}
        <CustomText style={{color: '#00958C'}}>Boost Now</CustomText>
      </CustomText> */}
      <SubmitButton
        onPress={onButtonSubmit}
        lable="Post Now"
        disabled={
          productReducer?.addProductPriceLoadingStatus === LoadingStatus.LOADING
        }
        loading={
          productReducer?.addProductPriceLoadingStatus === LoadingStatus.LOADING
        }
      />
      <Spacer />
    </ScrollView>
  );
};

export default AddProductPrice;

const styles = StyleSheet.create({});
