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
import {exploreProductListing} from '../../redux/explore.slice';
import {exploreActions} from '../../redux/explore.slice';
import ProductViewComponent from '../../components/ProductViewComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TouchableImage from '../../components/TouchableImage';
import moment from 'moment';

const ExploreScreen = () => {
  const flatListRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const {error, loading, products} = useSelector(
    state => state?.exploreReducer,
  );
  console.log(error, loading, products?.data, 'fgdjhgfdsghfjkdshjkfhskh');
  console.log('====>>>', products.data);
  useEffect(() => {
    const r = AsyncStorage.getItem('Token');
    console.log('---->>', r);
    dispatch(exploreProductListing());
  }, []);
  const image = [
    {
      id: '1',
      source:
        'https://www.pakainfo.com/wp-content/uploads/2021/09/dummy-user-image-url-300x200.jpg',
      link: 'https://example.com',
    },
    {
      id: '2',
      source:
        'https://www.pakainfo.com/wp-content/uploads/2021/09/online-dummy-image-url-300x201.jpg',
      link: 'https://google.com',
    },
    {
      id: '3',
      source:
        'https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg',
      link: null,
    },
    {
      id: '4',
      source:
        'https://www.pakainfo.com/wp-content/uploads/2021/09/dummy-user-image-url-300x200.jpg',
      link: 'https://openai.com',
    },
  ];
  const handleItemClick = index => {
    const clickedItem = image[index];
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
  //-------------

  function formatTimestamp(timestamp) {
    const currentTime = moment.utc();
    const postTime = moment.utc(timestamp);
    const daysAgo = currentTime.diff(postTime, 'days');

    const formattedTime = daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`;
    return `Posted ${formattedTime}`;
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
              <Image source={IMAGES.Vector1} />
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
                  fontFamily: 'Open Sans',
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
                  {seller_name}
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

  const renderItem = ({item}) => (
    console.log('===>>>', item),
    (
      <Item
        product_image={item.thumb_image}
        product_name={item.title}
        price={item.price}
        condition={item.watch_condition}
        seller_image={item.thumb_image}
        seller_name={item.user.name}
        posting_day={item.created_at}
        onPress={() => {
          // Handle item press
        }}
        wishListPress={() => {
          // Handle wishlist press
        }}
      />
    )
  );

  return (
    <StoryScreen NoPadding={true}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size={50} color={COLORS.BLACK} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
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

          <Banner
            image={image}
            width={Dimensions.get('window').width}
            height={200}
            onItemClick={handleItemClick}
          />

          <View style={{marginTop: 20}}>
            <View style={{marginLeft: 18}}>
              <CustomText
                text={'Check out trendy watches for you'}
                fontSize={20}
                fontFamily={'Cabin - Bold'}
                fontWeight={700}
              />
            </View>

            <View style={styles.progressContainer}>
              <View
                style={[
                  styles.progressBar,
                  {width: `${scrollProgress * 100}%`},
                ]}
              />
            </View>

            <FlatList
              data={products.data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              ref={flatListRef}
              onScroll={handleScroll}
              scrollEventThrottle={16}
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
          {/* <View style={styles.progressContainer}>
              <View
                style={[
                  styles.progressBar,
                  {width: `${scrollProgress * 100}%`},
                ]}
              />
            </View> */}
          <FlatList
            //style={{backgroundColor: 'red'}}
            data={products.data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            ref={flatListRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{paddingLeft: 10, paddingRight: 16}}
          />
        </ScrollView>
      )}
    </StoryScreen>
  );
};

export default ExploreScreen;
