import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CustomText, SubmitButton, CustomInput, Spacer } from '@app/components';
import { FontsConst } from '@app/assets/assets';
import { TextInput } from 'react-native-paper';
import { showAlert } from '@app/helper/commonFunction';
import NavigationService from '@app/navigations/NavigationService';
import { LoadingStatus, RoutesName } from '@app/helper/strings';
import { addProductPriceAction, getAllDataAction, updateProductPrice } from '@app/store/productSlice';
import { connect } from 'react-redux';

const EditProductPrice = (props) => {
    const {
        productReducer,
        updateProductPrice,
        productState,
        onAddProductPrice,
        resetProductState,
        getAllProduct,
        onNextClick,
    } = props;
    useEffect(() => {
        getAllProduct({ product_id: props?.route?.params?.product_id })
    }, [])
    const getPrice = props?.productReducer?.getAllDataAction?.price;
    const product_id = props?.productReducer?.getAllDataAction?.id;

    const [price, setPrice] = useState({ price: getPrice })

    console.log(price?.price, "props at price ========")
    const onButtonSubmit = () => {
        if (!price?.price) {
            showAlert({ title: 'Please enter price.' });
            return;
        } else if (price?.price <= 0) {
            showAlert({ title: 'Amount should be greater that 0. ' });
            return;
        } else {
            const numericValue = price?.price.replace(/[^0-9.]/g, '');
            const data = {
                price: numericValue,
                productID: product_id,
            };
            updateProductPrice(data)
                .then(res => {
                    if (res?.type.includes('fulfilled')) {
                        onNextClick();
                        NavigationService.navigate(RoutesName.SUCCESS_SCREEN, {
                            productID: props?.route?.params?.product_id,
                        });
                        resetProductState();
                    } else if (res?.type.includes('rejected')) {
                        showAlert({
                            title: 'Server error !',
                        });
                    }
                });
        }
    };
    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 30,
                paddingTop: 20,
                paddingHorizontal: 20,
                backgroundColor: '#F0F2FA',
            }}>
            <View>
                <CustomText
                    style={{
                        color: '#00958C',
                        fontFamily: FontsConst.OpenSans_SemiBold,
                        alignSelf: 'center',
                        paddingBottom: 10,
                    }}>
                    Set Price
                </CustomText>
                <CustomText
                    style={{
                        fontFamily: FontsConst.OpenSans_SemiBold,
                        alignSelf: 'center',
                        paddingBottom: 10,
                    }}>
                    Men's Ferrata Watch with Leather Strap
                </CustomText>
                <CustomText
                    style={{
                        color: '#00958C',
                        fontFamily: FontsConst.OpenSans_SemiBold,
                        alignSelf: 'center',
                        paddingBottom: 10,
                    }}>
                    SGD
                </CustomText>
                <TextInput
                    keyboardType="numeric"
                    mode="flat"
                    style={{
                        backgroundColor: '#F0F2FA',
                        alignSelf: 'center',
                        minWidth: 150,
                        paddingBottom: 10,
                    }}
                    contentStyle={{
                        alignSelf: 'center',
                        fontSize: 40,
                        color: '#00958C',
                    }}
                    value={price?.price}
                    onChangeText={v => {
                        const numericValue = v.replace(/[^0-9.]/g, '');

                        // Format the numeric value with commas every three digits
                        const formattedNumber = numericValue.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ',',
                        );

                        // console.log(price,"Price Value ====================>>>>>>>>>>>>>>")
                        if (v.length <= 12) {
                            // updateProductPrice(formattedNumber);
                            setPrice((item) => {
                                return {
                                    ...item,
                                    price: formattedNumber

                                }
                            });
                        }
                    }}
                />
            </View>
            <CustomText
                style={{
                    alignSelf: 'center',
                    paddingVertical: 20,
                    fontFamily: FontsConst.OpenSans_Regular,
                    color: '#4E4E4E',
                }}>
                Get your watch listed on top{' '}
                <CustomText style={{ color: '#00958C' }}>Boost Now</CustomText>
            </CustomText>
            <SubmitButton
                onPress={onButtonSubmit}
                lable="Update"
                disabled={
                    productReducer?.addProductPriceLoadingStatus === LoadingStatus.LOADING
                }
                loading={
                    productReducer?.addProductPriceLoadingStatus === LoadingStatus.LOADING
                }
            />
            <Spacer />
        </ScrollView>
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

    updateProductPrice: params => dispatch(addProductPriceAction(params)),

    getAllProduct: params => dispatch(getAllDataAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProductPrice);