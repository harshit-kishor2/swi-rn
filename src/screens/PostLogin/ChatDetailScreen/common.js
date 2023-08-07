import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {CustomText} from '@app/components';

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

export function RenderItem({item, index}) {
  return (
    <>
      <View
        style={{
          alignSelf: item.sender ? 'flex-start' : 'flex-end',
        }}>
        <CustomText style={styles.timestamp}>{'12:30 PM'}</CustomText>
      </View>
      <View
        style={{
          backgroundColor: item.sender ? '#00000010' : '#00958C',
          flexDirection: 'row',
          alignSelf: item.sender ? 'flex-start' : 'flex-end',
          borderTopRightRadius: item.sender ? 30 : 0,
          borderBottomLeftRadius: item.sender ? 0 : 30,
          borderBottomRightRadius: 30,
          borderTopLeftRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 10,
          maxWidth: '90%',
        }}>
        <CustomText>{item?.message}</CustomText>
      </View>
    </>
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
