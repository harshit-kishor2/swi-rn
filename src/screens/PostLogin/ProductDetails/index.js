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
} from 'react-native';
import branch, {BranchEvent} from 'react-native-branch';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect, useDispatch, useSelector} from 'react-redux';

import {
  CustomIcon,
  Custombutton,
  Custombutton2,
  ProductViewComponent,
  Spacer,
} from '@app/components';
import {
  addEllipsis,
  capitalizeFirstLetter,
  formatTimestamp,
  showAlert,
} from '@app/helper/commonFunction';
import ImageView from 'react-native-image-viewing';

import ImageViewer from 'react-native-image-zoom-viewer';
import {exploreProductDetail, productChart} from '@app/store/explore.slice';
import {COLORS, IMAGES, SPACING} from '@app/resources';
import Chartdemo from './chartdemo';
import styles from './styles';
import {RoutesName} from '@app/helper/strings';
import {onAddToProductCompare} from '@app/store/exploreProductSlice';
import Video from 'react-native-video';
import {ICON_TYPE} from '@app/components/CustomIcon';
import ProductCard from '@app/screens/atoms/ProductCard';
import {FlatList} from 'react-native-gesture-handler';
import ReadMore from '@app/components/ReadMore';

const selectKey = [
  {id: 1, name: 'Last 7 Days', key: 'seven_days'},
  {id: 2, name: 'Last 30 Days', key: 'lastdays'},
  {id: 3, name: 'Last 6 Months', key: 'lastmonths'},
  {id: 4, name: 'Last 1 Year', key: 'lastyear'},
];

const ProductDetails = props => {
  const [fullImageModalVisible, setfullImageModalVisible] = useState(false);
  const {onAddToProductCompare, addToCompareReducer} = props;
  console.log(addToCompareReducer, '--->');
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const [isChartDropDown, setIsChartDropDown] = useState(false);
  const [selectFilteredValue, setSelectFilteredValue] = useState({
    id: 1,
    name: 'Last 7 Days',
    key: 'seven_days',
  });
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const buoRef = useRef();

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  const {productDetailLoading, productDetailData, productDetailError} =
    useSelector(state => state?.exploreReducer);
  console.log(
    productDetailData.data,
    'gggbbbbbg',
    productDetailError,
    productDetailLoading,
    'klklkkk',
  );

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

  // Image view logic =======================

  const ImageViewww = ({images}) => {
    const [selectedImage, setSelectedImage] = useState(0);
    console.log(images, 'dfshfshk');
    var index = 0;
    const handleImagePress = indexx => {
      setSelectedImage(indexx);
      index = indexx;
    };
    let fullImagesArray = images
      .filter(item => item.type !== 'video')
      .map(item => ({uri: item.file}));

    return (
      <View style={[styless.container]}>
        {fullImageModalVisible && fullImagesArray != [] && (
          <ImageView
            images={fullImagesArray}
            imageIndex={index}
            doubleTapToZoomEnabled={true}
            visible={fullImageModalVisible}
            //presentationStyle="formSheet"
            onRequestClose={() => setfullImageModalVisible(false)}
            HeaderComponent={(item, index) => {
              console.log(index, item);
              return (
                <Text
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    marginTop: SPACING.SCALE_20,
                  }}>
                  {`${item.imageIndex + 1}/${fullImagesArray.length}`}
                </Text>
              );
            }}
          />
        )}

        <View style={styless.mainView}>
          {images[selectedImage]?.file ? (
            images[selectedImage]?.file?.includes('mp4') ? (
              (console.log(
                images[selectedImage]?.file,
                '====jhgjhgghjghjgjhgjgjh====',
              ),
              (
                <>
                  <View style={{width: 239, height: 239}}>
                    <Video
                      source={{
                        uri: images[selectedImage]?.file,
                      }}
                      ref={ref => {
                        this.player = ref;
                      }}
                      resizeMode="cover"
                      lo
                      //controls={true}
                      onBuffer={this.onBuffer}
                      onError={this.videoError}
                      style={{width: 239, height: 239}}
                    />
                  </View>
                </>
              ))
            ) : (
              <Pressable
                onPress={() => {
                  console.log('asdfghjkl====>>>', selectedImage);

                  setfullImageModalVisible(true);
                }}>
                <Image
                  style={styless.mainImage}
                  source={{
                    uri: images[selectedImage]?.file,
                  }}
                />
              </Pressable>
            )
          ) : (
            <View
              style={{
                width: 239,
                height: 239,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>No image</Text>
            </View>
          )}
        </View>
        {images?.length > 1 && (
          <View>
            <View style={styless.thumbnailContainer}>
              {images?.length != 0 &&
                images.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styless.thumbnail,
                      selectedImage === index && styless.selectedThumbnail,
                    ]}
                    onPress={() => handleImagePress(index)}>
                    {image?.file ? (
                      <Image
                        style={styless.thumbnailImage}
                        source={{
                          uri: image?.file?.includes('mp4')
                            ? 'https://www.iconpacks.net/icons/1/free-video-icon-818-thumb.png'
                            : image?.file,
                        }}
                      />
                    ) : (
                      <Text>No image</Text>
                    )}
                  </TouchableOpacity>
                ))}
            </View>
            <View style={styless.dotContainer}>
              {images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styless.dot,
                    selectedImage === index && styless.selectedDot,
                  ]}
                />
              ))}
            </View>
          </View>
        )}
      </View>
    );
  };

  const styless = StyleSheet.create({
    container: {
      flex: 1,
    },
    mainView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainImage: {
      width: 239,
      height: 239,
      borderRadius: 10,
      resizeMode: 'cover',
    },
    thumbnailContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 15,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    thumbnail: {
      width: 50,
      height: 50,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#ccc',
    },
    selectedThumbnail: {
      borderColor: '#000',
    },
    thumbnailImage: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      resizeMode: 'cover',
    },
    dotContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#ccc',
      marginHorizontal: 5,
    },
    selectedDot: {
      width: 8,
      height: 8,
      borderRadius: 4,

      backgroundColor: '#000',
    },
  });

  const DATA = [
    {
      product_image: IMAGES.Rectangle91,
      product_name: 'Mens Rolex Wat..',
      price: '1200',
      condition: 'Brand New',
      seller_image: IMAGES.Ellipse7,
      seller_name: 'immy van',
      posting_day: 'Posted Two Days Ago',
    },
    {
      product_image: IMAGES.Rectangle91,
      product_name: 'Mens Rolex Wat..',
      price: '1200',
      condition: 'Brand New',
      seller_image: IMAGES.Ellipse7,
      seller_name: 'immy van',
      posting_day: 'Posted Two Days Ago',
    },
    {
      product_image: IMAGES.Rectangle91,
      product_name: 'Mens Rolex Wat..',
      price: '1200',
      condition: 'Brand New',
      seller_image: IMAGES.Ellipse7,
      seller_name: 'immy van',
      posting_day: 'Posted Two Days Ago',
    },
  ];
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
        <ScrollView showsVerticalScrollIndicator={false}>
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
              <TouchableOpacity>
                <CustomIcon
                  size={30}
                  color={'#000000'}
                  origin={ICON_TYPE.MATERIAL_ICONS}
                  name="bookmark-outline"
                />
              </TouchableOpacity>
            </View>
          </View>
          {productDetailData?.data?.files ? (
            <ImageViewww images={productDetailData.data.files} />
          ) : null}
          {/* Main Image */}
          {/* <View style={styles.ImageSizeStyle}>
 <Image source={IMAGES.Rectangle1} style={styles.imageStyle} />
 </View> */}

          {/* small Images */}

          {/* <View style={styles.SmallImageStyle}>
 <Image source={IMAGES.Rectangle1} style={styles.SmallImageSizeStyle} />
 <Image source={IMAGES.Rectangle2} style={styles.SmallImageSizeStyle} />
 <Image source={IMAGES.Rectangle2} style={styles.SmallImageSizeStyle} />
 </View> */}

          {/* Three Dots */}

          {/* <View
 style={{
 flexDirection: 'row',
 alignItems: 'center',
 justifyContent: 'center',
 }}>
 <View
 style={{
 height: 8,
 width: 8,
 borderRadius: 4,
 backgroundColor: 'black',
 margin: 5,
 }}></View>
 <View
 style={{
 height: 6,
 width: 6,
 borderRadius: 3,
 backgroundColor: '#5C5C5C',
 margin: 5,
 }}></View>
 <View
 style={{
 height: 6,
 width: 6,
 borderRadius: 3,
 backgroundColor: '#5C5C5C',
 margin: 5,
 }}></View>
 </View> */}

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
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              width: '100%',
              marginVertical: 5,
            }}>
            <Text style={{fontFamily: 'OpenSans-Regular'}}>
              {capitalizeFirstLetter(productDetailData?.data?.product_status)}
            </Text>
          </View>

          {/* Seller Details */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginVertical: 5,
              //backgroundColor: 'red',
              //maxWidth:SPACING.SCALE_00
            }}>
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

            <View style={{width: SPACING.SCALE_285}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontFamily: 'OpenSans-Regular',
                    fontSize: 14,
                    margin: 4,
                  }}>
                  {productDetailData?.data?.user?.name?.length > 8
                    ? addEllipsis(productDetailData?.data?.user?.name, 8)
                    : productDetailData?.data?.user?.name?.length}
                </Text>
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
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 6,
                  }}>
                  {productDetailData?.data?.location ? (
                    <>
                      <Image
                        style={{height: 14.6, width: 12, marginRight: 6}}
                        source={IMAGES.locationIcon}
                      />
                      <View style={{maxWidth: 200}}>
                        <Text
                          style={{
                            fontFamily: 'OpenSans-Regular',
                            fontSize: 15,
                          }}>
                          {productDetailData?.data?.location}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <Text>No address</Text>
                  )}
                </View>
              </View>
            </View>
          </View>

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

          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              //backgroundColor: 'red',
            }}>
            <ReadMore content={productDetailData?.data?.description} />
            {/* <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 1}
              style={{fontFamily: 'OpenSans-Regular', fontSize: 16}}>
              {productDetailData?.data?.description}{' '}
            </Text> */}

            {/* {textShown ? (
              <Text
                onPress={toggleNumberOfLines}
                style={{
                  fontFamily: 'OpenSans-Regular',
                  color: COLORS.HYPERLINK,
                  textDecorationLine: 'underline',
                }}>
                {textShown ? 'Read less' : 'Read more'}
              </Text>
            ) : null} */}
          </View>

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

          {/* horizontal watcehs */}
          <View style={{marginTop: SPACING.SCALE_25, zIndex: -2}}>
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
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
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
            }}>
            <Custombutton
              title="Make Offer"
              //marginTop={50}
              height={SPACING.SCALE_50}
              width={SPACING.SCALE_160}
              // marginHorizontal={20}
              // onPress={() => {
              // // Alert.alert('Make an Offer');
              // }}
            />
            <Custombutton2
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
              justifyContent: 'space-evenly',
              marginTop: 20,
              marginBottom: 20,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
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
                      if (addToCompareReducer.productCompareList.length >= 4) {
                        showAlert({
                          title: 'Alert',
                          message: 'You can not add more than four products.',
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
                            addToCompareReducer.productCompareList.length >= 1
                          ) {
                            onAddToProductCompare(productDetailData?.data);
                            navigation.navigate(RoutesName.ITEM_COMPARISON, {
                              product_id: props.route.params.product_id,
                            });
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
                    <Text style={{marginLeft: 10}}>Add to compare</Text>
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
            <View>
              <TouchableOpacity
                onPress={() => {
                  // Alert.alert('Price Alert');
                }}>
                <Text
                  style={{
                    fontFamily: 'Cabin-SemiBold',
                    color: COLORS.HYPERLINK,
                  }}>
                  Price Alert
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={30} color={COLORS.APPGREEN} />
        </View>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state?.authReducer,
    addToCompareReducer: state?.addToCompareReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  onAddToProductCompare: params => dispatch(onAddToProductCompare(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
