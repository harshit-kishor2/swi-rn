import {FontsConst} from '@app/assets/assets';
import {CustomText, Spacer, SubmitButton} from '@app/components';
import {showAlert} from '@app/helper/commonFunction';
import {LoadingStatus} from '@app/helper/strings';
import NavigationService from '@app/navigations/NavigationService';
import {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {TextInput} from 'react-native-paper';

const EditProductPrice = props => {
  const {productReducer, onAddProductPrice, onNextClick} = props;

  const [price, setPrice] = useState(null);

  const onButtonSubmit = () => {
    if (!price) {
      NavigationService.goBack();
      return;
    } else if (price && price <= 0) {
      showAlert({title: 'Amount should be greater that 0. '});
      return;
    } else {
      const numericValue = price?.replace(/[^0-9.]/g, '');
      const data = {
        price: numericValue,
        productID: props?.route?.params?.product_id,
      };
      onAddProductPrice(data).then(res => {
        if (res?.type.includes('fulfilled')) {
          onNextClick();
          NavigationService.goBack();
          showAlert({
            title: 'Product updated successfully.',
          });
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
          {props?.productReducer?.getAllDataAction?.gender_type}{' '}
          {props?.productReducer?.getAllDataAction?.title} Watch
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
          value={price ?? props?.productReducer?.getAllDataAction?.price}
          onChangeText={v => {
            const numericValue = v.replace(/[^0-9.]/g, '');

            // Format the numeric value with commas every three digits
            const formattedNumber = numericValue.replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ',',
            );
            if (v.length <= 12) {
              // updateProductPrice(formattedNumber);
              setPrice(formattedNumber);
            }
          }}
        />
      </View>
      <Spacer height={40} />
      <SubmitButton
        onPress={onButtonSubmit}
        lable="Update"
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

export default EditProductPrice;
