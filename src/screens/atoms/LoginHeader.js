import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CustomText, Spacer} from '@app/components';
import {FontsConst} from '@app/assets/assets';

const LoginHeader = ({title, description, titleStyle, descriptionStyle}) => {
  return (
    <>
      <CustomText style={[styles.title, titleStyle]}>{title}</CustomText>
      <Spacer />
      <CustomText style={[styles.description, descriptionStyle]}>
        {description}
      </CustomText>
    </>
  );
};

export default LoginHeader;

const styles = StyleSheet.create({
  title: {
    fontFamily: FontsConst.Cabin_Bold,
    fontSize: 30,
    alignSelf: 'center',
  },
  description: {
    fontFamily: FontsConst.OpenSans_Regular,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 16,
  },
});
