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
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [offerModalVisible, setOfferModalVisible] = useState(false);

  const [allMessage, setAllMessage] = useState([]);
  const {id} = route.params;

  // Retrive mwessages
  useEffect(() => {
    setAllMessage(data);
  }, []);

  const loadMore = () => {
    console.log('Load more==');
    setAllMessage([...data, ...allMessage]);
  };

  //  Send text message
  const sendMessage = message => {
    console.log('send');
    setAllMessage([...allMessage, {id: 1, sender: false, message: message}]);
    if (allMessage.length) {
      flatRef.current?.scrollToIndex({animated: true, index: 0});
    }
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

  const reversedData = allMessage.slice().reverse();

  return (
    <Container
      style={{
        backgroundColor: '#FFFFFF90',
      }}
      useSafeAreaView={true}>
      <Header />
      <FlatList
        inverted={reversedData.length ? true : false}
        ref={flatRef}
        data={reversedData}
        contentContainerStyle={styles.flatlist_container}
        keyExtractor={(item, index) => index.toString()}
        renderItem={RenderItem}
        ListEmptyComponent={EmptyList}
        ListFooterComponent={FooterList}
        ItemSeparatorComponent={<Spacer />}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
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
});
