/* eslint-disable react-native/no-inline-styles */

import {
  View,
  Text,
  Image,
  ImageBackground,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import React from 'react';
import {BackHeader, Custombutton, NavigationBar, Spacer} from '@app/components';
import {COLORS, IMAGES, SPACING} from '@app/resources';
import styles from './styles';
import {RoutesName} from '@app/helper/strings';
import {connect} from 'react-redux';
import {userProfile} from '@app/store/authSlice';

const BoostNowIntroduction = props => {
  const {authReducer, userProfile} = props;
  console.log(
    authReducer?.userProfileDetails?.coins,
    userProfile,
    'get started boost coins',
  );
  console.log('product id==>>', props?.route?.params?.product_id);
  const isCoins = authReducer?.userProfileDetails?.coins === 0 ? false : true;
  return (
    <View style={styles.MainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackHeader />

        <View style={styles.CoinContainer}>
          <ImageBackground
            source={IMAGES.BoostNowShade1}
            style={styles.ImageBackgroudContainer}>
            <Image
              style={{top: SPACING.SCALE__30}}
              source={IMAGES.CoinBoostNow}
            />
          </ImageBackground>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            width: SPACING.SCALE_300,
            margin: 30,
          }}>
          <Text style={styles.BoostTextStyle}>
            Sell your watch faster Boost it now
          </Text>
        </View>
        <View style={styles.contentMainStyle}>
          <View style={styles.GroupContainerStyle}>
            <View style={styles.GroupStyle}>
              <Image source={IMAGES.GroupIcon} />
            </View>
            <View style={styles.ContentTextStyle}>
              <Text style={styles.HedaerStyle}>Get 3X customers</Text>
              <Text style={styles.ContentStyle}>
                If you want to make any changes to your post you can do that
                from your posted ads section.
              </Text>
            </View>
          </View>
          <Spacer height={25} />
          <View style={styles.GroupContainerStyle}>
            <View style={styles.GroupStyle}>
              <Image source={IMAGES.handCoin} />
            </View>
            <View style={styles.ContentTextStyle}>
              <Text style={styles.HedaerStyle}>Sell your watch faster </Text>
              <Text style={styles.ContentStyle}>
                If you want to make any changes to your post you can do that
                from your posted ads section.
              </Text>
            </View>
          </View>
        </View>
        <Spacer height={36} />
        <View style={styles.contentMainStyle}>
          <Custombutton
            title={'Get Started'}
            width={'80%'}
            fontSize={SPACING.SCALE_20}
            onPress={() => {
              if (props?.route?.params?.product_id) {
                props?.navigation?.navigate(
                  isCoins
                    ? RoutesName.BOOST_NOW
                    : RoutesName.BOOST_PURCHASE_COIN,
                  {
                    product_id: props?.route?.params?.product_id,
                  },
                );
              }
            }}
          />
          <Pressable
            style={styles.pressableStyle}
            onPress={() => Alert.alert('Dab gya')}>
            <Text style={styles.hyperlinkStyle}>Not now, I’ll do it later</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state?.authReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  userProfile: params => dispatch(userProfile(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoostNowIntroduction);
