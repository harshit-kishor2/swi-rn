import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {BackHeader, Container, CustomIcon, Spacer} from '@app/components';
import SellerProfile from './SellerProfile';
import NormalProfile from './NormalProfile';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {LoadingStatus, RoutesName} from '@app/helper/strings';
import {
  changeProductStatusAction,
  onFollowClickAction,
  profileAboutAction,
  sellerProductListingAction,
} from '@app/store/profileSectionSlice';
import {addWishListAction} from '@app/store/exploreProductSlice';
import {useIsFocused} from '@react-navigation/native';
import {showAlert} from '@app/helper/commonFunction';

const ProfileSection = props => {
  const {
    authReducer,
    route,
    navigation,
    profileSectionReducer,
    getProfileAbout,
    getProfileListing,
    followClickAction,
  } = props;
  const isFocused = useIsFocused();

  const userId = route.params?.userId;
  const isSelf = userId === authReducer?.userProfileDetails?.id ?? false;
  const isSeller =
    profileSectionReducer?.profileAbout?.role === 'seller' ? true : false;

  const useDetail = profileSectionReducer?.profileAbout;

  useEffect(() => {
    if (isFocused) {
      getProfileAbout({userId: userId});
      getProfileListing({userId: userId});
    }
  }, [isFocused]);

  const onClickFollow = () => {
    followClickAction({
      user_id: userId,
      followed_visited_by: authReducer?.userProfileDetails?.id,
      type: 'follow',
    }).then(res => {
      if (res?.type.includes('fulfilled')) {
        getProfileAbout({userId: userId});
        showAlert({
          title: 'Success',
          message: res?.payload?.message,
        });
      }
      if (res?.type.includes('rejected')) {
        showAlert({
          title: 'Error',
          message: res?.payload?.message ?? 'Internal server error!',
        });
      }
    });
  };

  return (
    <Container
      useSafeAreaView={true}
      loading={
        profileSectionReducer?.profileAboutLoadingStatus ===
          LoadingStatus.LOADING &&
        profileSectionReducer?.sellerProductListingLoadingStatus ===
          LoadingStatus.LOADING
      }>
      <BackHeader
        rightComponent={
          isSelf ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Pressable
                style={styles.button}
                onPress={() => {
                  navigation?.navigate(RoutesName.EDIT_PROFILE_SECTION_SCREEN, {
                    userId: userId,
                    isSeller: isSeller,
                  });
                }}>
                <CustomIcon
                  origin={ICON_TYPE.OCTICONS}
                  name={'pencil'}
                  color={'black'}
                  size={30}
                />
              </Pressable>
              {/* <Pressable
                style={styles.button}
                onPress={() => {
                  navigation?.navigate(RoutesName.PROFILE_QR_SCREEN, {
                    userDetail: useDetail,
                  });
                }}>
                <CustomIcon
                  origin={ICON_TYPE.MATERIAL_COMMUNITY}
                  name={'qrcode-scan'}
                  color={'black'}
                  size={30}
                />
              </Pressable> */}
            </View>
          ) : isSeller ? null : (
            <Pressable style={styles.button} onPress={() => {}}>
              <CustomIcon
                origin={ICON_TYPE.FEATHER_ICONS}
                name={'share-2'}
                color={'black'}
                size={30}
              />
            </Pressable>
          )
        }
      />
      <Spacer />
      {isSeller ? (
        <SellerProfile
          isSelf={isSelf}
          onClickFollow={onClickFollow}
          {...props}
        />
      ) : (
        <NormalProfile isSelf={isSelf} {...props} />
      )}
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state?.authReducer,
    profileSectionReducer: state?.profileSectionReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  //   getBannerList: params => dispatch(getBannerAction(params)),
  getProfileAbout: params => dispatch(profileAboutAction(params)),
  getProfileListing: params => dispatch(sellerProductListingAction(params)),
  onChangeProductStatus: params => dispatch(changeProductStatusAction(params)),
  onWishlistClick: params => dispatch(addWishListAction(params)),
  followClickAction: params => dispatch(onFollowClickAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSection);

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 50,
    justifyContent: 'center',
  },
});
