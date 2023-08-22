/* eslint-disable react-native/no-inline-styles */

import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {
  BackHeader,
  Container,
  CustomIcon,
  CustomText,
  Custombutton,
  NavigationBar,
} from '@app/components';
import {IMAGES, SPACING} from '@app/resources';
import styles from './styles';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {connect} from 'react-redux';
import {
  boostProduct,
  coinPlans,
  purchaseCoins,
} from '@app/store/exploreProductSlice/boostProduct.action';
import {useEffect} from 'react';
import {showAlert} from '@app/helper/commonFunction';
import {RoutesName} from '@app/helper/strings';
import {FontsConst} from '@app/assets/assets';

const BuyCoins = props => {
  const {boostProductReducer, boostProduct, purchaseCoins, coinPlans} = props;
  const [selected, setSelected] = useState();
  const [purchaseCoinItem, setPurchaseCoinItem] = useState();

  useEffect(() => {
    coinPlans();
  }, []);
  console.log(boostProductReducer?.coinPlansData?.data, 'Coins Data');
  return (
    <Container useSafeAreaView={true}>
      <BackHeader />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 40,
        }}>
        <View style={styles.CoinContainer}>
          <ImageBackground
            source={IMAGES.bag}
            style={styles.ImageBackgroudContainer}>
            <Image
              style={{
                top: SPACING.SCALE_1,
                marginLeft: 55,
                height: 58,
                width: 73,
              }}
              source={IMAGES.CoinBoostNow}
            />
          </ImageBackground>
        </View>

        <View style={styles.TextContainer}>
          <Text style={styles.TopText}>Buy coins now</Text>
          <Text style={styles.TopText}> and help your post</Text>
          <Text style={styles.TopText}> to boost.</Text>
        </View>

        <View style={{alignItems: 'center', marginBottom: 20}}>
          <Text style={styles.TextStyle1}>Get it Now</Text>
        </View>
        {boostProductReducer?.coinPlansData?.data?.length != 0 ? (
          <FlatList
            data={boostProductReducer?.coinPlansData?.data}
            renderItem={({item, index}) => {
              return (
                <Pressable
                  onPress={() => {
                    setSelected(index);
                    setPurchaseCoinItem(item);
                  }}>
                  <View
                    style={[
                      styles.cardStyle,
                      index === selected && styles.highlightedLine,
                    ]}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingHorizontal: 5,
                        }}>
                        <CustomText
                          style={{
                            fontSize: 18,
                            marginHorizontal: 5,
                            fontFamily: 'OpenSans-Regular',
                            color: '#000',
                          }}>
                          Get
                        </CustomText>
                        <Image
                          source={IMAGES.coin}
                          style={{
                            height: 20,
                            width: 20,
                          }}
                        />
                        <CustomText
                          style={{
                            fontSize: 18,
                            marginHorizontal: 5,
                            fontFamily: FontsConst.OpenSans_Bold,
                            color: '#000',
                          }}>
                          {item.coins_value}
                        </CustomText>
                        <CustomText
                          style={{
                            fontSize: 18,
                            marginHorizontal: 5,
                            fontFamily: 'OpenSans-Regular',
                            color: '#000',
                          }}>
                          for
                        </CustomText>
                      </View>
                      {/* <Text style={styles.outerText}>
                        Get{'  '}
                        <Text style={styles.innerText}>
                          {'  '}
                          {item.coins_value}{' '}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'OpenSans-SemiBold',
                            color: '#7C7C7C',
                          }}>
                          for
                        </Text>
                      </Text> */}

                      <View style={styles.CardCoinStyle}>
                        <CustomIcon
                          origin={ICON_TYPE.FOUNDATION}
                          name={'dollar'}
                          color={'#00958C'}
                          size={30}
                          style={{marginTop: -8}}
                        />
                        <Text style={styles.NumberStyle}>
                          {item?.cost == 0 ? 'Free' : item?.cost}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              );
            }}
          />
        ) : (
          <View>
            <Text>No Data</Text>
          </View>
        )}

        <View>
          <Custombutton
            title="Pay now"
            marginTop={10}
            height={50}
            width={'100%'}
            marginHorizontal={20}
            onPress={() => {
              console.log('DATA+++++++', props.route.params, purchaseCoinItem);
              if (
                props?.route?.params?.boostProductDetail?.planid?.coins_value >
                purchaseCoinItem?.coins_value
              ) {
                showAlert({
                  title: 'Please select another plan!',
                  message:
                    'There are less coins in this plan for boost your product.',
                });
              } else {
                if (purchaseCoinItem?.id) {
                  purchaseCoins({planid: purchaseCoinItem.id}).then(result => {
                    if (
                      result?.payload?.message ===
                      'Coins purchased successfully.'
                    ) {
                      if (props?.route?.params?.from === 'coin history') {
                        props?.navigation?.navigate(
                          RoutesName.BOOST_PRODUCT_SUCCESS,
                          {
                            from: props?.route?.params?.from,
                          },
                        );
                      } else {
                        if (props?.route?.params?.boostProductDetail?.pid) {
                          boostProduct({
                            pid: props?.route?.params?.boostProductDetail?.pid,
                            planid:
                              props?.route?.params?.boostProductDetail?.planid
                                ?.id,
                          }).then(res => {
                            if (
                              res?.payload?.message ===
                              'Your product has been successfully boosted.'
                            ) {
                              props?.navigation?.navigate(
                                RoutesName.BOOST_PRODUCT_SUCCESS,
                              );
                            }
                            //
                          });
                        }
                      }
                    }
                  });
                } else {
                  showAlert({
                    title: 'Alert',
                    message: 'Please select a plan.',
                  });
                }
              }
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            props?.navigation?.goBack();
            if (props?.route?.params?.from !== 'coin history') {
              props?.navigation?.goBack();
            }
          }}
          style={{alignSelf: 'center', marginTop: 30}}>
          <Text
            style={{
              fontSize: 14,
              color: '#00958C',
              fontFamily: 'OpenSans-Regular',
              textDecorationLine: 'underline',
            }}>
            Not now, I'll do it later
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    boostProductReducer: state?.boostProductReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  boostProduct: params => dispatch(boostProduct(params)),
  coinPlans: params => dispatch(coinPlans(params)),
  purchaseCoins: params => dispatch(purchaseCoins(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyCoins);
