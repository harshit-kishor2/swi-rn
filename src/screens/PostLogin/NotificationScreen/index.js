import React, {useEffect} from 'react';
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
  CustomIcon,
  CustomText,
  NavigationBar,
} from '@app/components';
import NotificationCard from '@app/screens/atoms/NotificationCard';
import PageTitle from '@app/screens/atoms/PageTitle';
import {FontsConst} from '@app/assets/assets';
import {Avatar, Divider} from 'react-native-paper';
import {LoadingStatus, RoutesName} from '@app/helper/strings';
import {connect} from 'react-redux';
import authReducer, {NotificationListing} from '@app/store/authSlice';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {EmptyList} from '../ChatScreen/commn';
import moment from 'moment';

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
  } else {
    return moment(date).format('D MMM YYYY');
  }
}

const NotificationScreen = props => {
  const {navigation, route, getNotificationList} = props;

  const onRowClick = type => {
    switch (type) {
      case 'price-alert':
        navigation.navigate(RoutesName.PRODUCT_DETAILS);
      default:
        break;
    }
  };
  useEffect(() => {
    getNotificationList();
  }, []);

  // Function to categorize notifications
  function categorizeNotifications(notifications) {
    const today = [];
    const thisWeek = [];
    const older = [];

    notifications.forEach(notification => {
      const createdAt = new Date(notification.created_at);

      // Calculate the time difference in days
      const timeDiff = (Date.now() - createdAt) / (1000 * 60 * 60 * 24);
      console.log('timeDiff', timeDiff, createdAt);
      if (timeDiff <= 0) {
        today.push(notification);
      } else if (timeDiff <= 7) {
        thisWeek.push(notification);
      } else {
        older.push(notification);
      }
    });

    // return { today, thisWeek, older };
    const newArr = [];
    if (today.length) {
      newArr.push({
        title: 'Today',
        data: today,
      });
    }
    if (thisWeek.length) {
      newArr.push({
        title: 'This Week',
        data: thisWeek,
      });
    }
    if (older.length) {
      newArr.push({
        title: 'Older',
        data: older,
      });
    }

    return newArr;
  }

  const modified = categorizeNotifications(
    props?.authReducer?.NotificationListing?.data?.notifications ?? [],
  );
  console.log('Modified==', modified);
  const renderSection = item => {
    const {
      section: {title, data},
    } = item;
    if (data.length)
      return (
        <View style={styles.section}>
          <CustomText style={styles.titleText}>{title}</CustomText>
        </View>
      );
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <Pressable onPress={() => onRowClick()} style={styles.row}>
          <Avatar.Image
            source={{uri: props?.authReducer?.NotificationListing?.data?.image}}
            size={50}
          />
          <View
            style={{
              flex: 1,
              paddingHorizontal: 5,
            }}>
            <CustomText style={styles.notification_title}>
              {item?.message}
            </CustomText>
            <CustomText style={styles.notification_price}>
              {getTimeDifferenceString(`${item?.created_at}`)}
            </CustomText>
          </View>
        </Pressable>
        <Divider style={{marginVertical: 10}} />
      </View>
    );
  };

  return (
    <Container
      useSafeAreaView={true}
      loading={authReducer.NotificationListing == LoadingStatus.LOADING}>
      <BackHeader />

      <PageTitle title={'Notifications'} />

      <SectionList
        contentContainerStyle={styles.section_container}
        sections={modified}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSection}
        ListEmptyComponent={EmptyList}
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
    marginBottom: 10,
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
