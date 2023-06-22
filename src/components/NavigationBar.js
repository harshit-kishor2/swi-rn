import * as React from 'react';
import {Text, Pressable, StyleSheet, Image, SafeAreaView} from 'react-native';
import {GLOBAL_STYLES} from 'res';
import {COLORS, FONTS, TYPOGRAPHY} from '../resources';

const NavigationBar = ({
  backgroundColor,
  leftAction,
  activeOpacity,
  leftSource,
  title,
  rightAction,
  rightSource,
}) => {
  const pressedStyle = ({pressed}) => [
    {
      width: 12,
      opacity: pressed ? activeOpacity ?? 0.5 : 1,
    },
  ];

  return (
    <SafeAreaView
      style={[
        styles.mainView,
        {
          backgroundColor: backgroundColor,
        },
      ]}>
      <Pressable onPress={leftAction} hitSlop={30} style={pressedStyle}>
        {leftSource && <Image source={leftSource} style={styles.backButton} />}
      </Pressable>
      <Text style={styles.headerText}>{title}</Text>
      <Pressable onPress={rightAction} hitSlop={30} style={pressedStyle}>
        {rightSource && (
          <Image source={rightSource} style={styles.rightButton} />
        )}
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: 44,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    height: 24,
    resizeMode: 'contain',
  },
  rightButton: {
    height: 24,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: TYPOGRAPHY.FONT_SIZE_16,
    color: COLORS.BLACK,
  },
});

export default NavigationBar;
