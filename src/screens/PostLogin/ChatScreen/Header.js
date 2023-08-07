import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SearchBarComponent from '@app/components/SearchBarComponent';
import {Pressable} from 'react-native';
import {IMAGES, SPACING} from '@app/resources';

const Header = () => {
  return (
    <View style={styles.search_container}>
      <SearchBarComponent
        placeholder={'Search by keyword'}
        onPress={() => {}}
      />
      <Pressable
        onPress={() => {}}
        style={{marginLeft: SPACING.SCALE_10, marginTop: SPACING.SCALE_8}}>
        <Image source={IMAGES.notificationBell} />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  search_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});
