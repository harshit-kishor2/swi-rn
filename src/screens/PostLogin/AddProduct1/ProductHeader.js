import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import NavigationService from '@app/navigations/NavigationService';
import {CustomIcon, CustomText, Spacer} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {FontsConst} from '@app/assets/assets';

const ProductHeader = ({goback, currentPage}) => {
  const _goBack = () => {
    NavigationService.goBack();
  };

  const getTitle = () => {
    switch (currentPage) {
      case 0:
        return 'You are few step away to post your watch';
      case 1:
        return 'You are just a step away';
      case 2:
        return 'You are almost there';
      default:
        return '';
    }
  };
  const getOpacity = step => {
    if (step > currentPage) {
      return 0.4;
    } else {
      return 1;
    }
  };
  const getStepper = step => {
    return (
      <View
        style={[
          styles.stepper,
          {
            opacity: getOpacity(step),
          },
        ]}
      />
    );
  };
  return (
    <View
      style={{
        paddingVertical: 5,
      }}>
      <View style={styles.rowContainer}>
        {currentPage !== 0 ? (
          <Pressable onPress={goback}>
            <CustomIcon
              origin={ICON_TYPE.MATERIAL_ICONS}
              name={'keyboard-backspace'}
              color={'black'}
              size={30}
            />
          </Pressable>
        ) : (
          <Spacer height={30} width={30} />
        )}
        <CustomText
          style={{
            color: '#00958C',
            fontFamily: FontsConst.Cabin_SemiBold,
            fontSize: 16,
          }}>
          Post your watch
        </CustomText>
        <Spacer height={30} width={30} />
      </View>
      <View style={styles.rowContainer}>
        <CustomText
          style={{
            color: '#4E4E4E',
          }}>
          {getTitle()}
        </CustomText>
        <CustomText
          style={{
            color: '#00958C',
          }}>
          {currentPage + 1}/3
        </CustomText>
      </View>
      <View style={styles.rowContainer}>
        {getStepper(0)}
        {getStepper(1)}
        {getStepper(2)}
      </View>
    </View>
  );
};

export default ProductHeader;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  stepper: {
    height: 6,
    width: '33%',
    backgroundColor: '#00958C',
    borderRadius: 3,
  },
});
