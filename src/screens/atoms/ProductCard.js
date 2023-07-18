import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Avatar, Card} from 'react-native-paper';
import {CustomIcon, CustomText, Spacer} from '@app/components';
import {FontsConst} from '@app/assets/assets';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {IMAGES} from '@app/resources';
import {formatTimestamp} from '@app/helper/commonFunction';

const ProductCard = ({item, onPress}) => {
  return (
    <Card style={styles.card_container}>
      <Card.Cover
        // resizeMode="contain"
        style={styles.cover_style}
        source={{uri: item?.thumb_image}}
      />
      <Card.Content>
        <CustomText style={styles.title}>{item?.title}</CustomText>
        <View style={styles.price_container}>
          <CustomText style={styles.price}>${item?.price}</CustomText>
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
          <CustomText style={styles.name}>{item?.user?.name}</CustomText>
        </View>
        <CustomText style={styles.duration}>
          {formatTimestamp(item?.created_at)}
        </CustomText>
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
    backgroundColor: '#ffffff',
    elevation: 1,
    margin: 5,
  },
  cover_style: {
    height: 150,
    // width: 100,
  },
  title: {
    fontSize: 18,
    fontFamily: FontsConst.Cabin_Bold,
  },
  price_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  price: {
    color: '#00958C',
    fontSize: 16,
    fontFamily: FontsConst.Cabin_Bold,
  },
  seprator: {
    height: 5,
    width: 5,
    borderRadius: 3,
    backgroundColor: '#00958C',
  },
  category: {
    color: '#00958C',
    fontSize: 12,
    fontFamily: FontsConst.Cabin_Regular,
  },
  user_image: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  name: {
    fontSize: 12,
    fontFamily: FontsConst.OpenSans_SemiBold,
  },
  duration: {
    fontSize: 10,
    fontFamily: FontsConst.OpenSans_Regular,
    color: '#868686',
  },
  bookmark: {
    right: 5,
    position: 'absolute',
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
