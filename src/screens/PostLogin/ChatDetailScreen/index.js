import {Container, CustomText, Spacer} from '@app/components';
import {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ActionContainer from './ActionContainer';
import Header from './Header';
import ImageModal from './ImageModal';
import {AndroidCameraPermission} from '../../../../androidcamerapermission';
import {showAlert} from '@app/helper/commonFunction';
import {EmptyList, FooterList, RenderItem} from './common';
import MakeOfferModal from './MakeOfferModal';
import InterestModal from './InterestModal';
import {connect} from 'react-redux';
import {
  getChatHistoryAction,
  getChatListAction,
  onNewMessageUpdate,
  sendMessageAction,
  socketJoinAction,
} from '@app/store/chatSlice';
import {LoadingStatus} from '@app/helper/strings';
import {getProductDetailsAction} from '@app/store/exploreProductSlice';
import socket from '@app/helper/socket';

const ChatDetailScreen = props => {
  const {
    chatReducer,
    authReducer,
    getChatDetails,
    getProductDetails,
    sendChatMessage,
    updateSocketId,
    getChatHistory,
    updateNewMessage,
    navigation,
    route,
  } = props;
  const flatRef = useRef();
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [offerModalVisible, setOfferModalVisible] = useState(false);
  const [interestModalVisible, setInterestModalVisible] = useState(false);
  const {chat_item} = route.params;
  useEffect(() => {
    getChatDetails({
      product_id: chat_item?.product_id,
      receiver_id: chat_item?.user_id,
    });
    getProductDetails({
      product_id: chat_item?.product_id,
    });
    updateSocketId({
      socket_id: socket?.id,
    });
    return () => {
      getChatHistory();
    };
  }, []);

  useEffect(() => {
    socket.on('newMessage', msg => {
      console.log(msg, 'newMessage');
    });
    socket.on('typing', val => {
      console.log('Typing..', val);
    });

    // updateNewMessage({message: 'Hello'});
  }, [socket]);

  //  Send text message
  const sendMessage = message => {
    sendChatMessage({
      receiver_id: chat_item?.user_id,
      type: 'text',
      message: message,
      product_id: chat_item?.product_id,
    });
  };

  // Open attachment modal if permission
  const sendAttachment = async () => {
    const permissionStatus = await AndroidCameraPermission();
    if (permissionStatus) {
      setImageModalVisible(!imageModalVisible);
    } else {
      showAlert({
        title: 'Error!',
        message: 'Permission denied',
      });
    }
  };

  // const reversedData = (chatReducer?.chatHistory ?? []).slice().reverse();

  return (
    <Container
      style={{
        backgroundColor: '#FFFFFF90',
      }}
      useSafeAreaView={true}
      loading={chatReducer.chatHistoryLoadingStatus === LoadingStatus.LOADING}>
      <Header
        onInterestClick={() => setInterestModalVisible(!interestModalVisible)}
        chat_item={chat_item}
        {...props}
      />
      <FlatList
        inverted={chatReducer?.chatHistory.length ? true : false}
        ref={flatRef}
        data={chatReducer?.chatHistory ?? []}
        contentContainerStyle={styles.flatlist_container}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) =>
          RenderItem({
            item,
            index,
            currentUser: authReducer?.userProfileDetails,
          })
        }
        ListEmptyComponent={EmptyList}
        ItemSeparatorComponent={<Spacer />}
        // onEndReachedThreshold={0.5}
        // onEndReached={loadMore}
        // ListFooterComponent={FooterList}
      />
      <ActionContainer
        onAttachmentClick={sendAttachment}
        onSendMessageClick={sendMessage}
        onMakeOfferClick={() => setOfferModalVisible(!offerModalVisible)}
      />

      {/* Image Modal */}
      <ImageModal
        modalVisible={imageModalVisible}
        setModalVisible={setImageModalVisible}
      />
      {/* Make Offer Modal */}
      <MakeOfferModal
        modalVisible={offerModalVisible}
        setModalVisible={setOfferModalVisible}
        sendMessage={sendMessage}
      />
      {/* Interest List Modal */}
      <InterestModal
        modalVisible={interestModalVisible}
        setModalVisible={setInterestModalVisible}
      />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    chatReducer: state?.chatReducer,
    authReducer: state?.authReducer,
    exploreProduct: state?.exploreProductReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  getChatDetails: params => dispatch(getChatHistoryAction(params)),
  getChatHistory: params => dispatch(getChatListAction(params)),

  getProductDetails: params => dispatch(getProductDetailsAction(params)),
  updateSocketId: params => dispatch(socketJoinAction(params)),
  sendChatMessage: params => dispatch(sendMessageAction(params)),
  updateNewMessage: params => dispatch(onNewMessageUpdate(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatDetailScreen);

const styles = StyleSheet.create({
  flatlist_container: {
    flexGrow: 1,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
});
