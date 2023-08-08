import {Container, CustomIcon, CustomText} from '@app/components';
import ProductCard from '@app/screens/atoms/ProductCard';
import SearchHeader from '@app/screens/atoms/SearchHeader';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  SectionList,
  RefreshControl,
} from 'react-native';
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
import {useEffect, useRef, useState} from 'react';
import {LoadingStatus, RoutesName} from '@app/helper/strings';
import useDebounce from '@app/hooks/useDebounce';
import Filter from './Filter';
import useLocation from '@app/hooks/useLocation';
import SearchBarComponent from '@app/components/SearchBarComponent';
import NotificationIndicator from '@app/components/NotificationIndicator';
import {IMAGES, SPACING} from '@app/resources';
import {AssestsConst} from '@app/assets/assets';
import {mergeArrays} from '@app/helper/commonFunction';

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
  // console.log(props.navigation,"props navigation")
  const [searchQuery, onChangeSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [page, setPage] = useState(1);
  const [topNotchWatch, setTopNotchWatch] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const filterRef = useRef(false);

  const query = useDebounce(searchQuery, 1000);

  useEffect(() => {
    getBannerList();
    getTrendyWatch();
    getAllBrands();
  }, []);

  useEffect(() => {
    if (refreshing) {
      setPage(1);
      Promise.all([
        getBannerList(),
        getTrendyWatch(),
        getAllBrands(),
        getTopNotchWatch({page: 1, keyWord: query}),
      ]).then(val => {
        setRefreshing(false);
      });
    }
  }, [refreshing]);

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
      if (query.length > 0 || page === 1) {
        setTopNotchWatch(exploreProduct?.topNotchWatch);
      } else {
        // const result = [
        //   ...topNotchWatch,
        //   ...exploreProduct?.topNotchWatch,
        // ].reduce((res, data) => {
        //   if (!res.some(item => item.id === data.id)) {
        //     res.push(data);
        //   }
        //   return res;
        // }, []);
        const mergedData = mergeArrays(
          topNotchWatch,
          exploreProduct?.topNotchWatch,
        );
        console.log('Merge==', mergedData);
        setTopNotchWatch(mergedData);
      }
    }
  }, [exploreProduct]);

  const renderItem = ({item, index}) => {
    return <ProductCard key={index} item={item} />;
  };

  const renderItemm = ({section}) => {
    if (section.horizontal) {
      return (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
              marginTop: 10,
            }}>
            <SearchBarComponent
              onPress={() => {
                props.navigation.navigate(RoutesName.SEARCH_SCREEN, {
                  from: 'explore',
                });
              }}
            />
            <Pressable
              onPress={() => {}}
              style={{
                marginLeft: SPACING.SCALE_10,
                marginTop: SPACING.SCALE_8,
              }}>
              <Image source={IMAGES.notificationBell} />
            </Pressable>
          </View>

          <Banner bannerData={exploreProduct?.bannerList} />
          <TrendyWatch
            setIsFilter={setIsFilter}
            refreshing={refreshing}
            {...props}
          />
        </>
      );
    } else {
      return (
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 40,
          }}
          data={topNotchWatch}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'flex-start',
            paddingHorizontal: 10,
            paddingBottom: 10,
          }}
          onEndReachedThreshold={0.3}
          onEndReached={onLoadMore}
          ListEmptyComponent={() => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <CustomText>No Data Found</CustomText>
            </View>
          )}
          extraData={refreshing}
        />
      );
    }
  };

  return (
    <Container useSafeAreaView={true} loading={isLoading}>
      <SectionList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }
        sections={[
          {
            title: 'Horizontal List',
            horizontal: true,
            data: ['Item 1'],
          },
          {
            title: 'Vertical List',
            horizontal: false,
            data: ['Item 4'],
          },
        ]}
        renderItem={renderItemm}
        keyExtractor={(item, index) => index.toString()}
      />
      <Filter
        isFilter={isFilter}
        setIsFilter={setIsFilter}
        setTopNotchWatch={setTopNotchWatch}
        {...props}
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
