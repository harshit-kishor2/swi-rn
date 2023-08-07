/* eslint-disable react-native/no-inline-styles */
import {Image, Pressable, StyleSheet, View} from 'react-native';

import {FontsConst} from '@app/assets/assets';
import {CustomText, Spacer} from '@app/components';
import CustomIcon, {ICON_TYPE} from '@app/components/CustomIcon';
import useKeyboardVisible from '@app/hooks/useKeyboardVisible';
import NavigationService from '@app/navigations/NavigationService';
import {Avatar} from 'react-native-paper';
const IMAGE = {
  uri: 'https://lh3.googleusercontent.com/ogw/AGvuzYbkLlIwF2xKG4QZq9aFTMRH7Orn1L39UADtLp70Eg=s64-c-mo',
};
const Header = ({onInterestClick}) => {
  const isKeyboardVisible = useKeyboardVisible();

  const _goBack = () => {
    NavigationService.goBack();
  };
  return (
    <>
      <View style={styles.rowContainer}>
        <Pressable style={styles.back_container} onPress={_goBack}>
          <CustomIcon
            origin={ICON_TYPE.MATERIAL_ICONS}
            name={'keyboard-backspace'}
            color={'black'}
            size={30}
          />
        </Pressable>
        <View style={styles.title_container}>
          <Avatar.Image size={35} source={IMAGE} />
          <Spacer width={10} />
          <CustomText style={styles.title_text}>Name</CustomText>
        </View>
        <Pressable style={styles.follow_button} onPress={() => {}}>
          <CustomIcon
            origin={ICON_TYPE.FEATHER_ICONS}
            name={'user-plus'}
            color={'black'}
            size={25}
          />
        </Pressable>
      </View>
      {!isKeyboardVisible ? (
        <Pressable onPress={onInterestClick} style={styles.product}>
          <Image style={styles.avatar} source={IMAGE} />
          <View
            style={{
              paddingLeft: 15,
            }}>
            <CustomText style={styles.brandtext}>
              2020 Fossil Analog Watch
            </CustomText>
            <View style={styles.price_row}>
              <CustomText style={styles.price}>$12500</CustomText>
              <View style={styles.circle} />
              <CustomText style={styles.condition}>Brand New</CustomText>
            </View>
          </View>
        </Pressable>
      ) : null}
    </>
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
    paddingHorizontal: 10,
  },
  back_container: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  title_text: {
    color: '#00958C',
    fontFamily: FontsConst.Cabin_SemiBold,
    fontSize: 18,
  },
  follow_button: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  product: {
    height: 70,
    width: '100%',
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
  },
  brandtext: {
    color: '#000000',
    fontFamily: FontsConst.Cabin_Bold,
  },
  price_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: '#00958C',
    fontFamily: FontsConst.Cabin_Bold,
    fontSize: 15,
  },
  condition: {
    color: '#00958C',
    fontFamily: FontsConst.Cabin_Regular,
    fontSize: 12,
  },
  circle: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: '#00958C',
    marginHorizontal: 2,
  },
});
