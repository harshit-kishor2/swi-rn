import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React, {useRef} from 'react';
import ProductCard from '@app/screens/atoms/ProductCard';
import {IMAGES} from '@app/resources';
import Pagination from '@app/screens/PreLogin/WalkThroughScreen/Pagination';
const {height, width} = Dimensions.get('window');
const DATA = [1, 2, 3];

const Banner = () => {
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
          height: 150,
          alignItems: 'center',
          borderRadius: 10,
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            width: width - 5,
            height: 150,
            alignItems: 'center',
            borderRadius: 10,
            borderWidth: 0.5,
          }}>
          <Image
            style={{
              height: 150,
              width: '80%',
            }}
            resizeMode="contain"
            source={IMAGES.Splash_logo}
          />
        </View>
        <View
          style={{
            bottom: 20,
          }}>
          <Pagination currentPage={currentPage} />
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        height: 160,
      }}>
      <FlatList
        horizontal
        ref={flatlistRef}
        data={[1, 2, 3]}
        renderItem={renderItem}
        keyExtractor={item => item?.toString()}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 20,
        }}
      />
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({});
