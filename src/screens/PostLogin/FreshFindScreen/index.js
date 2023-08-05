import {Container, CustomText, Loader} from '@app/components';
import PageTitle from '@app/screens/atoms/PageTitle';
import SearchHeader from '@app/screens/atoms/SearchHeader';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';

import ProductCard from '@app/screens/atoms/ProductCard';
import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {freshFindsAction} from '@app/store/exploreProductSlice';
import {LoadingStatus, RoutesName} from '@app/helper/strings';
import useDebounce from '@app/hooks/useDebounce';
import SearchBarComponent from '@app/components/SearchBarComponent';
import {IMAGES, SPACING} from '@app/resources';

const FreshFindScreen = props => {
  const {exploreProduct, onFreshFinds} = props;
  const [searchQuery, onChangeSearch] = useState('');
  const query = useDebounce(searchQuery, 1000);
console.log(props)
  useEffect(() => {
    onFreshFinds({keyWord: query});
  }, [query]);

  const renderItem = ({item, index}) => {
    return <ProductCard key={index} item={item} />;
  };
  console.log('exploreProduct.freshFindLoadingStatus ', searchQuery);
  return (
    <Container useSafeAreaView={true}>
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
              from: 'freshFinds',
            });
          }}
        />
        <Pressable
          onPress={() => {
            Alert.alert('Bell clicked');
          }}
          style={{marginLeft: SPACING.SCALE_10, marginTop: SPACING.SCALE_8}}>
          <Image source={IMAGES.notificationBell} />
        </Pressable>
      </View>

      {/* <SearchHeader onChangeSearch={onChangeSearch} searchQuery={searchQuery} /> */}
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
            paddingHorizontal: 10,
            paddingBottom: 10,
          }}
          ListEmptyComponent={() => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
