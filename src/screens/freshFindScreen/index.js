import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  Pressable,
} from 'react-native';
import React, {useEffect} from 'react';
import {SPACING} from '../../resources';
import StoryScreen from '../../components/StoryScreen';
import NavigationBar from '../../components/NavigationBar';
import {COLORS, IMAGES} from '../../resources';
import Search from '../../components/Search';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFreshFinds} from '../../redux/freshFinds.slice';
import { useNavigation } from '@react-navigation/native';
import navigation from '../../navigation';
const {width, height} = Dimensions.get('screen');
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
  navigation
}) => {
  return (
    <View style={{margin:10,marginBottom:-4}}>
      <TouchableOpacity onPress={()=>{navigation.navigate('ProductDetails')}}>
      <View style={styles.outer}>
        <View style={styles.inner}>
          <Image source={product_image} style={styles.imageStyle} />
          <TouchableOpacity
            onPress={wishListPress}
            style={{
              position: 'absolute',
              top: 3,
              right: 12,  
              height: SPACING.SCALE_20,
              width: SPACING.SCALE_20,
            }}>
            <Image source={IMAGES.Vector1} />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Cabin-SemiBold',
              marginLeft: 2,
              color: COLORS.BLACK,
            }}>
            {product_name}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text
              style={{
                fontFamily: 'Cabin-SemiBold',
                marginLeft: 2,
                color: COLORS.BLACK,
              }}>
              {product_name}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Text
                style={{
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize: SPACING.SCALE_12,
                  color: COLORS.HYPERLINK,
                  marginLeft: SPACING.SCALE_6,
                }}>
                {' '}
                $ {price} .
              </Text>
              <Text
                style={{
                  fontFamily: 'Open Sans',
                  fontSize: 10,
                  marginTop: 2,
                  color: COLORS.HYPERLINK,
                }}>
                {' '}
                {condition}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <View>
                <Image
                  source={seller_image}
                  style={{
                    height: SPACING.SCALE_17,
                    width: SPACING.SCALE_17,
                    marginTop: SPACING.SCALE_5,
                    marginLeft: SPACING.SCALE_8,
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: 'OpenSans-SemiBold',
                    marginLeft: SPACING.SCALE_10,
                  }}>
                  {seller_name}
                </Text>
              </View>
            </View>
            <Text
              style={{
                marginLeft: SPACING.SCALE_7,
                fontFamily: 'Open Sans',
                fontSize: SPACING.SCALE_8,
                marginTop: SPACING.SCALE_10,
              }}>
              {posting_day}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const DATA = [
  {
    product_image: IMAGES.Rectangle91,
    product_name: 'Mens Rolex Wat...',
    price: '1200',
    condition: 'Brand New',
    seller_image: IMAGES.Ellipse7,
    seller_name: 'immy van',
    posting_day: 'Posted 2 Days Ago',
  },
  {
    product_image: IMAGES.Rectangle91,
    product_name: 'Fossil Analog Wat...',
    price: '5500',
    condition: 'Like New',
    seller_image: IMAGES.Ellipse7,
    seller_name: 'george li',
    posting_day: 'Posted 3 Days Ago',
  },
  {
    product_image: IMAGES.Rectangle91,
    product_name: 'Quartz Hombre...',
    price: '92500',
    condition: 'Brand New',
    seller_image: IMAGES.Ellipse7,
    seller_name: 'leo wartz',
    posting_day: 'Posted 1 Days Ago',
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
const FreshFind = ({placeholder, onChange}) => {
  const dispatch = useDispatch();
  const {
    freshFindsProductserror,
    freshFindsProductsLoading,
    freshFindsProducts,
  } = useSelector(state => state?.frehFindsReducer);
  console.log(
    freshFindsProductserror,
    freshFindsProductserror,
    freshFindsProducts,
    '0000000000',
  );
  const renderItem = ({item, index, navigation}) => (
    <Item
      product_image={item.product_image}
      product_name={item.product_name}
      price={item.price}
      condition={item.condition}
      seller_image={item.seller_image}
      seller_name={item.seller_name}
      posting_day={item.posting_day}
      index={index}
      navigation={navigation}
    />
  );

  useEffect(() => {
    dispatch(fetchFreshFinds());
  }, []);
  return (
    <StoryScreen>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
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
          <Image source={IMAGES.bell} style={{marginLeft: SPACING.SCALE_10}} />
        </Pressable>
      </View>

      <Text style={styles.HedaerTextStyle}>Fresh Finds</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </StoryScreen>
  );
};

export default FreshFind;
