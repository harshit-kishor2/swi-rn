/* eslint-disable react-native/no-inline-styles */
import {Image, Pressable, StyleSheet, View} from 'react-native';

import {FontsConst} from '@app/assets/assets';
import {CustomText, Spacer} from '@app/components';
import CustomIcon, {ICON_TYPE} from '@app/components/CustomIcon';
import useKeyboardVisible from '@app/hooks/useKeyboardVisible';
import NavigationService from '@app/navigations/NavigationService';
import {Avatar} from 'react-native-paper';
import moment from 'moment';
import {RoutesName} from '@app/helper/strings';
const Header = ({
  onFollowClick,
  chat_item,
  exploreProduct,
  chatReducer,
  navigation,
}) => {
  const isKeyboardVisible = useKeyboardVisible();

  const _goBack = () => {
    NavigationService.goBack();
  };
  const userDetail = chatReducer?.chatUserDetail;
  console.log('chatUserDetail===', chatReducer, userDetail);
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
        <Pressable
          onPress={() =>
            navigation?.navigate(RoutesName.PROFILE_SECTION_SCREEN, {
              userId: chat_item?.user_id,
            })
          }
          style={styles.title_container}>
          <Avatar.Image size={35} source={{uri: chat_item?.user_image}} />
          <Spacer width={10} />
          <CustomText style={styles.title_text}>
            {chat_item?.user_name}
          </CustomText>
        </Pressable>
        <Pressable style={styles.follow_button} onPress={onFollowClick}>
          <CustomIcon
            origin={ICON_TYPE.FEATHER_ICONS}
            name={userDetail?.isFollowed ? 'user-minus' : 'user-plus'}
            color={'black'}
            size={25}
          />
        </Pressable>
      </View>
      {!isKeyboardVisible ? (
        <Pressable
          onPress={() => {
            NavigationService.navigate(RoutesName.PRODUCT_DETAILS, {
              product_id: exploreProduct?.productDetails?.id,
            });
          }}
          style={styles.product}>
          <Image
            style={styles.avatar}
            source={{uri: exploreProduct?.productDetails?.thumb_image}}
          />
          <View
            style={{
              paddingLeft: 15,
            }}>
            <CustomText style={styles.brandtext}>
              {moment(exploreProduct?.productDetails?.dated).format('YYYY')}{' '}
              {exploreProduct?.productDetails?.brand?.name}{' '}
              {exploreProduct?.productDetails?.title}
            </CustomText>
            <View style={styles.price_row}>
              <CustomText style={styles.price}>
                ${exploreProduct?.productDetails?.price}
              </CustomText>
              <View style={styles.circle} />
              <CustomText style={styles.condition}>
                {exploreProduct?.productDetails?.watch_condition}
              </CustomText>
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
