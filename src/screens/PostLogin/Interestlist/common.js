import { FontsConst } from '@app/assets/assets';
import { CustomIcon, CustomText, Spacer } from '@app/components';
import { ICON_TYPE } from '@app/components/CustomIcon';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Avatar } from 'react-native-paper';
// const IMAGE = {
//   uri: 'https://lh3.googleusercontent.com/ogw/AGvuzYbkLlIwF2xKG4QZq9aFTMRH7Orn1L39UADtLp70Eg=s64-c-mo',
// };
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

export function RenderItem({ item, index }) {
  const onRowClick = () => {
    //
  };
  const userName = item?.user?.name;
  const profilePic = item?.user?.image;
  const price = item?.price;
  const watch_title = item?.title;
  const watch_condition = item?.watch_condition;
  console.log(item, "Item==================");
  console.log(profilePic, '---------------')
  return (
    <Pressable onPress={onRowClick} style={styles.product}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Avatar.Image size={30} source={{ uri: profilePic }} />
        <Spacer width={10} />
        <CustomText style={styles.brandtext}>
          {userName}
        </CustomText>
      </View>
      <CustomText style={styles.branddescriptiontext}>
        {watch_title}
      </CustomText>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}>
        <View style={styles.price_row}>
          <CustomText style={styles.price}>${price}</CustomText>
          <View style={styles.circle} />
          <CustomText style={styles.condition}>{watch_condition}</CustomText>
        </View>
        <CustomIcon
          origin={ICON_TYPE.FEATHER_ICONS}
          name={'send'}
          color={'#00958C'}
          size={30}
        />
      </View>
    </Pressable>
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

  product: {
    height: 100,
    width: '100%',
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
  },
  brandtext: {
    color: '#000000',
    fontFamily: FontsConst.Cabin_Bold,
  },
  branddescriptiontext: {
    color: '#717171',
    fontFamily: FontsConst.OpenSans_Regular,
  },
  price_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: '#00958C',
    fontFamily: FontsConst.Cabin_Bold,
    fontSize: 15,
  },
  condition: {
    color: '#00958C',
    fontFamily: FontsConst.Cabin_Regular,
    fontSize: 12,
  },
  circle: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: '#00958C',
    marginHorizontal: 2,
  },
});
