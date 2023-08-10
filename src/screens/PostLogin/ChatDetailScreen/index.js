import {Container, CustomIcon, CustomText, Spacer} from '@app/components';
import {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import ActionContainer from './ActionContainer';
import Header from './Header';
import ImageModal from './ImageModal';
import {AndroidCameraPermission} from '../../../../androidcamerapermission';
import {showAlert} from '@app/helper/commonFunction';
import {EmptyList, FooterList, RenderItem, RenderItem1} from './common';
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

import useSocket from '@app/hooks/useSocket';
import socket from '@app/helper/socket';
import {Modal} from 'react-native-paper';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import {transformedMessages} from '../../../helper/commonFunction';

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
  const [initialLoad, setInitialLoad] = useState(true);

  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [offerModalVisible, setOfferModalVisible] = useState(false);
  const [interestModalVisible, setInterestModalVisible] = useState(false);
  const [fullImageVisible, setFullImageVisible] = useState({
    visible: false,
    uri: '',
  });

  const {chat_item, isOffer} = route.params;

  //  Use socket
  useSocket(updateNewMessage);

  // First render
  useEffect(() => {
    if (isOffer) {
      setOfferModalVisible(true);
    }
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

  //  Send text message
  const sendMessage = ({type = 'text', message}) => {
    scrollToIndex(0);
    const formData = new FormData();
    formData.append('receiver_id', chat_item?.user_id);
    formData.append('type', type);
    formData.append('product_id', chat_item?.product_id);

    if (type !== 'image') {
      formData.append('message', message);
    }
    if (type === 'image') {
      const d = message?.path?.split('/');
      const name = d[d.length - 1];
      formData.append(`media`, {
        name: name ?? 'Image' + Date.now() + '.jpg',
        type: message.mime,
        uri:
          Platform.OS === 'ios'
            ? message.path.replace('file://', '')
            : message.path,
      });
      formData.append('message', 'Uploaded Image');
    }
    sendChatMessage(formData);
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

  const scrollToIndex = index => {
    if (flatRef.current) {
      flatRef.current._listRef.scrollToIndex({
        // animated: true,
        index: index,
      });
    }
  };
  //  For moving chat on search index
  useEffect(() => {
    if (chatReducer?.chatHistory && chatReducer?.chatHistory.length) {
      if (initialLoad && flatRef.current) {
        const findIndex = chatReducer?.chatHistory?.findIndex(
          (item, index) => item.id === chat_item.id,
        );
        console.log('findIndex', findIndex);

        if (findIndex >= 1) {
          flatRef.current._listRef?.scrollToOffset({
            offset: findIndex * 1000,
            // animated: true,
          });
          const wait = new Promise(resolve => setTimeout(resolve, 2000));
          wait
            .then(() => {
              scrollToIndex(findIndex);
              setInitialLoad(false);
            })
            .catch(err => {
              console.log('errrr', err);
            });
        }
      }
    }
  }, [chatReducer, initialLoad]);

  // const reversedData = (chatReducer?.chatHistory ?? []).slice().reverse();
  const modifyData = transformedMessages(chatReducer?.chatHistory);
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
      <View
        style={{
          flex: 1,
        }}>
        <GiftedChat
          messageContainerRef={ref => (flatRef.current = ref)}
          keyboardShouldPersistTaps="never"
          messages={modifyData}
          listViewProps={{
            contentContainerStyle: {
              margin: 0,
              padding: 0,
            },
          }}
          renderComposer={null}
          bottomOffset={0}
          renderAvatar={null}
          renderActions={() => null}
          renderChatFooter={() => null}
          renderSend={() => null}
          renderBubble={props => {
            return RenderItem({
              ...props,
              setFullImageVisible: setFullImageVisible,
            });
          }}
          user={{
            _id: `${authReducer?.userProfileDetails?.id}`,
          }}
          minInputToolbarHeight={5}
          renderInputToolbar={props => {}}
        />
      </View>
      <ActionContainer
        onAttachmentClick={sendAttachment}
        onSendMessageClick={sendMessage}
        onMakeOfferClick={() => setOfferModalVisible(!offerModalVisible)}
      />
      {/* Image Modal */}
      <ImageModal
        modalVisible={imageModalVisible}
        setModalVisible={setImageModalVisible}
        sendMessage={sendMessage}
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
      {/* Full Screen Image Modal */}

      <Modal
        visible={fullImageVisible.visible}
        presentationStyle="fullScreen"
        onRequestClose={() => {
          setFullImageVisible({
            visible: false,
            uri: '',
          });
        }}
        hardwareAccelerated>
        <View
          style={{
            height: '100%',
            backgroundColor: '#000',
          }}>
          <View
            style={{
              flexDirection: 'row-reverse',
              height: 50,
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <Pressable
              onPress={() => {
                setFullImageVisible({
                  visible: false,
                  uri: '',
                });
              }}>
              <CustomIcon
                name={'close'}
                origin={ICON_TYPE.MATERIAL_ICONS}
                size={25}
                color={'#fff'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            <Image
              resizeMode="contain"
              source={{uri: fullImageVisible.uri}}
              style={{
                flex: 1,
              }}
            />
          </View>
        </View>
      </Modal>
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
