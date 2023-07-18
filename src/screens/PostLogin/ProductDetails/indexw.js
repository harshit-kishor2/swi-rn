import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  BackHeader,
  Container,
  CustomIcon,
  CustomText,
  Spacer,
} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import ProductImageDetail from './ProductImageDetail';
import {useNavigation, useRoute} from '@react-navigation/native';

const ProductDetails = ({props}) => {
  const naviagte = useNavigation();
  const {params} = useRoute();
  console.log('Navi', params);
  return (
    <Container>
      <BackHeader
        rightComponent={
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <CustomIcon
              origin={ICON_TYPE.FEATHER_ICONS}
              name={'share-2'}
              color={'black'}
              size={30}
            />
            <Spacer width={10} />
            <CustomIcon
              origin={ICON_TYPE.FEATHER_ICONS}
              name={'bookmark'}
              color={'black'}
              size={30}
            />
          </View>
        }
      />
      <ProductImageDetail />
      <View
        style={{
          height: 50,
          backgroundColor: 'grey',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomText>Available</CustomText>
      </View>
      <Text>ProductDetails</Text>
    </Container>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
