import {View, Text, StyleSheet, PixelRatio} from 'react-native';
import React from 'react';
import {SPACING} from '../../resources';

export default styles = StyleSheet.create({
  ImageSizeStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(120),
    width: PixelRatio.getPixelSizeForLayoutSize(90),
    borderRadius: SPACING.SCALE_10,
  },
  SmallImageStyle: {
    height: 80,
    width: 80,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  SmallImageSizeStyle: {
    marginTop: 20,
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 5,
  },
  SpecifiactionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
  },
  SpecifiactionText1: {
    fontFamily: 'OpenSans-Regular',
    flex: 1,
    fontSize: 13,
  },
  SpecifiactionText2: {
    fontFamily: 'OpenSans-SemiBold',
    flex: 1,
    fontSize: 12,
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    // backgroundColor: 'green',
    alignItems: 'center',
    height: SPACING.SCALE_41,
  },
});
