import {Container, CustomIcon, NavigationBar} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {COLORS, IMAGES} from '@app/resources';
import React, {useEffect, useRef} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import branch, {BranchEvent} from 'react-native-branch';

export const SellerProfileQR = props => {
  const {navigation, route} = props;
  const userID = route?.params?.user_id;
  const buoRef = useRef();

  let linkProperties = {
    feature: 'share',
    channel: 'RNApp',
    campaign: `User ID - ${userID}`,
  };
  let shareOptions = {
    messageHeader: 'Visit my profile',
    messageBody: 'Hello! You can visit my profile from here !',
  };
  let controlParams = {
    $desktop_url: 'https://www.google.com',
  };
  let buoOptions = {
    title: 'User Title',
    contentDescription: 'User Description',
    canonicalUrl: '',
    contentMetadata: {
      customMetadata: {
        userID: `${userID}`,
      },
    },
  };
  var qrCodeSettings = {
    width: 500,
    codeColor: '#3b2016',
    backgroundColor: '#a8e689',
    centerLogo:
      'https://cdn.branch.io/branch-assets/159857dsads5682753-og_image.png',
    margin: 1,
    imageFormat: 'PNG',
  };

  useEffect(() => {
    const generateQrAndURL = async () => {
      try {
        buoRef.current = await branch.createBranchUniversalObject(
          `user/${userID}`,
          buoOptions,
        );
        var result = await branch.getBranchQRCode(
          qrCodeSettings,
          buoOptions,
          linkProperties,
          controlParams,
        );
        console.log('result===', result);
      } catch (err) {
        console.log('QR Code Err: ', err);
      }
    };
    generateQrAndURL();
    return () => {
      if (buoRef.current) {
        console.log('buo release');
        buoRef.current?.release();
      }
    };
  }, []);
  const onShareClick = async () => {
    let {channel, completed, error} = await buoRef.current?.showShareSheet(
      shareOptions,
      linkProperties,
      controlParams,
    );
    console.log('test', {channel, completed, error});
  };
  return (
    <Container>
      <View style={{margin: 15}}>
        <NavigationBar
          leftSource={IMAGES.BACKARROW}
          leftAction={() => {
            navigation?.goBack();
          }}
          flexDirection="row"
        />
        <View
          style={{
            alignItems: 'center',
            height: 90,
            width: 90,
            marginTop: 20,
            // justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Image source={IMAGES.Ellipse7} />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'Cabin-Bold',
              color: COLORS.BLACK,
              marginTop: 20,
            }}>
            Immy van
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: 3,
          }}>
          <Image source={IMAGES.badge} style={{height: 15, width: 10}} />
          <Text
            style={{
              fontFamily: 'Cabin-Regular',
              fontSize: 14,
              color: '#737373',
              marginLeft: 5,
            }}>
            Premium Seller
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: 30,
          }}>
          <CustomIcon
            origin={ICON_TYPE.MATERIAL_ICONS}
            name={'qr-code-2'}
            color={COLORS.BLACK}
            size={233}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 60,
          }}>
          <TouchableOpacity
            onPress={onShareClick}
            style={{
              height: 50,
              width: 209,
              backgroundColor: COLORS.BLACK,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <CustomIcon
                origin={ICON_TYPE.ANT_ICON}
                name={'sharealt'}
                color={COLORS.WHITE}
                style={{marginRight: 8, marginTop: 4}}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: COLORS.WHITE,
                  fontFamily: 'Cabin-SemiBold',
                }}>
                Share
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};
