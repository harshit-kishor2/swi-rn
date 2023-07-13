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
  addWishlist,
  exploreBannerListing,
  exploreProductListing,
  exploreTrendyWatchesListing,
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
  const [currentPage, setCurrentPage] = useState(1); // Current page of data
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

  const {error, loading, products} = useSelector(
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
    dispatch(exploreProductListing({page: currentPage}));
  }, [currentPage]);

  useFocusEffect(
    useCallback(() => {
      checkLocationPermission();
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

  function loadMoreData() {
    if (currentPage < products?.data?.last_page) {
      if (!loadingMore) {
        setCurrentPage(prevPage => prevPage + 1); // Increment the current page
        setLoadingMore(true); // Set loadingMore flag to true
      }
    } else {
      setCurrentPage(1);
      setLoadingMore(false);
    }
  }

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <Item
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
            props.navigation.navigate('ProductDetails', {product_id: item.id});
          }}
          productAddWishListData={productAddWishListData}
          wishListPress={() => {
            dispatch(
              addWishlist({
                product_id: item?.id,
                index: index,
              }),
            );
          }}
        />
      );
    },
    [dispatch, productAddWishListData, props.navigation],
  );
  const onSubmitEditing = () => {
    dispatch(exploreProductListing({page: currentPage, keyWord: keyword}));
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
    {key: 'Pre_owned', name: 'Pre owned', id: 2},
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
            autoCapitalize={false}
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
          data={products?.data?.data}
          renderItem={renderItem}
          keyExtractor={item => `productsDataData${item.id}`}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ref={flatListRef}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.1}
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
                    <TextInput
                      inputMode="numeric"
                      value={minPrice}
                      onChangeText={val => setMinPrice(val)}
                      onFocus={() => setMinFocus(true)}
                      onBlur={() => setMinFocus(false)}
                      style={{
                        backgroundColor: 'transparent',
                        borderBottomColor: onMinFocus
                          ? COLORS.APPGREEN
                          : COLORS.BLACK,
                      }}
                    />
                  </View>
                  <View style={{width: SPACING.SCALE_140}}>
                    <Text>Max Price</Text>
                    <TextInput
                      inputMode="numeric"
                      onChangeText={val => {
                        maxPricee.current = val;
                        console.log('maxPrice---', maxPricee);
                      }}
                      style={{
                        backgroundColor: 'transparent',
                      }}
                    />
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
                    <Image source={IMAGES.Arrow} />
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
                          key={`category${item.id}`}
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
                    <Image source={IMAGES.Arrow} />
                  </View>
                </TouchableOpacity>
                {selectedFilterView === 'Brands' && (
                  <View>
                    {watchBrands.map(brand => (
                      <TouchableOpacity
                        key={brand}
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
                    <Image source={IMAGES.Arrow} />
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
          <FlatList
            data={trendyWatchesProducts?.data}
            renderItem={renderItem}
            keyExtractor={item => `trendyWatchesProductsData${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={<CustomText text={'No Record'} />}
          />
          <View style={{position: 'absolute', top: 120, right: 10}}>
            <TouchableImage
              source={IMAGES.rightArrow}
              height={30}
              width={30}
              onPress={() => {
                Alert.alert('Arrow');
              }}
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
