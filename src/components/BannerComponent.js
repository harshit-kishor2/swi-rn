import React, {useState} from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const Banner = ({image, height, width, onItemClick}) => {
  console.log(image);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePagination = index => {
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={image}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.imageContainer}
            onPress={() => onItemClick(index)}>
            <Image
              style={{
                height: height,
                width: width,
                resizeMode: 'cover',
                borderRadius: 10,
              }}
              source={{uri: item.source}}
            />
          </TouchableOpacity>
        )}
        onMomentumScrollEnd={event => {
          const {contentOffset, layoutMeasurement} = event.nativeEvent;
          const currentIndex = Math.floor(
            contentOffset.x / layoutMeasurement.width,
          );
          setCurrentIndex(currentIndex);
        }}
      />

      <View style={styles.pagination}>
        {image.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000',
  },
});

export default Banner;
