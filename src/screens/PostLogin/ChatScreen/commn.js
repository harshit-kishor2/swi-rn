import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {CustomIcon, CustomText} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import NavigationService from '@app/navigations/NavigationService';
import {RoutesName} from '@app/helper/strings';
import {ActivityIndicator, Avatar} from 'react-native-paper';
import {FontsConst} from '@app/assets/assets';

export function Seprator() {
  return <View style={styles.seprator} />;
}

export function EmptyList() {
  return (
    <View style={styles.empty_container}>
      <CustomText>No record(s)</CustomText>
    </View>
  );
}

function RenderRightAction(item) {
  return (
    <View style={styles.swipe_container}>
      <Pressable onPress={() => console.log('Delete==', item)}>
        <CustomIcon
          name={'delete'}
          origin={ICON_TYPE.MATERIAL_ICONS}
          size={30}
          color={'red'}
        />
      </Pressable>
    </View>
  );
}

export function RenderItem({item, index}) {
  let row = [];
  let prevOpenedRow;
  const closeRow = index => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const onRowClick = () => {
    NavigationService.navigate(RoutesName.CHAT_DETAIL_SCREEN, {id: '1'});
  };

  return (
    <Swipeable
      renderRightActions={() => RenderRightAction(item)}
      onSwipeableOpen={() => closeRow(index)}
      ref={ref => (row[index] = ref)}
      rightOpenValue={-50}>
      <Pressable style={styles.render_container} onPress={onRowClick}>
        <Avatar.Image
          style={{marginHorizontal: 5}}
          source={{
            uri: 'https://lh3.googleusercontent.com/ogw/AGvuzYbkLlIwF2xKG4QZq9aFTMRH7Orn1L39UADtLp70Eg=s64-c-mo',
          }}
          size={35}
        />
        <View style={{flex: 1, paddingLeft: 5}}>
          <View style={styles.chat_container}>
            <CustomText style={styles.name_container}>
              {item?.username}
            </CustomText>
            <CustomText style={styles.date_container}>{item?.date}</CustomText>
          </View>
          <CustomText style={styles.brand_container}>{item?.brand}</CustomText>
          <CustomText numberOfLines={2} style={styles.description_container}>
            {item?.description}
          </CustomText>
        </View>
      </Pressable>
    </Swipeable>
  );
}
export function FooterList() {
  return <ActivityIndicator size={20} />;
}

export function commn() {
  return (
    <View>
      <Text>commn</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  seprator: {
    borderWidth: 0.5,
    borderColor: '#00000020',
    paddingHorizontal: 10,
  },
  empty_container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  render_container: {
    height: 80,
    margin: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  swipe_container: {
    margin: 0,
    alignContent: 'center',
    justifyContent: 'center',
    width: 50,
  },
  chat_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand_container: {
    color: '#8F959E',
    fontFamily: FontsConst.OpenSans_Bold,
    fontSize: 12,
  },
  description_container: {
    color: '#8F959E',
    fontFamily: FontsConst.OpenSans_Regular,
    fontSize: 12,
  },
  date_container: {
    color: '#8F959E',
    fontFamily: FontsConst.OpenSans_Regular,
    fontSize: 10,
  },
  name_container: {
    color: '#00958C',
    fontFamily: FontsConst.Cabin_SemiBold,
    fontSize: 15,
  },
});
