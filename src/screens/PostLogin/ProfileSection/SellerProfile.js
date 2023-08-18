import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar, Divider, List} from 'react-native-paper';
import {CustomIcon, CustomText, Spacer, SubmitButton} from '@app/components';
import {AssestsConst, FontsConst} from '@app/assets/assets';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {IMAGES} from '@app/resources';
import {AirbnbRating, Rating} from 'react-native-ratings';
import {AboutRow, GetAboutRow, PostFollowVisitor, getAboutRow} from './common';
import ClearableSearch from '@app/screens/atoms/ClearableSearch';
import PageTitle from '@app/screens/atoms/PageTitle';
import {EmptyList} from '../ChatScreen/commn';
import ProductCard from '@app/screens/atoms/ProductCard';
import {RoutesName} from '@app/helper/strings';
import {showAlert} from '@app/helper/commonFunction';
import useDebounce from '@app/hooks/useDebounce';
import branch from 'react-native-branch';
import Banner from './EditProfile/common/Banner';
import moment from 'moment';

const SellerProfile = props => {
  const {
    route,
    navigation,
    profileSectionReducer,
    isSelf,
    onChangeProductStatus,
    getProfileListing,
    onWishlistClick,
    onClickFollow,
  } = props;
  const [activeTab, setActiveTab] = useState('Listings');
  const [search, setSearch] = useState('');
  const userDetail = profileSectionReducer?.profileAbout;
  const query = useDebounce(search);
  const buoRef = useRef();
  useEffect(() => {
    getProfileListing({userId: userDetail.id, keyword: query});
    return () => {
      if (buoRef.current) {
        console.log('buo release');
        buoRef.current?.release();
      }
    };
  }, [query]);

  console.log('USEr DEtails ========>', userDetail);
  const onSharePerson = async () => {
    let linkProperties = {
      feature: 'share',
      channel: 'RNApp',
      campaign: `User ID - ${userDetail.id}`,
    };
    let shareOptions = {
      messageHeader: 'Visit my profile',
      messageBody: 'Visit my profile for more details.',
    };
    let controlParams = {
      $desktop_url: 'https://www.sgwatchinsider.com/',
    };

    buoRef.current = await branch.createBranchUniversalObject(
      `user/${userDetail.id}`,
      {
        title: 'Product Title',
        contentDescription: 'Product Description',
        canonicalUrl: '',
        contentMetadata: {
          customMetadata: {
            userID: `${userDetail.id}`,
          },
        },
      },
    );
    let {url} = await buoRef.current?.generateShortUrl(
      linkProperties,
      controlParams,
    );
    console.log('url', url);
    let {channel, completed, error} = await buoRef.current?.showShareSheet(
      shareOptions,
      linkProperties,
      controlParams,
    );
    console.log('test', {channel, completed, error});
  };

  const getListings = () => {
    const renderItem = ({item, index}) => {
      return (
        <ProductCard
          key={index}
          item={item}
          isActionButton={true}
          onSoldClick={() => {
            onChangeProductStatus({
              product_id: item.id,
              product_status: 'sold_out',
            }).then(res => {
              if (res?.type.includes('fulfilled')) {
                getProfileListing({userId: userDetail.id});
                showAlert({
                  title: 'Success !',
                  message: 'Product status changed as sold.',
                });
              } else if (res?.type.includes('rejected')) {
                showAlert({
                  title: 'Server error !',
                });
              }
            });
          }}
          onReservedClick={() => {
            onChangeProductStatus({
              product_id: item.id,
              product_status: 'reserved',
            }).then(res => {
              if (res?.type.includes('fulfilled')) {
                getProfileListing({userId: userDetail.id});
                showAlert({
                  title: 'Success !',
                  message: 'Product status changed as reserved.',
                });
              } else if (res?.type.includes('rejected')) {
                showAlert({
                  title: 'Server error !',
                });
              }
            });
          }}
          onDeleteClick={() => {
            onChangeProductStatus({
              product_id: item.id,
              product_status: 'deleted',
            }).then(res => {
              if (res?.type.includes('fulfilled')) {
                getProfileListing({userId: userDetail.id});
                showAlert({
                  title: 'Success !',
                  message: 'Product status changed as deleted.',
                });
              } else if (res?.type.includes('rejected')) {
                showAlert({
                  title: 'Server error !',
                });
              }
            });
          }}
        />
      );
    };
    return (
      <View
        style={{
          width: '100%',
          paddingHorizontal: 20,
        }}>
        <ClearableSearch search={search} setSearch={setSearch} />
        <PageTitle title={`Watch Posted by ${userDetail?.name}`} />
        <FlatList
          scrollEnabled={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 40,
          }}
          data={profileSectionReducer?.sellerProductListing}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'flex-start',
            // paddingHorizontal: 10,
            paddingBottom: 10,
          }}
          onEndReachedThreshold={0.3}
          // onEndReached={onLoadMore}
          ListEmptyComponent={EmptyList}
        />
      </View>
    );
  };
  const getAbout = () => {
    return (
      <View
        style={{
          width: '100%',
        }}>
        <Spacer />
        <PostFollowVisitor
          post={userDetail?.total_posts}
          follow={userDetail?.total_followers}
          visitor={userDetail?.visit_count}
        />
        {!isSelf ? (
          <View style={styles.button_container}>
            <View
              style={{
                width: '80%',
              }}>
              <SubmitButton
                lable={userDetail?.isFollowed ? 'Unfollow' : '+ Follow'}
                onPress={onClickFollow}
              />
            </View>
            <Pressable style={styles.sharebutton} onPress={onSharePerson}>
              <CustomIcon
                origin={ICON_TYPE.FEATHER_ICONS}
                name={'share-2'}
                color={'black'}
                size={30}
              />
            </Pressable>
          </View>
        ) : null}
        <GetAboutRow value={`${userDetail?.bio ?? '-'}`} />
        <Divider style={styles.divider} />
        <Spacer height={20} />
        <AboutRow
          title={'Location'}
          value={`${userDetail?.additional_info?.location ?? '-'}`}
        />
        <AboutRow
          title={'Opening Hours'}
          value={
            <View>
              {userDetail?.additional_info?.opening_hours?.map(
                (item, index) => {
                  return (
                    item.isEnable === 'true' && (
                      <CustomText>
                        {item?.lable} - {item?.text}
                      </CustomText>
                    )
                  );
                },
              ) ?? <CustomText>{'-'}</CustomText>}
            </View>
          }
        />
        <AboutRow title={'Contact'} value={`${userDetail?.mobile ?? '-'}`} />
        <AboutRow
          title={'Website'}
          value={`${userDetail?.additional_info?.website ?? '-'}`}
        />
        <AboutRow
          title={'Socials'}
          value={
            <View>
              {userDetail?.additional_info?.social_media?.map((item, index) => {
                return item.value ? <CustomText>{item.value}</CustomText> : '-';
              }) ?? <CustomText>{'-'}</CustomText>}
            </View>
          }
        />
        <AboutRow
          title={'Payment Mode'}
          value={`${
            userDetail?.additional_info?.payment_method
              ?.filter((item, index) => item.isEnable === 'true')
              ?.map((item, index) => item.type)
              ?.join(',') ?? '-'
          }`}
        />
        <AboutRow
          title={'Joined since'}
          value={`${
            moment(userDetail?.created_at).format('DD/MM/YYYY') ?? '-'
          }`}
        />
      </View>
    );
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 30,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 150,
            width: '100%',
          }}>
          <Image
            source={
              userDetail?.cover_image
                ? {uri: userDetail?.cover_image}
                : IMAGES.coverSellerProfile
            }
            resizeMode="cover"
            style={{
              height: 150,
              width: '100%',
            }}
          />
        </View>
        <View style={styles.profile_container}>
          <Avatar.Image
            source={
              userDetail?.image ? {uri: userDetail?.image} : AssestsConst.AVATAR
            }
            size={100}
          />
        </View>
        <Spacer height={50} />
        <CustomText
          style={{
            fontFamily: FontsConst.Cabin_Bold,
            color: '#000000',
            fontSize: 20,
          }}>
          {userDetail?.name}
        </CustomText>
        {userDetail?.premium_user === 'yes' ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={IMAGES.ProfileBadge}
              style={{marginTop: 5, marginRight: 5}}
            />
            <CustomText
              style={{
                fontFamily: FontsConst.Cabin_Bold,
                color: '#737373',
                fontSize: 14,
              }}>
              Premium Seller
            </CustomText>
          </View>
        ) : null}
        <Pressable
          onPress={() =>
            navigation?.navigate(RoutesName.REVIEW_RATING_SCREEN, {
              userID: userDetail?.id,
            })
          }
          style={styles.ratingcontainer}>
          <AirbnbRating
            count={5}
            showRating={false}
            defaultRating={userDetail?.averageRating}
            isDisabled
            size={15}
            style={{marginHorizontal: 10}}
            ratingContainerStyle={{marginHorizontal: 10}}
            starContainerStyle={{
              paddingVertical: 10,
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          />
          <CustomText style={styles.reviewText}>
            {userDetail?.count} reviews
          </CustomText>
        </Pressable>
        <View style={styles.varify_container}>
          <CustomText style={styles.verified_text}>Verified :</CustomText>
          <Image
            source={IMAGES.Seller__Singpass}
            style={styles.verifiedImage}
          />
          <Image source={IMAGES.Seller_gmail} style={styles.verifiedImage} />
          <Image
            source={IMAGES.Seller_phone_call}
            style={styles.verifiedImage}
          />
          <Image source={IMAGES.Seller_facebook} style={styles.verifiedImage} />
        </View>
      </View>

      <Spacer height={20} />

      <Banner bannerData={userDetail?.additional_info?.post_adds ?? []} />

      <Spacer height={20} />

      <View style={styles.tabcontainer}>
        <Pressable
          onPress={() => setActiveTab('Listings')}
          style={styles.getTab(activeTab === 'Listings')}>
          <CustomText style={styles.getTabText(activeTab === 'Listings')}>
            Listings
          </CustomText>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('About')}
          style={styles.getTab(activeTab === 'About')}>
          <CustomText style={styles.getTabText(activeTab === 'About')}>
            About
          </CustomText>
        </Pressable>
      </View>
      <View
        style={{
          backgroundColor: 'white',
        }}>
        {activeTab === 'Listings' ? getListings() : getAbout()}
      </View>
    </ScrollView>
  );
};

export default SellerProfile;

const styles = StyleSheet.create({
  verifiedImage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  profile_container: {
    position: 'absolute',
    top: 100,
    backgroundColor: '#fff',
    height: 104,
    width: 104,
    borderRadius: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getTab: activeTab => {
    return {
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: activeTab ? '#00958C' : '#868686',
      borderBottomWidth: activeTab ? 3 : 1,
      paddingBottom: 10,
    };
  },
  getTabText: activeTab => {
    return {
      color: activeTab ? '#00958C' : '#868686',
      fontFamily: activeTab ? FontsConst.Cabin_Bold : FontsConst.Cabin_Regular,
    };
  },
  tabcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  ratingcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    width: '80%',
  },
  reviewText: {
    fontFamily: FontsConst.OpenSans_SemiBold,
    color: '#454545',
    fontSize: 14,
  },
  verified_text: {
    fontFamily: FontsConst.Cabin_Bold,
    color: '#737373',
    fontSize: 14,
  },
  varify_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sharebutton: {
    width: '20%',
    height: 50,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  divider: {
    width: '90%',
    alignSelf: 'center',
    height: 2,
  },
});
