import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {BackHeader, Container, CustomText, Spacer} from '@app/components';
import styles from './styles';
import HorizontalLine from '@app/components/HorizontalLine';
import {COLORS, SPACING, TYPOGRAPHY} from '@app/resources';
import {FONT_SIZE_16, FONT_SIZE_33} from '@app/resources/typography';
import {useDispatch, useSelector} from 'react-redux';
import {
  onhandleRemoveProduct,
  resetAddToProductSliceState,
} from '@app/store/exploreProductSlice/addToCompare.slice';

const ItemComparison = props => {
  const dispatch = useDispatch();
  let temp = productCompareList ?? [];
  console.log(
    'Shiftttt',
    temp.filter((item, index) => index != 0),
  );
  console.log('========>>>>', props?.route?.params);
  const {productCompareList} = useSelector(state => state?.addToCompareReducer);
  console.log('============>>>>>', productCompareList);
  return (
    <Container useSafeAreaView={true} style={{}}>
      <BackHeader />
      <CustomText
        style={{
          fontSize: SPACING.SCALE_22,
          fontWeight: 'bold',
          marginLeft: SPACING.SCALE_20,
        }}>
        Compare products
      </CustomText>
      <Spacer height={SPACING.SCALE_20} />
      {/* <Text>{props?.route?.params?.product_id}</Text> */}

      <View
        style={{
          height: 3,
          width: 30,
          backgroundColor: '#00958C',
          marginLeft: SPACING.SCALE_20,
        }}></View>

      <View style={{}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginLeft: 20}}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(resetAddToProductSliceState());
                }}>
                <Text style={{color: 'red'}}>Remove all</Text>
              </TouchableOpacity>
              {productCompareList[0]?.thumb_image ? (
                <Image
                  style={styles.imageStyle}
                  source={{
                    uri: productCompareList[0]?.thumb_image,
                  }}
                />
              ) : null}
              <Spacer />
              <CustomText
                style={{
                  fontSize: SPACING.SCALE_18,
                  color: COLORS.APPGREEN,
                  fontWeight: 'bold',
                  // marginLeft: SPACING.SCALE_33,
                }}>
                {productCompareList[0]?.title}
              </CustomText>
              <Spacer height={SPACING.SCALE_25} />
              <CustomText
                style={{
                  fontSize: SPACING.SCALE_18,
                  color: COLORS.modalViewTextColor,
                  fontWeight: 'bold',
                  // marginLeft: SPACING.SCALE_33,
                }}>
                Model Number
              </CustomText>
              <Spacer />
              <CustomText
                style={{
                  fontSize: SPACING.SCALE_18,
                  color: COLORS.modalViewTextColor,
                }}>
                {productCompareList[0]?.model?.name}
              </CustomText>
              <Spacer />
              <HorizontalLine width={SPACING.SCALE_160} />
              <Spacer height={SPACING.SCALE_25} />
              <CustomText
                style={{
                  fontSize: SPACING.SCALE_18,
                  color: COLORS.modalViewTextColor,
                  fontWeight: 'bold',
                  // marginLeft: SPACING.SCALE_33,
                }}>
                Condition
              </CustomText>
              <Spacer />
              <CustomText
                style={{
                  fontSize: SPACING.SCALE_18,
                  color: COLORS.modalViewTextColor,
                }}>
                {productCompareList[0]?.watch_condition}
              </CustomText>
              <Spacer />
              <HorizontalLine width={SPACING.SCALE_160} />
              <Spacer height={SPACING.SCALE_25} />
              <CustomText
                style={{
                  fontSize: SPACING.SCALE_18,
                  color: COLORS.modalViewTextColor,
                  fontWeight: 'bold',
                  // marginLeft: SPACING.SCALE_33,
                }}>
                Price
              </CustomText>
              <Spacer />
              <CustomText
                style={{
                  fontSize: SPACING.SCALE_18,
                  color: COLORS.modalViewTextColor,
                }}>
                $ {productCompareList[0]?.price}
              </CustomText>
              <Spacer />
              <HorizontalLine width={SPACING.SCALE_160} />
              <Spacer height={SPACING.SCALE_25} />
              <CustomText
                style={{
                  fontSize: SPACING.SCALE_18,
                  color: COLORS.modalViewTextColor,
                  fontWeight: 'bold',
                  // marginLeft: SPACING.SCALE_33,
                }}>
                Date of purchased
              </CustomText>
              <Spacer />
              <CustomText
                style={{
                  fontSize: SPACING.SCALE_18,
                  color: COLORS.modalViewTextColor,
                }}>
                {productCompareList[0]?.dated}
              </CustomText>
              <Spacer />
              <HorizontalLine width={SPACING.SCALE_160} />
              <Spacer height={SPACING.SCALE_25} />
              <CustomText
                style={{
                  fontSize: SPACING.SCALE_18,
                  color: COLORS.modalViewTextColor,
                  fontWeight: 'bold',
                  // marginLeft: SPACING.SCALE_33,
                }}>
                Sold by
              </CustomText>
              <Spacer />
              <CustomText
                style={{
                  fontSize: SPACING.SCALE_18,
                  color: COLORS.modalViewTextColor,
                }}>
                {productCompareList[0]?.user?.name}
              </CustomText>
              <Spacer />
              <HorizontalLine width={SPACING.SCALE_160} />
              <Spacer height={SPACING.SCALE_25} />

              <Spacer height={SPACING.SCALE_25} />
            </View>
            <FlatList
              horizontal
              data={productCompareList}
              renderItem={({item, index}) => {
                return index !== 0 ? (
                  <View style={{marginLeft: 20}}>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(onhandleRemoveProduct(item?.id));
                      }}>
                      <Text style={{color: 'red'}}>Remove product</Text>
                    </TouchableOpacity>

                    {item?.thumb_image ? (
                      <Image
                        style={styles.imageStyle}
                        source={{
                          uri: item?.thumb_image,
                        }}
                      />
                    ) : null}
                    <Spacer />
                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.APPGREEN,
                        fontWeight: 'bold',
                        // marginLeft: SPACING.SCALE_33,
                      }}>
                      {item?.title}
                    </CustomText>
                    <Spacer height={SPACING.SCALE_25} />
                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.modalViewTextColor,
                        fontWeight: 'bold',
                        // marginLeft: SPACING.SCALE_33,
                      }}>
                      Model Number
                    </CustomText>
                    <Spacer />
                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.modalViewTextColor,
                      }}>
                      {item?.model?.name}
                    </CustomText>
                    <Spacer />
                    <HorizontalLine width={SPACING.SCALE_160} />
                    <Spacer height={SPACING.SCALE_25} />
                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.modalViewTextColor,
                        fontWeight: 'bold',
                        // marginLeft: SPACING.SCALE_33,
                      }}>
                      Condition
                    </CustomText>
                    <Spacer />
                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.modalViewTextColor,
                      }}>
                      {item?.watch_condition}
                    </CustomText>
                    <Spacer />
                    <HorizontalLine width={SPACING.SCALE_160} />
                    <Spacer height={SPACING.SCALE_25} />
                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.modalViewTextColor,
                        fontWeight: 'bold',
                        // marginLeft: SPACING.SCALE_33,
                      }}>
                      Price
                    </CustomText>
                    <Spacer />
                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.modalViewTextColor,
                      }}>
                      $ {item?.price}
                    </CustomText>
                    <Spacer />
                    <HorizontalLine width={SPACING.SCALE_160} />
                    <Spacer height={SPACING.SCALE_25} />
                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.modalViewTextColor,
                        fontWeight: 'bold',
                        // marginLeft: SPACING.SCALE_33,
                      }}>
                      Date of purchased
                    </CustomText>
                    <Spacer />
                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.modalViewTextColor,
                      }}>
                      {item?.dated}
                    </CustomText>
                    <Spacer />
                    <HorizontalLine width={SPACING.SCALE_160} />
                    <Spacer height={SPACING.SCALE_25} />
                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.modalViewTextColor,
                        fontWeight: 'bold',
                        // marginLeft: SPACING.SCALE_33,
                      }}>
                      Sold by
                    </CustomText>
                    <Spacer />
                    <CustomText
                      style={{
                        fontSize: SPACING.SCALE_18,
                        color: COLORS.modalViewTextColor,
                      }}>
                      {item?.user?.name}
                    </CustomText>
                    <Spacer />
                    <HorizontalLine width={SPACING.SCALE_160} />
                    <Spacer height={SPACING.SCALE_25} />
                  </View>
                ) : null;
              }}
            />
          </View>

          <Spacer height={30} />
        </ScrollView>
      </View>
    </Container>
  );
};

export default ItemComparison;
