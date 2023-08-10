import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { BackHeader, Container, Spacer } from '@app/components'
import PageTitle from '@app/screens/atoms/PageTitle'
import { EmptyList, RenderItem } from './historyCard'
import { connect } from 'react-redux'
import { purchaseProductListingAction } from '@app/store/ratingReviewSlice'

const ProductHistory = (props) => {
    const { getProductList, authReducer, ratingReviewReducer } = props;

    useEffect(() => {

        getProductList()
    }, [])
    const item = props?.ratingReviewReducer?.purchaseProductListingAction?.data;
    console.log(item, "==========================>>>>>>>>>>>>>>>>>>>>>>item")

    return (
        <Container useSafeAreaView={true}>
            <Spacer height={20} />
            <BackHeader />
            <PageTitle title={'Product History'} />

            <FlatList
                data={item}
                contentContainerStyle={styles.flatlist_container}
                //keyExtractor={(item, index) => index.toString()}
                renderItem={RenderItem}
                ListEmptyComponent={EmptyList}
            // onEndReachedThreshold={0.2}
            // onEndReached={onLoadMore}
            // ListFooterComponent={FooterList}
            />
        </Container >
    )
}


const mapStateToProps = state => {
    return {
        authReducer: state.authReducer,
        ratingReviewReducer: state.ratingReviewReducer



    };
};
const mapDispatchToProps = dispatch => ({
    getProductList: params => dispatch(purchaseProductListingAction()),

});

export default connect(mapStateToProps, mapDispatchToProps)(ProductHistory);
