

import { View, Text, Button, StyleSheet, Pressable, Dimensions, StatusBar, SafeAreaView, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { IMAGES, SPACING, TYPOGRAPHY } from '../../resources';
const WalkThroughScreen = () => {
  const { width, height } = Dimensions.get('window');
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
        >
          <View style={{ width, height }}>
            <Text style={{ height: '10', width: '10', marginTop: '10', }}>Luxury Watches</Text>
            <View style={styles.imageSizeStyle}>
              <Image source={IMAGES.Watch_Image1} style={styles.imageStyle} />
            </View>
            <View style={styles.wrapper}>
              <Text style={styles.header}>Nature Imitates Art</Text>
              <Text style={styles.paragraph}>....something like that</Text>
            </View>
          </View>
          <View style={{ width, height }}>
            <View style={styles.imageSizeStyle}>
              <Image
                source={IMAGES.Watch_Image2}
                style={styles.imageStyle}
              />
            </View>
            <View style={styles.wrapper}>
              <Text style={styles.header}>High quality Art work</Text>
              <Text style={styles.paragraph}>... for a fraction of the price</Text>
            </View>
          </View>
          <View style={{ width, height }}>
            <View style={styles.imageSizeStyle}>
              <Image
                source={IMAGES.Watch_Image3}
                style={styles.imageStyle}
              />
            </View>
            <View style={styles.wrapper}>
              <Text style={styles.header}>Top Notch Artists</Text>
              <Text style={styles.paragraph}>... all in one place</Text>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default WalkThroughScreen;
// const styles = StyleSheet.create({
//   submitStyle: {
//     height: 40,
//     width: 350,
//     backgroundColor: '#000000',
//     color: 'white',
//     elevation: 2,
//     overflow: 'hidden',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 30,
//   },
//   bg_button: {
//     color: 'white',
//     font: 'Cabin'
//   }
// });
const styles = StyleSheet.create({
  imageStyle: {
    height: 284,
    width: 342,
    borderRadius: 10,
    marginLeft: 20,
    marginTop: 192,

  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 17,
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: 200,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#0898A0',
    marginLeft: 10,
  },
  // imageSizeStyle:
  // {
  //   marginTop: 200,
  //   marginBottom: 200,
  //   marginLeft: 80,
  //   marginRight: 80,
  //   elevation: 10,
  //   borderRadius: 30
  // }
});

