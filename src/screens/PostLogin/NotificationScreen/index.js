import React, { useEffect } from 'react';
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

import { COLORS, IMAGES, SPACING } from '@app/resources';
import {
  BackHeader,
  Container,
  CustomIcon,
  CustomText,
  NavigationBar,
} from '@app/components';
import NotificationCard from '@app/screens/atoms/NotificationCard';
import PageTitle from '@app/screens/atoms/PageTitle';
import { FontsConst } from '@app/assets/assets';
import { Avatar } from 'react-native-paper';
import { LoadingStatus, RoutesName } from '@app/helper/strings';
import { connect } from 'react-redux';
import authReducer, { NotificationListing } from '@app/store/authSlice';
import { ICON_TYPE } from '@app/components/CustomIcon';





function formatDate(inputDate) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const dateParts = inputDate.split('T')[0].split('-');
  const year = parseInt(dateParts[0]);
  const monthIndex = parseInt(dateParts[1]) - 1;
  const day = parseInt(dateParts[2]);

  const formattedDate = `${day} ${months[monthIndex]}, ${year}`;
  return formattedDate;
}
export function getTimeDifferenceString(date) {
  const now = new Date();
  const timestamp = new Date(date);

  const timeDifferenceInSeconds = Math.floor((now - timestamp) / 1000);

  if (timeDifferenceInSeconds < 60) {
    return 'few seconds ago';
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (timeDifferenceInSeconds < 172800) {
    // 24 * 60 * 60 seconds in a day
    return 'yesterday';
  } else if (timeDifferenceInSeconds < 604800) {
    const days = Math.floor(timeDifferenceInSeconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (timeDifferenceInSeconds < 2419200) {
    const weeks = Math.floor(timeDifferenceInSeconds / 604800);
    return formatDate(date);
  }
}


const NotificationScreen = props => {
  console.log(props?.authReducer?.NotificationListing?.data, "=================>>>>>>>>>>>>>")

  const { navigation, route, getNotificationList } = props;
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
      title: 'Older',
      data: ['Water', 'Coke', 'Beer'],
    },
  ];

  const onRowClick = (type) => {
    switch (type) {
      case 'price-alert':
        navigation.navigate(RoutesName.PRODUCT_DETAILS);
      default:
        break;
    }
  };
  useEffect(() => {
    getNotificationList();
  }, [])

  // Function to categorize notifications
  function categorizeNotifications(notifications) {
    const today = [];
    const thisWeek = [];
    const older = [];

    notifications.forEach(notification => {
      const createdAt = new Date(notification.created_at);

      // Calculate the time difference in days
      const timeDiff = (Date.now() - createdAt) / (1000 * 60 * 60 * 24);

      if (timeDiff <= 0) {
        today.push(notification);
      } else if (timeDiff <= 7) {
        thisWeek.push(notification);
      } else {
        older.push(notification);
      }
    });

    // return { today, thisWeek, older };

    return [
      {
        title: 'Today',
        data: today,
      },
      {
        title: 'This Week',
        data: thisWeek,
      },
      {
        title: 'Older',
        data: older,
      },
    ];
  }

  const modified = categorizeNotifications(props?.authReducer?.NotificationListing?.data?.notifications ?? [])
  console.log("modified", modified)

  const renderSection = (item) => {
    const { section: { title, data } } = item
    console.log(title, "==================>>>>>>>>>>.titile", item)
    if (data.length)
      return (
        <View style={styles.section}>
          <CustomText style={styles.titleText}>{title}</CustomText>
        </View>
      );
  }

  const renderItem = ({ item }) => {
    console.log(item, "itme--------------------->>>>>>>>>>")
    return (
      // <Pressable onPress={() => onRowClick(`${item?.type}`)} style={styles.row}>
      <View>
        <Pressable onPress={() => onRowClick()} style={styles.row}>
          <Avatar.Image source={
            {}
          } size={50} />
          <View
            style={{
              flex: 1,
              paddingHorizontal: 5,
            }}>
            <CustomText style={styles.notification_title}>
              {item?.message}
            </CustomText>
            <CustomText style={styles.notification_price}>{getTimeDifferenceString(`${item?.created_at}`)}</CustomText>
          </View>

        </Pressable>
        <View style={{ height: 1, width: '90%', backgroundColor: 'black', margin: 10, opacity: 0.2 }} />
      </View>
    )
  }

  return (
    <Container useSafeAreaView={true} loading={authReducer.NotificationListing ==
      LoadingStatus.LOADING} >
      <BackHeader />

      <PageTitle title={'Notifications'} />

      <SectionList
        contentContainerStyle={styles.section_container}
        sections={modified}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSection}
      />
    </Container>
  );
};


const styles = StyleSheet.create({
  section_container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  titleText: {
    fontSize: 16,
    fontFamily: FontsConst.Cabin_Bold,
    marginBottom: 10
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

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
  };
};
const mapDispatchToProps = dispatch => ({
  getNotificationList: params => dispatch(NotificationListing()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);