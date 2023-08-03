import React, {useRef} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Pagination from './Pagination';
import {Spacer} from '@app/components';
const {height, width} = Dimensions.get('window');

const ProductImageDetail = ({bannerData = [1, 2]}) => {
  console.log('Data===', bannerData);
  const [currentPage, setCurrentPage] = React.useState(0);
  const flatlistRef = useRef();
  const handleScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const page = Math.round(contentOffset / width);
    setCurrentPage(page);
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          width: width,
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '80%',
            height: 240,
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: 240,
              width: 240,
              borderRadius: 10,
              borderWidth: 0.5,
            }}
            resizeMode="cover"
            source={{uri: item?.file}}
          />
        </View>
      </View>
    );
  };
  return (
    <View
      style={
        {
          // height: bannerData.length > 0 ? 160 : 0,
        }
      }>
      <FlatList
        horizontal
        ref={flatlistRef}
        data={bannerData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index?.toString()}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 20,
          flexGrow: 1,
        }}
      />
      <Pagination
        data={bannerData}
        currentPage={currentPage}
        handleImageClick={res => {
          flatlistRef?.current?.scrollToIndex({index: res});
        }}
      />
      <Spacer />
    </View>
  );
};

export default ProductImageDetail;

const styles = StyleSheet.create({});
