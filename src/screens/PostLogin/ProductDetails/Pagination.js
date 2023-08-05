import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Spacer} from '@app/components';
import Video from 'react-native-video';

const Pagination = ({data, currentPage, handleImageClick}) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        {data.map((item, index) => {
          return (
            <Pressable
              style={{
                height: 50,
                width: 50,
                margin: 5,
                borderRadius: 10,
                padding: 5,
                borderWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: index === currentPage ? '#00958C' : '#F0F2FA',
              }}
              onPress={() => handleImageClick(index)}>
              {item.type === 'video' && Platform.OS === 'ios' ? (
                <Video
                  controls={false}
                  source={{uri: item.file}}
                  resizeMode="cover"
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 8,
                  }}
                  paused={true}
                  // repeat={true}
                />
              ) : (
                <Image
                  source={{uri: item.file}}
                  resizeMode="stretch"
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 8,
                  }}
                />
              )}
            </Pressable>
          );
        })}
      </View>
      <Spacer />
      <View style={styles.dotContainer}>
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              height: index === currentPage ? 8 : 6,
              width: index === currentPage ? 8 : 6,
              borderRadius: index === currentPage ? 4 : 3,
              margin: 5,
              backgroundColor: index === currentPage ? '#000000' : '#D9D9D9',
            }}
          />
        ))}
      </View>
    </>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
