import {BackHeader, Container, Spacer} from '@app/components';

import PageTitle from '@app/screens/atoms/PageTitle';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ClearableSearch from '../../atoms/ClearableSearch';
import {EmptyList, FooterList, RenderItem} from './common';
import {
  InterestListAction,
  sendNotificationnterestListAction,
} from '@app/store/wishlistSlice';
import {connect} from 'react-redux';
import {LoadingStatus} from '@app/helper/strings';

const InterestList = props => {
  const [search, setSearch] = useState('');
  const {getInterestList, wishlistReducer, sendNotification} = props;
  console.log(
    props?.wishlistReducer?.InterestListAction?.data,
    'For interest list ==========>>>>>>>>>>>',
  );
  const item = props?.wishlistReducer?.InterestListAction?.data;
  useEffect(() => {
    getInterestList({type: 'interest_list', search: search});
  }, [search]);

  const onCallback = () => {
    getInterestList({type: 'interest_list', search: search});
  };
  return (
    <Container
      useSafeAreaView={true}
      loading={
        wishlistReducer.InterestListActionLoadingStatus ===
        LoadingStatus.LOADING
      }>
      <Spacer height={20} />
      <BackHeader />
      <PageTitle title={'Interest List'} />
      <View style={styles.input}>
        <ClearableSearch search={search} setSearch={setSearch} />
        {/* <ClearableSearch
          value={search}
          onChangeText={value => setSearch(value)}
        /> */}
      </View>
      <FlatList
        data={item}
        contentContainerStyle={styles.flatlist_container}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) =>
          RenderItem({item, index, sendNotification, onCallback})
        }
        ListEmptyComponent={EmptyList}
        // onEndReachedThreshold={0.2}
        // onEndReached={onLoadMore}
        // ListFooterComponent={FooterList}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  flatlist_container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 50,
    paddingTop: 20,
  },
});

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
    wishlistReducer: state.wishlistReducer,
  };
};
const mapDispatchToProps = dispatch => ({
  getInterestList: params => dispatch(InterestListAction(params)),
  sendNotification: params =>
    dispatch(sendNotificationnterestListAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InterestList);
