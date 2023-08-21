import {
  CustomIcon,
  CustomText,
  DatePicker,
  Spacer,
  SubmitButton,
} from '@app/components';
import React from 'react';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {List, TextInput} from 'react-native-paper';
import {showAlert} from '@app/helper/commonFunction';
import {LoadingStatus} from '@app/helper/strings';
import MonthYearPicker from '@app/components/MonthYearPicker';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import DropDownWithModel from '../AddProduct1/DropDownWithModel';
import FactoryGemRow from '../AddProduct1/FactoryGemRow';
import LocationModal from './LocationModal';
const DIFF_MODEL = ['Rolex', 'Audemars Piguet', 'Patek Philippe'];
const EditProductDetails = props => {
  const {
    productReducer,
    productState,
    updateProductDetails,
    getAllProductModel,
    getAllProduct,
    onNextClick,
    getAllProductDropdown,
    locationData,
    onAddProductDetail,
  } = props;
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const [state, setState] = useState({
    brand_id: '',
    model_id: '',
    watch_condition: 'brand_new',
    title: '',
    no_certain: 'no', //yes or no
    dated: '',
    accessories: '',
    description: '',
    gender_type: 'Male',
    dial: '',
    dial_markers: '',
    case_size: '',
    movement: '',
    case_materials: '',
    bracelet: '',
    clasp: '',
    factory_gem_set: 'No',
    factory_gem: [],
    custom_gem_set: 'No',
    custom_gem: [],
    location: '',
    latitude: '',
    longitude: '',
    productID: '',
    product_id: '',
    new_brand: false,
    new_model: false,
  });

  const {
    ACCESSORIES,
    CASEMATERIAL,
    CASESIZE,
    CLASP,
    CUSTOMFACTTORYGEM,
    DIAL,
    DIALMARKERS,
    FACTTORYGEM,
    MOVEMENT,
    STRAPBRACELET,
  } = props?.productReducer?.getAllProductDropdown;

  useEffect(() => {
    getAllProduct({product_id: props?.route?.params?.product_id}).then(res => {
      if (res?.type.includes('fulfilled')) {
        const tempData = res?.payload?.data;
        console.log('tempData', tempData);
        setState(item => {
          return {
            ...item,
            brand_id: tempData.brand_id ?? '',
            model_id: tempData?.model_id,
            watch_condition:
              tempData.watch_condition === 'Pre-Owned'
                ? 'pre_owned'
                : 'brand_new',
            title: tempData?.title ?? '',
            no_certain: tempData?.no_certain ?? 'no', //yes or no
            dated: tempData?.dated ?? '',
            accessories: ACCESSORIES?.filter(
              item => item.name == tempData.accessories,
            )[0]?.id,
            description: tempData.description ?? '',
            gender_type: tempData?.gender_type ?? 'Male',
            dial: DIAL?.filter(item => item.name == tempData.dial)[0]?.id,
            dial_markers: DIALMARKERS?.filter(
              item => item.name == tempData.dial_markers,
            )[0]?.id,
            case_size: CASESIZE?.filter(
              item => item.name == tempData.case_size,
            )[0]?.id,
            movement: MOVEMENT?.filter(
              item => item.name == tempData.movement,
            )[0]?.id,
            case_materials: CASEMATERIAL?.filter(
              item => item.id == tempData.case_materials,
            )[0]?.id,
            bracelet: STRAPBRACELET?.filter(
              item => item.id == tempData.bracelet,
            )[0]?.id,
            clasp: CLASP?.filter(item => item.id == tempData.clasp)[0]?.id,
            factory_gem_set: tempData?.factory_gem_set ?? 'No',
            factory_gem:
              tempData?.factory_gem_set_data?.map(item => {
                const obj = {
                  id: FACTTORYGEM?.filter(fg => fg.name == item.gem_position)[0]
                    ?.id,
                  name: item.gem_position,
                  type: 'FACTTORYGEM',
                  text: item.value,
                };
                return obj;
              }) ?? [],
            custom_gem_set: tempData?.custom_gem_set ?? 'No',
            custom_gem:
              tempData?.custom_gem_set_data?.map(item => {
                const obj = {
                  id: CUSTOMFACTTORYGEM?.filter(
                    fg => fg.name == item.gem_position,
                  )[0]?.id,
                  name: item.gem_position,
                  type: 'CUSTOMFACTTORYGEM',
                  text: item.value,
                };
                return obj;
              }) ?? [],
            location: tempData?.location ?? '',
            latitude: tempData?.latitude ?? '',
            longitude: tempData?.longitude ?? '',
            product_id: tempData?.id,
            productID: tempData?.id,
            new_brand: false,
            new_model: false,
          };
        });
      }
    });
  }, []);

  useEffect(() => {
    if (state?.brand_id) {
      getAllProductModel({id: state?.brand_id});
    }
  }, [state?.brand_id]);

  const checkValidation = () => {
    let errorObj = {
      status: false,
      error: '',
    };
    if (!state.brand_id) {
      errorObj = {
        status: true,
        error: 'Please select brand.',
      };
      return errorObj;
    } else if (!state.model_id) {
      errorObj = {
        status: true,
        error: 'Please select model.',
      };
      return errorObj;
    } else if (!state.title) {
      errorObj = {
        status: true,
        error: 'Please enter title.',
      };
      return errorObj;
    } else if (!state.dated) {
      errorObj = {
        status: true,
        error: 'Please select date.',
      };
      return errorObj;
    } else if (!state.accessories) {
      errorObj = {
        status: true,
        error: 'Please select accessories.',
      };
      return errorObj;
    } else if (
      state.factory_gem_set === 'Yes' &&
      state?.factory_gem.length <= 0
    ) {
      errorObj = {
        status: true,
        error: 'Please select factory gem set.',
      };
      return errorObj;
    } else if (
      state.factory_gem_set === 'Yes' &&
      state?.factory_gem.length > 0 &&
      state?.factory_gem.some(item => !item.text)
    ) {
      errorObj = {
        status: true,
        error: "Please type what's factory gem.",
      };
      return errorObj;
    } else if (
      state.custom_gem_set === 'Yes' &&
      state?.custom_gem.length <= 0
    ) {
      errorObj = {
        status: true,
        error: 'Please select custom.',
      };
      return errorObj;
    } else if (
      state.custom_gem_set === 'Yes' &&
      state?.custom_gem.length > 0 &&
      state?.custom_gem.some(item => !item.text)
    ) {
      errorObj = {
        status: true,
        error: "Please type what's custom.",
      };
      return errorObj;
    } else if (DIFF_MODEL.includes(selectedBrand) && !state.dial) {
      errorObj = {
        status: true,
        error: 'Please select dial.',
      };
      return errorObj;
    } else if (DIFF_MODEL.includes(selectedBrand) && !state.bracelet) {
      errorObj = {
        status: true,
        error: 'Please select bracelet.',
      };
      return errorObj;
    } else if (
      DIFF_MODEL.includes(selectedBrand) &&
      state?.custom_gem_set === 'No'
    ) {
      errorObj = {
        status: true,
        error: 'Please select custom.',
      };
      return errorObj;
    } else if (!state.location) {
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

  const onProductDetailSubmit = item => {
    let errorObj = checkValidation();
    if (errorObj.status) {
      showAlert({
        title: 'Fill all required fields.',
        message: errorObj.error,
      });
    } else {
      onAddProductDetail({
        ...state,
        dated: moment(state.dated).format('MMM, YYYY'),
      }).then(res => {
        if (res?.type.includes('fulfilled')) {
          onNextClick();
          showAlert({
            title: 'Product details updated.',
          });
        } else if (res?.type.includes('rejected')) {
          showAlert({
            title: 'Server error !',
          });
        }
      });
    }
  };
  return (
    <>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container_style}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <DropDownWithModel
            onClick={(item, text) => {
              setState(data => {
                return {
                  ...data,
                  brand_id: item.name === 'Others' ? text : item?.id,
                  new_brand: item.name === 'Others' ? true : false,
                  model_id: '',
                  new_model: false,
                };
              });
              setSelectedBrand(item?.name);
            }}
            data={productReducer?.getAllBrand}
            value={state?.brand_id}
            label={'Choose Brand'}
            isRequired={'*'}
          />
          <DropDownWithModel
            onClick={(item, text) => {
              setState(data => {
                return {
                  ...data,
                  model_id: item.name === 'Others' ? text : item?.id,
                  new_model: item.name === 'Others' ? true : false,
                };
              });
            }}
            data={props?.productReducer?.getAllProductModel ?? []}
            value={state?.model_id}
            label={'Model'}
            isRequired={'*'}
          />
        </View>
        <Spacer height={30} />
        <>
          <CustomText style={{color: '#7C7C7C'}}>
            Title <CustomText style={{color: 'red'}}>*</CustomText>
          </CustomText>
          <TextInput
            style={{
              backgroundColor: '#F0F2FA',
              minWidth: '45%',
              marginBottom: 10,
              paddingHorizontal: 0,
            }}
            value={state?.title}
            placeholder="Enter your title..."
            onChangeText={v => {
              setState(data => {
                return {
                  ...data,
                  title: v,
                };
              });
            }}
          />
        </>
        <Spacer height={30} />

        <>
          <CustomText style={{color: '#7C7C7C'}}>
            Watch Condition <CustomText style={{color: 'red'}}>*</CustomText>
          </CustomText>
          <View style={{flexDirection: 'row'}}>
            <SubmitButton
              lable="Brand New"
              mode={
                state?.watch_condition === 'brand_new'
                  ? 'contained'
                  : 'outlined'
              }
              buttonColor={
                state?.watch_condition === 'brand_new'
                  ? '#00958C'
                  : 'transparent'
              }
              onPress={() => {
                setState(data => {
                  return {
                    ...data,
                    watch_condition: 'brand_new',
                  };
                });
              }}
              textColor={
                state?.watch_condition === 'brand_new' ? 'white' : '#00958C'
              }
              buttonStyle={{
                borderRadius: 50,
                height: 40,
                borderColor:
                  state?.watch_condition === 'brand_new' ? 'white' : '#00958C',
              }}
            />
            <SubmitButton
              onPress={() => {
                setState(data => {
                  return {
                    ...data,
                    watch_condition: 'pre_owned',
                  };
                });
              }}
              lable="Pre-Owned"
              mode={
                state?.watch_condition === 'pre_owned'
                  ? 'contained'
                  : 'outlined'
              }
              buttonColor={
                state?.watch_condition === 'pre_owned'
                  ? '#00958C'
                  : 'transparent'
              }
              textColor={
                state?.watch_condition === 'pre_owned' ? 'white' : '#00958C'
              }
              buttonStyle={{
                borderRadius: 50,
                height: 40,
                borderColor:
                  state?.watch_condition === 'pre_owned' ? 'white' : '#00958C',
              }}
            />
          </View>
        </>
        <Spacer height={30} />

        <>
          <CustomText style={{color: '#7C7C7C'}}>
            Dated <CustomText style={{color: 'red'}}>*</CustomText>
          </CustomText>
          <View style={{flexDirection: 'row'}}>
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
                {state?.dated
                  ? moment(state?.dated).format('MMM, YYYY')
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
                  setState(data => {
                    return {
                      ...data,
                      no_certain: state?.no_certain === 'yes' ? 'no' : 'yes',
                    };
                  });
                }}>
                <CustomIcon
                  name={
                    state?.no_certain === 'yes'
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
                setState(data => {
                  return {
                    ...data,
                    accessories: item.name === 'Others' ? text : item?.id,
                  };
                });
              }}
              data={ACCESSORIES ?? []}
              value={state?.accessories}
            />
          </View>
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
              <CustomText style={{color: '#7C7C7C'}}>
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
                value={state?.description}
                placeholder="Enter description..."
                onChangeText={v => {
                  setState(data => {
                    return {
                      ...data,
                      description: v,
                    };
                  });
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 5,
                  right: 5,
                }}>
                <CustomText style={{color: '#00958C'}}>
                  {state?.description?.length}/250
                </CustomText>
              </View>
            </View>
            <Spacer height={10} />
            <>
              <CustomText style={{color: '#7C7C7C'}}>Gender</CustomText>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {[
                  {id: 1, type: 'Male', icon: 'male'},
                  {id: 2, type: 'Female', icon: 'female'},
                  {id: 3, type: 'Unisex', icon: 'male-female'},
                ].map(item => {
                  return (
                    <SubmitButton
                      key={item.id}
                      onPress={() => {
                        setState(data => {
                          return {
                            ...data,
                            gender_type: item?.type,
                          };
                        });
                      }}
                      icon={({size, color}) => (
                        <CustomIcon
                          name={item?.icon}
                          origin={ICON_TYPE.ICONICONS}
                          size={13}
                          color={
                            item.type !== state?.gender_type
                              ? '#00958C'
                              : '#fff'
                          }
                        />
                      )}
                      lable={item?.type}
                      mode={
                        item.type === state?.gender_type
                          ? 'contained'
                          : 'outlined'
                      }
                      buttonColor={
                        item.type === state?.gender_type
                          ? '#00958C'
                          : 'transparent'
                      }
                      textColor={
                        item.type === state?.gender_type ? 'white' : '#00958C'
                      }
                      buttonStyle={{
                        borderRadius: 50,
                        height: 40,
                        width: 100,

                        borderColor:
                          item.type === state?.gender_type
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
                onClick={(item, text) => {
                  setState(data => {
                    return {
                      ...data,
                      dial: item.name === 'Others' ? text : item?.id,
                    };
                  });
                }}
                data={DIAL ?? []}
                value={state.dial}
              />
              <DropDownWithModel
                backgroundColor="#fff"
                label={'Dial Markers'}
                onClick={(item, text) => {
                  setState(data => {
                    return {
                      ...data,
                      dial_markers: item.name === 'Others' ? text : item?.id,
                    };
                  });
                }}
                data={DIALMARKERS ?? []}
                value={state.dial_markers}
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
                onClick={(item, text) => {
                  setState(data => {
                    return {
                      ...data,
                      case_size: item.name === 'Others' ? text : item?.id,
                    };
                  });
                }}
                data={CASESIZE ?? []}
                value={state.case_size}
              />
              <DropDownWithModel
                backgroundColor="#fff"
                label={'Movements'}
                onClick={(item, text) => {
                  setState(data => {
                    return {
                      ...data,
                      movement: item.name === 'Others' ? text : item?.id,
                    };
                  });
                }}
                data={MOVEMENT ?? []}
                value={state.movement}
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
                onClick={(item, text) => {
                  setState(data => {
                    return {
                      ...data,
                      case_materials: item.name === 'Others' ? text : item?.id,
                    };
                  });
                }}
                data={CASEMATERIAL ?? []}
                value={state.case_materials}
              />
              <DropDownWithModel
                backgroundColor="#fff"
                label={'Strap/Bracelet'}
                isRequired={DIFF_MODEL.includes(selectedBrand)}
                onClick={(item, text) => {
                  setState(data => {
                    return {
                      ...data,
                      bracelet: item.name === 'Others' ? text : item?.id,
                    };
                  });
                }}
                data={STRAPBRACELET ?? []}
                value={state.bracelet}
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
                onClick={(item, text) => {
                  setState(data => {
                    return {
                      ...data,
                      clasp: item.name === 'Others' ? text : item?.id,
                    };
                  });
                }}
                data={CLASP ?? []}
                value={state.clasp}
              />
            </View>

            <FactoryGemRow
              lable={'Factory Gem set ?'}
              description={"If yes,tick what's gems setted ?"}
              titleValue={state?.factory_gem_set}
              descriptionValue={state?.factory_gem}
              descriptionData={
                props?.productReducer?.getAllProductDropdown?.FACTTORYGEM
              }
              type={'factory_gem'}
              onTitlePress={item => {
                setState(data => {
                  return {
                    ...data,
                    factory_gem_set: item,
                  };
                });
                if (item === 'No') {
                  setState(data => {
                    return {
                      ...data,
                      factory_gem: [],
                    };
                  });
                }
              }}
              onDescriptionPress={({item, text, type}) => {
                const obj = {
                  id: item.id,
                  name: item.name,
                  type: item.type,
                  text: text,
                };
                let updatedArray;
                if (type) {
                  updatedArray = state?.factory_gem?.filter(
                    it => it.id != item.id,
                  );
                } else {
                  updatedArray = state?.factory_gem
                    ?.filter(it => it.id != item.id)
                    .concat(obj);
                }
                setState(data => {
                  return {
                    ...data,
                    factory_gem: updatedArray,
                  };
                });
              }}
            />
            <Spacer />
            <FactoryGemRow
              isRequired={DIFF_MODEL.includes(selectedBrand)}
              lable={'Custom ?'}
              description={"If yes,tick what's custom ?"}
              descriptionData={
                props?.productReducer?.getAllProductDropdown?.CUSTOMFACTTORYGEM
              }
              titleValue={state?.custom_gem_set}
              descriptionValue={state?.custom_gem}
              type={'custom_gem'}
              onTitlePress={item => {
                setState(data => {
                  return {
                    ...data,
                    custom_gem_set: item,
                  };
                });

                if (item === 'No') {
                  setState(data => {
                    return {
                      ...data,
                      custom_gem: [],
                    };
                  });
                }
              }}
              onDescriptionPress={({item, text, type}) => {
                const obj = {
                  id: item.id,
                  name: item.name,
                  type: item.type,
                  text: text,
                };
                let updatedArray;
                if (type) {
                  updatedArray = state?.custom_gem?.filter(
                    it => it.id != item.id,
                  );
                } else {
                  updatedArray = state?.custom_gem
                    ?.filter(it => it.id != item.id)
                    .concat(obj);
                }
                setState(data => {
                  return {
                    ...data,
                    custom_gem: updatedArray,
                  };
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
                lable={state?.location ?? 'Choose location'}
                setState={setState}
              />
            </View>

            <Spacer height={30} />
          </View>
        </List.Accordion>
        <Spacer height={30} />
        <SubmitButton
          onPress={() => onProductDetailSubmit(state)}
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
            setState({...state, dated: newDate});
          }}
          value={state.dated ? new Date(state?.dated) : date}
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

export default EditProductDetails;
