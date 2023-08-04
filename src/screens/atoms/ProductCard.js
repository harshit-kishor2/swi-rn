import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
} from 'react-native';
import React from 'react';
import {Avatar, Card} from 'react-native-paper';
import {CustomIcon, CustomText, Spacer} from '@app/components';
import {FontsConst} from '@app/assets/assets';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {IMAGES, SPACING} from '@app/resources';
import {addEllipsis, formatTimestamp} from '@app/helper/commonFunction';
import NavigationService from '@app/navigations/NavigationService';
import {RoutesName} from '@app/helper/strings';

const {width} = Dimensions.get('screen');
const ProductCard = ({item, onPress}) => {
  const maxLength = 10;
  const truncatedText =
    item?.title.length > maxLength
      ? `${item?.title.substring(0, maxLength)}...`
      : item?.title;

  return (
    <Card style={styles.card_container}>
      <Pressable
        onPress={() => {
          NavigationService.navigate(RoutesName.PRODUCT_DETAILS, {
            product_id: item.id,
          });
        }}>
        <Card.Cover
          resizeMode="contain"
          style={styles.cover_style}
          source={{uri: item?.thumb_image}}
        />
      </Pressable>
      <Card.Content>
        <CustomText style={styles.title}>{truncatedText}</CustomText>
        <View style={styles.price_container}>
          <CustomText style={styles.price}>${item?.price}</CustomText>
          <Spacer width={SPACING.SCALE_3} />
          <View style={styles.seprator} />
          <CustomText style={styles.category}>
            {item?.watch_condition === 'pre_owned' ? 'Pre Owned' : 'Brand New'}
          </CustomText>
        </View>
      </Card.Content>
      <Card.Content>
        <View style={styles.user_image}>
          <Avatar.Image
            size={24}
            source={
              item?.user?.image && item?.user?.image !== ''
                ? {uri: item?.user?.image}
                : IMAGES.Dollar
            }
          />
          <Spacer width={5} />
          <View style={{}}>
            <CustomText style={styles.name}>
              {item?.user?.name.length > 13
                ? addEllipsis(item?.user?.name, 13)
                : item?.user?.name}
            </CustomText>
          </View>
        </View>
        <CustomText style={styles.duration}>
          {formatTimestamp(item?.created_at)}
        </CustomText>
        <Spacer height={13} />
      </Card.Content>
      <View style={styles.bookmark}>
        <Pressable onPress={onPress}>
          <CustomIcon
            size={30}
            color={'#000000'}
            origin={ICON_TYPE.MATERIAL_ICONS}
            name="bookmark-outline"
          />
        </Pressable>
      </View>
    </Card>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card_container: {
    flex: 0.5,
    //backgroundColor: 'red',
    backgroundColor: '#F6F6F6',
    //elevation: 1,
    margin: 5,
    width: width / 2 - 20,
  },
  cover_style: {
    height: 200,
    backgroundColor: '#fff',
    //backgroundColor: 'yellow',
    // width: 100,
  },
  title: {
    fontSize: 18,
    fontFamily: FontsConst.Cabin_Bold,
    marginTop: SPACING.SCALE_5,
    // backgroundColor: 'blue',
  },
  price_container: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'space-between',
    paddingVertical: 5,
  },
  price: {
    color: '#00958C',
    fontSize: 12,
    fontFamily: FontsConst.Cabin_Bold,
  },
  seprator: {
    height: 3,
    width: 3,
    borderRadius: 3 / 2,
    backgroundColor: '#00958C',
  },
  category: {
    color: '#00958C',
    fontSize: 12,
    fontFamily: FontsConst.Cabin_Regular,
    marginLeft: SPACING.SCALE_2,
  },
  user_image: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  name: {
    //backgroundColor: 'green',
    fontSize: 12,
    fontFamily: FontsConst.OpenSans_SemiBold,
  },
  duration: {
    fontSize: 10,
    fontFamily: FontsConst.OpenSans_Regular,
    color: '#868686',
  },
  bookmark: {
    top: SPACING.SCALE_7,
    right: SPACING.SCALE_7,
    position: 'absolute',
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
