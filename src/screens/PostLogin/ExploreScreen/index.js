import {Container} from '@app/components';
import ProductCard from '@app/screens/atoms/ProductCard';
import SearchHeader from '@app/screens/atoms/SearchHeader';
import {FlatList, StyleSheet} from 'react-native';
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
import useDebounce from '@app/screens/atoms/useDebounce';
import {LoadingStatus} from '@app/helper/strings';

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

  const query = useDebounce(searchQuery, 1000);

  useEffect(() => {
    getBannerList();
    getTrendyWatch();
    getAllBrands();
  }, []);

  useEffect(() => {
    getTopNotchWatch({page: 1, keyWord: query});
  }, [query]);

  useEffect(() => {
    if (
      exploreProduct?.bannerListLoadingStatus === LoadingStatus.LOADED &&
      exploreProduct?.trendyWatchesLoadingStatus === LoadingStatus.LOADED
    ) {
      setIsLoading(false);
    }
  }, [exploreProduct]);

  const renderItem = () => {
    return <ProductCard />;
  };

  const HEADER = () => {
    return (
      <>
        <Banner bannerData={exploreProduct?.bannerList} />
        <TrendyWatch {...props} />
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
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        ListHeaderComponent={HEADER}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: 'flex-start',
          paddingHorizontal: 10,
        }}
      />
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
