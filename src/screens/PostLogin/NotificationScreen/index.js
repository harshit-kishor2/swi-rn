import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {COLORS, IMAGES, SPACING} from '@app/resources';
import {
  BackHeader,
  Container,
  CustomText,
  NavigationBar,
} from '@app/components';
import NotificationCard from '@app/screens/atoms/NotificationCard';
import PageTitle from '@app/screens/atoms/PageTitle';
import {FontsConst} from '@app/assets/assets';
import {Avatar} from 'react-native-paper';
import {RoutesName} from '@app/helper/strings';

const NotificationScreen = props => {
  const {navigation, route} = props;
  const DATA = [
    {
      title: 'Today',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
      title: 'This Week',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
      title: 'Date',
      data: ['Water', 'Coke', 'Beer'],
    },
  ];

  const onRowClick = type => {
    switch (type) {
      case 'PRODUCT_DETAIL':
        navigation.navigate(RoutesName.PRODUCT_DETAILS);
      default:
        break;
    }
  };

  const renderSection = ({section: {title}}) => (
    <View style={styles.section}>
      <CustomText style={styles.titleText}>{title}</CustomText>
    </View>
  );

  const renderItem = ({item}) => (
    <Pressable onPress={() => onRowClick()} style={styles.row}>
      <Avatar.Image source={{}} size={50} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 5,
        }}>
        <CustomText style={styles.notification_title}>
          'Description message may be very long. Descri message may be very
          long. Description message may be very long.
        </CustomText>
        <CustomText style={styles.notification_price}>1 hour ago</CustomText>
      </View>
    </Pressable>
  );

  return (
    <Container useSafeAreaView={true}>
      <BackHeader />

      <PageTitle title={'Notifications'} />

      <SectionList
        contentContainerStyle={styles.section_container}
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSection}
      />
    </Container>
  );
};

export default NotificationScreen;
const styles = StyleSheet.create({
  section_container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  titleText: {
    fontSize: 16,
    fontFamily: FontsConst.Cabin_Bold,
  },
  section: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  notification_title: {
    fontSize: 14,
    fontFamily: FontsConst.OpenSans_Regular,
    color: '#000000',
  },
  notification_price: {
    fontSize: 12,
    fontFamily: FontsConst.OpenSans_Regular,
    color: '#00000080',
  },
});
