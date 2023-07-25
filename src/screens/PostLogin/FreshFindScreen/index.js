import { Container, CustomText, Loader } from '@app/components';
import PageTitle from '@app/screens/atoms/PageTitle';
import SearchHeader from '@app/screens/atoms/SearchHeader';
import { FlatList, StyleSheet, View } from 'react-native';

import ProductCard from '@app/screens/atoms/ProductCard';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { freshFindsAction } from '@app/store/exploreProductSlice';
import { LoadingStatus } from '@app/helper/strings';
import useDebounce from '@app/hooks/useDebounce';

const FreshFindScreen = props => {
  const { exploreProduct, onFreshFinds } = props;
  const [searchQuery, onChangeSearch] = useState('');
  const query = useDebounce(searchQuery, 1000);

  useEffect(() => {
    onFreshFinds({ keyWord: query });
  }, [query]);

  const renderItem = ({ item, index }) => {
    return <ProductCard key={index} item={item} />;
  };
  console.log('exploreProduct.freshFindLoadingStatus ', searchQuery);
  return (
    <Container useSafeAreaView={true}>
      <SearchHeader onChangeSearch={onChangeSearch} searchQuery={searchQuery} />
      <PageTitle title={'Fresh Finds'} />
      {exploreProduct.freshFindLoadingStatus !== LoadingStatus.LOADING ? (
        <FlatList
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          data={exploreProduct?.freshFinds}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'flex-start',
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}
          ListEmptyComponent={() => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <CustomText>No Data Found</CustomText>
            </View>
          )}
        />
      ) : (
        <Loader size={20} />
      )}
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
  onFreshFinds: params => dispatch(freshFindsAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FreshFindScreen);

const styles = StyleSheet.create({});
