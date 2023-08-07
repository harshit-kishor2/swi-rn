import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {BackHeader, Container, NavigationBar, Spacer} from '@app/components';
import {COLORS, IMAGES} from '@app/resources';
import PageTitle from '@app/screens/atoms/PageTitle';
import ProductCard from '@app/screens/atoms/ProductCard';
import {RoutesName} from '@app/helper/strings';
import {wishlistAction} from '@app/store/wishlistSlice/wishlist.action';
import {connect} from 'react-redux';
import ProductCardFav from '@app/screens/atoms/ProductCardFav';
import {EmptyList} from '../ChatScreen/commn';

const MyFavourites = props => {
  const {getProductList, wishlistReducer} = props;
  const item = wishlistReducer?.wishlistAction?.data;
  useEffect(() => {
    getProductList();
  }, []);
  const renderItem = ({item, index}) => {
    return <ProductCardFav key={index} item={item} />;
  };
  return (
    <Container useSafeAreaView={true}>
      <View>
        <Spacer height={20} />
        <BackHeader />
        <PageTitle title={'My Favourites'} />
        <FlatList
          data={item}
          numColumns={2}
          renderItem={renderItem}
          ListEmptyComponent={EmptyList}
          contentContainerStyle={styles.flatlist_container}
        />
      </View>
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    wishlistReducer: state.wishlistReducer,
  };
};
const mapDispatchToProps = dispatch => ({
  getProductList: params => dispatch(wishlistAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyFavourites);

const styles = StyleSheet.create({
  flatlist_container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 180,
    paddingTop: 10,
  },
});
