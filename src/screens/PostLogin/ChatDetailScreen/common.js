import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {CustomIcon, CustomText, Spacer, SubmitButton} from '@app/components';
import moment from 'moment';
import Video from 'react-native-video';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {FontsConst} from '@app/assets/assets';

export function EmptyList() {
  return (
    <View style={styles.empty_container}>
      <CustomText>
        Say <CustomText style={styles.empty_text}>Hi!</CustomText> to start the
        conversation.
      </CustomText>
    </View>
  );
}

export function FooterList() {
  return <ActivityIndicator size={20} />;
}

export function RenderItem(props) {
  const {
    currentMessage,
    position,
    setFullImageVisible,
    isSeller,
    onAcceptReject,
    hasEnabledObject,
  } = props;
  const isSelf = position === 'right' ?? false;
  return (
    <View style={{width: '80%', margin: 10}}>
      <View
        style={{
          backgroundColor: isSelf ? '#00958C' : '#00000010',
          flexDirection: 'row',
          alignSelf: isSelf ? 'flex-end' : 'flex-start',
          borderTopRightRadius: isSelf ? 0 : 30,
          borderBottomLeftRadius: isSelf ? 30 : 0,
          borderBottomRightRadius: 30,
          borderTopLeftRadius: 30,
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}>
        {currentMessage?.image !== null ? (
          <Pressable
            onPress={() =>
              setFullImageVisible({
                visible: true,
                uri: currentMessage?.image,
                type: 'image',
              })
            }>
            <Image
              source={{uri: currentMessage?.image}}
              style={{
                height: 200,
                width: 200,
                borderRadius: 15,
              }}
            />
          </Pressable>
        ) : currentMessage?.video !== null ? (
          <Pressable
            onPress={() =>
              setFullImageVisible({
                visible: true,
                uri: currentMessage?.video,
                type: 'video',
              })
            }>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomIcon
                name={'video'}
                origin={ICON_TYPE.MATERIAL_COMMUNITY}
                size={20}
                color={'#000'}
              />
              <Spacer width={10} />
              <CustomText>{'Uploaded Video'}</CustomText>
            </View>
            <CustomText>{'Tap to see video'}</CustomText>
          </Pressable>
        ) : currentMessage?.file?.url !== null ? (
          <Pressable
            onPress={() =>
              setFullImageVisible({
                visible: true,
                uri: currentMessage?.file?.url,
                type: 'pdf',
              })
            }>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomIcon
                name={'picture-as-pdf'}
                origin={ICON_TYPE.MATERIAL_ICONS}
                size={20}
                color={'#000'}
              />
              <Spacer width={10} />
              <CustomText>{'Uploaded PDF'}</CustomText>
            </View>
            <CustomText>{'Tap to see pdf'}</CustomText>
          </Pressable>
        ) : currentMessage?.quickReplies !== null ? (
          <View>
            <CustomText
              style={{
                fontFamily: FontsConst.Cabin_Bold,
                alignSelf: 'center',
              }}>
              {' '}
              Make an offer
            </CustomText>
            <CustomText
              style={{
                fontFamily: FontsConst.Cabin_Bold,
                fontSize: 20,
                alignSelf: 'center',
              }}>
              {currentMessage?.text}
            </CustomText>
            {isSeller && !isSelf ? (
              <View style={{flexDirection: 'row'}}>
                <SubmitButton
                  disabled={!isSeller}
                  lable="Accept"
                  onPress={() =>
                    hasEnabledObject ? null : onAcceptReject('accepted')
                  }
                />
                <SubmitButton
                  disabled={!isSeller}
                  type="outlined"
                  lable="Reject"
                  onPress={() =>
                    hasEnabledObject ? null : onAcceptReject('rejected')
                  }
                />
              </View>
            ) : null}
          </View>
        ) : (
          <CustomText>{currentMessage?.text}</CustomText>
        )}
      </View>
      <View
        style={{
          alignSelf: isSelf ? 'flex-end' : 'flex-start',
        }}>
        <CustomText style={styles.timestamp}>
          {moment(currentMessage?.createdAt).format('HH:mm A')}
        </CustomText>
      </View>
    </View>
  );
}

export function common() {
  return (
    <View>
      <Text>common</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  empty_container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    // transform: [{scaleY: -1}],
  },
  empty_text: {
    fontWeight: 'bold',
    color: '#00958C',
  },
  timestamp: {
    color: '#97ADB6',
    fontSize: 10,
  },
});
