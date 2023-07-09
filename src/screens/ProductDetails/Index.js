import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, IMAGES, SPACING} from '../../resources';
import styles from './styles';
import {useState, useCallback} from 'react';
import ProductViewComponent from '../../components/ProductViewComponent';
import Custombutton from '../../components/Button1';
import Custombutton2 from '../../components/Button2';
import {AlarmType} from '@notifee/react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {exploreProductDetail} from '../../redux/explore.slice';
import {addEllipsis, formatTimestamp} from '../../helper/commonFunction';

const ProductDetails = ({route, navigation}) => {
  const {product_id} = route.params;
  console.log(product_id, 'ggggklk');
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const dispatch = useDispatch();

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
    dispatch(
      exploreProductDetail({
        product_id: product_id,
      }),
    );
  }, []);

  // Image view logic =======================

  const ImageView = ({images}) => {
    const [selectedImage, setSelectedImage] = useState(0);
    console.log(images, 'dfshfshk');

    const handleImagePress = index => {
      setSelectedImage(index);
    };

    return (
      <View style={styless.container}>
        <View style={styless.mainView}>
          <Image
            style={styless.mainImage}
            source={{uri: images[selectedImage].file}}
          />
        </View>
        <View style={styless.thumbnailContainer}>
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styless.thumbnail,
                selectedImage === index && styless.selectedThumbnail,
              ]}
              onPress={() => handleImagePress(index)}>
              <Image
                style={styless.thumbnailImage}
                source={{uri: image.file}}
              />
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
      paddingHorizontal: 85,
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

  return (
    <SafeAreaView style={{flex: 1}}>
      {productDetailLoading === false ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            //header
          }
          <View style={styles.headerStyle}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                style={{height: SPACING.SCALE_13, width: SPACING.SCALE_40}}
                source={IMAGES.BACKARROW}
              />
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert('Product id', product_id.toString());
                }}>
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
                <Image
                  style={{height: SPACING.SCALE_24, width: SPACING.SCALE_19}}
                  source={IMAGES.Favorite}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ImageView images={productDetailData.data.files} />
          {/* Main Image  */}
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
              {productDetailData?.data?.product_status}
            </Text>
          </View>

          {/* Seller Details */}

          <View
            style={{
              //backgroundColor: 'red',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginVertical: 5,
            }}>
            <Image
              source={{uri: productDetailData?.data?.user?.image}}
              style={{height: 45, width: 45, borderRadius: 45 / 2}}
            />
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontFamily: 'OpenSans-Regular', fontSize: 15}}>
                  {productDetailData?.data?.user?.name?.length > 8
                    ? addEllipsis(productDetailData?.data?.user?.name, 8)
                    : productDetailData?.data?.user?.name?.length}
                </Text>
                <Text style={{fontFamily: 'OpenSans-Regular', fontSize: 12}}>
                  {formatTimestamp(productDetailData?.data?.user?.created_at)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 6,
                }}>
                <Image
                  style={{height: 14.6, width: 12, marginRight: 6}}
                  source={IMAGES.LocationImage}
                />
                <Text style={{fontFamily: 'OpenSans-Regular', fontSize: 15}}>
                  3018, Singapore Marina Bay
                </Text>
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

          {/* Specifications  */}
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              // backgroundColor: 'red',
              paddingHorizontal: 20,
            }}>
            <View style={styles.SpecifiactionView}>
              <Text style={styles.SpecifiactionText1}>Accessories</Text>
              <Text style={styles.SpecifiactionText2}>
                {productDetailData?.data?.accessories}
              </Text>
            </View>
            <View style={styles.SpecifiactionView}>
              <Text style={styles.SpecifiactionText1}>Dial</Text>
              <Text style={styles.SpecifiactionText2}>
                {productDetailData?.data?.dial}
              </Text>
            </View>
            <View style={styles.SpecifiactionView}>
              <Text style={styles.SpecifiactionText1}>Dial Markers</Text>
              <Text style={styles.SpecifiactionText2}>
                {productDetailData?.data?.dial_markers}
              </Text>
            </View>
            <View style={styles.SpecifiactionView}>
              <Text style={styles.SpecifiactionText1}>Case Size </Text>
              <Text style={styles.SpecifiactionText2}>
                {productDetailData?.data?.case_size}
              </Text>
            </View>
            <View style={styles.SpecifiactionView}>
              <Text style={styles.SpecifiactionText1}>Movement </Text>
              <Text style={styles.SpecifiactionText2}>
                {productDetailData?.data?.movement}
              </Text>
            </View>
          </View>

          {/* ReadMore Text */}

          <View style={{alignSelf: 'center', width: '90%', marginTop: 30}}>
            <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 1}
              style={{fontFamily: 'OpenSans-Regular', fontSize: 16}}>
              {productDetailData?.data?.description}{' '}
            </Text>

            {true ? (
              <Text
                onPress={toggleNumberOfLines}
                style={{
                  fontFamily: 'OpenSans-Regular',
                  color: COLORS.HYPERLINK,
                  textDecorationLine: 'underline',
                }}>
                {textShown ? 'Read less' : 'Read more'}
              </Text>
            ) : null}
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

          <View style={{marginTop: 25}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 16,
              }}>
              <Text style={{fontFamily: 'OpenSans-Bold'}}>Price Chart</Text>
              <View>
                <Text style={{fontFamily: 'OpenSans-Regular', fontSize: 12}}>
                  Last 4 week{' '}
                </Text>
              </View>
            </View>
            <View>
              {/* <Image
            style={{height: SPACING.SCALE_196, width: SPACING.SCALE_344}}
            source={IMAGES.priceChartImage}
          /> */}
            </View>
          </View>

          {/* horizontal watcehs  */}
          <View style={{marginTop: 40}}>
            <Text style={{marginLeft: 20}}>Suggested watches for you</Text>
            <ProductViewComponent />
          </View>

          {/* make an offer and chat button  */}
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
              onPress={() => {
                Alert.alert('Make an Offer');
              }}
            />
            <Custombutton2
              title="Chat"
              //marginTop={50}
              height={SPACING.SCALE_50}
              width={SPACING.SCALE_160}
              // marginHorizontal={20}
              onPress={() => {
                Alert.alert('Chat');
              }}
            />
          </View>

          {/* Compare PriceAlert  */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 20,
              marginBottom: 20,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Image source={IMAGES.CompareImage} />
              <TouchableOpacity
                onPress={() => {
                  Alert.alert('Compare');
                }}>
                <Text style={{marginLeft: 10}}>Compare</Text>
              </TouchableOpacity>
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
                  Alert.alert('Price Alert');
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

export default ProductDetails;
