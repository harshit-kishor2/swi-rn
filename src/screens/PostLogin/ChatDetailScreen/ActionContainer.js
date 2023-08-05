/* eslint-disable react-native/no-inline-styles */
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

import CustomIcon, {ICON_TYPE} from '@app/components/CustomIcon';
import {CustomText} from '@app/components';

const ActionContainer = () => {
  return (
    <>
      <View style={styles.offer_row}>
        <View style={styles.dollor_container}>
          <CustomIcon
            name={'attach-money'}
            origin={ICON_TYPE.MATERIAL_ICONS}
            size={30}
            color={'#ffffff'}
          />
        </View>
        <View style={styles.offer_container}>
          <View style={styles.offer_text}>
            <CustomText>Make an offer</CustomText>
          </View>
          <View style={styles.triangle} />
        </View>
      </View>
      <View style={styles.rowContainer}>
        <Pressable style={styles.image} onPress={() => {}}>
          <CustomIcon
            origin={ICON_TYPE.FEATHER_ICONS}
            name={'image'}
            color={'black'}
            size={30}
          />
        </Pressable>
        <TextInput
          style={styles.input_container}
          outlineColor="grey"
          onChangeText={v => {}}
          placeholder={'Start typing here...'}
        />
        <Pressable style={styles.sendButton} onPress={() => {}}>
          <CustomIcon
            origin={ICON_TYPE.FEATHER_ICONS}
            name={'send'}
            color={'black'}
            size={30}
          />
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  offer_row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  dollor_container: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#00958C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  offer_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  offer_text: {
    height: 30,
    backgroundColor: '#E7E7E7BD',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 15,
    borderTopWidth: 15,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#E7E7E7BD',
    transform: [{rotate: '90deg'}],
  },
  image: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_container: {
    borderWidth: 1,
    borderRadius: 15,
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default ActionContainer;
