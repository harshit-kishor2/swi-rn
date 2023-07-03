import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import React from 'react';
import {SPACING} from '../../resources';
import StoryScreen from '../../components/StoryScreen';
import NavigationBar from '../../components/NavigationBar';
import {COLORS, IMAGES} from '../../resources';
import Search from '../../components/Search';

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
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 12,
                color: COLORS.HYPERLINK,
                marginLeft: 6,
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
                style={{height: 17, width: 17, marginTop: 5, marginLeft: 8}}
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
            {posting_day}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
    />
  );
  return (
    <StoryScreen>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
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
          <Image source={IMAGES.bell} style={{marginLeft: 10}} />
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

const styles = StyleSheet.create({
  outer: {
    backgroundColor: '#F6F6F6',
    // backgroundColor:'red',
    width: 160,
    height: 279,
    borderRadius: 10,
    // alignSelf:'center',
    // justifyContent:'center',
    marginTop: 40,
    marginLeft: 15,
  },
  inner: {
    width: 160,
    height: 160,
    borderRadius: 10,
    // position:'absolute'
  },
  imageStyle: {
    width: 160,
    height: 160,
    borderRadius: 10,
    marginTop: -15,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 3,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 15,
  },
  HedaerTextStyle: {
    fontFamily: 'Cabin-Bold',
    fontSize: 20,
    color: COLORS.BLACK,
  },
});

