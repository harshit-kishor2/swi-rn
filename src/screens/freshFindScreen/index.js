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
import React, {useCallback, useState} from 'react';
import {SPACING} from '../../resources';
import StoryScreen from '../../components/StoryScreen';
import NavigationBar from '../../components/NavigationBar';
import {COLORS, IMAGES} from '../../resources';
import Search from '../../components/Search';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {connect, useDispatch} from 'react-redux';
import {
  fetchFreshFinds,
  getFreshFindLoading,
  getFreshFindsData,
} from '../../redux/freshFinds.slice';
import {formatTimestamp} from '../../helper/commonFunction';
// import navigation from '../../navigation';
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
  navigation,
  id,
}) => {
  //console.log('product image', product_image);
  return (
    <View style={{margin: 10, marginBottom: -4}}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('ProductDetails', {product_id: id});
        }}>
        <View style={styles.outer}>
          <View style={styles.inner}>
            <Image
              source={{uri: product_image ? product_image : null}}
              style={styles.imageStyle}
            />
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
                  fontSize: SPACING.SCALE_12,
                  color: COLORS.HYPERLINK,
                  marginLeft: SPACING.SCALE_6,
                }}>
                {' '}
                $ {price}
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
const FreshFind = props => {
  const [freshKeyword, setFreshKeyword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  var keyWord;

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchFreshFinds({}));
    }, []),
  );

  const renderItem = ({item, index}) => (
    <Item
      product_image={item.thumb_image}
      product_name={item.title}
      price={item.price}
      condition={
        item.watch_condition == 'brand_new' ? 'Brand New' : 'Pre-Owned'
      }
      seller_image={item.user?.image}
      seller_name={item.user?.name}
      posting_day={formatTimestamp(item.created_at)}
      index={index}
      navigation={navigation}
      id={item.id}
    />
  );
  return (
    <StoryScreen loading={props.loading}>
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
            setFreshKeyword(e);
            keyWord = e;
            console.log('--->>', keyWord);
          }}
          onSubmitEditing={() => {
            dispatch(fetchFreshFinds({keyWord: freshKeyword}));
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
        data={props.freshData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>No record found</Text>
          </View>
        }
      />
    </StoryScreen>
  );
};
const mapStateToProps = state => ({
  loading: getFreshFindLoading(state),
  freshData: getFreshFindsData(state),
});

export default connect(mapStateToProps)(FreshFind);

const styles = StyleSheet.create({
  outer: {
    backgroundColor: '#F6F6F6',
    width: SPACING.SCALE_160,
    height: SPACING.SCALE_279,
    borderRadius: SPACING.SCALE_10,
    marginTop: SPACING.SCALE_30,
  },
  inner: {
    width: SPACING.SCALE_160,
    height: SPACING.SCALE_160,
    borderRadius: SPACING.SCALE__10,
  },
  imageStyle: {
    width: SPACING.SCALE_160,
    height: SPACING.SCALE_160,
    borderRadius: SPACING.SCALE_10,
    marginTop: SPACING.SCALE__15,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: SPACING.SCALE_10,
    borderWidth: SPACING.SCALE_1,
    borderColor: '#ccc',
    elevation: SPACING.SCALE_3,
    paddingHorizontal: SPACING.SCALE_10,
    marginVertical: SPACING.SCALE_10,
  },
  icon: {
    fontSize: SPACING.SCALE_20,
    marginRight: SPACING.SCALE_10,
  },
  input: {
    flex: 1,
    height: SPACING.SCALE_40,
    marginLeft: SPACING.SCALE_15,
  },
  HedaerTextStyle: {
    fontFamily: 'Cabin-Bold',
    fontSize: SPACING.SCALE_20,
    color: COLORS.BLACK,
    marginLeft: SPACING.SCALE_20,
  },
});
