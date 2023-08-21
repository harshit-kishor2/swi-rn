import {
    CustomIcon,
    CustomText,
    DatePicker,
    Spacer,
    SubmitButton,
} from '@app/components';
import React from 'react';
import { ICON_TYPE } from '@app/components/CustomIcon';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { List, TextInput } from 'react-native-paper';
import { showAlert } from '@app/helper/commonFunction';
import { LoadingStatus } from '@app/helper/strings';
import MonthYearPicker from '@app/components/MonthYearPicker';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import DropDownWithModel from '../AddProduct1/DropDownWithModel';
import FactoryGemRow from '../AddProduct1/FactoryGemRow';
import LocationModal from '../AddProduct1/LocationModal';
import { connect } from 'react-redux';
import { addProductDetailAction, getAllDataAction, getAllProductDropdownAction, getAllProductModelAction } from '@app/store/productSlice';
const DIFF_MODEL = ['Rolex', 'Audemars Piguet', 'Patek Philippe'];
const EditProductDetails = (props) => {
    const {
        productReducer,
        productState,
        updateProductDetails,
        getAllProductModel,
        onAddProductDetail,
        getAllProduct,
        onNextClick,
        getAllProductDropdown,
        locationData,
        UpdateDetails
    } = props;
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());




    useEffect(() => {
        getAllProductDropdown()
        getAllProduct({ product_id: props?.route?.params?.product_id }).then((res) => {
            console.log("resp", res)
            if (res.meta.requestStatus == "fulfilled") {
                setNewData(item => {
                    return {
                        ...item,
                        productID: res?.payload?.data?.id,

                        brand: {
                            id: res?.payload?.data?.brand?.id,
                            name: res?.payload?.data?.brand?.name,
                        },
                        brand_id: res?.payload?.data?.brand_id,
                        model_id: res?.payload?.data?.model_id,
                        model: {
                            id: res?.payload?.data?.model?.id,
                            name: res?.payload?.data?.model?.name,
                        },
                        title: res?.payload?.data?.title,
                        watch_condition: res?.payload?.data?.watch_condition,
                        no_certain: res?.payload?.data?.no_certain,
                        dated: res?.payload?.data?.dated,
                        accessories: res?.payload?.data?.accessories,
                        description: res?.payload?.data?.description,
                        gender_type: res?.payload?.data?.gender_type,
                        dial: res?.payload?.data?.dial,
                        dial_markers: res?.payload?.data?.dial_markers,
                        case_size: res?.payload?.data?.case_size,
                        movement: res?.payload?.data?.movement,
                        case_materials: res?.payload?.data?.case_materials,
                        bracelet: res?.payload?.data?.bracelet,
                        clasp: res?.payload?.data?.clasp,
                        factory_gem_set: res?.payload?.data?.factory_gem_set,
                        custom_gem_set: res?.payload?.data?.custom_gem_set,
                        location: res?.payload?.data?.location,
                        latitude: res?.payload?.data?.latitude,
                        longitude: res?.payload?.data?.longitude,
                        // factory_gem_set_data: factory_gem_set_data.map((item, index) => {

                        //     item?.gem_position = res?.payload?.data?.factory_gem_set_data.map((item, index) => {

                        //     })

                        // }),
                        // custom_gem_set_data: custom_gem_set_data.map((item, index) => {

                        //     item?.gem_position = res?.payload?.data?.factory_gem_set_data.map((item, index) => {

                        //     })

                        // }),

                    }
                })

            }

        })

    }, [])
    useEffect(() => {

        if (NewData?.brand_id) {
            getAllProductModel({ id: NewData?.brand_id });

        }
    }, [NewData?.brand_id]);
    const MODEL_LIST = props?.productReducer?.getAllProductModel;
    const data = props?.productReducer?.getAllDataAction;
    console.log(data, "Data for chek")

    const [NewData, setNewData] = useState(null)


    const DropDownList = props?.productReducer?.getAllProductDropdown;
    // const AccessoriesListing = props?.productReducer?.getAllProductDropdown?.ACCESSORIES;
    // const AccessoriesId = AccessoriesListing?.filter(item => item.name === NewData?.accessories)[0]?.id
    // const CaseMaterialListing = DropDownList?.CASEMATERIAL;
    // const CaseSizeListing = DropDownList?.CASESIZE;
    const { ACCESSORIES, CASEMATERIAL, CASESIZE, CLASP, CUSTOMFACTTORYGEM, DIAL, DIALMARKERS, FACTTORYGEM, MOVEMENT, STRAPBRACELET } = DropDownList;
    const AccessoriesId = ACCESSORIES?.filter(item => item.name === NewData?.accessories)[0]?.id;
    const CaseMaterialId = parseInt(NewData?.case_materials);
    const CaseSizeId = CASESIZE?.filter(item => item.name === NewData?.case_size)[0]?.id;
    const DialId = DIAL?.filter(item => item.name === NewData?.dial)[0]?.id
    const DialMarkers = DIALMARKERS?.filter(item => item.name === NewData?.dial_markers)[0]?.id
    const MovementId = MOVEMENT?.filter(item => item.name === NewData?.movement)[0]?.id
    const BraceletId = parseInt(NewData?.bracelet);
    const ClaspId = parseInt(NewData?.clasp);
    console.log(NewData, "new Data ====================>>>>>>>>>>>>>")

    const checkValidation = () => {
        let errorObj = {
            status: false,
            error: '',
        };
        if (!NewData?.brand_id) {
            errorObj = {
                status: true,
                error: 'Please select brand.',
            };
            return errorObj;
        } else if (!NewData?.model_id) {
            errorObj = {
                status: true,
                error: 'Please select model.',
            };
            return errorObj;
        } else if (!NewData?.title) {
            errorObj = {
                status: true,
                error: 'Please enter title.',
            };
            return errorObj;
        } else if (!NewData?.dated) {
            errorObj = {
                status: true,
                error: 'Please select date.',
            };
            return errorObj;
        } else if (!NewData?.accessories) {
            errorObj = {
                status: true,
                error: 'Please select accessories.',
            };
            return errorObj;
        } else if (
            productState?.productDetails.factory_gem_set === 'Yes' &&
            productState?.productDetails?.factory_gem.length <= 0
        ) {
            errorObj = {
                status: true,
                error: 'Please select factory gem set.',
            };
            return errorObj;
        } else if (
            productState?.productDetails.factory_gem_set === 'Yes' &&
            productState?.productDetails?.factory_gem.length > 0 &&
            productState?.productDetails?.factory_gem.some(item => !item.text)
        ) {
            errorObj = {
                status: true,
                error: "Please type what's factory gem.",
            };
            return errorObj;
        } else if (
            productState?.productDetails.custom_gem_set === 'Yes' &&
            productState?.productDetails?.custom_gem.length <= 0
        ) {
            errorObj = {
                status: true,
                error: 'Please select custom.',
            };
            return errorObj;
        } else if (
            productState?.productDetails.custom_gem_set === 'Yes' &&
            productState?.productDetails?.custom_gem.length > 0 &&
            productState?.productDetails?.custom_gem.some(item => !item.text)
        ) {
            errorObj = {
                status: true,
                error: "Please type what's custom.",
            };
            return errorObj;
        } else if (
            DIFF_MODEL.includes(selectedBrand) &&
            !NewData?.dial
        ) {
            errorObj = {
                status: true,
                error: 'Please select dial.',
            };
            return errorObj;
        } else if (
            DIFF_MODEL.includes(selectedBrand) &&
            !NewData.bracelet
        ) {
            errorObj = {
                status: true,
                error: 'Please select bracelet.',
            };
            return errorObj;
        } else if (
            DIFF_MODEL.includes(selectedBrand) &&
            productState?.productDetails.custom_gem_set === 'No'
        ) {
            errorObj = {
                status: true,
                error: 'Please select custom.',
            };
            return errorObj;
        } else if (!NewData?.location) {
            errorObj = {
                status: true,
                error: 'Please select location.',
            };
            return errorObj;
        } else {
            errorObj = {
                status: false,
                error: '',
            };
            return errorObj;
        }
    };
    const onProductDetailSubmit = (item) => {
        console.log(item, "Onsubmit=================")

        let errorObj = checkValidation();
        if (errorObj.status) {
            showAlert({
                title: 'Fill all required fields.',
                message: errorObj.error,
            });
        } else {
            UpdateDetails(NewData).then(res => {
                if (res?.type.includes('fulfilled')) {
                    onNextClick();
                } else if (res?.type.includes('rejected')) {
                    showAlert({
                        title: 'Server error !',
                    });
                }
            })
        }

    };
    return (
        <>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container_style}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <DropDownWithModel
                        onClick={(item, text) => {
                            // updateProductDetails({
                            //     key: 'brand_id',
                            //     value: item.name === 'Others' ? text : item?.id,
                            // });
                            // updateProductDetails({
                            //     key: 'new_brand',
                            //     value: item.name === 'Others' ? true : false,
                            // });
                            // updateProductDetails({ key: 'model_id', value: '' });
                            // updateProductDetails({
                            //     key: 'new_model',
                            //     value: false,
                            // });
                            // setSelectedBrand(item?.name);
                            // // setNewData({ ...NewData, brand_id: item?.id })
                            // setNewData({ ...NewData, brand: { id: item?.id } })
                            // setNewData({ ...NewData, brand: { name: item?.name } })
                            // setNewData({ ...item, brand_id: item?.id })
                            setNewData((data) => {
                                return {
                                    ...data,
                                    brand_id: item?.id,
                                    brand: { id: item?.id },
                                    brand: { name: item?.name }


                                }
                            });
                            setSelectedBrand(item?.name);

                        }}
                        data={productReducer?.getAllBrand}
                        value={NewData?.brand_id}
                        label={'Choose Brand'}
                        isRequired={'*'}
                    />
                    <DropDownWithModel
                        // onClick={v => updateProductDetails({key: 'model_id', value: v?.id})}
                        onClick={(item, text) => {
                            // updateProductDetails({
                            //     key: 'model_id',
                            //     value: item.name === 'Others' ? text : item?.id,
                            // });
                            // updateProductDetails({
                            //     key: 'new_model',
                            //     value: item.name === 'Others' ? true : false,
                            // });

                            //     setNewData((item) =>
                            //     return
                            //         { ...item, model_id: item?.id , model: {id: item?.id } , model: {name: item?.name } })

                            // }}
                            setNewData((data) => {
                                return {
                                    ...data,
                                    model_id: item?.id,
                                    model: { id: item?.id },
                                    model: { name: item?.name }

                                }
                            });
                            setSelectedBrand(item?.name);
                        }}
                        data={
                            MODEL_LIST
                                ? MODEL_LIST
                                : []
                        }
                        value={NewData?.model_id}
                        label={'Model'}
                        isRequired={'*'}
                    />
                </View>
                <Spacer height={30} />
                <>
                    <CustomText style={{ color: '#7C7C7C' }}>
                        Title <CustomText style={{ color: 'red' }}>*</CustomText>
                    </CustomText>
                    <TextInput
                        style={{
                            backgroundColor: '#F0F2FA',
                            minWidth: '45%',
                            marginBottom: 10,
                            paddingHorizontal: 0,
                        }}
                        value={NewData?.title}
                        placeholder="Enter your title..."
                        onChangeText={v => {
                            // updateProductDetails({ key: 'title', value: v })
                            setNewData((data) => {
                                return {
                                    ...data,
                                    title: v
                                }
                            });
                        }}
                    />
                </>
                <Spacer height={30} />

                <>
                    <CustomText style={{ color: '#7C7C7C' }}>
                        Watch Condition <CustomText style={{ color: 'red' }}>*</CustomText>
                    </CustomText>
                    <View style={{ flexDirection: 'row' }}>
                        <SubmitButton
                            lable="Brand New"
                            mode={
                                NewData?.watch_condition === 'Brand New'
                                    ? 'contained'
                                    : 'outlined'
                            }
                            buttonColor={
                                NewData?.watch_condition === 'Brand New'
                                    ? '#00958C'
                                    : 'transparent'
                            }
                            onPress={() => {
                                // updateProductDetails({
                                //     key: 'watch_condition',
                                //     value: 'brand_new',
                                // })
                                // setNewData({ ...NewData, watch_condition: 'Brand New' })
                                setNewData((data) => {
                                    return {
                                        ...data,
                                        watch_condition: 'Brand New'
                                    }
                                });
                            }
                            }
                            textColor={
                                NewData?.watch_condition === 'Brand New'
                                    ? 'white'
                                    : '#00958C'
                            }
                            buttonStyle={{
                                borderRadius: 50,
                                height: 40,
                                borderColor:
                                    NewData?.watch_condition === 'Brand New'
                                        ? 'white'
                                        : '#00958C',
                            }}
                        />
                        <SubmitButton
                            onPress={() => {
                                // updateProductDetails({
                                //     key: 'watch_condition',
                                //     value: 'pre_owned',
                                // })

                                // setNewData({ ...NewData, watch_condition: 'Pre-Owned' })
                                setNewData((data) => {
                                    return {
                                        ...data,
                                        watch_condition: 'Brand New'
                                    }
                                });

                            }
                            }
                            lable="Pre-Owned"
                            mode={
                                NewData?.watch_condition === 'Pre-Owned'
                                    ? 'contained'
                                    : 'outlined'
                            }
                            buttonColor={
                                NewData?.watch_condition === 'Pre-Owned'
                                    ? '#00958C'
                                    : 'transparent'
                            }
                            textColor={
                                NewData?.watch_condition === 'Pre-Owned'
                                    ? 'white'
                                    : '#00958C'
                            }
                            buttonStyle={{
                                borderRadius: 50,
                                height: 40,
                                borderColor:
                                    NewData?.watch_condition === 'pre_owned'
                                        ? 'white'
                                        : '#00958C',
                            }}
                        />
                    </View>
                </>
                <Spacer height={30} />

                <>
                    <CustomText style={{ color: '#7C7C7C' }}>
                        Dated <CustomText style={{ color: 'red' }}>*</CustomText>
                    </CustomText>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <MonthYearPicker
              onChange={e => {
                updateProductDetails({
                  key: 'dated',
                  value: e,
                });
              }}
              value={productState?.productDetails?.dated}
            /> */}
                        <Pressable
                            onPress={() => {
                                setShow(true);
                            }}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '60%',
                                borderBottomWidth: 1,
                                marginRight: 20,
                            }}>
                            <CustomText>
                                {NewData?.dated
                                    ? moment(NewData?.dated).format(
                                        'MMM, YYYY',
                                    )
                                    : 'MM, YYYY'}
                            </CustomText>
                            <CustomIcon
                                name={'calendar'}
                                origin={ICON_TYPE.FEATHER_ICONS}
                                style={{
                                    paddingRight: 10,
                                    marginBottom: 5,
                                    color: '#000000',
                                }}
                                size={20}
                            />
                        </Pressable>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '30%',
                                paddingRight: 20,
                            }}>
                            <Pressable
                                onPress={() => {
                                    // updateProductDetails({
                                    //     key: 'no_certain',
                                    //     value:
                                    //         productState?.productDetails?.no_certain === 'yes'
                                    //             ? 'no'
                                    //             : 'yes',
                                    // });

                                    // setNewData({
                                    //     ...NewData, no_certain: productState?.productDetails?.no_certain === 'yes'
                                    //         ? 'no'
                                    //         : 'yes',
                                    // })

                                    setNewData((data) => {
                                        return {
                                            ...data,
                                            no_certain: productState?.productDetails?.no_certain === 'yes'
                                                ? 'no'
                                                : 'yes',
                                        }
                                    });

                                }}>
                                <CustomIcon
                                    name={
                                        NewData?.no_certain === 'yes'
                                            ? 'check-box'
                                            : 'check-box-outline-blank'
                                    }
                                    origin={ICON_TYPE.MATERIAL_ICONS}
                                    style={{
                                        paddingRight: 10,
                                        color: '#00958C',
                                    }}
                                    size={20}
                                />
                            </Pressable>
                            <CustomText>No Certain</CustomText>
                        </View>
                    </View>
                </>
                <Spacer height={30} />

                <>
                    <View
                        style={{
                            marginTop: 15,
                            width: '100%',
                        }}>
                        <DropDownWithModel
                            label={'Accessories'}
                            isRequired={true}
                            onClick={(item, text) => {
                                console.log(item, "item====", text)
                                // updateProductDetails({
                                //     key: 'accessories',
                                //     value: item.name === 'Others' ? text : item?.id,
                                // });
                                // setNewData({ ...NewData, accessories: item.name === 'Others' ? text : item?.id });
                                setNewData((data) => {
                                    return {
                                        ...data,
                                        accessories: item.name === 'Others' ? text : item?.id
                                    }
                                });
                            }}
                            data={ACCESSORIES ?? []}
                            value={AccessoriesId}
                        />
                    </View>
                    {/* <TextInput
            style={{
              backgroundColor: '#F0F2FA',
              minWidth: '45%',
              marginBottom: 10,
            }}
            value={productState?.productDetails?.accessories}
            placeholder="Type..."
            onChangeText={v =>
              updateProductDetails({
                key: 'accessories',
                value: v,
              })
            }
          /> */}
                </>
                <Spacer height={10} />

                <List.Accordion title="Fill in additional information">
                    <View
                        style={{
                            backgroundColor: '#fff',
                            padding: 10,
                        }}>
                        <View
                            style={{
                                position: 'relative',
                            }}>
                            <CustomText style={{ color: '#7C7C7C' }}>
                                Tell the customers about this watch
                            </CustomText>
                            <TextInput
                                style={{
                                    backgroundColor: '#fff',
                                    minWidth: '45%',
                                    textAlignVertical: 'top',
                                    paddingBottom: 10,
                                    paddingHorizontal: 0,
                                }}
                                maxLength={250}
                                multiline={true}
                                numberOfLines={3}
                                value={NewData?.description}
                                placeholder="Enter description..."
                                onChangeText={v => {
                                    // updateProductDetails({
                                    //     key: 'description',
                                    //     value: v,
                                    // })
                                    // setNewData({ ...NewData, description: v })
                                    setNewData((data) => {
                                        return {
                                            ...data,
                                            description: v
                                        }
                                    });
                                }
                                }
                            />
                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: 5,
                                    right: 5,
                                }}>
                                <CustomText style={{ color: '#00958C' }}>
                                    {NewData?.description?.length}/250
                                </CustomText>
                            </View>
                        </View>
                        <Spacer height={10} />
                        <>
                            <CustomText style={{ color: '#7C7C7C' }}>Gender</CustomText>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                }}>
                                {[
                                    { id: 1, type: 'Male', icon: 'male' },
                                    { id: 2, type: 'Female', icon: 'female' },
                                    { id: 3, type: 'Unisex', icon: 'male-female' },
                                ].map(item => {
                                    return (
                                        <SubmitButton
                                            key={item.id}
                                            onPress={() => {
                                                // updateProductDetails({
                                                //     key: 'gender_type',
                                                //     value: item?.type,

                                                // })
                                                // setNewData({ ...NewData, gender_type: item?.type })
                                                setNewData((data) => {
                                                    return {
                                                        ...data,
                                                        gender_type: item?.type
                                                    }
                                                });
                                            }
                                            }
                                            icon={({ size, color }) => (
                                                <CustomIcon
                                                    name={item?.icon}
                                                    origin={ICON_TYPE.ICONICONS}
                                                    size={13}
                                                    color={
                                                        item.type !==
                                                            NewData?.gender_type
                                                            ? '#00958C'
                                                            : '#fff'
                                                    }
                                                />
                                            )}
                                            lable={item?.type}
                                            mode={
                                                item.type === NewData?.gender_type
                                                    ? 'contained'
                                                    : 'outlined'
                                            }
                                            buttonColor={
                                                item.type === NewData?.gender_type
                                                    ? '#00958C'
                                                    : 'transparent'
                                            }
                                            textColor={
                                                item.type === NewData?.gender_type
                                                    ? 'white'
                                                    : '#00958C'
                                            }
                                            buttonStyle={{
                                                borderRadius: 50,
                                                height: 40,
                                                width: 100,

                                                borderColor:
                                                    item.type ===
                                                        NewData?.gender_type
                                                        ? 'white'
                                                        : '#00958C',
                                            }}
                                            labelStyle={{
                                                fontSize: 13,
                                            }}
                                        />
                                    );
                                })}
                            </View>
                        </>
                        <Spacer height={10} />
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 15,
                            }}>
                            <DropDownWithModel
                                backgroundColor="#fff"
                                label={'Dial'}
                                isRequired={DIFF_MODEL.includes(selectedBrand)}
                                // onClick={v => updateProductDetails({key: 'dial', value: v?.id})}
                                onClick={(item, text) => {
                                    // updateProductDetails({
                                    //     key: 'dial',
                                    //     value: item.name === 'Others' ? text : item?.id,
                                    // });
                                    // setNewData({ ...NewData, dial: item.name === 'Others' ? text : item?.id })
                                    setNewData((data) => {
                                        return {
                                            ...data,
                                            dial: item.name === 'Others' ? text : item?.id
                                        }
                                    });

                                }}
                                data={DIAL ?? []}
                                value={DialId}
                            />
                            <DropDownWithModel
                                backgroundColor="#fff"
                                label={'Dial Markers'}
                                // onClick={v =>
                                //   updateProductDetails({key: 'dial_markers', value: v?.id})
                                // }
                                onClick={(item, text) => {
                                    // updateProductDetails({
                                    //     key: 'dial_markers',
                                    //     value: item.name === 'Others' ? text : item?.id,
                                    // });

                                    // setNewData({ ...NewData, dial_markers: item.name === 'Others' ? text : item?.id, })
                                    setNewData((data) => {
                                        return {
                                            ...data,
                                            dial_markers: item.name === 'Others' ? text : item?.id,
                                        }
                                    });
                                }}
                                data={DIALMARKERS ?? []}
                                value={DialMarkers}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 15,
                            }}>
                            <DropDownWithModel
                                backgroundColor="#fff"
                                label={'Case Size'}
                                // onClick={v =>
                                //   updateProductDetails({key: 'case_size', value: v?.id})
                                // }
                                onClick={(item, text) => {
                                    // updateProductDetails({
                                    //     key: 'case_size',
                                    //     value: item.name === 'Others' ? text : item?.id,
                                    // });
                                    // setNewData({ ...NewData, case_size: item.name === 'Others' ? text : item?.id, })
                                    setNewData((data) => {
                                        return {
                                            ...data,
                                            case_size: item.name === 'Others' ? text : item?.id,
                                        }
                                    });
                                }}
                                data={CASESIZE ?? []}
                                value={CaseSizeId}
                            />
                            <DropDownWithModel
                                backgroundColor="#fff"
                                label={'Movements'}
                                // onClick={v =>
                                //   updateProductDetails({key: 'movement', value: v?.id})
                                // }
                                onClick={(item, text) => {
                                    // updateProductDetails({
                                    //     key: 'movement',
                                    //     value: item.name === 'Others' ? text : item?.id,
                                    // });
                                    // setNewData({ ...NewData, movement: item.name === 'Others' ? text : item?.id, })
                                    setNewData((data) => {
                                        return {
                                            ...data,
                                            movement: item.name === 'Others' ? text : item?.id,
                                        }
                                    });
                                }}
                                data={MOVEMENT ?? []}
                                value={MovementId}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 15,
                            }}>
                            <DropDownWithModel
                                backgroundColor="#fff"
                                label={'Case Material'}
                                // onClick={v =>
                                //   updateProductDetails({key: 'case_materials', value: v?.id})
                                // }
                                onClick={(item, text) => {
                                    // updateProductDetails({
                                    //     key: 'case_materials',
                                    //     value: item.name === 'Others' ? text : item?.id,
                                    // });
                                    // setNewData({ ...NewData, case_materials: item.name === 'Others' ? text : item?.id, })
                                    setNewData((data) => {
                                        return {
                                            ...data,
                                            case_materials: item.name === 'Others' ? text : item?.id,
                                        }
                                    });
                                }}
                                data={CASEMATERIAL ?? []}
                                value={CaseMaterialId}
                            />
                            <DropDownWithModel
                                backgroundColor="#fff"
                                label={'Strap/Bracelet'}
                                isRequired={DIFF_MODEL.includes(selectedBrand)}
                                // onClick={v =>
                                //   updateProductDetails({key: 'bracelet', value: v?.id})
                                // }
                                onClick={(item, text) => {
                                    // updateProductDetails({
                                    //     key: 'bracelet',
                                    //     value: item.name === 'Others' ? text : item?.id,
                                    // });
                                    // setNewData({ ...NewData, bracelet: item.name === 'Others' ? text : item?.id, })
                                    setNewData((data) => {
                                        return {
                                            ...data,
                                            bracelet: item.name === 'Others' ? text : item?.id,
                                        }
                                    });
                                }}
                                data={
                                    STRAPBRACELET ?? []
                                }
                                value={BraceletId}
                            />
                        </View>
                        <View
                            style={{
                                marginTop: 15,
                                width: '100%',
                            }}>
                            <DropDownWithModel
                                backgroundColor="#fff"
                                label={'Clasp'}
                                // onClick={v => updateProductDetails({key: 'clasp', value: v?.id})}
                                onClick={(item, text) => {
                                    // updateProductDetails({
                                    //     key: 'clasp',
                                    //     value: item.name === 'Others' ? text : item?.id,
                                    // });
                                    // setNewData({ ...NewData, clasp: item.name === 'Others' ? text : item?.id, })
                                    setNewData((data) => {
                                        return {
                                            ...data,
                                            clasp: item.name === 'Others' ? text : item?.id,
                                        }
                                    });
                                }}
                                data={CLASP ?? []}
                                value={ClaspId}
                            />
                        </View>

                        <FactoryGemRow
                            lable={'Factory Gem set ?'}
                            description={"If yes,tick what's gems setted ?"}
                            titleValue={NewData?.factory_gem_set}
                            descriptionValue={productState?.productDetails?.factory_gem}
                            descriptionData={
                                FACTTORYGEM
                            }
                            type={'factory_gem'}
                            onTitlePress={item => {
                                updateProductDetails({
                                    key: 'factory_gem_set',
                                    value: item,
                                });
                                setNewData({ ...NewData, factory_gem_set: item })
                                if (item === 'No') {
                                    updateProductDetails({
                                        key: 'factory_gem',
                                        value: [],
                                    });
                                    setNewData({ ...NewData, factory_gem_set: [], })
                                }
                            }}
                            onDescriptionPress={({ item, text, type }) => {
                                const obj = {
                                    id: item.id,
                                    name: item.name,
                                    type: item.type,
                                    text: text,
                                };
                                let updatedArray;
                                if (type) {
                                    updatedArray =
                                        productState?.productDetails?.factory_gem?.filter(
                                            it => it.id != item.id,
                                        );
                                } else {
                                    updatedArray = productState?.productDetails?.factory_gem
                                        ?.filter(it => it.id != item.id)
                                        .concat(obj);
                                }
                                updateProductDetails({
                                    key: 'factory_gem',
                                    value: updatedArray,
                                });
                            }}
                        />
                        <Spacer />
                        <FactoryGemRow
                            isRequired={DIFF_MODEL.includes(selectedBrand)}
                            lable={'Custom ?'}
                            description={"If yes,tick what's custom ?"}
                            descriptionData={
                                productReducer?.getAllProductDropdown?.CUSTOMFACTTORYGEM
                            }
                            titleValue={NewData?.custom_gem_set}
                            descriptionValue={productState?.productDetails?.custom_gem}
                            type={'custom_gem'}
                            onTitlePress={item => {
                                updateProductDetails({
                                    key: 'custom_gem_set',
                                    value: item,
                                });
                                setNewData({ ...NewData, custom_gem_set: item })
                                if (item === 'No') {
                                    updateProductDetails({
                                        key: 'custom_gem',
                                        value: [],
                                    });
                                    setNewData({ ...NewData, custom_gem_set: [] })
                                }
                            }}
                            onDescriptionPress={({ item, text, type }) => {
                                const obj = {
                                    id: item.id,
                                    name: item.name,
                                    type: item.type,
                                    text: text,
                                };
                                let updatedArray;
                                if (type) {
                                    updatedArray =
                                        productState?.productDetails?.custom_gem?.filter(
                                            it => it.id != item.id,
                                        );
                                } else {
                                    updatedArray = productState?.productDetails?.custom_gem
                                        ?.filter(it => it.id != item.id)
                                        .concat(obj);
                                }
                                updateProductDetails({
                                    key: 'custom_gem',
                                    value: updatedArray,
                                });
                            }}
                        />
                        <Spacer />
                        <View
                            style={{
                                marginTop: 15,
                                width: '100%',
                            }}>
                            <LocationModal
                                lable={
                                    NewData?.location ?? 'Choose location'
                                }
                                updateProductDetails={updateProductDetails}
                                setNewData={setNewData}
                            />
                        </View>


                        <Spacer height={30} />
                    </View>
                </List.Accordion>
                <Spacer height={30} />
                <SubmitButton
                    onPress={() => onProductDetailSubmit(NewData)}
                    lable="Next"
                    disabled={
                        productReducer?.addProductDetailLoadingStatus ===
                        LoadingStatus.LOADING
                    }
                    loading={
                        productReducer?.addProductDetailLoadingStatus ===
                        LoadingStatus.LOADING
                    }
                />
            </ScrollView>
            {show && (
                <MonthPicker
                    mode="short"
                    onChange={(event, newDate) => {
                        setShow(false);
                        updateProductDetails({
                            key: 'dated',
                            value: newDate,
                        });
                        setNewData({ ...NewData, dated: newDate })
                    }}
                    value={
                        productState?.productDetails?.dated
                            ? productState?.productDetails?.dated
                            : date
                    }
                    minimumDate={new Date(2000, 5)}
                    maximumDate={new Date()}
                />
            )}
        </>
    );
};



const styles = StyleSheet.create({
    container_style: {
        flexGrow: 1,
        paddingBottom: 30,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: '#F0F2FA',
    },
});

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
        dispatch(getAllProductDropdownAction()),
    getAllProductModel: params => dispatch(getAllProductModelAction(params)),
    onAddProductImage: params => dispatch(addProductImageAction(params)),
    onAddProductDetail: params => dispatch(addProductDetailAction(params)),
    onAddProductPrice: params => dispatch(addProductPriceAction(params)),
    updateProductPrice: params => dispatch(updateProductPrice(params)),
    updateProductImage: params => dispatch(updateProductImage(params)),
    resetProductState: params => dispatch(resetProductState()),
    getAllProduct: params => dispatch(getAllDataAction(params)),
    UpdateDetails: params => dispatch(addProductDetailAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProductDetails);