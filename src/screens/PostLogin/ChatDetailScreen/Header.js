/* eslint-disable react-native/no-inline-styles */
import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import NavigationService from '@app/navigations/NavigationService';
import {Avatar} from 'react-native-paper';
import CustomIcon, {ICON_TYPE} from '@app/components/CustomIcon';
import {CustomText, Spacer} from '@app/components';
import {FontsConst} from '@app/assets/assets';
const IMAGE = {
  uri: 'https://lh3.googleusercontent.com/ogw/AGvuzYbkLlIwF2xKG4QZq9aFTMRH7Orn1L39UADtLp70Eg=s64-c-mo',
};
const Header = () => {
  const _goBack = () => {
    NavigationService.goBack();
  };
  return (
    <View style={styles.rowContainer}>
      <Pressable
        style={{
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={_goBack}>
        <CustomIcon
          origin={ICON_TYPE.MATERIAL_ICONS}
          name={'keyboard-backspace'}
          color={'black'}
          size={30}
        />
      </Pressable>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Avatar.Image size={35} source={IMAGE} />
        <Spacer width={10} />
        <CustomText
          style={{
            color: '#00958C',
            fontFamily: FontsConst.Cabin_SemiBold,
            fontSize: 18,
          }}>
          Name
        </CustomText>
      </View>
      <Pressable
        style={{
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={_goBack}>
        <CustomIcon
          origin={ICON_TYPE.FEATHER_ICONS}
          name={'user-plus'}
          color={'black'}
          size={25}
        />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  rowContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
