import * as React from 'react';
import {Pressable, View, StyleSheet, Text} from 'react-native';

// import {COLORS, TYPOGRAPHY} from '../resources';

const Custombutton = ({
  onPress,
  marginTop,
  marginBottom,
  width,
  activeOpacity,
  height,
  marginHorizontal,
  backgroundColor,
  title,
  disabled,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled ?? false}
      style={({pressed}) => [
        {
          marginTop: marginTop,
          marginBottom: marginBottom,
          width: width ?? '100%',
          opacity: pressed ? activeOpacity ?? 0.5 : 1,
        },
      ]}>
      <View
        style={[
          styles.buttonView,
          {
            height: height ?? 50,
            marginHorizontal: marginHorizontal,
            backgroundColor: backgroundColor ?? 'black',
          },
        ]}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontFamily:'Cabin-Bold',
    
    textAlign: 'center',
  },
});
export default Custombutton;
