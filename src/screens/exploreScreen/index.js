import {
  View,
  Text,
  Pressable,
  Image,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
  Linking,
  Button,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Animated,
  ScrollView,
  Modal,
} from 'react-native';
import Slider from '@react-native-community/slider';
import React, {useEffect, useRef, useState} from 'react';
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
  exploreReducer,
  exploreTrendyWatchesListing,
  increaseCurrentPage,
  toggleTabBar,
} from '../../redux/explore.slice';
import {exploreActions} from '../../redux/explore.slice';
import ProductViewComponent from '../../components/ProductViewComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TouchableImage from '../../components/TouchableImage';
import moment from 'moment';
import fonts from '../../resources/fonts';
import {addEllipsis, formatTimestamp} from '../../helper/commonFunction';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Custombutton from '../../components/Button1';
import Custombutton2 from '../../components/Button2';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import LocationInput from '../../LocationInput';

const ExploreScreen = props => {
  const flatListRef = useRef(null);

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

  // states for filter

  const [selectCategory, setSelectCategory] = useState();

  // variable for filter
  let watch_condition1 = useRef('');

  let minPricee = useRef('');
  let maxPricee = useRef('');
  let sortByy = useRef('');
  let dirr = useRef('');
  let distancee = useRef('');

  // clear all values after filter is applied

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

  const navigation = useNavigation();

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
  // console.log(bannerLoading, bannerList, bannerListError, '---->>>>');
  // console.log(brandsError, brandsLoading, brands, 'asdfghjklkjhgfdsdfghj');
  // console.log(
  //   error,
  //   loading,
  //   productResponse,
  //   products?.data?.data,
  //   products?.data?.last_page,

  //   'fgdjhgfdsghfjkdshjkfhskh',
  // );
  // console.log(
  //   trendyWatchesProductsLoading,
  //   trendyWatchesProductsError,
  //   trendyWatchesProducts,
  //   'hkjdshfkjdshfkjdsfhdksjfhjk',
  // );
  // console.log(
  //   productAddWishListLoading,
  //   productAddWishListError,
  //   productAddWishListData,

  //   'ggggggggggggggg',
  // );

  useEffect(() => {
    dispatch(exploreProductListing({page: page}));
    dispatch(brandListing());
    dispatch(exploreTrendyWatchesListing());
    dispatch(exploreBannerListing());
  }, []);

  const handleItemClick = index => {
    const clickedItem = bannerList?.data[index];
    if (clickedItem.link) {
      Linking.openURL(clickedItem.link);
    }
  };

  const dispatch = useDispatch();

  // function loadMoreData() {
  //   setLoadingMore(true);
  //   console.log('loadmore');
  //   console.log('last page of product', products?.data?.last_page);
  //   console.log('current page of API', currentPage);
  //   if (currentPage < products?.data?.last_page) {
  //     console.log(loadingMore, 'loadMore');
  //     // console.log('#######');
  //     if (!loadingMore) {
  //       console.log('222222');
  //       setCurrentPage(prevPage => prevPage + 1); // Increment the current page
  //       setLoadingMore(true); // Set loadingMore flag to true
  //     }
  //   } else {
  //     setCurrentPage(1);
  //     setLoadingMore(false);
  //   }
  // }

  const loadMore = () => {
    console.log('LOAD MORE -------');
    if (page < productResponse?.data?.last_page) {
      console.log('LOAD MORE NEXT-------');
      setPage(page + 1);
      setIsLoading(true);
      dispatch(exploreProductListing({page: page}));
      setIsLoading(false);
    }

    //   dispatch(exploreProductListing({page: page}));

    //   // Assuming the API response returns an array of items

    //   setPage(prevPage => prevPage + 1);
    //   setIsLoading(false);
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    //   setIsLoading(false);
    // }
  };

  // For top notch watches
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
      key={item.id}
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
      key={item.id}
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
  // Filter Data
  const sortingItems = [
    'Recently added',
    'Price: Low to High',
    'Price: High to Low',
    'Ascending: A to Z',
    'Descending: Z to A',
  ];
  const categoryItems = ['Brand_new', 'Pre_owned'];
  const Location = ['Nearby', 'Distance range'];

  // Funnction to handle multiselect
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

  // funtion to manage filter cliok
  function filterShow() {
    setFilterVisible(true);
    dispatch(toggleTabBar(true));
  }

  return filterVisible ? (
    <StoryScreen NoPadding={true} style={{backgroundColor: 'transparent'}}>
      <View style={styles.filterStyle}>
        <View style={styles.filterContainer}>
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

          {filterSortToggle === 0 && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                paddingHorizontal: 20,

                //backgroundColor: 'yellow',
              }}>
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
                    onChangeText={val => {
                      // setMinPrice(val);
                      minPricee.current = val;
                      console.log('minprice---', minPricee);
                    }}
                    style={{
                      backgroundColor: 'transparent',
                      borderBottomColor: onMinFocus
                        ? COLORS.APPGREEN
                        : COLORS.BLACK,
                    }}></TextInput>
                </View>
                <View style={{width: SPACING.SCALE_140}}>
                  <Text>Max Price</Text>
                  <TextInput
                    inputMode="numeric"
                    onChangeText={val => {
                      // setMaxPrice(val);
                      maxPricee.current = val;
                      console.log('maxPrice---', maxPricee);
                    }}
                    style={{
                      backgroundColor: 'transparent',
                      //borderBottomColor: COLORS.BLACK,
                      // borderBottomWidth: 1,
                    }}></TextInput>
                </View>
              </View>
              <TouchableOpacity onPress={() => handleViewSelection('Category')}>
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
                        key={item[index]}
                        style={{
                          marginVertical: 7,
                          marginLeft: 15,
                        }}
                        onPress={() => {
                          setCategorySelectedItem(index);
                          if (item === 'Brand_new') {
                            watch_condition1.current = 'brand_new';
                          } else if (item === 'Pre_owned') {
                            watch_condition1.current = 'pre_owned';
                          }

                          setSelectCategory(item);

                          console.log(item, selectCategory, 'hhhhppp');
                        }}>
                        <View style={styles.sortObjectStyle}>
                          <View
                            style={{
                              ...styles.dotIndicatorStyle,
                              //backgroundColor: '#00958C',
                            }}>
                            {index == categorySelectedItem && (
                              <View
                                style={styles.dotInsideIndicatorStyle}></View>
                            )}
                          </View>
                          <View style={{marginLeft: SPACING.SCALE_7}}>
                            <CustomText
                              fontFamily={'OpenSans-Regular'}
                              fontWeight="bold"
                              text={item}
                              fontSize={index == sortselectedItem ? 18 : 17}
                              fontColor={
                                index == categorySelectedItem
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
                  {brands?.length > 0 ? (
                    brands.map(brand => (
                      <TouchableOpacity
                        key={brand.id}
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
                        <Text style={{marginLeft: 10}}>{brand?.name}</Text>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text>No Brands</Text>
                  )}
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
                            // Alert.alert('nearby');
                            // setDistance(20);
                            // console.log(distance, 'mknjnm');
                          } else if (item === 'Distance range') {
                          }
                          console.log(item, 'klklklkl');
                          console.log(distance, 'mknjnm');
                        }}>
                        <View style={styles.sortObjectStyle}>
                          <View
                            style={{
                              ...styles.dotIndicatorStyle,
                              //backgroundColor: '#00958C',
                            }}>
                            {index == locationtype && (
                              <View
                                style={styles.dotInsideIndicatorStyle}></View>
                            )}
                          </View>
                          <View style={{marginLeft: SPACING.SCALE_7}}>
                            <CustomText
                              fontFamily={'OpenSans-Regular'}
                              fontWeight="bold"
                              text={item}
                              fontSize={index == locationtype ? 18 : 17}
                              fontColor={
                                index == locationtype ? COLORS.BLACK : '#1D1D1D'
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
            </ScrollView>
          )}
          {filterSortToggle === 1 && (
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
                          //backgroundColor: '#00958C',
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
                            index == sortselectedItem ? COLORS.BLACK : '#1D1D1D'
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
                  watch_condition1.current,

                  minPricee.current,
                  maxPricee.current,
                  distancee.current,
                  sortByy.current,

                  dirr.current,
                  // minPrice,
                  // maxPrice,
                  // distance,
                  // selectCategory,
                  // selectedBrands,
                  // dir,
                  // sortBy,
                );
                if (
                  watch_condition1.current !== '' ||
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
                      //brands: selectedBrands,
                      watch_condition: watch_condition1.current,
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
              //backgroundColor={'white'}
              onPress={clearAllFilterStates}
              height={50}
              width={160}
              title={'Reset'}
            />
          </View>
        </View>
      </View>
    </StoryScreen>
  ) : (
    <StoryScreen NoPadding={true}>
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
          <Pressable
            onPress={() => {
              Alert.alert('pressed');
            }}>
            <Image
              source={IMAGES.bell}
              style={{marginLeft: SPACING.SCALE_10}}
            />
          </Pressable>
        </View>

        <FlatList
          ListHeaderComponent={header}
          data={products ?? []}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
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
    </StoryScreen>
  );
  function header() {
    return (
      <View>
        {false ? (
          <ActivityIndicator size={20} />
        ) : (
          <Banner
            image={bannerList?.data ?? []}
            width={Dimensions.get('window').width}
            height={200}
            onItemClick={handleItemClick}
          />
        )}
        <View style={{}}>
          <View style={{marginLeft: 18, marginTop: 15}}>
            <CustomText
              text={'Check out trendy watches for you'}
              fontSize={20}
              fontFamily={'Cabin-Medium'}
              fontColor={COLORS.BLACK}
            />
          </View>

          {/* <View style={styles.progressContainer}>
            <View
              style={[styles.progressBar, {width: `${scrollProgress * 100}%`}]}
            />
          </View> */}

          {trendyWatchesProducts?.data?.length != 0 ? (
            <FlatList
              data={trendyWatchesProducts?.data}
              renderItem={renderItemm}
              keyExtractor={item => item.id}
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

export default ExploreScreen;
