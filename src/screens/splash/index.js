import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { IMAGES, SPACING, TYPOGRAPHY } from '../../resources';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={IMAGES.Splash_logo}
        resizeMode='cover'
        style={{ maxHeight: SPACING.SCALE_60_58, maxWidth: SPACING.SCALE_230, marginBottom: SPACING.SCALE_250, marginLeft: SPACING.SCALE_80 }}
      />
      <View style={{ maxHeight: SPACING.SCALE_10, maxWidth: SPACING.SCALE_313 }}>
        <Text style={styles.text}>
          Copyright &copy; 2023 SG Watch Guru Pte Ltd
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center'

  },
  text: {
    color: '#4E4E4E',
    position: 'absolute',
    fontSize: TYPOGRAPHY.FONT_SIZE_11,
    fontFamily: 'Open Sans',
    lineHeight: 14.98,
    marginLeft: 85,
    // marginTop:100
  }
});
