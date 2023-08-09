import {Container} from '@app/components';
import {LoadingStatus} from '@app/helper/strings';
import PageTitle from '@app/screens/atoms/PageTitle';
import {getChatListAction} from '@app/store/chatSlice';
import {useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Header from './Header';
import {EmptyList, RenderItem, Seprator} from './commn';

const ChatScreen = props => {
  const {chatReducer, getChatHistory} = props;

  useEffect(() => {
    getChatHistory();
  }, []);

  return (
    <Container
      useSafeAreaView={true}
      loading={chatReducer.chatListLoadingStatus === LoadingStatus.LOADING}>
      <Header />
      <PageTitle title={'Chats'} />
      <FlatList
        data={chatReducer?.chatList}
        contentContainerStyle={styles.flatlist_container}
        keyExtractor={(item, index) => index.toString()}
        renderItem={RenderItem}
        ListEmptyComponent={EmptyList}
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
  };
};

const mapDispatchToProps = dispatch => ({
  getChatHistory: params => dispatch(getChatListAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

const styles = StyleSheet.create({
  flatlist_container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
});
