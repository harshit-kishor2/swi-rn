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

const ProductDetails = props => {
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
    if (props.route?.params?.product_id) {
      dispatch(
        exploreProductDetail({
          product_id: props.route.params.product_id,
        }),
      );
    }
  }, [props.route?.params?.product_id]);

  // Image view logic =======================

  const ImageView = ({images}) => {
    const [selectedImage, setSelectedImage] = useState(0);
    console.log(images, 'dfshfshk');

    const handleImagePress = index => {
      setSelectedImage(index);
    };

    return (
      <View style={styles.container}>
        <View style={styles.mainView}>
          <Image
            style={styles.mainImage}
            source={{uri: images[selectedImage].file}}
          />
        </View>
        <View style={styles.thumbnailContainer}>
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.thumbnail,
                selectedImage === index && styles.selectedThumbnail,
              ]}
              onPress={() => handleImagePress(index)}>
              <Image style={styles.thumbnailImage} source={{uri: image.file}} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.dotContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                selectedImage === index && styles.selectedDot,
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
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
    <SafeAreaView>
      {productDetailLoading === false ? (
        <ScrollView showsVerticalScrollIndicator={false}>
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
              {productDetailData?.data?.gender_type}'s{' '}
              {productDetailData?.data?.bracelet} Watch with Leather Strap
            </Text>
            <Text style={{fontFamily: 'OpenSans-SemiBold', fontSize: 18}}>
              Rolex - Model 10245
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontFamily: 'Cabin-Bold', color: COLORS.HYPERLINK}}>
                ${productDetailData?.data?.price}{' '}
              </Text>
              <Text
                style={{fontFamily: 'Cabin-Regular', color: COLORS.HYPERLINK}}>
                . BrandNew
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
              source={IMAGES.Ellipse7}
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
                  Immy van
                </Text>
                <Text style={{fontFamily: 'OpenSans-Regular', fontSize: 12}}>
                  Posted 2 Days ago
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image source={IMAGES.LocationImage} />
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
                Watch with Original Box
              </Text>
            </View>
            <View style={styles.SpecifiactionView}>
              <Text style={styles.SpecifiactionText1}>Dial</Text>
              <Text style={styles.SpecifiactionText2}>White</Text>
            </View>
            <View style={styles.SpecifiactionView}>
              <Text style={styles.SpecifiactionText1}>Dial Markers</Text>
              <Text style={styles.SpecifiactionText2}>Index</Text>
            </View>
            <View style={styles.SpecifiactionView}>
              <Text style={styles.SpecifiactionText1}>Case Size </Text>
              <Text style={styles.SpecifiactionText2}>26mm ~ 63mm</Text>
            </View>
            <View style={styles.SpecifiactionView}>
              <Text style={styles.SpecifiactionText1}>Movement </Text>
              <Text style={styles.SpecifiactionText2}>Automatic</Text>
            </View>
          </View>

          {/* ReadMore Text */}

          <View style={{alignSelf: 'center', width: '90%', marginTop: 30}}>
            <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 1}
              style={{fontFamily: 'OpenSans-Regular', fontSize: 16}}>
              Futuristic and sterile, fully luminous white to sunburst black and
              gilt Future... Futuristic and sterile, fully luminous white to
              sunburst black and gilt Future...{' '}
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
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
};

export default ProductDetails;
