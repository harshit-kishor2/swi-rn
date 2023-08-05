import {View, Text, Pressable, Image, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {Container, CustomText} from '@app/components';
import SearchBarComponent from '@app/components/SearchBarComponent';
import {IMAGES, SPACING} from '@app/resources';
import PageTitle from '@app/screens/atoms/PageTitle';
import {Avatar} from 'react-native-paper';
import {FontsConst} from '@app/assets/assets';
import {RoutesName} from '@app/helper/strings';

const DATA = [
  {
    userImage: IMAGES.Ellipse7,
    username: 'Guy Hawkins',
    date: '11 Jan, 2023',
    brand: 'Brand new 2019 Mens Rolex Watch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet ',
  },
  {
    userImage: IMAGES.Ellipse7,
    username: 'Patrick',
    date: '11 Jan, 2023',
    brand: 'Brand new 2020 Fossil Analog Watch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet ',
  },
  {
    userImage: IMAGES.Ellipse7,
    username: 'Will Hawkins',
    date: '11 Jan, 2023',
    brand: 'Pre-owned 2021 Mens Rolex Watch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet ',
  },
  {
    userImage: IMAGES.Ellipse7,
    username: 'Smith Kins',
    date: '11 Jan, 2023',
    brand: 'Pre-owned 2021 Quartz Classy Watch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet...',
  },
  {
    userImage: IMAGES.Ellipse7,
    username: 'Guy Hawkins',
    date: '11 Jan, 2023',
    brand: 'Brand new 2019 Mens Rolex Watch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet ',
  },
  {
    userImage: IMAGES.Ellipse7,
    username: 'Patrick',
    date: '11 Jan, 2023',
    brand: 'Brand new 2020 Fossil Analog Watch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet ',
  },
  {
    userImage: IMAGES.Ellipse7,
    username: 'Will Hawkins',
    date: '11 Jan, 2023',
    brand: 'Pre-owned 2021 Mens Rolex Watch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet ',
  },
  {
    userImage: IMAGES.Ellipse7,
    username: 'Smith Kins',
    date: '11 Jan, 2023',
    brand: 'Pre-owned 2021 Quartz Classy Watch',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet ',
  },
];

const ChatScreen = ({navigation}) => {
  const renderItem = ({item, index}) => {
    return (
      <Pressable
        style={styles.render_container}
        onPress={() => {
          navigation?.navigate(RoutesName.CHAT_DETAIL_SCREEN, {id: '1'});
        }}>
        <Avatar.Image
          style={{marginHorizontal: 5}}
          source={{
            uri: 'https://lh3.googleusercontent.com/ogw/AGvuzYbkLlIwF2xKG4QZq9aFTMRH7Orn1L39UADtLp70Eg=s64-c-mo',
          }}
          size={35}
        />
        <View style={{flex: 1, paddingLeft: 5}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <CustomText
              style={{
                color: '#00958C',
                fontFamily: FontsConst.Cabin_SemiBold,
                fontSize: 15,
              }}>
              {item?.username}
            </CustomText>
            <CustomText
              style={{
                color: '#8F959E',
                fontFamily: FontsConst.OpenSans_Regular,
                fontSize: 10,
              }}>
              {item?.date}
            </CustomText>
          </View>
          <CustomText
            style={{
              color: '#8F959E',
              fontFamily: FontsConst.OpenSans_Bold,
              fontSize: 12,
            }}>
            {item?.brand}
          </CustomText>
          <CustomText
            numberOfLines={2}
            style={{
              color: '#8F959E',
              fontFamily: FontsConst.OpenSans_Regular,
              fontSize: 12,
            }}>
            {item?.description}
          </CustomText>
        </View>
      </Pressable>
    );
  };
  const emptyList = () => (
    <View style={styles.empty_container}>
      <CustomText>No record(s)</CustomText>
    </View>
  );

  const seprator = () => <View style={styles.seprator} />;
  return (
    <Container useSafeAreaView={true}>
      <View style={styles.search_container}>
        <SearchBarComponent
          placeholder={'Search by keyword'}
          onPress={() => {
            // props.navigation.navigate(RoutesName.SEARCH_SCREEN, {
            //   from: 'explore',
            // });
          }}
        />
        <Pressable
          onPress={() => {
            //Alert.alert('Bell clicked');
          }}
          style={{marginLeft: SPACING.SCALE_10, marginTop: SPACING.SCALE_8}}>
          <Image source={IMAGES.notificationBell} />
        </Pressable>
      </View>
      <PageTitle title={'Chats'} />
      <FlatList
        data={DATA}
        contentContainerStyle={styles.flatlist_container}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={emptyList}
        onEndReachedThreshold={30}
        // onEndReached={onLoadMore}
        ItemSeparatorComponent={seprator}
      />
    </Container>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  flatlist_container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
  seprator: {
    borderWidth: 0.5,
    borderColor: '#00000020',
    paddingHorizontal: 10,
  },
  search_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
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
});
