import {
  CustomIcon,
  CustomText,
  DatePicker,
  Spacer,
  SubmitButton,
} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {List, TextInput} from 'react-native-paper';
import DropDownWithModel from './DropDownWithModel';
import FactoryGemRow from './FactoryGemRow';
import LocationModal from './LocationModal';
import {showAlert} from '@app/helper/commonFunction';

const AddProductDetail = ({onNextClick, ...props}) => {
  const {
    productReducer,
    productState,
    updateProductDetails,
    getAllProductModel,
    onAddProductDetail,
  } = props;

  useEffect(() => {
    if (productState?.productDetails?.brand_id) {
      getAllProductModel({id: productState?.productDetails?.brand_id});
    }
  }, [productState?.productDetails?.brand_id]);

  const checkValidation = () => {
    let errorObj = {
      status: false,
      error: '',
    };
    if (!productState?.productDetails.brand_id) {
      errorObj = {
        status: true,
        error: 'Please choose brand id.',
      };
      return errorObj;
    } else if (!productState?.productDetails.model_id) {
      errorObj = {
        status: true,
        error: 'Please choose model id.',
      };
      return errorObj;
    } else if (!productState?.productDetails.title) {
      errorObj = {
        status: true,
        error: 'Please enter title.',
      };
      return errorObj;
    } else if (!productState?.productDetails.dated) {
      errorObj = {
        status: true,
        error: 'Please choose date.',
      };
      return errorObj;
    } else if (!productState?.productDetails.accessories) {
      errorObj = {
        status: true,
        error: 'Please enter accessories.',
      };
      return errorObj;
    } else if (
      productState?.productDetails.factory_gem_set === 'Yes' &&
      productState?.productDetails?.factory_gem.length <= 0
    ) {
      errorObj = {
        status: true,
        error: 'Please choose factory gem set.',
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
        error: 'Please choose custom.',
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
    } else {
      errorObj = {
        status: false,
        error: '',
      };
      return errorObj;
    }
  };
  const onProductDetailSubmit = () => {
    let errorObj = checkValidation();
    if (errorObj.status) {
      showAlert({
        title: 'Fill all required fields.',
        message: errorObj.error,
      });
    } else {
      onAddProductDetail(productState?.productDetails).then(res => {
        if (res?.type.includes('fulfilled')) {
          onNextClick();
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
      contentContainerStyle={styles.container_style}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <DropDownWithModel
          onClick={(item, text) => {
            updateProductDetails({
              key: 'brand_id',
              value: item.name === 'Others' ? text : item?.id,
            });
            updateProductDetails({
              key: 'new_brand',
              value: item.name === 'Others' ? true : false,
            });
            updateProductDetails({key: 'model_id', value: ''});
            updateProductDetails({
              key: 'new_model',
              value: false,
            });
          }}
          data={productReducer?.getAllBrand}
          value={productState?.productDetails?.brand_id}
          label={'Choose Brand'}
          isRequired={'*'}
        />
        <DropDownWithModel
          // onClick={v => updateProductDetails({key: 'model_id', value: v?.id})}
          onClick={(item, text) => {
            updateProductDetails({
              key: 'model_id',
              value: item.name === 'Others' ? text : item?.id,
            });
            updateProductDetails({
              key: 'new_model',
              value: item.name === 'Others' ? true : false,
            });
          }}
          data={
            productReducer?.getAllProductModel
              ? productReducer?.getAllProductModel
              : []
          }
          value={productState?.productDetails?.model_id}
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
          }}
          value={productState?.productDetails?.title}
          placeholder="Type..."
          onChangeText={v => updateProductDetails({key: 'title', value: v})}
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
              productState?.productDetails?.watch_condition === 'brand_new'
                ? 'contained'
                : 'outlined'
            }
            buttonColor={
              productState?.productDetails?.watch_condition === 'brand_new'
                ? '#00958C'
                : 'transparent'
            }
            onPress={() =>
              updateProductDetails({key: 'watch_condition', value: 'brand_new'})
            }
            textColor={
              productState?.productDetails?.watch_condition === 'brand_new'
                ? 'white'
                : '#00958C'
            }
            buttonStyle={{
              borderRadius: 50,
              height: 40,
              borderColor:
                productState?.productDetails?.watch_condition === 'brand_new'
                  ? 'white'
                  : '#00958C',
            }}
          />
          <SubmitButton
            onPress={() =>
              updateProductDetails({key: 'watch_condition', value: 'pre_owned'})
            }
            lable="Pre-Owned"
            mode={
              productState?.productDetails?.watch_condition === 'pre_owned'
                ? 'contained'
                : 'outlined'
            }
            buttonColor={
              productState?.productDetails?.watch_condition === 'pre_owned'
                ? '#00958C'
                : 'transparent'
            }
            textColor={
              productState?.productDetails?.watch_condition === 'pre_owned'
                ? 'white'
                : '#00958C'
            }
            buttonStyle={{
              borderRadius: 50,
              height: 40,
              borderColor:
                productState?.productDetails?.watch_condition === 'pre_owned'
                  ? 'white'
                  : '#00958C',
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
          <DatePicker
            children={
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '70%',
                  borderBottomWidth: 1,
                }}>
                <CustomText>
                  {productState?.productDetails?.dated
                    ? moment(productState?.productDetails?.dated).format(
                        'MMM, YYYY',
                      )
                    : 'MMM, YYYY'}
                </CustomText>
                <CustomIcon
                  name={'calendar'}
                  origin={ICON_TYPE.ICONICONS}
                  style={{
                    paddingRight: 10,
                    color: '#00000080',
                  }}
                  size={20}
                />
              </View>
            }
            maximumDate={new Date()}
            onChangeDate={e => {
              updateProductDetails({
                key: 'dated',
                value: e,
              });
            }}
          />
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
                updateProductDetails({
                  key: 'no_certain',
                  value:
                    productState?.productDetails?.no_certain === 'yes'
                      ? 'no'
                      : 'yes',
                });
              }}>
              <CustomIcon
                name={
                  productState?.productDetails?.no_certain === 'yes'
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
              updateProductDetails({
                key: 'accessories',
                value: item.name === 'Others' ? text : item?.id,
              });
            }}
            data={productReducer?.getAllProductDropdown?.ACCESSORIES ?? []}
            value={productState?.productDetails?.accessories}
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
      <>
        <CustomText style={{color: '#7C7C7C'}}>Gender</CustomText>
        <View style={{flexDirection: 'row'}}>
          {[
            {id: 1, type: 'Male', icon: 'male'},
            {id: 2, type: 'Female', icon: 'female'},
            {id: 3, type: 'Unisex', icon: 'male-female'},
          ].map(item => {
            return (
              <SubmitButton
                key={item.id}
                onPress={() =>
                  updateProductDetails({
                    key: 'gender_type',
                    value: item?.type,
                  })
                }
                icon={({size, color}) => (
                  <CustomIcon
                    name={item?.icon}
                    origin={ICON_TYPE.ICONICONS}
                    size={15}
                    color={
                      item.type !== productState?.productDetails?.gender_type
                        ? '#00958C'
                        : '#fff'
                    }
                  />
                )}
                lable={item?.type}
                mode={
                  item.type === productState?.productDetails?.gender_type
                    ? 'contained'
                    : 'outlined'
                }
                buttonColor={
                  item.type === productState?.productDetails?.gender_type
                    ? '#00958C'
                    : 'transparent'
                }
                textColor={
                  item.type === productState?.productDetails?.gender_type
                    ? 'white'
                    : '#00958C'
                }
                buttonStyle={{
                  borderRadius: 50,
                  height: 40,
                  borderColor:
                    item.type === productState?.productDetails?.gender_type
                      ? 'white'
                      : '#00958C',
                }}
              />
            );
          })}
        </View>
      </>
      <Spacer height={30} />
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
              }}
              maxLength={250}
              multiline={true}
              numberOfLines={3}
              value={productState?.productDetails?.description}
              placeholder="Type..."
              onChangeText={v =>
                updateProductDetails({
                  key: 'description',
                  value: v,
                })
              }
            />
            <View
              style={{
                position: 'absolute',
                bottom: 5,
                right: 5,
              }}>
              <CustomText style={{color: '#00958C'}}>
                {productState?.productDetails?.description.length}/250
              </CustomText>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <DropDownWithModel
              backgroundColor="#fff"
              label={'Dial'}
              // onClick={v => updateProductDetails({key: 'dial', value: v?.id})}
              onClick={(item, text) => {
                updateProductDetails({
                  key: 'dial',
                  value: item.name === 'Others' ? text : item?.id,
                });
              }}
              data={productReducer?.getAllProductDropdown?.DIAL ?? []}
              value={productState?.productDetails?.dial}
            />
            <DropDownWithModel
              backgroundColor="#fff"
              label={'Dial Markers'}
              // onClick={v =>
              //   updateProductDetails({key: 'dial_markers', value: v?.id})
              // }
              onClick={(item, text) => {
                updateProductDetails({
                  key: 'dial_markers',
                  value: item.name === 'Others' ? text : item?.id,
                });
              }}
              data={productReducer?.getAllProductDropdown?.DIALMARKERS ?? []}
              value={productState?.productDetails?.dial_markers}
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
                updateProductDetails({
                  key: 'case_size',
                  value: item.name === 'Others' ? text : item?.id,
                });
              }}
              data={productReducer?.getAllProductDropdown?.CASESIZE ?? []}
              value={productState?.productDetails?.case_size}
            />
            <DropDownWithModel
              backgroundColor="#fff"
              label={'Movements'}
              // onClick={v =>
              //   updateProductDetails({key: 'movement', value: v?.id})
              // }
              onClick={(item, text) => {
                updateProductDetails({
                  key: 'movement',
                  value: item.name === 'Others' ? text : item?.id,
                });
              }}
              data={productReducer?.getAllProductDropdown?.MOVEMENT ?? []}
              value={productState?.productDetails?.movement}
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
                updateProductDetails({
                  key: 'case_materials',
                  value: item.name === 'Others' ? text : item?.id,
                });
              }}
              data={productReducer?.getAllProductDropdown?.CASEMATERIAL ?? []}
              value={productState?.productDetails?.case_materials}
            />
            <DropDownWithModel
              backgroundColor="#fff"
              label={'Strap/Bracelet'}
              // onClick={v =>
              //   updateProductDetails({key: 'bracelet', value: v?.id})
              // }
              onClick={(item, text) => {
                updateProductDetails({
                  key: 'bracelet',
                  value: item.name === 'Others' ? text : item?.id,
                });
              }}
              data={productReducer?.getAllProductDropdown?.STRAPBRACELET ?? []}
              value={productState?.productDetails?.bracelet}
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
                updateProductDetails({
                  key: 'clasp',
                  value: item.name === 'Others' ? text : item?.id,
                });
              }}
              data={productReducer?.getAllProductDropdown?.CLASP ?? []}
              value={productState?.productDetails?.clasp}
            />
          </View>

          <FactoryGemRow
            lable={'Factory Gem set ?'}
            description={"If yes,tick what's gems setted ?"}
            titleValue={productState?.productDetails?.factory_gem_set}
            descriptionValue={productState?.productDetails?.factory_gem}
            descriptionData={productReducer?.getAllProductDropdown?.FACTTORYGEM}
            type={'factory_gem'}
            onTitlePress={item => {
              updateProductDetails({
                key: 'factory_gem_set',
                value: item,
              });
              if (item === 'No') {
                updateProductDetails({
                  key: 'factory_gem',
                  value: [],
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
            lable={'Custom ?'}
            description={"If yes,tick what's custom ?"}
            descriptionData={
              productReducer?.getAllProductDropdown?.CUSTOMFACTTORYGEM
            }
            titleValue={productState?.productDetails?.custom_gem_set}
            descriptionValue={productState?.productDetails?.custom_gem}
            type={'custom_gem'}
            onTitlePress={item => {
              updateProductDetails({
                key: 'custom_gem_set',
                value: item,
              });
              if (item === 'No') {
                updateProductDetails({
                  key: 'custom_gem',
                  value: [],
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
                updatedArray = productState?.productDetails?.custom_gem?.filter(
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
                productState?.productDetails?.location ?? 'Choose location'
              }
              updateProductDetails={updateProductDetails}
            />
          </View>

          <Spacer height={30} />
        </View>
      </List.Accordion>

      <SubmitButton onPress={onProductDetailSubmit} lable="Next" />
    </ScrollView>
  );
};

export default AddProductDetail;

const styles = StyleSheet.create({
  container_style: {
    flexGrow: 1,
    paddingBottom: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F0F2FA',
  },
});
