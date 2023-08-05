/* eslint-disable react-native/no-inline-styles */
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

import CustomIcon, {ICON_TYPE} from '@app/components/CustomIcon';

const IMAGE = {
  uri: 'https://lh3.googleusercontent.com/ogw/AGvuzYbkLlIwF2xKG4QZq9aFTMRH7Orn1L39UADtLp70Eg=s64-c-mo',
};
const ActionContainer = () => {
  return (
    <View style={styles.rowContainer}>
      <Pressable
        style={{
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {}}>
        <CustomIcon
          origin={ICON_TYPE.FEATHER_ICONS}
          name={'image'}
          color={'black'}
          size={30}
        />
      </Pressable>
      <TextInput
        style={{
          borderWidth: 1,
          borderRadius: 15,
          height: 40,
          flex: 1,
          paddingHorizontal: 10,
        }}
        outlineColor="grey"
        onChangeText={v => {}}
        placeholder={'Start typing here...'}
      />
      <Pressable
        style={{
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {}}>
        <CustomIcon
          origin={ICON_TYPE.FEATHER_ICONS}
          name={'send'}
          color={'black'}
          size={30}
        />
      </Pressable>
    </View>
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
});

export default ActionContainer;
