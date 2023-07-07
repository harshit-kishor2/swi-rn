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
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
  exploreReducer,
  exploreTrendyWatchesListing,
} from '../../redux/explore.slice';
import {exploreActions} from '../../redux/explore.slice';
import ProductViewComponent from '../../components/ProductViewComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TouchableImage from '../../components/TouchableImage';
import moment from 'moment';
import fonts from '../../resources/fonts';
import {addEllipsis, formatTimestamp} from '../../helper/commonFunction';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const ExploreScreen = () => {
  const flatListRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [currentPage, setCurrentPage] = useState(1); // Current page of data
  const [loadingMore, setLoadingMore] = useState(false);

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
  // console.log(bannerLoading, bannerList, bannerListError, '---->>>>');
  // console.log(error, loading, products?.data?.data, 'fgdjhgfdsghfjkdshjkfhskh');
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
    dispatch(exploreProductListing({page: currentPage}));
    dispatch(exploreTrendyWatchesListing());
    dispatch(exploreBannerListing());
  }, [currentPage]);

  const handleItemClick = index => {
    const clickedItem = bannerList?.data[index];
    if (clickedItem.link) {
      Linking.openURL(clickedItem.link);
    }
  };

  const dispatch = useDispatch();

  const handleScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const contentSize = event.nativeEvent.contentSize.width;
    const layoutSize = event.nativeEvent.layoutMeasurement.width;
    const progress = contentOffset / (contentSize - layoutSize);
    setScrollProgress(progress);
  };

  // code to know End of ScrollView

  //-------------
  function loadMoreData() {
    console.log('loadmore');
    console.log(products?.data?.last_page);
    console.log(currentPage);
    if (currentPage < products?.data?.last_page) {
      console.log('#######');
      if (!loadingMore) {
        console.log('222222');
        setCurrentPage(prevPage => prevPage + 1); // Increment the current page
        setLoadingMore(true); // Set loadingMore flag to true
      }
    } else {
      setCurrentPage(1);
      setLoadingMore(false);
    }
  }

  ////===============

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
            <Image source={{uri: product_image}} style={styles.imageStyle} />
            <TouchableOpacity
              onPress={wishListPress}
              style={{
                position: 'absolute',
                top: 3,
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
                marginLeft: 2,
                color: 'black',
              }}>
              {product_name}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Text
                style={{
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize: 12,
                  color: 'blue',
                  marginLeft: 6,
                }}>
                {'$'} {price} .
              </Text>
              <Text
                style={{
                  fontFamily: 'OpenSans-Regular',
                  fontSize: 10,
                  marginTop: 2,
                  color: 'blue',
                }}>
                {' '}
                {condition}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 5}}>
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
              <View>
                <Text style={{fontFamily: 'OpenSans-SemiBold', marginLeft: 10}}>
                  {addEllipsis(seller_name, 10)}
                </Text>
              </View>
            </View>
            <Text
              style={{
                marginLeft: 7,
                fontFamily: 'Open Sans',
                fontSize: 8,
                marginTop: 10,
              }}>
              {formatTimestamp(posting_day)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item, index}) => (
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
        // Handle item press
      }}
      wishListPress={() => {
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

  return (
    <StoryScreen NoPadding={true}>
      <View>
        <View style={styles.searchViewStyle}>
          <Search
            width={SPACING.SCALE_300}
            placeholder={'Search By Product/ Brand/ Model'}
            onChange={e => {
              console.log(e);
            }}
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

        {/* <View style={styles.progressContainer}>
              <View
                style={[
                  styles.progressBar,
                  {width: `${scrollProgress * 100}%`},
                ]}
              />
            </View> */}
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size={30} color={COLORS.BLACK} />
            <CustomText
              text={'Poducts are loading'}
              fontColor={fonts.black}
              fontSize={18}
            />
          </View>
        ) : (
          <FlatList
            ListHeaderComponent={header}
            data={products?.data?.data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ref={flatListRef}
            //onScroll={handleScroll}
            // scrollEventThrottle={16}
            contentContainerStyle={{paddingLeft: 10, paddingRight: 16}}
            onEndReached={loadMoreData}
          />
        )}
      </View>
    </StoryScreen>
  );

  function header() {
    return (
      <>
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
        <View style={{marginTop: 20}}>
          <View style={{marginLeft: 18}}>
            <CustomText
              text={'Check out trendy watches for you'}
              fontSize={20}
              fontFamily={'Cabin-Bold'}
            />
          </View>

          {/* <View style={styles.progressContainer}>
            <View
              style={[styles.progressBar, {width: `${scrollProgress * 100}%`}]}
            />
          </View> */}

          {trendyWatchesProducts?.data?.length != 0 ? (
            <FlatList
              head
              data={trendyWatchesProducts?.data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              // ref={flatListRef}
              // onScroll={handleScroll}
              scrollEventThrottle={16}
            />
          ) : (
            <>
              <CustomText text={'No Record'} />
            </>
          )}
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
              marginTop: 20,
              flexDirection: 'row',
              marginRight: 18,
              justifyContent: 'space-between',
            }}>
            <CustomText
              text={'Top-notch watches'}
              fontSize={20}
              fontFamily={'Cabin - Bold'}
              fontWeight={700}
            />
            <TouchableImage
              source={IMAGES.filter}
              height={30}
              width={30}
              onPress={() => {
                Alert.alert('', 'Filter');
              }}
            />
          </View>
        </View>
      </>
    );
  }
};

export default ExploreScreen;
