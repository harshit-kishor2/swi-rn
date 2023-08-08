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
const IMAGE = {
  uri: 'https://lh3.googleusercontent.com/ogw/AGvuzYbkLlIwF2xKG4QZq9aFTMRH7Orn1L39UADtLp70Eg=s64-c-mo',
};
const SellerProfile = props => {
  const {route, navigation, profileSectionReducer, isSelf} = props;
  const [activeTab, setActiveTab] = useState('Listings');
  const [search, setSearch] = useState('');
  const useDetail = profileSectionReducer?.profileAbout;

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
        <PageTitle title={'Watch Posted by Harshit'} />
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
        <PostFollowVisitor post={5} follow={120} visitor={324} />
        {!isSelf ? (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                width: '80%',
              }}>
              <SubmitButton lable="+ Follow" onPress={() => {}} />
            </View>
            <Pressable
              style={{
                width: '20%',
                height: 50,
                backgroundColor: '#F5F5F5',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}
              onPress={() => {}}>
              <CustomIcon
                origin={ICON_TYPE.FEATHER_ICONS}
                name={'share-2'}
                color={'black'}
                size={30}
              />
            </Pressable>
          </View>
        ) : null}
        <GetAboutRow
          value={`{Suspendisse viverra luctus quam, sed fringilla nulla. Pellentesque
      quis massa tincidunt, iaculis ipsum sed, pretium purus. Suspendisse
      viverra luctus quam, sed fringilla nulla.}`}
        />
        <Divider
          style={{
            width: '90%',
            alignSelf: 'center',
            height: 2,
          }}
        />
        <Spacer height={20} />
        <AboutRow title={'Location'} value={'Lucknow, Uttar Pradesh'} />
        <AboutRow title={'Opening Hours'} value={'Lucknow, Uttar Pradesh'} />
        <AboutRow title={'Contact'} value={'Lucknow, Uttar Pradesh'} />
        <AboutRow title={'Website'} value={'Lucknow, Uttar Pradesh'} />
        <AboutRow title={'Socials'} value={'Lucknow, Uttar Pradesh'} />
        <AboutRow title={'Payment Mode'} value={'Lucknow, Uttar Pradesh'} />
        <AboutRow title={'Joined since'} value={'Lucknow, Uttar Pradesh'} />
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
        <View
          style={{
            position: 'absolute',
            top: 100,
            backgroundColor: '#fff',
            height: 104,
            width: 104,
            borderRadius: 52,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Avatar.Image source={{uri: useDetail?.image}} size={100} />
        </View>
        <Spacer height={50} />
        <CustomText
          style={{
            fontFamily: FontsConst.Cabin_Bold,
            color: '#000000',
            fontSize: 20,
          }}>
          {useDetail?.name}
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 5,
            width: '80%',
          }}>
          <AirbnbRating
            count={5}
            showRating={false}
            defaultRating={useDetail?.averageRating}
            isDisabled
            size={15}
            style={{marginHorizontal: 10}}
            ratingContainerStyle={{marginHorizontal: 10}}
            starContainerStyle={{
              paddingVertical: 10,
              //   width: width - 100,
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          />
          <CustomText
            style={{
              fontFamily: FontsConst.OpenSans_SemiBold,
              color: '#454545',
              fontSize: 14,
            }}>
            {useDetail?.count} reviews
          </CustomText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomText
            style={{
              fontFamily: FontsConst.Cabin_Bold,
              color: '#737373',
              fontSize: 14,
            }}>
            Varified :
          </CustomText>
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 20,
        }}>
        <Pressable
          onPress={() => setActiveTab('Listings')}
          style={{
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: activeTab === 'Listings' ? '#00958C' : '#868686',
            borderBottomWidth: activeTab === 'Listings' ? 3 : 1,
            paddingBottom: 10,
          }}>
          <CustomText
            style={{
              color: activeTab === 'Listings' ? '#00958C' : '#868686',
              fontFamily:
                activeTab === 'Listings'
                  ? FontsConst.Cabin_Bold
                  : FontsConst.Cabin_Regular,
            }}>
            Listings
          </CustomText>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('About')}
          style={{
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: activeTab === 'About' ? '#00958C' : '#868686',
            borderBottomWidth: activeTab === 'About' ? 3 : 1,
            paddingBottom: 10,
          }}>
          <CustomText
            style={{
              color: activeTab === 'About' ? '#00958C' : '#868686',
              fontFamily:
                activeTab === 'About'
                  ? FontsConst.Cabin_Bold
                  : FontsConst.Cabin_Regular,
            }}>
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
});
