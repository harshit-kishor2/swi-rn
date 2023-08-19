import {Container} from '@app/components';
import {LoadingStatus} from '@app/helper/strings';
import PageTitle from '@app/screens/atoms/PageTitle';
import {getChatListAction} from '@app/store/chatSlice';
import {useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Header from './Header';
import {EmptyList, EmptyList1, RenderItem, Seprator} from './commn';
import {NotificationCount} from '@app/store/authSlice';

const ChatScreen = props => {
  const {chatReducer, getNotificationCount, authReducer} = props;

  useEffect(() => {
    // getNotificationCount();
  }, []);

  return (
    <Container useSafeAreaView={true}>
      <Header {...props} />
      <PageTitle title={'Chats'} />
      <FlatList
        data={chatReducer?.chatList?.data}
        contentContainerStyle={styles.flatlist_container}
        keyExtractor={(item, index) => index.toString()}
        renderItem={RenderItem}
        ListEmptyComponent={EmptyList1}
        onEndReachedThreshold={0.2}
        ItemSeparatorComponent={Seprator}
        // onEndReached={onLoadMore}
        // ListFooterComponent={FooterList}
      />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    chatReducer: state?.chatReducer,
    authReducer: state?.authReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  getChatHistory: params => dispatch(getChatListAction(params)),
  getNotificationCount: params => dispatch(NotificationCount(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

const styles = StyleSheet.create({
  flatlist_container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
});
