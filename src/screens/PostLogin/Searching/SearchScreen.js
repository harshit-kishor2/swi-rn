import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, Spacer} from '@app/components';
import SearchBarComponent from '@app/components/SearchBarComponent';
import SearchHeader from '@app/screens/atoms/SearchHeader';
import useDebounce from '@app/hooks/useDebounce';
import ProductCard from '@app/screens/atoms/ProductCard';
import {SPACING} from '@app/resources';
import {
  freshFindsSearchingAction,
  getTopNotchWatchSearchingAction,
} from '@app/store/exploreProductSlice';
import {connect} from 'react-redux';
import {
  resetfreshFindsState,
  resetserachstate,
} from '@app/store/exploreProductSlice/exploreProduct.slice';

const SearchScreen = props => {
  console.log('props', props?.route?.params);
  const {
    getTopNotchWatchSearching,
    exploreProduct,
    onFreshFinds,
    resetState,
    onFreshFindsSearching,
    resetFreshFindsState,
  } = props;

  const [searchQuery, onChangeSearch] = useState('');
  const [topNotchWatch, setTopNotchWatch] = useState([]);
  const [page, setPage] = useState(1);
  const query = useDebounce(searchQuery, 1000);

  console.log(
    'sdfghjkdfghjkdfghm===',
    query,
    exploreProduct?.topNotchWatchSearching,
  );

  useEffect(() => {
    if (query.length > 0) {
      if (props?.route?.params?.from === 'explore') {
        console.log('asdfghjkjhfdsdhjhgfdjhgv');
        setPage(1);
        getTopNotchWatchSearching({page: 1, keyWord: query});
        setTopNotchWatch(exploreProduct?.topNotchWatchSearching);
      } else if (props?.route?.params?.from === 'freshFinds') {
        console.log('RAHUL CALLED');
        onFreshFindsSearching({keyWord: query});
      }
    }
    return () => {
      console.log('Unmounrt');
      resetState();
      resetFreshFindsState();
    };
  }, [query]);

  return (
    <Container
      loading={exploreProduct.topNotchWatchSearchingLoadingStatus === 'loading'}
      useSafeAreaView={true}>
      <SearchHeader searchQuery={searchQuery} onChangeSearch={onChangeSearch} />
      <View style={{marginHorizontal: SPACING.SCALE_10}}>
        <FlatList
          data={
            props?.route?.params?.from === 'explore'
              ? exploreProduct?.topNotchWatchSearching
              : exploreProduct?.freshFindsSearching
          }
          numColumns={2}
          renderItem={({item, index}) => {
            return <ProductCard item={item} />;
          }}
        />
        <Spacer height={SPACING.SCALE_60} />
      </View>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    exploreProduct: state?.exploreProductReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  getTopNotchWatchSearching: params =>
    dispatch(getTopNotchWatchSearchingAction(params)),
  onFreshFindsSearching: params => dispatch(freshFindsSearchingAction(params)),
  resetState: () => dispatch(resetserachstate()),
  resetFreshFindsState: () => dispatch(resetfreshFindsState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
