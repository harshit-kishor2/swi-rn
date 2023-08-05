import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BackHeader, Container, CustomText} from '@app/components';
import {Avatar} from 'react-native-paper';
import Header from './Header';
import {FontsConst} from '@app/assets/assets';
import ActionContainer from './ActionContainer';
const IMAGE = {
  uri: 'https://lh3.googleusercontent.com/ogw/AGvuzYbkLlIwF2xKG4QZq9aFTMRH7Orn1L39UADtLp70Eg=s64-c-mo',
};
const ChatDetailScreen = ({navigation, route}) => {
  const {id} = route.params;
  console.log('Id==', id);

  const renderItem = ({item, index}) => {
    return <View style={{height: 30, backgroundColor: 'red'}}></View>;
  };
  const emptyList = () => (
    <View style={styles.empty_container}>
      <CustomText>
        Say{' '}
        <CustomText style={{fontWeight: 'bold', color: '#00958C'}}>
          Hi!
        </CustomText>{' '}
        to start the conversation.
      </CustomText>
    </View>
  );

  const seprator = () => <View style={styles.seprator} />;
  const header = () => {
    return (
      <View
        style={{
          height: 70,
          width: '100%',
          backgroundColor: '#F4F4F4',
          borderRadius: 10,
          paddingHorizontal: 20,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Image
          style={{
            height: 40,
            width: 40,
            borderRadius: 10,
            backgroundColor: '#D9D9D9',
          }}
          source={IMAGE}
        />
        <View
          style={{
            paddingLeft: 15,
          }}>
          <CustomText
            style={{color: '#000000', fontFamily: FontsConst.Cabin_Bold}}>
            2020 Fossil Analog Watch
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText
              style={{
                color: '#00958C',
                fontFamily: FontsConst.Cabin_Bold,
                fontSize: 15,
              }}>
              $12500{' '}
            </CustomText>
            <View
              style={{
                height: 4,
                width: 4,
                borderRadius: 2,
                backgroundColor: '#00958C',
                marginHorizontal: 2,
              }}
            />
            <CustomText
              style={{
                color: '#00958C',
                fontFamily: FontsConst.Cabin_Regular,
                fontSize: 12,
              }}>
              {' '}
              Brand New{' '}
            </CustomText>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Container
      style={{
        backgroundColor: '#FFFFFF90',
      }}
      useSafeAreaView={true}>
      <Header />
      <FlatList
        data={[]}
        contentContainerStyle={styles.flatlist_container}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={header}
        renderItem={renderItem}
        ListEmptyComponent={emptyList}
        onEndReachedThreshold={30}
        // onEndReached={onLoadMore}
        ItemSeparatorComponent={seprator}
      />
      <ActionContainer />
    </Container>
  );
};

export default ChatDetailScreen;

const styles = StyleSheet.create({
  flatlist_container: {
    flexGrow: 1,
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
