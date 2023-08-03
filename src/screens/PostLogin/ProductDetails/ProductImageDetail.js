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
import Pagination from '../ExploreScreen/Pagination';
const {height, width} = Dimensions.get('window');

const ProductImageDetail = ({bannerData = [1, 2]}) => {
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
            height: 150,
            alignItems: 'center',
            backgroundColor: 'grey',
          }}>
          <Image
            style={{
              height: 250,
              width: '100%',
              borderRadius: 10,
              borderWidth: 0.5,
            }}
            resizeMode="cover"
            source={{uri: item?.image}}
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
      <View
        style={{
          flexDirection: 'row',
        }}>
        {[1, 2, 3].map((item, index) => {
          return (
            <View
              style={{
                height: 50,
                width: 50,
                borderWidth: 1,
                borderRadius: 10,
              }}></View>
          );
        })}
      </View>
      <View
        style={{
          bottom: 20,
        }}>
        <Pagination data={bannerData} currentPage={currentPage} />
      </View>
    </View>
  );
};

export default ProductImageDetail;

const styles = StyleSheet.create({});
