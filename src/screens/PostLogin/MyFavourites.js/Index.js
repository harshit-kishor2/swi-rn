import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { Container, NavigationBar } from '@app/components'
import { COLORS, IMAGES } from '@app/resources'
import PageTitle from '@app/screens/atoms/PageTitle'
import ProductCard from '@app/screens/atoms/ProductCard'
import { RoutesName } from '@app/helper/strings'
import { wishlistAction } from '@app/store/wishlistSlice/wishlist.action'
import { connect } from 'react-redux'
import ProductCardFav from '@app/screens/atoms/ProductCardFav'

const MyFavourites = (props) => {
  const { getProductList, wishlistReducer } = props;
console.log(props?.wishlistReducer?.wishlistAction?.data,"my fevorite props================================")
const item= props?.wishlistReducer?.wishlistAction?.data;
useEffect(
  () => {
    
     
    getProductList()

  }, []
)
const renderItem = ({item, index}) => {
    
  return <ProductCardFav key={index} item={item} />;
};
  return (
    <Container useSafeAreaView={true}>
        <View >
        <View style={{marginHorizontal:10, marginBottom:-10, marginTop:10}}>
        <NavigationBar
                leftSource={IMAGES.BACKARROW}
                leftAction={() => {
                    // console.log('first');
                    props.navigation.navigate(RoutesName.PROFILE_TAB);
                }}
                flexDirection="row"
    />
        </View>

    <View>
                <PageTitle title={'My Favourites'}/>
    </View>


    <FlatList
    data={item}
    numColumns={2}
    renderItem={renderItem}
    
    
    />
    </View>
    </Container>
  )
}
const mapStateToProps = state => {
    return {
       
        wishlistReducer: state.wishlistReducer
    }
}
const mapDispatchToProps = dispatch => ({
    getProductList: params => dispatch(wishlistAction())
});

export default connect(mapStateToProps,mapDispatchToProps)(MyFavourites);