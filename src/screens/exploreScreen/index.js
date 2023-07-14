import {
  View,
  Text,
  Image,
  Alert,
  Dimensions,
  Linking,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Slider from '@react-native-community/slider';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Search from '../../components/Search';
import {COLORS, IMAGES, SPACING} from '../../resources';
import styles from './styles';
import StoryScreen from '../../components/StoryScreen';
import CustomText from '../../components/CustomText';
import Banner from '../../components/BannerComponent';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTrendyWishlist,
  addWishlist,
  brandListing,
  clearProductsState,
  exploreBannerListing,
  exploreProductListing,
  exploreTrendyWatchesListing,
  increaseCurrentPage,
  toggleTabBar,
} from '../../redux/explore.slice';
import TouchableImage from '../../components/TouchableImage';
import {addEllipsis, formatTimestamp} from '../../helper/commonFunction';
import Custombutton from '../../components/Button1';
import Custombutton2 from '../../components/Button2';
import {useFocusEffect} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

let promise;
const ExploreScreen = props => {
  const dispatch = useDispatch();
  const flatListRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterSortToggle, setFilterSortToggle] = useState(0);
  const [sortselectedItem, setSortSelectedItem] = useState(null);
  const [categorySelectedItem, setCategorySelectedItem] = useState(null);
  const [locationtype, setLocationType] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFilterView, setSelectedFilterView] = useState(null);
  const [distance, setDistance] = useState(0);
  const [onMinFocus, setMinFocus] = useState(false);
  const [onMaxFocus, setMaxFocus] = useState(false);
  const [selectCategory, setSelectCategory] = useState({});
  const [minPrice, setMinPrice] = useState('');
  const [onRequestRefresh, setOnRequestRefresh] = useState(false);
  let minPricee = useRef('');
  let maxPricee = useRef('');
  let sortByy = useRef('');
  let dirr = useRef('');
  let distancee = useRef('');

  function clearAllFilterStates() {
    setFilterSortToggle(0);
    setSortSelectedItem(null);
    setCategorySelectedItem(null);
    setLocationType(null);
    setSelectedBrands([]);
    setSelectedFilterView(null);
    setDistance(0);
    minPricee.current = '';
    maxPricee.current = '';
    sortByy.current = '';
    dirr.current = '';
    distancee.current = '';
  }

  const handleDistanceChange = value => {
    distancee.current = value;
    setDistance(value);
  };

  const handleViewSelection = view => {
    setSelectedFilterView(prevView => (prevView === view ? null : view));
  };

  const {error, loading, products, productResponse} = useSelector(
    state => state?.exploreReducer,
  );
  const {brandsError, brandsLoading, brands} = useSelector(
    state => state?.exploreReducer,
  );

  const {bannerLoading, bannerList, bannerListError} = useSelector(
    state => state?.exploreReducer,
  );

  const {
    trendyWatchesProductsLoading,
    trendyWatchesProductsError,
    trendyWatchesProducts,
  } = useSelector(state => state?.exploreReducer);
  const {
    productAddWishListLoading,
    productAddWishListError,
    productAddWishListData,
  } = useSelector(state => state?.exploreReducer);

  useEffect(() => {
    console.log('Use effect is called ===');
    dispatch(exploreProductListing({page: currentPage}));
  }, [currentPage]);

  useFocusEffect(
    useCallback(() => {
      console.log('use focus effect is called====');
      checkLocationPermission();
      dispatch(brandListing());
      dispatch(exploreTrendyWatchesListing());
      dispatch(exploreBannerListing());
    }, []),
  );

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          _getCurrentLocation();
        } else {
          checkLocationPermission();
        }
      } catch (err) {
        console.log('err', err);
      }
    };
    requestLocationPermission();
  }, []);

  const _getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      success => {
        console.log('success', success);
      },
      err => {
        console.log('errotr ', err);
      },
    );
  };

  const checkLocationPermission = async () => {
    const permission =
      Platform.OS === 'android'
        ? Platform.Version > 28
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    try {
      const result = await check(permission);
      if (result === RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log('Location permission not granted');
        requestLocationPermission();
      }
    } catch (error) {
      console.log('Error checking location permission:', error);
    }
  };

  const requestLocationPermission = async () => {
    const permission =
      Platform.OS === 'android'
        ? Platform.Version > 28
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    try {
      const result = await request(permission);
      if (result === RESULTS.GRANTED) {
        console.log('Location permission granted');
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
        requirePermission();
      }
    } catch (error) {
      console.log('Error requesting location permission:', error);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log('asdfghjk', position.coords);
      },
      error => {
        console.error(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const requirePermission = () => {
    Alert.alert(
      'Turn on Location Services to allow SWI to determine your location.',
      '',
      [
        {text: 'Go to Settings', onPress: openSetting},
        {text: "Don't Use Location", onPress: () => {}},
      ],
    );
  };

  const openSetting = () => {
    Linking.openSettings().catch(() => {
      console.log('Unable to open settings');
    });
  };

  const handleItemClick = index => {
    const clickedItem = bannerList?.data[index];
    if (clickedItem.link) {
      Linking.openURL(clickedItem.link);
    }
  };

  const loadMore = () => {
    console.log('LOAD MORE -------');
    if (page < productResponse?.data?.last_page) {
      console.log('LOAD MORE NEXT-------');
      setPage(page + 1);
      setIsLoading(true);
      dispatch(exploreProductListing({page: page}));
      setIsLoading(false);
    }
  };

  const Item = ({
    product_image,
    product_name,
    price,
    condition,
    seller_image,
    seller_name,
    posting_day,
    onPress,
    wishListPress,
    isInWishlist,
    id,
  }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.outer}>
          <View style={styles.inner}>
            {product_image ? (
              <Image source={{uri: product_image}} style={styles.imageStyle} />
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: SPACING.SCALE_160,
                  height: SPACING.SCALE_279,
                }}>
                <Text>No Image</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={wishListPress}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                height: 20,
                width: 20,
              }}>
              <Image
                style={{
                  tintColor:
                    isInWishlist || productAddWishListData.id === id
                      ? COLORS.APPGREEN
                      : null,
                }}
                source={IMAGES.Vector1}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'OpenSans-SemiBold',
                marginLeft: 10,
                marginTop: 8,
                color: 'black',
              }}>
              {product_name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize: 13,
                  color: COLORS.APPGREEN,
                  marginLeft: 6,
                  fontWeight: '600',
                }}>
                {'$'} {price} .
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  fontFamily: 'OpenSans-Regular',
                  fontSize: 12,
                  marginTop: 2,
                  color: COLORS.APPGREEN,
                }}>
                {' '}
                {condition}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
                //justifyContent: 'center',
              }}>
              <View>
                {seller_image ? (
                  <Image
                    source={{uri: seller_image}}
                    style={{
                      height: 17,
                      width: 17,
                      borderRadius: 17 / 2,
                      marginTop: 5,
                      marginLeft: 8,
                    }}
                  />
                ) : (
                  <View>
                    <Text>No Image</Text>
                  </View>
                )}
              </View>
              <View>
                <Text style={{fontFamily: 'OpenSans-SemiBold', marginLeft: 10}}>
                  {addEllipsis(seller_name, 10)}
                </Text>
              </View>
            </View>
            <Text
              style={{
                marginLeft: 10,
                fontFamily: 'OpenSans-Regular',
                fontSize: 8,
                marginTop: 13,
              }}>
              {formatTimestamp(posting_day)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // for trendy watches
  const Itemm = ({
    product_image,
    product_name,
    price,
    condition,
    seller_image,
    seller_name,
    posting_day,
    onPress,
    wishListPress,
    isInWishlist,
    id,
  }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.outer}>
          <View style={styles.inner}>
            {product_image ? (
              <Image source={{uri: product_image}} style={styles.imageStyle} />
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: SPACING.SCALE_160,
                  height: SPACING.SCALE_279,
                }}>
                <Text>No Image</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={wishListPress}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                height: 20,
                width: 20,
              }}>
              <Image
                style={{
                  tintColor:
                    isInWishlist || productAddWishListData.id === id
                      ? COLORS.APPGREEN
                      : null,
                }}
                source={IMAGES.Vector1}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'OpenSans-SemiBold',
                marginLeft: 10,
                marginTop: 8,
                color: 'black',
              }}>
              {product_name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize: 13,
                  color: COLORS.APPGREEN,
                  marginLeft: 6,
                  fontWeight: '600',
                }}>
                {'$'} {price} .
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  fontFamily: 'OpenSans-Regular',
                  fontSize: 12,
                  marginTop: 2,
                  color: COLORS.APPGREEN,
                }}>
                {' '}
                {condition}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
                //justifyContent: 'center',
              }}>
              <View>
                {seller_image ? (
                  <Image
                    source={{uri: seller_image}}
                    style={{
                      height: 17,
                      width: 17,
                      borderRadius: 17 / 2,
                      marginTop: 5,
                      marginLeft: 8,
                    }}
                  />
                ) : (
                  <View>
                    <Text>No Image</Text>
                  </View>
                )}
              </View>
              <View>
                <Text style={{fontFamily: 'OpenSans-SemiBold', marginLeft: 10}}>
                  {addEllipsis(seller_name, 10)}
                </Text>
              </View>
            </View>
            <Text
              style={{
                marginLeft: 10,
                fontFamily: 'OpenSans-Regular',
                fontSize: 8,
                marginTop: 13,
              }}>
              {formatTimestamp(posting_day)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // for Top notch watches
  const renderItem = ({item, index}) => (
    // console.log(item, 'ghghghghghghgh'),
    <Item
      key={index}
      product_image={item.thumb_image}
      product_name={item.title}
      price={item.price}
      condition={item.watch_condition}
      seller_image={item.thumb_image}
      seller_name={item.user.name}
      posting_day={item.created_at}
      isInWishlist={item.isInWishlist}
      id={item.id}
      onPress={() => {
        // Handle item press
        props.navigation.navigate('ProductDetails', {product_id: item.id});
      }}
      wishListPress={() => {
        //Alert.alert(item?.id.toString(), index.toString());
        dispatch(
          addWishlist({
            product_id: item?.id,
            index: index,
          }),
        );

        // Alert.alert(item?.id.toString(), item?.user?.id.toString());
      }}
    />
  );
  //for trendy watches
  const renderItemm = ({item, index}) => (
    // console.log(item, 'ghghghghghghgh'),
    <Itemm
      key={index}
      product_image={item.thumb_image}
      product_name={item.title}
      price={item.price}
      condition={item.watch_condition}
      seller_image={item.thumb_image}
      seller_name={item.user.name}
      posting_day={item.created_at}
      isInWishlist={item.isInWishlist}
      id={item.id}
      onPress={() => {
        // Handle item press
        props.navigation.navigate('ProductDetails', {product_id: item.id});
      }}
      wishListPress={() => {
        console.log('hjdgsjkkdsksdklkjkld');
        //Alert.alert(item?.id.toString(), index.toString());
        dispatch(
          addTrendyWishlist({
            product_id: item?.id,
            index: index,
          }),
        );
        // );
        // Alert.alert(item?.id.toString(), item?.user?.id.toString());
      }}
    />
  );
  const onSubmitEditing = () => {
    dispatch(clearProductsState());
    dispatch(exploreProductListing({page: '1', keyWord: keyword}));
    setKeyword('');
  };
  const sortingItems = [
    'Recently added',
    'Price: Low to High',
    'Price: High to Low',
    'Ascending: A to Z',
    'Descending: Z to A',
  ];
  const categoryItems = [
    {key: 'brand_new', name: 'Brand new', id: 1},
    {key: 'pre_owned', name: 'Pre owned', id: 2},
  ];
  const Location = ['Nearby', 'Distance range'];
  const watchBrands = [
    'Rolex',
    'Omega',
    'Tag Heuer',
    'Patek Philippe',
    'Breitling',
    'Cartier',
    'Audemars Piguet',
    'Tissot',
    'Seiko',
    'Citizen',
    'Fossil',
  ];

  const handleBrandToggle = brand => {
    const isSelected = selectedBrands.includes(brand);
    let updatedSelection = [];

    if (isSelected) {
      updatedSelection = selectedBrands.filter(item => item !== brand);
    } else {
      updatedSelection = [...selectedBrands, brand];
    }

    setSelectedBrands(updatedSelection);
  };

  function filterShow() {
    setFilterVisible(true);
  }

  return (
    <StoryScreen
      NoPadding={true}
      loading={
        bannerLoading ||
        productAddWishListLoading === 'loading' ||
        trendyWatchesProductsLoading ||
        loading
      }>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.searchViewStyle}>
          <Search
            width={SPACING.SCALE_300}
            placeholder={'Search By Product/ Brand/ Model'}
            onChange={e => {
              setKeyword(e);
            }}
            onSubmitEditing={onSubmitEditing}
            value={keyword}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              Alert.alert('pressed');
            }}>
            <Image
              source={IMAGES.bell}
              style={{marginLeft: SPACING.SCALE_10}}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          ListHeaderComponent={header}
          data={products ?? []}
          renderItem={renderItem}
          // keyExtractor={item => {
          //   item.id;
          // }}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={11}
          refreshing={onRequestRefresh}
          onRefresh={() => {
            setOnRequestRefresh(true);
            dispatch(exploreProductListing({page: currentPage}));
            if (products != []) {
              setOnRequestRefresh(false);
            }
          }}
          //ref={flatListRef}
          //onScroll={handleScroll}
          // scrollEventThrottle={16}
          //contentContainerStyle={{paddingLeft: 10, paddingRight: 16}}

          onEndReached={loadMore}
          //onEndReachedThreshold={0.01}
          ListFooterComponent={() => {
            {
              return (
                loading && (
                  <View
                    style={{
                      height: 200,
                      width: 200,
                      alignSelf: 'center',
                      //backgroundColor: 'red',
                    }}>
                    <ActivityIndicator
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        // position: 'absolute',
                        // bottom: SPACING.SCALE_120,
                        // left: SPACING.SCALE_160,
                      }}
                      color={'black'}
                      size={60}
                    />
                  </View>
                )
              );
            }
          }}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterVisible}
        onRequestClose={() => setFilterVisible(false)}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setFilterVisible(false)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            minHeight: SPACING.SCALE_180,
          }}>
          <View style={{flex: 1}} />
        </TouchableOpacity>
        <ScrollView style={[styles.filterStyle, {flexGrow: 1}]}>
          <View
            style={{
              height: SPACING.SCALE_3,
              alignSelf: 'center',
              marginTop: SPACING.SCALE_10,
              width: SPACING.SCALE_50,
              backgroundColor: 'grey',
            }}></View>
          <View
            style={[styles.filterContainer, {marginBottom: SPACING.SCALE_50}]}>
            <View style={styles.filterSortSwitch}>
              <TouchableOpacity
                onPress={() => {
                  if (filterSortToggle === 1) {
                    console.log('filter');
                    setFilterSortToggle(0);
                  }
                }}
                style={styles.switchButton}>
                <Text
                  style={{
                    color: filterSortToggle === 0 ? COLORS.APPGREEN : null,
                    fontWeight: filterSortToggle === 0 ? '600' : null,
                  }}>
                  Filter
                </Text>
                <View
                  style={{
                    position: 'absolute',
                    height: filterSortToggle === 0 ? 2 : 1,
                    width: SPACING.SCALE_166,
                    backgroundColor:
                      filterSortToggle === 0 ? COLORS.APPGREEN : '#000000',
                    opacity: filterSortToggle === 0 ? 1 : 0.25,
                    bottom: 0,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (filterSortToggle === 0) {
                    console.log('sort');
                    setFilterSortToggle(1);
                  }
                }}
                style={styles.switchButton}>
                <Text
                  style={{
                    color: filterSortToggle === 1 ? COLORS.APPGREEN : null,
                    fontWeight: filterSortToggle === 1 ? '600' : null,
                  }}>
                  Sort
                </Text>
                <View
                  style={{
                    position: 'absolute',
                    height: filterSortToggle === 1 ? 2 : 1,
                    width: SPACING.SCALE_166,
                    backgroundColor:
                      filterSortToggle === 1 ? COLORS.APPGREEN : '#000000',
                    opacity: filterSortToggle === 1 ? 1 : 0.25,
                    bottom: 0,
                  }}
                />
              </TouchableOpacity>
            </View>

            {filterSortToggle === 0 ? (
              <View style={{paddingHorizontal: SPACING.SCALE_20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 20,
                  }}>
                  <View style={{width: SPACING.SCALE_140}}>
                    <Text>Min Price</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: 'gray',

                        paddingHorizontal: 10,
                      }}>
                      <Text style={{fontSize: 18, marginRight: 5}}>$</Text>
                      <TextInput
                        //multiline={false}
                        inputMode="numeric"
                        value={minPrice}
                        onChangeText={val => setMinPrice(val)}
                        onFocus={() => setMinFocus(true)}
                        onBlur={() => setMinFocus(false)}
                        style={{
                          //borderBottomWidth: 1,
                          backgroundColor: 'transparent',
                          borderBottomColor: onMinFocus
                            ? COLORS.APPGREEN
                            : COLORS.BLACK,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{width: SPACING.SCALE_140}}>
                    <Text>Max Price</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: 'gray',

                        paddingHorizontal: 10,
                      }}>
                      <Text style={{fontSize: 18, marginRight: 5}}>$</Text>
                      <TextInput
                        inputMode="numeric"
                        onChangeText={val => {
                          maxPricee.current = val;
                          console.log('maxPrice---', maxPricee);
                        }}
                        style={{
                          //borderBottomWidth: 1,
                          backgroundColor: 'transparent',
                        }}
                      />
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => handleViewSelection('Category')}>
                  <View style={styles.filterViewCategoryStyle}>
                    <CustomText
                      fontSize={14}
                      fontFamily={'OpenSans-Regular'}
                      text={'Category'}
                      fontColor={COLORS.greyTextColor}
                    />
                    <Image
                      resizeMode="contain"
                      source={
                        selectedFilterView === 'Category'
                          ? IMAGES.downArrow
                          : IMAGES.Arrow
                      }
                    />
                  </View>
                </TouchableOpacity>
                {selectedFilterView === 'Category' && (
                  <View style={{flexDirection: 'row'}}>
                    {categoryItems.map((item, index) => {
                      return (
                        <TouchableOpacity
                          style={{
                            marginVertical: SPACING.SCALE_7,
                            marginLeft: SPACING.SCALE_15,
                          }}
                          key={`category${index}`}
                          onPress={() => setSelectCategory(item)}>
                          <View style={styles.sortObjectStyle}>
                            <View style={styles.dotIndicatorStyle}>
                              {item.id === selectCategory?.id && (
                                <View style={styles.dotInsideIndicatorStyle} />
                              )}
                            </View>
                            <View style={{marginLeft: SPACING.SCALE_7}}>
                              <CustomText
                                fontFamily={'OpenSans-Regular'}
                                fontWeight="bold"
                                text={item.name}
                                fontSize={
                                  item.id === sortselectedItem?.id ? 18 : 17
                                }
                                fontColor={
                                  item.id === selectCategory?.id
                                    ? COLORS.BLACK
                                    : '#1D1D1D'
                                }
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => {
                    handleViewSelection('Brands');
                  }}>
                  <View style={styles.filterViewCategoryStyle}>
                    <CustomText
                      fontSize={14}
                      fontFamily={'OpenSans-Regular'}
                      text={'Brands'}
                      fontColor={COLORS.greyTextColor}
                    />
                    <Image
                      resizeMode="contain"
                      source={
                        selectedFilterView === 'Brands'
                          ? IMAGES.downArrow
                          : IMAGES.Arrow
                      }
                    />
                  </View>
                </TouchableOpacity>
                {selectedFilterView === 'Brands' && (
                  <View>
                    {watchBrands.map((brand, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleBrandToggle(brand)}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: 10,
                        }}>
                        <View
                          style={{
                            width: 24,
                            height: 24,
                            //borderRadius: 12,
                            marginRight: 10,
                            borderWidth: 2,
                            borderColor: COLORS.APPGREEN,
                            backgroundColor: selectedBrands.includes(brand)
                              ? COLORS.APPGREEN
                              : null,

                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          {selectedBrands.includes(brand) && (
                            <Image
                              style={{height: 12, width: 12}}
                              source={IMAGES.tick}
                            />
                          )}
                        </View>
                        <Text style={{marginLeft: 10}}>{brand}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => {
                    handleViewSelection('Location');
                  }}>
                  <View style={styles.filterViewCategoryStyle}>
                    <CustomText
                      fontSize={14}
                      fontFamily={'OpenSans-Regular'}
                      text={'Location'}
                      fontColor={COLORS.greyTextColor}
                    />
                    <Image
                      resizeMode="contain"
                      source={
                        selectedFilterView === 'Location'
                          ? IMAGES.downArrow
                          : IMAGES.Arrow
                      }
                    />
                  </View>
                </TouchableOpacity>
                {selectedFilterView === 'Location' && (
                  <View>
                    {Location.map((item, index) => {
                      return (
                        <TouchableOpacity
                          style={{
                            marginVertical: 7,
                            marginLeft: 15,
                          }}
                          onPress={() => {
                            setLocationType(index);
                            if (item === 'Nearby') {
                              distancee.current = 20;
                            } else if (item === 'Distance range') {
                            }
                          }}>
                          <View style={styles.sortObjectStyle}>
                            <View style={styles.dotIndicatorStyle}>
                              {index === locationtype && (
                                <View style={styles.dotInsideIndicatorStyle} />
                              )}
                            </View>
                            <View style={{marginLeft: SPACING.SCALE_7}}>
                              <CustomText
                                fontFamily={'OpenSans-Regular'}
                                fontWeight="bold"
                                text={item}
                                fontSize={index == locationtype ? 18 : 17}
                                fontColor={
                                  index == locationtype
                                    ? COLORS.BLACK
                                    : '#1D1D1D'
                                }
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })}

                    {locationtype == 1 && (
                      <>
                        <Text>Distance: {distance} km</Text>
                        <Slider
                          style={{width: 330, height: 40}}
                          minimumValue={0}
                          maximumValue={100}
                          minimumTrackTintColor={COLORS.BLACK}
                          maximumTrackTintColor="#000000"
                          step={1}
                          value={distance}
                          onValueChange={handleDistanceChange}
                        />
                      </>
                    )}
                  </View>
                )}
              </View>
            ) : (
              <View style={styles.sortView}>
                {sortingItems.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={{
                        marginVertical: 7,
                      }}
                      onPress={() => {
                        setSortSelectedItem(index);
                        console.log(item, 'kkklkmmk');
                        switch (item) {
                          case 'Recently added':
                            sortByy.current = 'id';
                            break;
                          case 'Price: Low to High':
                            sortByy.current = 'price';
                            dirr.current = 'ASC';
                            break;
                          case 'Price: High to Low':
                            sortByy.current = 'price';
                            dirr.current = 'DESC';
                            break;
                          case 'Ascending: A to Z':
                            sortByy.current = 'title';
                            dirr.current = 'ASC';
                            break;
                          case 'Descending: Z to A':
                            sortByy.current = 'title';
                            dirr.current = 'DESC';
                            break;
                          default:
                            sortByy.current = '';
                            dirr.current = '';
                            break;
                        }
                      }}>
                      <View style={styles.sortObjectStyle}>
                        <View
                          style={{
                            ...styles.dotIndicatorStyle,
                          }}>
                          {index == sortselectedItem && (
                            <View style={styles.dotInsideIndicatorStyle}></View>
                          )}
                        </View>
                        <View style={{marginLeft: SPACING.SCALE_7}}>
                          <CustomText
                            fontFamily={'OpenSans-Regular'}
                            fontWeight="bold"
                            text={item}
                            fontSize={index == sortselectedItem ? 18 : 17}
                            fontColor={
                              index == sortselectedItem
                                ? COLORS.BLACK
                                : '#1D1D1D'
                            }
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 30,
              }}>
              <Custombutton
                height={50}
                width={160}
                title={'Apply'}
                onPress={() => {
                  console.log(
                    'values for filter---',

                    minPricee.current,
                    maxPricee.current,
                    distancee.current,
                    sortByy.current,
                    dirr.current,
                  );
                  if (
                    selectCategory ||
                    minPricee.current !== '' ||
                    maxPricee.current !== '' ||
                    distancee.current !== '' ||
                    sortByy.current !== '' ||
                    dirr !== ''
                  ) {
                    dispatch(
                      exploreProductListing({
                        distance: distancee.current,
                        sortby: sortByy.current,
                        dir: dirr.current,
                        min_price: minPricee.current,
                        max_price: maxPricee.current,
                        watch_condition: selectCategory?.key,
                      }),
                    );
                    setFilterVisible(!filterVisible);
                    clearAllFilterStates();
                  } else {
                    Alert.alert('', 'Please apply one filter !');
                  }
                  dispatch(toggleTabBar(false));
                }}
              />
              <Custombutton2
                onPress={clearAllFilterStates}
                height={50}
                width={160}
                title={'Reset'}
              />
            </View>
          </View>
        </ScrollView>
      </Modal>
    </StoryScreen>
  );

  function header() {
    return (
      <View>
        <Banner
          image={bannerList?.data ?? []}
          width={Dimensions.get('window').width}
          height={200}
          onItemClick={handleItemClick}
        />
        <View style={{}}>
          <View style={{marginLeft: 18, marginTop: 15}}>
            <CustomText
              text={'Check out trendy watches for you'}
              fontSize={20}
              fontFamily={'Cabin-Medium'}
              fontColor={COLORS.BLACK}
            />
          </View>

          {trendyWatchesProducts?.data?.length != 0 ? (
            <FlatList
              data={trendyWatchesProducts?.data}
              renderItem={renderItemm}
              //keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              //onScroll={handleScroll}
              //scrollEventThrottle={16}
            />
          ) : (
            <>
              <CustomText text={'No Record'} />
            </>
          )}
          <View
            style={{
              position: 'absolute',
              top: SPACING.SCALE_100,
              right: SPACING.SCALE_10,
            }}>
            <TouchableImage
              source={IMAGES.rightArrow}
              height={30}
              width={30}
              onPress={() => {}}
            />
          </View>
          <View
            style={{
              marginLeft: 18,
              marginTop: 18,
              flexDirection: 'row',
              marginRight: 18,
              justifyContent: 'space-between',
            }}>
            <CustomText
              text={'Top-notch watches'}
              fontSize={20}
              fontFamily={'Cabin-Bold'}
              fontWeight={700}
            />
            <TouchableImage
              source={IMAGES.filter}
              height={30}
              width={30}
              onPress={filterShow}
            />
          </View>
        </View>
      </View>
    );
  }
};

const Item = React.memo(
  ({
    product_image,
    product_name,
    price,
    condition,
    seller_image,
    seller_name,
    posting_day,
    onPress,
    wishListPress,
    isInWishlist,
    id,
    productAddWishListData,
  }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.outer}>
          <View style={styles.inner}>
            {product_image ? (
              <Image source={{uri: product_image}} style={styles.imageStyle} />
            ) : null}
            <TouchableOpacity
              onPress={wishListPress}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                height: 20,
                width: 20,
              }}>
              <Image
                style={{
                  tintColor:
                    isInWishlist || productAddWishListData.id === id
                      ? COLORS.APPGREEN
                      : null,
                }}
                source={IMAGES.Vector1}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'OpenSans-SemiBold',
                marginLeft: 10,
                marginTop: 8,
                color: 'black',
              }}>
              {product_name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize: 13,
                  color: COLORS.APPGREEN,
                  marginLeft: 6,
                  fontWeight: '600',
                }}>
                {'$'} {price} .
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  fontFamily: 'OpenSans-Regular',
                  fontSize: 12,
                  marginTop: 2,
                  color: COLORS.APPGREEN,
                }}>
                {' '}
                {condition}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
                //justifyContent: 'center',
              }}>
              {seller_image ? (
                <View>
                  <Image
                    source={{uri: seller_image}}
                    style={{
                      height: 17,
                      width: 17,
                      borderRadius: 17 / 2,
                      marginTop: 5,
                      marginLeft: 8,
                    }}
                  />
                </View>
              ) : null}
              <View>
                <Text style={{fontFamily: 'OpenSans-SemiBold', marginLeft: 10}}>
                  {addEllipsis(seller_name, 10)}
                </Text>
              </View>
            </View>
            <Text
              style={{
                marginLeft: 10,
                fontFamily: 'OpenSans-Regular',
                fontSize: 8,
                marginTop: 13,
              }}>
              {formatTimestamp(posting_day)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

export default ExploreScreen;
