import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {CustomText} from '@app/components';
import moment from 'moment';

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

export function RenderItem({item, index, currentUser, setFullImageVisible}) {
  const isSelf = currentUser?.id == item?.sender_id ?? false;
  return (
    <>
      <View
        style={{
          alignSelf: isSelf ? 'flex-end' : 'flex-start',
        }}>
        <CustomText style={styles.timestamp}>
          {moment(item?.created_at).format('HH:mm A')}
        </CustomText>
      </View>
      <View
        style={{
          backgroundColor: isSelf ? '#00958C' : '#00000010',
          flexDirection: 'row',
          alignSelf: isSelf ? 'flex-end' : 'flex-start',
          borderTopRightRadius: isSelf ? 0 : 30,
          borderBottomLeftRadius: isSelf ? 30 : 0,
          borderBottomRightRadius: 30,
          borderTopLeftRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 10,
          maxWidth: '90%',
        }}>
        {item.type === 'image' ? (
          <Pressable
            onPress={() =>
              setFullImageVisible({visible: true, uri: item?.docs})
            }>
            <Image
              source={{uri: item?.docs}}
              style={{
                height: 200,
                width: 200,
              }}
            />
          </Pressable>
        ) : (
          <CustomText>{item?.message}</CustomText>
        )}
      </View>
    </>
  );
}

export function RenderItem1(props) {
  const {currentMessage, position, currentUser, setFullImageVisible} = props;
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
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        {currentMessage?.image !== null ? (
          <Pressable
            onPress={() =>
              setFullImageVisible({visible: true, uri: currentMessage?.image})
            }>
            <Image
              source={{uri: currentMessage?.image}}
              style={{
                height: 200,
                width: 200,
              }}
            />
          </Pressable>
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
