/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Platform,
} from 'react-native';
import branch, {BranchEvent} from 'react-native-branch';
import {connect, useDispatch, useSelector} from 'react-redux';

import {
  CustomIcon,
  Custombutton,
  Custombutton2,
  Loader,
  ProductViewComponent,
  Spacer,
  SubmitButton,
} from '@app/components';
import {
  addEllipsis,
  capitalizeFirstLetter,
  formatTimestamp,
  showAlert,
} from '@app/helper/commonFunction';
import ImageView from 'react-native-image-viewing';

import {exploreProductDetail, productChart} from '@app/store/explore.slice';
import {COLORS, IMAGES, SPACING} from '@app/resources';
import Chartdemo from './chartdemo';
import styles from './styles';
import {LoadingStatus, RoutesName} from '@app/helper/strings';
import {
  addPriceAlert,
  onAddToProductCompare,
  removePriceAlert,
} from '@app/store/exploreProductSlice';
import Video from 'react-native-video';
import {ICON_TYPE} from '@app/components/CustomIcon';
import ProductCard from '@app/screens/atoms/ProductCard';
import {FlatList} from 'react-native-gesture-handler';
import ReadMore from '@app/components/ReadMore';
import ProductImageDetail from './ProductImageDetail';
import NavigationService from '@app/navigations/NavigationService';
import {changeProductStatusAction} from '@app/store/profileSectionSlice';

const selectKey = [
  {id: 1, name: 'Last 7 Days', key: 'seven_days'},
  {id: 2, name: 'Last 30 Days', key: 'lastdays'},
  {id: 3, name: 'Last 6 Months', key: 'lastmonths'},
  {id: 4, name: 'Last 1 Year', key: 'lastyear'},
];

const ProductDetails = props => {
  const [fullImageModalVisible, setfullImageModalVisible] = useState(false);
  const {
    onAddToProductCompare,
    addToCompareReducer,
    authReducer,
    onChangeProductStatus,
    addPriceAlert,
    exploreProduct,
    removePriceAlert,
  } = props;
  const [isChartDropDown, setIsChartDropDown] = useState(false);
  const [selectFilteredValue, setSelectFilteredValue] = useState({
    id: 1,
    name: 'Last 7 Days',
    key: 'seven_days',
  });
  const [selectedVideo, setSelectedVideo] = useState({
    visible: false,
    uri: null,
  });
  const [videoLoading, setVideoLoading] = useState(true);
  const [isVideoPause, setIsVideoPause] = useState(false);

  const videoRef = useRef();

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const buoRef = useRef();

  const {
    productDetailLoading,
    productDetailData,
    productDetailError,
    removePriceAlertLoadingStatus,
  } = useSelector(state => state?.exploreReducer);
  console.log(productDetailData?.data?.id, 'ProductDetail loading');

  const isSelf =
    authReducer?.userProfileDetails?.id === productDetailData?.data?.user_id
      ? true
      : false;
  console.log(isSelf, 'isself');

  useEffect(() => {
    if (props.route?.params?.product_id) {
      dispatch(
        exploreProductDetail({
          product_id: props.route.params.product_id,
        }),
      );
    }
    return () => {
      if (buoRef.current) {
        console.log('buo release');
        buoRef.current?.release();
      }
    };
  }, [props.route?.params?.product_id]);

  useEffect(() => {
    if (props.route.params.product_id) {
      dispatch(
        productChart({
          product_id: props.route.params.product_id,
          duration: selectFilteredValue.key ?? 'sevendays',
        }),
      );
    }
  }, [selectFilteredValue, props.route.params.product_id]);

  // uncomment code to enable share option with deep linking
  const onShareClick = async () => {
    // let linkProperties = {
    // feature: 'share',
    // channel: 'RNApp',
    // campaign: `Product ID - ${props.route.params.product_id}`,
    // };
    // let shareOptions = {
    // messageHeader: 'Check this out',
    // messageBody: 'No really, check this out!',
    // };
    // let controlParams = {
    // $desktop_url: 'https://www.google.com',
    // };
    // let eventParams = {
    // ptest: 'hello',
    // };
    // buoRef.current = await branch.createBranchUniversalObject(
    // `product/${props.route.params.product_id}`,
    // {
    // title: 'Product Title',
    // contentDescription: 'Product Description',
    // canonicalUrl: '',
    // contentMetadata: {
    // customMetadata: {
    // productID: `${props.route.params.product_id}`,
    // },
    // },
    // },
    // );
    // let event = new BranchEvent(
    // BranchEvent.ViewItem,
    // [buoRef.current],
    // eventParams,
    // );
    // event.logEvent();
    // let {url} = await buoRef.current?.generateShortUrl(
    // linkProperties,
    // controlParams,
    // );
    // console.log('url', url);
    // let {channel, completed, error} = await buoRef.current?.showShareSheet(
    // shareOptions,
    // linkProperties,
    // controlParams,
    // );
    // console.log('test', {channel, completed, error});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      {productDetailLoading === false ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
          }}>
          {
            //header
          }
          <View style={styles.headerStyle}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}>
              <Image
                style={{
                  height: SPACING.SCALE_24,
                  width: SPACING.SCALE_24,
                  resizeMode: 'cover',
                }}
                source={IMAGES.BACKARROW}
              />
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={onShareClick}>
                <Image
                  style={{
                    marginRight: 16,
                    height: SPACING.SCALE_24,
                    width: SPACING.SCALE_24,
                  }}
                  source={IMAGES.share}
                />
              </TouchableOpacity>
              {!isSelf && (
                <TouchableOpacity>
                  <CustomIcon
                    size={30}
                    color={'#000000'}
                    origin={ICON_TYPE.MATERIAL_ICONS}
                    name="bookmark-outline"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          {/* <ProductImageDetail
            data={productDetailData?.data}
            onVideoClick={e => {
              console.log('e==', e);
              setSelectedVideo({
                visible: true,
                uri: e?.uri,
              });
              videoRef.current?.presentFullscreenPlayer();
            }}
          /> */}
          {/* MOdel, Brand, Price, condition */}

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 5,
            }}>
            <Text style={{fontFamily: 'Cabin-Bold', fontSize: 18}}>
              {productDetailData?.data?.gender_type}'s Watch with{' '}
              {productDetailData?.data?.bracelet} Strap
            </Text>
            <Text style={{fontFamily: 'OpenSans-SemiBold', fontSize: 18}}>
              {productDetailData?.data?.brand?.name} - Model{' '}
              {productDetailData?.data?.model?.name}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontFamily: 'Cabin-Bold', color: COLORS.HYPERLINK}}>
                ${productDetailData?.data?.price}{' '}
              </Text>
              <Text
                style={{fontFamily: 'Cabin-Regular', color: COLORS.HYPERLINK}}>
                .{productDetailData?.data?.watch_condition}
              </Text>
            </View>
          </View>

          {/* Availability */}

          <View
            style={{
              backgroundColor: '#F0F2FA',
              //backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              width: '100%',
              marginVertical: 5,
            }}>
            <Text style={{fontFamily: 'OpenSans-SemiBold', color: '#454545'}}>
              {capitalizeFirstLetter(productDetailData?.data?.product_status)}
            </Text>
          </View>
          {productDetailData?.data?.product_status !== 'available' &&
            !isSelf && (
              <SubmitButton
                buttonStyle={{width: '85%', alignSelf: 'center'}}
                lable="I'm interested in this product"
              />
            )}

          {/* Seller Details */}

          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate(RoutesName.PROFILE_SECTION_SCREEN, {
                userId: productDetailData?.data?.user_id,
              });
            }}>
            <View
              style={{
                flexDirection: 'row',
                //alignItems: 'center',
                justifyContent: 'space-evenly',
                marginVertical: SPACING.SCALE_5,
                marginHorizontal: SPACING.SCALE_13,
                // backgroundColor: 'red',
                //maxWidth:SPACING.SCALE_00
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  //alignItems: 'center',
                  justifyContent: 'space-evenly',
                  marginVertical: SPACING.SCALE_5,
                  marginHorizontal: SPACING.SCALE_13,
                  // backgroundColor: 'red',
                  //maxWidth:SPACING.SCALE_00
                }}>
                <View style={{marginTop: SPACING.SCALE_3}}>
                  {productDetailData?.data?.user?.image ? (
                    <Image
                      source={{uri: productDetailData?.data?.user?.image}}
                      style={{
                        height: 45,
                        width: 45,
                        borderRadius: 45 / 2,
                        marginLeft: 10,
                      }}
                    />
                  ) : (
                    <Image
                      source={IMAGES.userProfile}
                      style={{height: 45, width: 45, borderRadius: 45 / 2}}
                    />
                  )}
                </View>

                <View
                  style={{
                    width: SPACING.SCALE_285,
                    //backgroundColor: 'green',
                    marginLeft: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignContent: 'center',
                      justifyContent: 'space-between',
                      // backgroundColor: 'blue',
                      maxWidth: SPACING.SCALE_285,
                    }}>
                    <View
                      style={{
                        maxWidth: SPACING.SCALE_100,
                        // backgroundColor: 'red',
                        //marginLeft: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'OpenSans-Regular',
                          fontSize: 14,
                          marginLeft: 16,
                        }}>
                        {productDetailData?.data?.user?.name?.length > 8
                          ? addEllipsis(productDetailData?.data?.user?.name, 8)
                          : productDetailData?.data?.user?.name}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontFamily: 'OpenSans-Regular',
                        fontSize: 12,
                        margin: 5,
                      }}>
                      {formatTimestamp(productDetailData?.data?.created_at)}
                    </Text>
                  </View>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        // alignItems: 'center',
                        // justifyContent: 'center',
                        //marginTop: 6,
                      }}>
                      {productDetailData?.data?.location ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Image
                            style={{height: 18, width: 14.5, marginRight: 6}}
                            source={IMAGES.locationIcon}
                          />
                          <View style={{maxWidth: 200}}>
                            <Text
                              style={{
                                fontFamily: 'OpenSans-Regular',
                                fontSize: 13.5,
                              }}>
                              {productDetailData?.data?.location}
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <Text>No address</Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              height: 1,
              width: '90%',
              backgroundColor: 'gray',
              marginTop: 15,
              alignSelf: 'center',
            }}
          />

          {/* Specifications */}
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              // backgroundColor: 'red',
              paddingHorizontal: 20,
              marginTop: 20,
            }}>
            {productDetailData?.data?.accessories && (
              <View
                style={{
                  ...styles.SpecifiactionView,
                  marginTop: 3,
                  //backgroundColor: 'red',
                }}>
                <Text style={styles.SpecifiactionText1}>Accessories</Text>
                <Text style={styles.SpecifiactionText2}>
                  {productDetailData?.data?.accessories}
                </Text>
              </View>
            )}
            {productDetailData?.data?.dial && (
              <View style={styles.SpecifiactionView}>
                <Text style={styles.SpecifiactionText1}>Dial</Text>
                <Text style={styles.SpecifiactionText2}>
                  {productDetailData?.data?.dial}
                </Text>
              </View>
            )}
            {productDetailData?.data?.dial_markers && (
              <View style={styles.SpecifiactionView}>
                <Text style={styles.SpecifiactionText1}>Dial Markers</Text>
                <Text style={styles.SpecifiactionText2}>
                  {productDetailData?.data?.dial_markers}
                </Text>
              </View>
            )}
            {productDetailData?.data?.case_size && (
              <View style={styles.SpecifiactionView}>
                <Text style={styles.SpecifiactionText1}>Case Size </Text>
                <Text style={styles.SpecifiactionText2}>
                  {productDetailData?.data?.case_size}
                </Text>
              </View>
            )}
            {productDetailData?.data?.movement && (
              <View style={styles.SpecifiactionView}>
                <Text style={styles.SpecifiactionText1}>Movement </Text>
                <Text style={styles.SpecifiactionText2}>
                  {productDetailData?.data?.movement}
                </Text>
              </View>
            )}
          </View>

          {/* ReadMore Text */}

          {productDetailData?.data?.description?.length >= 1 && (
            <View
              style={{
                alignSelf: 'center',
                width: '90%',
                marginTop: 30,
                //backgroundColor: 'red',
              }}>
              <ReadMore content={productDetailData?.data?.description} />
            </View>
          )}

          <View
            style={{
              //flex: 1,
              height: 1,
              width: '90%',
              backgroundColor: 'gray',
              marginTop: 15,
              alignSelf: 'center',
            }}
          />

          {/* Price Chart */}

          <View
            style={{
              marginTop: 25,
              position: 'relative',
              //backgroundColor: 'red',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 16,
                zIndex: 1,
              }}>
              <Text
                style={{
                  fontFamily: 'OpenSans-Bold',
                  fontSize: SPACING.SCALE_13,
                  color: '#454545',
                }}>
                Price Chart
              </Text>
              <TouchableOpacity
                onPress={() => setIsChartDropDown(!isChartDropDown)}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'OpenSans-Regular',
                    fontSize: SPACING.SCALE_13,
                    color: '#868686',
                    fontWeight: '600',
                    marginBottom: SPACING.SCALE_10,
                  }}>
                  {selectFilteredValue.name}{' '}
                </Text>
                <Image
                  source={IMAGES.blackDropIcon}
                  resizeMode={'contain'}
                  style={{
                    height: SPACING.SCALE_10,
                    width: SPACING.SCALE_10,
                    marginTop: SPACING.SCALE_1,
                    marginBottom: SPACING.SCALE_10,
                  }}
                />
              </TouchableOpacity>
              {isChartDropDown ? (
                <View
                  style={{
                    position: 'absolute',
                    zIndex: 3,
                    right: SPACING.SCALE_7,
                    backgroundColor: '#F0F2FA',
                    top: SPACING.SCALE_24,
                    borderBottomLeftRadius: SPACING.SCALE_8,
                    borderBottomRightRadius: SPACING.SCALE_8,
                    borderTopLeftRadius: SPACING.SCALE_8,
                    borderWidth: SPACING.SCALE_2,
                    borderColor: COLORS.themeColor,
                  }}>
                  {selectKey?.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setSelectFilteredValue(item);
                          setIsChartDropDown(false);
                        }}
                        activeOpacity={0.7}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            marginHorizontal: SPACING.SCALE_15,
                            marginVertical: SPACING.SCALE_10,
                            fontSize: SPACING.SCALE_13,
                          }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
            </View>
            <View>
              <Chartdemo />
            </View>
          </View>
          <Spacer height={isSelf ? 20 : 0} />
          {/* horizontal watcehs */}
          {isSelf ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
              }}>
              <View
                style={{
                  width: '48%',
                }}>
                <SubmitButton
                  disabled={
                    productDetailData?.data?.product_status === 'sold_out'
                  }
                  onPress={() => {
                    onChangeProductStatus({
                      product_id: productDetailData?.data?.id,
                      product_status: 'sold_out',
                    }).then(res => {
                      if (res?.type.includes('fulfilled')) {
                        if (props.route?.params?.product_id) {
                          dispatch(
                            exploreProductDetail({
                              product_id: props.route.params.product_id,
                            }),
                          );
                        }
                        showAlert({
                          title: 'Success !',
                          message: 'Product status changed as sold.',
                        });
                      } else if (res?.type.includes('rejected')) {
                        showAlert({
                          title: 'Server error !',
                        });
                      }
                    });
                  }}
                  lable="Mark as sold"
                />
              </View>
              <View
                style={{
                  width: '48%',
                }}>
                <SubmitButton
                  onPress={() => {
                    if (productDetailData?.data?.id) {
                      props.navigation.navigate(RoutesName.VIEW_INSIGHTS, {
                        productId: productDetailData?.data?.id,
                      });
                    }
                  }}
                  type="outlined"
                  lable="View Insights"
                />
              </View>
            </View>
          ) : (
            <View>
              <View
                style={{
                  marginTop: SPACING.SCALE_25,
                  zIndex: -2,
                  // backgroundColor: 'red',
                }}>
                <Text
                  style={{
                    marginLeft: SPACING.SCALE_20,
                    fontSize: SPACING.SCALE_20,
                    color: COLORS.BLACK,
                    fontWeight: 'bold',
                  }}>
                  Suggested watches for you
                </Text>
                <Spacer height={SPACING.SCALE_13} />

                {productDetailData?.data?.suggested_data?.length != 0 ? (
                  <View style={{marginLeft: SPACING.SCALE_14}}>
                    <FlatList
                      data={productDetailData?.data?.suggested_data}
                      horizontal={true}
                      renderItem={({item, index}) => {
                        console.log('Product_item======>>>>>>', item);
                        return <ProductCard item={item} />;
                      }}
                    />
                  </View>
                ) : (
                  // <ProductViewComponent
                  //   data={productDetailData?.data?.suggested_data}
                  // />
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text>No Suggested watches</Text>
                  </View>
                )}
              </View>

              {/* make an offer and chat button */}
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 20,
                  marginHorizontal: 20,
                  justifyContent: 'space-evenly',
                  // backgroundColor: 'red',
                }}>
                <Custombutton
                  onPress={() => {
                    NavigationService.navigate(RoutesName.CHAT_DETAIL_SCREEN, {
                      chat_item: {
                        product_id: productDetailData?.data?.id,
                        user_id: productDetailData?.data?.user?.id,
                        id: 0,
                        user_image: productDetailData?.data?.user?.image,
                        user_name: productDetailData?.data?.user?.name,
                      },
                      isOffer: true,
                    });
                  }}
                  title="Make Offer"
                  height={SPACING.SCALE_50}
                  width={SPACING.SCALE_160}
                />
                <Custombutton2
                  onPress={() =>
                    NavigationService.navigate(RoutesName.CHAT_DETAIL_SCREEN, {
                      chat_item: {
                        product_id: productDetailData?.data?.id,
                        user_id: productDetailData?.data?.user?.id,
                        id: 0,
                        user_image: productDetailData?.data?.user?.image,
                        user_name: productDetailData?.data?.user?.name,
                      },
                    })
                  }
                  title="Chat"
                  //marginTop={50}
                  height={SPACING.SCALE_50}
                  width={SPACING.SCALE_160}
                  // marginHorizontal={20}
                  // onPress={() => {
                  // // Alert.alert('Chat');
                  // }}
                />
              </View>

              {/* Compare PriceAlert */}

              <View
                style={{
                  flexDirection: 'row',
                  //justifyContent: 'space-evenly',
                  marginTop: 20,
                  marginBottom: 20,
                  //backgroundColor: 'green',
                  width: '90%',
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    // backgroundColor: 'red',
                    width: '50.3%',
                    alignItems: 'center',
                  }}>
                  {console.log(
                    'Test===',
                    addToCompareReducer?.productCompareList?.some(
                      item => item.id == props.route.params.product_id,
                    ),
                  )}
                  {!addToCompareReducer?.productCompareList?.some(
                    item => item.id == props.route.params.product_id,
                  ) ? (
                    <>
                      <Image source={IMAGES.CompareImage} />
                      <TouchableOpacity
                        onPress={() => {
                          if (
                            addToCompareReducer.productCompareList.length >= 4
                          ) {
                            showAlert({
                              title: 'Alert',
                              message:
                                'You can not add more than four products.',
                            });
                            navigation.navigate(RoutesName.ITEM_COMPARISON, {
                              product_id: props.route.params.product_id,
                            });
                          } else {
                            if (
                              props.route.params.product_id &&
                              productDetailData?.data
                            ) {
                              if (
                                addToCompareReducer.productCompareList.length >=
                                1
                              ) {
                                onAddToProductCompare(productDetailData?.data);
                                navigation.navigate(
                                  RoutesName.ITEM_COMPARISON,
                                  {
                                    product_id: props.route.params.product_id,
                                  },
                                );
                              } else {
                                onAddToProductCompare(productDetailData?.data);
                                showAlert({
                                  title: 'Alert',
                                  message: 'Add more products to compare.',
                                });
                              }
                            }
                          }
                        }}>
                        <Text style={{marginLeft: 0}}>Add to compare</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <Text style={{color: 'green'}}>
                      Product Added{'\n'} in compare list
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    height: 40,
                    width: 1,
                    backgroundColor: 'gray',
                    flexShrink: 1,
                  }}
                />
                <View
                  style={{
                    width: '48%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {productDetailData?.data?.alert === true ? (
                    <>
                      {exploreProduct?.removePriceAlertLoadingStatus ===
                      LoadingStatus.LOADING ? (
                        <ActivityIndicator />
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            if (productDetailData?.data?.id) {
                              removePriceAlert(
                                productDetailData?.data?.id,
                              ).then(res => {
                                if (
                                  res?.payload?.message ===
                                  'Price Alert for Product removed'
                                ) {
                                  showAlert({
                                    title: 'Success',
                                    message: res?.payload?.message,
                                  });
                                  if (props.route?.params?.product_id) {
                                    dispatch(
                                      exploreProductDetail({
                                        product_id:
                                          props.route.params.product_id,
                                      }),
                                    );
                                  }
                                } else {
                                  showAlert({
                                    title: 'Error',
                                    message: 'Somthing went wrong',
                                  });
                                }
                              });
                            }
                          }}
                          style={{justifyContent: 'center'}}>
                          <Text style={{color: 'red'}}>
                            Product already {'\n'} added for alert.
                          </Text>
                        </TouchableOpacity>
                      )}
                    </>
                  ) : (
                    <View>
                      {exploreProduct?.priceAlertLoadingStatus ===
                      LoadingStatus.LOADING ? (
                        <ActivityIndicator />
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            if (productDetailData?.data?.id) {
                              addPriceAlert(productDetailData?.data?.id).then(
                                res => {
                                  if (
                                    res?.payload?.message ===
                                    'Price Alert for Product created'
                                  ) {
                                    showAlert({
                                      title: 'Success',
                                      message: res?.payload?.message,
                                    });
                                    if (props.route?.params?.product_id) {
                                      dispatch(
                                        exploreProductDetail({
                                          product_id:
                                            props.route.params.product_id,
                                        }),
                                      );
                                    }
                                  } else {
                                    showAlert({
                                      title: 'Error',
                                      message: 'Somthing went wrong!',
                                    });
                                  }
                                },
                              );
                            }
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Cabin-SemiBold',
                              color: COLORS.HYPERLINK,
                            }}>
                            Price Alert
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}

          {selectedVideo.visible && (
            <Modal
              style={{
                flex: 1,
                backgroundColor: '#000000',
                paddingBottom: 20,
              }}
              visible={selectedVideo.visible}
              presentationStyle="fullScreen"
              onRequestClose={() => {
                setVideoLoading(true);
                setIsVideoPause(false);
                setSelectedVideo({
                  visible: false,
                  uri: '',
                });
              }}
              supportedOrientations={['portrait']}
              hardwareAccelerated>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#000000',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    padding: 20,
                    flexDirection: 'row-reverse',
                  }}>
                  <Pressable
                    onPress={() => {
                      setVideoLoading(true);
                      setIsVideoPause(false);
                      setSelectedVideo({
                        visible: false,
                        uri: '',
                      });
                    }}>
                    <CustomIcon
                      name={'close'}
                      origin={ICON_TYPE.MATERIAL_ICONS}
                      size={25}
                      color={'#fff'}
                    />
                  </Pressable>
                </View>
                <Pressable
                  style={{flex: 1}}
                  onPress={() => {
                    setIsVideoPause(!isVideoPause);
                  }}>
                  <Video
                    ref={videoRef}
                    source={{uri: selectedVideo.uri}} // Replace with your video URL
                    style={{flex: 1}}
                    controls
                    paused={isVideoPause}
                    resizeMode="contain"
                    onLoad={() => {
                      setVideoLoading(false);
                    }}
                  />
                </Pressable>
                {videoLoading && (
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      position: 'absolute',
                      alignSelf: 'center',
                    }}>
                    <ActivityIndicator size={30} color={'#fff'} />
                  </View>
                )}
                {isVideoPause && (
                  <Pressable
                    onPress={() => {
                      setIsVideoPause(!isVideoPause);
                    }}
                    style={{
                      height: 50,
                      width: 50,
                      position: 'absolute',
                      alignSelf: 'center',
                    }}>
                    <CustomIcon
                      name={'pause'}
                      origin={ICON_TYPE.MATERIAL_ICONS}
                      size={40}
                    />
                  </Pressable>
                )}
              </View>
            </Modal>
          )}
        </ScrollView>
      ) : (
        <Loader size={20} />
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state?.authReducer,
    addToCompareReducer: state?.addToCompareReducer,
    exploreProduct: state?.exploreProductReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  onAddToProductCompare: params => dispatch(onAddToProductCompare(params)),
  onChangeProductStatus: params => dispatch(changeProductStatusAction(params)),
  addPriceAlert: params => dispatch(addPriceAlert(params)),
  removePriceAlert: params => dispatch(removePriceAlert(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
