import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {BackHeader, Container, CustomText, Spacer} from '@app/components';
import {Avatar} from 'react-native-paper';
import Header from './Header';
import {FontsConst} from '@app/assets/assets';
import ActionContainer from './ActionContainer';
import useKeyboardVisible from '@app/hooks/useKeyboardVisible';
const data = [
  {
    id: 1,
    sender: true,
    message: 'Hello !',
  },
  {
    id: 1,
    sender: false,
    message: 'Hello !',
  },
  {
    id: 1,
    sender: true,
    message: 'How are you !',
  },
  {
    id: 1,
    sender: false,
    message: "I'm fine brother !",
  },
  {
    id: 1,
    sender: false,
    message:
      "I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother !",
  },
  {
    id: 1,
    sender: false,
    message:
      "I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother !",
  },
  {
    id: 1,
    sender: false,
    message:
      "I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother ! I'm fine brother !",
  },
];

const ChatDetailScreen = ({navigation, route}) => {
  const flatRef = useRef();
  const [message, setMessage] = useState('');
  const [allMessage, setAllMessage] = useState([]);
  const {id} = route.params;
  console.log('Id==', id);

  useEffect(() => {
    setAllMessage(data);
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (allMessage.length) {
  //       flatRef.current?.scrollToEnd();
  //     }
  //   }, 50);
  // }, [allMessage]);

  const sendMessage = () => {
    console.log('send');
    setAllMessage([...allMessage, {id: 1, sender: false, message: message}]);
    setMessage('');
  };
  console.log('Mesaa', allMessage);
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

  const renderItem = ({item, index}) => {
    return (
      <>
        <View
          style={{
            backgroundColor: item.sender ? '#00000010' : '#00958C',
            flexDirection: 'row',
            alignSelf: item.sender ? 'flex-start' : 'flex-end',
            borderTopRightRadius: item.sender ? 30 : 0,
            borderBottomLeftRadius: item.sender ? 0 : 30,
            borderBottomRightRadius: 30,
            borderTopLeftRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 10,
            maxWidth: '90%',
          }}>
          <CustomText>{item?.message}</CustomText>
        </View>
        <View
          style={{
            alignSelf: item.sender ? 'flex-start' : 'flex-end',
          }}>
          <CustomText
            style={{
              color: '#97ADB6',
              fontSize: 10,
            }}>
            {'12:30 PM'}
          </CustomText>
        </View>
      </>
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
        // inverted={true}
        ref={flatRef}
        data={allMessage}
        contentContainerStyle={styles.flatlist_container}
        keyExtractor={(item, index) => index.toString()}
        onContentSizeChange={() => flatRef.current?.scrollToEnd()}
        onLayout={() => flatRef.current?.scrollToEnd({animated: true})}
        // ListFooterComponent={header}
        renderItem={renderItem}
        ListEmptyComponent={emptyList}
        onEndReachedThreshold={30}
        // onEndReached={onLoadMore}
        ItemSeparatorComponent={<Spacer />}
      />
      <ActionContainer
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </Container>
  );
};

export default ChatDetailScreen;

const styles = StyleSheet.create({
  flatlist_container: {
    flexGrow: 1,
    marginHorizontal: 20,
    paddingVertical: 10,
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
