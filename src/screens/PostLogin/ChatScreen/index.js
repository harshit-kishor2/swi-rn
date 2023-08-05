import { View, Text, Pressable, Alert, TextComponent } from 'react-native';
import React from 'react';
import SearchHeader from '@app/screens/atoms/SearchHeader';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import SearchBarComponent from '@app/components/SearchBarComponent';
import { COLORS, IMAGES, SPACING } from '@app/resources';
import { CustomIcon } from '@app/components';
import { ICON_TYPE } from '@app/components/CustomIcon';
import PageTitle from '@app/screens/atoms/PageTitle';
import { Image } from 'react-native';

const Item = (
  { username,
    userImage,
    date,
    brand,
    description ,
    onPress
  }
) => {
  return (
    <View style={{ marginHorizontal: 15 }}>
      <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={onPress}>
        <View style={{ justifyContent: 'center' }}>
          <Image source={userImage} style={{ height: 36, width: 36, borderRadius: 18 }} />
        </View>
        <View style={{ marginHorizontal: 20 ,width: '90%', paddingVertical:5}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between',  }}>
            <Text style={{ fontFamily: 'Cabin-Regular', fontSize: 16, color: '#00958C' }}>{username}</Text>
            <View style={{}}>     
               <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 11, color: '#8F959E', marginTop: 10, right:40}}> {date}</Text>
            </View>   
             </View>
          <View>
            <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 13, color: '#8F959E' }}>{brand}</Text>
            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 13, color: '#8F959E' }}>{description}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{ height: 1, width: '98%', backgroundColor: '#D8D8D8', alignSelf: 'center', marginVertical: 15, borderRadius: 10 }} />

    </View>
  )
}

const DATA = [
  {
    userImage: IMAGES.Ellipse7,
    username: 'Guy Hawkins',
    date: '11 Jan, 2023',
    brand: 'Brand new 2019 Mens Rolex Watch',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet...',

  },
  {
    userImage: IMAGES.Ellipse7,
    username: 'Patrick',
    date: '11 Jan, 2023',
    brand: 'Brand new 2020 Fossil Analog Watch',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet...',

  },
  {
    userImage: IMAGES.Ellipse7,
    username: 'Will Hawkins',
    date: '11 Jan, 2023',
    brand: 'Pre-owned 2021 Mens Rolex Watch',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet...',

  },
  {
    userImage: IMAGES.Ellipse7,
    username: 'Smith Kins',
    date: '11 Jan, 2023',
    brand: 'Pre-owned 2021 Quartz Classy Watch',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet...',

  },
  {
    userImage: IMAGES.Ellipse7,
    username: 'Guy Hawkins',
    date: '11 Jan, 2023',
    brand: 'Brand new 2019 Mens Rolex Watch',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet...',

  },
  {
    userImage: IMAGES.Ellipse7,
    username: 'Patrick',
    date: '11 Jan, 2023',
    brand: 'Brand new 2020 Fossil Analog Watch',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet...',

  },
  {
    userImage: IMAGES.Ellipse7,
    username: 'Will Hawkins',
    date: '11 Jan, 2023',
    brand: 'Pre-owned 2021 Mens Rolex Watch',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet...',

  },
  {
    userImage: IMAGES.Ellipse7,
    username: 'Smith Kins',
    date: '11 Jan, 2023',
    brand: 'Pre-owned 2021 Quartz Classy Watch',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit malesuada eget vitae amet...',

  },


];

const ChatScreen = () => {
  const renderItem = ({ item, index }) => (
    <Item
      userImage={item.userImage}
      username={item.username}
      date={item.date}
      brand={item.brand}
      description={item.description}

      index={index}
    />
  );
  return (
    <View style={{ flex: 1, backgroundColor: 'white', width: '100%' }}>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
          marginTop: 10,
        }}>
        <SearchBarComponent
          onPress={() => {
            props.navigation.navigate(RoutesName.SEARCH_SCREEN, {
              from: 'freshFinds',
            });
          }}
        />
        <Pressable
          onPress={() => {
            Alert.alert('Bell clicked');
          }}
          style={{ marginLeft: SPACING.SCALE_10, marginTop: SPACING.SCALE_8 }}>
          <CustomIcon
            origin={ICON_TYPE.OCTICONS}
            size={25}
            color={'black'}
            name={'bell'} />
        </Pressable>
      </View>

      <PageTitle title={'Chats'} />
      <FlatList
        data={DATA}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ChatScreen;
