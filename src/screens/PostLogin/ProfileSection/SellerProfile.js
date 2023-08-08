import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar, Divider, List} from 'react-native-paper';
import {CustomIcon, CustomText, Spacer, SubmitButton} from '@app/components';
import {FontsConst} from '@app/assets/assets';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {IMAGES} from '@app/resources';
import {AirbnbRating, Rating} from 'react-native-ratings';
import {AboutRow, GetAboutRow, PostFollowVisitor, getAboutRow} from './common';
import ClearableSearch from '@app/screens/atoms/ClearableSearch';
import PageTitle from '@app/screens/atoms/PageTitle';
import {EmptyList} from '../ChatScreen/commn';
import ProductCard from '@app/screens/atoms/ProductCard';
import {RoutesName} from '@app/helper/strings';
const IMAGE = {
  uri: 'https://lh3.googleusercontent.com/ogw/AGvuzYbkLlIwF2xKG4QZq9aFTMRH7Orn1L39UADtLp70Eg=s64-c-mo',
};
const SellerProfile = props => {
  const {route, navigation, profileSectionReducer, isSelf} = props;
  const [activeTab, setActiveTab] = useState('Listings');
  const [search, setSearch] = useState('');
  const userDetail = profileSectionReducer?.profileAbout;

  const getListings = () => {
    const renderItem = ({item, index}) => {
      return <ProductCard key={index} item={item} isSelf={isSelf} />;
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
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 40,
          }}
          data={profileSectionReducer?.sellerProductListing}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'flex-start',
            paddingHorizontal: 10,
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
              <SubmitButton lable="+ Follow" onPress={() => {}} />
            </View>
            <Pressable style={styles.sharebutton} onPress={() => {}}>
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
                  return item.onOff === 'on' ? (
                    <CustomText>
                      {item?.day} - {item?.timing}
                    </CustomText>
                  ) : null;
                },
              )}
            </View>
          }
        />
        <AboutRow title={'Contact'} value={`${userDetail?.mobile ?? '-'}`} />
        <AboutRow
          title={'Website'}
          value={`${userDetail?.additional_info?.location ?? '-'}`}
        />
        <AboutRow
          title={'Socials'}
          value={`${userDetail?.additional_info?.location ?? '-'}`}
        />
        <AboutRow
          title={'Payment Mode'}
          value={`${userDetail?.additional_info?.location ?? '-'}`}
        />
        <AboutRow
          title={'Joined since'}
          value={`${userDetail?.additional_info?.location ?? '-'}`}
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
            source={IMAGE}
            resizeMode="stretch"
            style={{
              height: 150,
            }}
          />
        </View>
        <View style={styles.profile_container}>
          <Avatar.Image source={{uri: userDetail?.image}} size={100} />
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
          <CustomText style={styles.verified_text}>Varified :</CustomText>
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
