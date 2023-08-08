import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar, Divider, List} from 'react-native-paper';
import {CustomIcon, CustomText, Spacer} from '@app/components';
import {FontsConst} from '@app/assets/assets';
import {ICON_TYPE} from '@app/components/CustomIcon';
const IMAGE = {
  uri: 'https://lh3.googleusercontent.com/ogw/AGvuzYbkLlIwF2xKG4QZq9aFTMRH7Orn1L39UADtLp70Eg=s64-c-mo',
};
const NormalProfile = props => {
  const {route, navigation, profileSectionReducer, isSelf} = props;
  const useDetail = profileSectionReducer?.profileAbout;
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 30,
      }}>
      <View
        style={{
          height: 250,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Avatar.Image source={IMAGE} size={100} />
        <CustomText
          style={{
            fontFamily: FontsConst.Cabin_Bold,
            color: '#000000',
            fontSize: 20,
          }}>
          {useDetail?.name}
        </CustomText>
        <CustomText
          style={{
            fontFamily: FontsConst.Cabin_Bold,
            color: '#737373',
            fontSize: 14,
          }}>
          {useDetail?.email}
        </CustomText>
        <CustomText
          style={{
            fontFamily: FontsConst.Cabin_Bold,
            color: '#737373',
            fontSize: 14,
          }}>
          {useDetail?.mobile}
        </CustomText>
      </View>
      <Divider
        style={{
          width: '90%',
          alignSelf: 'center',
          height: 2,
        }}
      />
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        <CustomText
          style={{
            fontFamily: FontsConst.OpenSans_Bold,
            color: '#454545',
            fontSize: 15,
          }}>
          About
        </CustomText>
        <CustomText
          style={{
            fontFamily: FontsConst.OpenSans_Regular,
            color: '#454545',
            fontSize: 14,
          }}>
          {useDetail?.bio ?? '-'}
        </CustomText>
      </View>
      {isSelf ? (
        <View>
          <Divider
            style={{
              width: '90%',
              alignSelf: 'center',
              height: 2,
            }}
          />
          <View
            style={{
              height: 50,
              paddingHorizontal: 20,
            }}>
            <List.Item
              title={`${'42'} Followings`}
              titleStyle={{
                fontFamily: FontsConst.OpenSans_Regular,
                fontSize: 16,
              }}
              left={props => (
                <CustomIcon
                  origin={ICON_TYPE.ANT_ICON}
                  name={'adduser'}
                  color={'black'}
                  size={25}
                />
              )}
              right={props => (
                <CustomIcon
                  origin={ICON_TYPE.SIMPLE_LINE_ICONS}
                  name={'arrow-right'}
                  color={'black'}
                  size={15}
                />
              )}
            />
          </View>

          <Divider
            style={{
              width: '90%',
              alignSelf: 'center',
              height: 2,
            }}
          />
        </View>
      ) : null}
      <Spacer />
    </ScrollView>
  );
};

export default NormalProfile;

const styles = StyleSheet.create({});
