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
import {AssestsConst, FontsConst} from '@app/assets/assets';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {IMAGES, SPACING} from '@app/resources';
import {
  addEllipsis,
  formatTimestamp,
  getTimeDifferenceString,
  showAlert,
} from '@app/helper/commonFunction';
import NavigationService from '@app/navigations/NavigationService';
import {RoutesName} from '@app/helper/strings';
import {useDispatch, useSelector} from 'react-redux';
import {addWishListAction} from '@app/store/exploreProductSlice';

const {width} = Dimensions.get('screen');
const ProductCard = ({
  item,
  onSoldClick,
  onReservedClick,
  onDeleteClick,
  callBack,
  isActionButton = false,
  toShowUserDetail = true,
}) => {
  const [visible, setVisible] = useState(false);
  const [inWishlist, setInWishlist] = useState(item?.isInWishlist);
  const dispatch = useDispatch();
  const authReducer = useSelector(state => state.authReducer);
  const isSelf = authReducer?.userProfileDetails?.id === item?.user_id ?? false;

  // On wishlist click
  const onWishlistClick = () => {
    dispatch(
      addWishListAction({
        product_id: item.id,
      }),
    ).then(res => {
      if (res?.type.includes('fulfilled')) {
        setInWishlist(!inWishlist);
      }
    });
  };

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
        {toShowUserDetail && (
          <View style={styles.user_image}>
            <Avatar.Image
              size={24}
              source={
                item?.user?.image && item?.user?.image !== ''
                  ? {uri: item?.user?.image}
                  : AssestsConst.AVATAR
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
        )}
        <CustomText style={styles.duration}>
          Posted {getTimeDifferenceString(item?.created_at)}
        </CustomText>
        <Spacer height={13} />
        {isSelf && isActionButton ? (
          <Pressable
            style={styles.boostButton}
            onPress={() => {
              NavigationService.navigate(
                RoutesName.BOOST_PRODUCT_INTRODUCTION,
                {
                  product_id: item.id,
                },
              );
            }}>
            <CustomText>Boost Product</CustomText>
          </Pressable>
        ) : null}
      </Card.Content>
      {isActionButton ? (
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
            <Pressable
              onPress={
                onWishlistClick
                  ? () => {
                      setInWishlist(!inWishlist);
                      onWishlistClick();
                    }
                  : null
              }>
              <CustomIcon
                size={30}
                color={inWishlist ? '#00958C' : '#000000'}
                origin={ICON_TYPE.MATERIAL_ICONS}
                name={inWishlist ? 'bookmark' : 'bookmark-outline'}
              />
            </Pressable>
          )}
        </View>
      ) : null}
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
