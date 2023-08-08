import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Avatar, Button, Card, Divider, Menu} from 'react-native-paper';
import {CustomIcon, CustomText, Spacer, SubmitButton} from '@app/components';
import {FontsConst} from '@app/assets/assets';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {IMAGES, SPACING} from '@app/resources';
import {addEllipsis, formatTimestamp} from '@app/helper/commonFunction';
import NavigationService from '@app/navigations/NavigationService';
import {RoutesName} from '@app/helper/strings';

const {width} = Dimensions.get('screen');
const ProductCard = ({
  item,
  onPress,
  isSelf = false,
  onSoldClick,
  onReservedClick,
  onDeleteClick,
  onWishlistClick,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <Card style={styles.card_container}>
      <Pressable
        onPress={() => {
          NavigationService.navigate(RoutesName.PRODUCT_DETAILS, {
            product_id: item.id,
          });
        }}>
        <Image
          resizeMode="contain"
          style={styles.cover_style}
          source={{uri: item?.thumb_image}}
        />
      </Pressable>
      <Card.Content>
        <CustomText style={styles.title}>
          {addEllipsis(item?.title, 12)}
        </CustomText>
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
        {isSelf ? (
          <Pressable
            style={styles.boostButton}
            onPress={() => {
              // NavigationService.navigate(RoutesName.B, {
              //   product_id: item.id,
              // });
            }}>
            <CustomText>Boost Product</CustomText>
          </Pressable>
        ) : null}
      </Card.Content>
      <View style={styles.bookmark}>
        {isSelf ? (
          <Menu
            style={{
              backgroundColor: '#fff',
            }}
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <Pressable onPress={() => setVisible(true)}>
                <CustomIcon
                  size={20}
                  color={'#000000'}
                  origin={ICON_TYPE.ENTYPO}
                  name="dots-three-vertical"
                />
              </Pressable>
            }>
            <Menu.Item onPress={() => {}} title="Edit Details" />
            <Divider />
            <Menu.Item
              onPress={
                onSoldClick
                  ? () => {
                      setVisible(false);
                      onSoldClick();
                    }
                  : null
              }
              title="Mark as sold"
            />
            <Divider />
            <Menu.Item
              onPress={
                onReservedClick
                  ? () => {
                      setVisible(false);
                      onReservedClick();
                    }
                  : null
              }
              title="Mark as Reserved"
            />
            <Divider />
            <Menu.Item
              onPress={
                onDeleteClick
                  ? () => {
                      setVisible(false);
                      onDeleteClick();
                    }
                  : null
              }
              title="Delete"
            />
          </Menu>
        ) : (
          <Pressable onPress={onPress}>
            <CustomIcon
              size={30}
              color={'#000000'}
              origin={ICON_TYPE.MATERIAL_ICONS}
              name="bookmark-outline"
            />
          </Pressable>
        )}
      </View>
    </Card>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card_container: {
    flex: 0.5,
    backgroundColor: '#F6F6F6',
    elevation: 1,
    margin: 5,
    width: width / 2 - 20,
  },
  cover_style: {
    height: 160,
    backgroundColor: '#fff',
    // width: 100,
  },
  title: {
    fontSize: 18,
    fontFamily: FontsConst.Cabin_Bold,
    marginTop: SPACING.SCALE_5,
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
    marginHorizontal: 5,
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
    top: SPACING.SCALE_7,
    right: SPACING.SCALE_7,
    position: 'absolute',
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boostButton: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
  },
});
