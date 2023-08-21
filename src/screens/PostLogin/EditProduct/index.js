import React, { useEffect, useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';

import { Container } from '@app/components';
import {
  addProductDetailAction,
  addProductImageAction,
  addProductPriceAction,
  getAllBrandAction,
  getAllDataAction,
  getAllProductDropdownAction,
  getAllProductModelAction,
  updateProductDetails,
  updateProductImage,
  updateProductPrice,
} from '@app/store/productSlice';
import { connect } from 'react-redux';

import EditProductImage from './EditProductImage';
import EditProductDetails from './EditProductDetail';
import EditProductPrice from './EditProductPrice';
import ProductHeader from '../AddProduct1/ProductHeader';
import EditProductHeader from './EditProductHeader';
import NavigationService from '@app/navigations/NavigationService';
import { RoutesName } from '@app/helper/strings';
const { height, width } = Dimensions.get('window');

const EditProduct = props => {
  const { productReducer, getAllBrand, getAllProductDropdown, getAllProduct } =
    props;
  const [currentPage, setCurrentPage] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);
  const flatlistRef = useRef();

  useEffect(() => {
    getAllBrand();
    getAllProductDropdown();
    getAllProduct({ product_id: props?.route?.params?.product_id });
  }, []);
  const onPageNext = () => {
    if (currentPage < 2) {
      flatlistRef?.current?.scrollToIndex({
        animated: false,
        index: currentPage + 1,
      });
      setCurrentPage(currentPage + 1);
    }
    if (currentPage === 2) {
      setCurrentPage(0);
    }
  };
  const onPagePrev = () => {
    if (currentPage > 0) {
      flatlistRef?.current?.scrollToIndex({
        animated: false,
        index: currentPage - 1,
      });
      setCurrentPage(currentPage - 1);
    } else if (currentPage == 0) {
      // NavigationService.navigate(RoutesName.EDIT_PRODUCT, {
      //     product_id: props?.route?.params?.product_id,
      // });
      props?.navigation?.goBack();
    }
  };

  const handleScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const page = Math.round(contentOffset / width);
    setCurrentPage(page);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          width: width,
        }}>
        {currentPage == 0 ? (
          // <Page1 onPress={onPageNext} />
          <EditProductImage onNextClick={onPageNext} {...props} />
        ) : currentPage == 1 ? (
          <EditProductDetails onNextClick={onPageNext} {...props} />
        ) : currentPage == 2 ? (
          <EditProductPrice onNextClick={onPageNext} {...props} />
        ) : null}
      </View>
    );
  };
  return (
    <Container useSafeAreaView={true}>
      <EditProductHeader currentPage={currentPage} goback={onPagePrev} />
      <FlatList
        horizontal
        scrollEnabled={false}
        ref={flatlistRef}
        data={[1, 2, 3]}
        keyExtractor={item => item.toString()}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={renderItem}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state?.authReducer,
    productReducer: state?.productReducer,
    productState: state?.productStateReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  getAllBrand: params => dispatch(getAllBrandAction(params)),
  getAllProductDropdown: params =>
    dispatch(getAllProductDropdownAction(params)),
  getAllProductModel: params => dispatch(getAllProductModelAction(params)),
  onAddProductImage: params => dispatch(addProductImageAction(params)),
  onAddProductDetail: params => dispatch(addProductDetailAction(params)),
  onAddProductPrice: params => dispatch(addProductPriceAction(params)),
  getAllProduct: params => dispatch(getAllDataAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);

const styles = StyleSheet.create({});
