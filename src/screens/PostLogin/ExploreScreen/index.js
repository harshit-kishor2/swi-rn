import {Container, CustomText} from '@app/components';
import ProductCard from '@app/screens/atoms/ProductCard';
import SearchHeader from '@app/screens/atoms/SearchHeader';
import {FlatList, StyleSheet, View} from 'react-native';
import Banner from './Banner';
import TrendyWatch from './TrendyWatch';
import {connect} from 'react-redux';
import {
  addWishListAction,
  freshFindsAction,
  getBannerAction,
  getBrandListingAction,
  getTopNotchWatchAction,
  getTrendyWatchAction,
} from '@app/store/exploreProductSlice';
import {useEffect, useState} from 'react';
import {LoadingStatus} from '@app/helper/strings';
import useDebounce from '@app/hooks/useDebounce';
import Filter from './Filter';
import useLocation from '@app/hooks/useLocation';

const ExploreScreen = props => {
  const {
    exploreProduct,
    onFreshFinds,
    getBannerList,
    getTrendyWatch,
    getTopNotchWatch,
    onAddWishList,
    getAllBrands,
  } = props;

  const [searchQuery, onChangeSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [topNotchWatch, setTopNotchWatch] = useState([]);
  const [isFilter, setIsFilter] = useState(false);

  const query = useDebounce(searchQuery, 1000);

  useEffect(() => {
    getBannerList();
    getTrendyWatch();
    getAllBrands();
  }, []);

  const onLoadMore = () => {
    if (exploreProduct?.isLoadMore) {
      getTopNotchWatch({page: page, keyWord: query});
      setPage(page + 1);
    }
  };
  useEffect(() => {
    if (query.length > 0) {
      setPage(1);
      getTopNotchWatch({page: 1, keyWord: query});
    } else {
      setTopNotchWatch([]);
      getTopNotchWatch({page: page, keyWord: query});
      setPage(page + 1);
    }
  }, [query]);

  useEffect(() => {
    if (
      exploreProduct?.bannerListLoadingStatus === LoadingStatus.LOADED &&
      exploreProduct?.trendyWatchesLoadingStatus === LoadingStatus.LOADED
    ) {
      setIsLoading(false);
    }
    if (exploreProduct?.topNotchWatchLoadingStatus === LoadingStatus.LOADED) {
      if (query.length > 0) {
        setTopNotchWatch(exploreProduct?.topNotchWatch);
      } else {
        const result = [
          ...topNotchWatch,
          ...exploreProduct?.topNotchWatch,
        ].reduce((res, data) => {
          if (!res.some(item => item.id === data.id)) {
            res.push(data);
          }
          return res;
        }, []);
        setTopNotchWatch(result);
      }
    }
  }, [exploreProduct]);

  const renderItem = ({item, index}) => {
    return <ProductCard key={index} item={item} />;
  };

  const HEADER = () => {
    return (
      <>
        <Banner bannerData={exploreProduct?.bannerList} />
        <TrendyWatch setIsFilter={setIsFilter} {...props} />
      </>
    );
  };

  return (
    <Container useSafeAreaView={true} loading={isLoading}>
      <SearchHeader onChangeSearch={onChangeSearch} searchQuery={searchQuery} />
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 40,
        }}
        data={topNotchWatch}
        ListHeaderComponent={HEADER}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: 'flex-start',
          paddingHorizontal: 10,
          paddingBottom: 10,
        }}
        onEndReachedThreshold={30}
        onEndReached={onLoadMore}
        ListEmptyComponent={() => (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <CustomText>No Data Found</CustomText>
          </View>
        )}
      />
      {isFilter ? (
        <Filter
          isFilter={isFilter}
          setIsFilter={setIsFilter}
          setTopNotchWatch={setTopNotchWatch}
          {...props}
        />
      ) : null}
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state?.authReducer,
    exploreProduct: state?.exploreProductReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  getBannerList: params => dispatch(getBannerAction(params)),
  getTrendyWatch: params => dispatch(getTrendyWatchAction(params)),
  getTopNotchWatch: params => dispatch(getTopNotchWatchAction(params)),
  getAllBrands: params => dispatch(getBrandListingAction(params)),

  onAddWishList: params => dispatch(addWishListAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen);

const styles = StyleSheet.create({});
