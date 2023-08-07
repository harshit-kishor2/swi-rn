import {BackHeader, Container, Spacer} from '@app/components';

import PageTitle from '@app/screens/atoms/PageTitle';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ClearableSearch from '../../atoms/ClearableSearch';
import {EmptyList, FooterList, RenderItem} from './common';

export const InterestList = props => {
  const [search, setSearch] = useState('');

  const onLoadMore = () => {};

  return (
    <Container useSafeAreaView={true}>
      <Spacer height={20} />
      <BackHeader />
      <PageTitle title={'Interest List'} />
      <View style={styles.input}>
        <ClearableSearch search={search} setSearch={setSearch} />
      </View>
      <FlatList
        data={[1, 2, 3]}
        contentContainerStyle={styles.flatlist_container}
        keyExtractor={(item, index) => index.toString()}
        renderItem={RenderItem}
        ListEmptyComponent={EmptyList}
        onEndReachedThreshold={0.2}
        onEndReached={onLoadMore}
        ListFooterComponent={FooterList}
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
