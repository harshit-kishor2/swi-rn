import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  CustomIcon,
  CustomInput,
  CustomText,
  CustomTextInput,
  Spacer,
  SubmitButton,
} from '@app/components';
import {List, TextInput} from 'react-native-paper';
import {ICON_TYPE} from '@app/components/CustomIcon';
import Slider from '@react-native-community/slider';
import {useReducer} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import useLocation from '@app/hooks/useLocation';
const sortingItems = [
  {title: 'Recently added', key: 'id', order: 'DESC'},
  {title: 'Price: Low to High', key: 'price', order: 'asc'},
  {title: 'Price: High to Low', key: 'price', order: 'desc'},
  {title: 'Ascending: A to Z', key: 'title', order: 'ASC'},
  {title: 'Descending: Z to A', key: 'title', order: 'DESC'},
];

//Validation Schema for formik
const validationSchema = Yup.object({
  min_price: Yup.number().nullable().typeError('Please enter a valid number.'),
  max_price: Yup.number().nullable().typeError('Please enter a valid number.'),
});

const Filter = ({isFilter, setIsFilter, setTopNotchWatch, ...props}) => {
  const {exploreProduct, getTopNotchWatch} = props;
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('Filter');
  const [sortQuery, setSortQuery] = useState('');

  // Initial Values for  formik
  const initialState = {
    location: null,
    min_price: null,
    max_price: null,
    distance: null, //
    sortBy: null, //price,id,title
    dir: null, // DESC,ASC
    watch_condition: null, //brand_new or pre_owned
    brands: null,
    latitude: null,
    longitude: null,
  };
  // destructure formik values from formik hook
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    resetForm,
    touched,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: async (val, {setErrors}) => {
      try {
        Keyboard.dismiss();
        const obj = {};
        (values.brands ?? []).forEach((element, index) => {
          obj[`brand_id[${index}]`] = element;
        });
        const props = {
          dir: values.dir,
          distance: values.distance,
          latitude: values.latitude,
          location: values.location,
          longitude: values.longitude,
          max_price: values.max_price,
          min_price: values.min_price,
          sortby: values.sortBy,
          watch_condition: values.watch_condition,
          ...obj,
        };
        console.log('Props', props);
        if (
          props.max_price == null &&
          props.min_price == null &&
          props.watch_condition == null &&
          props.location == null &&
          (values.brands ?? []).length == 0 &&
          values.sortBy == null
        ) {
          console.log('Empty');
        } else {
          setTopNotchWatch([]);
          getTopNotchWatch(props).then(res => {
            setIsFilter(false);
          });
        }
      } catch (err) {
        setErrors({serverError: err.message});
      }
    },
  });
  const getFilterTab = () => {
    return (
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: 20,
            width: '90%',
            height: 100,
          }}>
          <View
            style={{
              justifyContent: 'center',
              //   alignItems: 'center',
              width: '45%',
            }}>
            <CustomInput
              label="Min Price"
              placeholder="Min Price"
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={handleChange('min_price')}
              onBlur={handleBlur('min_price')}
              value={values.min_price}
              error={errors?.min_price && touched?.min_price}
              errorText={errors?.min_price}
              leftIcon={<TextInput.Affix text="$" />}
            />
          </View>
          <Spacer width={10} />
          <View
            style={{
              justifyContent: 'center',
              //   alignItems: 'center',
              width: '45%',
            }}>
            <CustomInput
              label="Max Price"
              placeholder="Max Price"
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={handleChange('max_price')}
              onBlur={handleBlur('max_price')}
              value={values.max_price}
              error={errors?.max_price && touched?.max_price}
              errorText={errors?.max_price}
              leftIcon={<TextInput.Affix text="$" />}
            />
          </View>
        </View>
        <List.Accordion
          titleStyle={{
            color: '#636363',
          }}
          title="Category"
          id="2">
          <View
            style={{
              flexDirection: 'row',
              //   justifyContent: 'center',
              //   paddingVertical: 20,
              width: '100%',
            }}>
            <View
              style={{
                // justifyContent: 'center',
                //   alignItems: 'center',
                width: '45%',
              }}>
              <List.Item
                title={'Brand New'}
                onPress={() => setFieldValue('watch_condition', 'brand_new')}
                left={props => (
                  <List.Icon
                    {...props}
                    icon={() => (
                      <CustomIcon
                        origin={ICON_TYPE.MATERIAL_ICONS}
                        name={
                          values?.watch_condition === 'brand_new'
                            ? 'check-box'
                            : 'check-box-outline-blank'
                        }
                        color={
                          values?.watch_condition === 'brand_new'
                            ? '#00958C'
                            : '#868686'
                        }
                        size={20}
                      />
                    )}
                  />
                )}
              />
            </View>
            <Spacer width={10} />
            <View
              style={{
                // justifyContent: 'center',
                //   alignItems: 'center',
                width: '45%',
              }}>
              <List.Item
                title={'Pre Owned'}
                onPress={() => setFieldValue('watch_condition', 'pre_owned')}
                left={props => (
                  <List.Icon
                    {...props}
                    icon={() => (
                      <CustomIcon
                        origin={ICON_TYPE.MATERIAL_ICONS}
                        name={
                          values?.watch_condition === 'pre_owned'
                            ? 'check-box'
                            : 'check-box-outline-blank'
                        }
                        color={
                          values?.watch_condition === 'pre_owned'
                            ? '#00958C'
                            : '#868686'
                        }
                        size={20}
                      />
                    )}
                  />
                )}
              />
            </View>
          </View>
        </List.Accordion>
        <List.Accordion
          titleStyle={{
            color: '#636363',
          }}
          title="Brands"
          id="1">
          {exploreProduct?.brandList.map(item => {
            return (
              <List.Item
                key={'Key-' + item?.id}
                title={item?.name}
                onPress={() => {
                  let arr = values.brands ?? [];
                  if (!arr.includes(item.id)) {
                    //checking weather array contain the id
                    arr.push(item.id); //adding to array because value doesnt exists
                  } else {
                    arr.splice(arr.indexOf(item.id), 1); //deleting
                  }
                  setFieldValue('brands', arr);
                }}
                left={props => (
                  <List.Icon
                    {...props}
                    icon={() => (
                      <CustomIcon
                        origin={ICON_TYPE.MATERIAL_ICONS}
                        name={
                          (values.brands ?? []).includes(item.id)
                            ? 'check-box'
                            : 'check-box-outline-blank'
                        }
                        color={
                          (values.brands ?? []).includes(item.id)
                            ? '#00958C'
                            : '#868686'
                        }
                        size={20}
                      />
                    )}
                  />
                )}
              />
            );
          })}
        </List.Accordion>

        <List.Accordion
          titleStyle={{
            color: '#636363',
          }}
          title="Location"
          id="3">
          <List.Item
            title={'Near By'}
            onPress={() => {
              setFieldValue('location', 'near_by');
              setFieldValue('distance', 0);
              setFieldValue('latitude', location?.coords?.latitude);
              setFieldValue('longitude', location?.coords?.longitude);
            }}
            left={props => (
              <List.Icon
                {...props}
                icon={() => (
                  <CustomIcon
                    origin={ICON_TYPE.MATERIAL_ICONS}
                    name={
                      values?.location === 'near_by'
                        ? 'check-box'
                        : 'check-box-outline-blank'
                    }
                    color={
                      values?.location === 'near_by' ? '#00958C' : '#868686'
                    }
                    size={20}
                  />
                )}
              />
            )}
          />
          <List.Item
            title={'Distance Range : ' + (values?.distance ?? 0)}
            onPress={() => {
              setFieldValue('location', 'custom');
              setFieldValue('distance', 0);
              setFieldValue('latitude', location?.coords?.latitude);
              setFieldValue('longitude', location?.coords?.longitude);
            }}
            left={props => (
              <List.Icon
                {...props}
                icon={() => (
                  <CustomIcon
                    origin={ICON_TYPE.MATERIAL_ICONS}
                    name={
                      values?.location === 'custom'
                        ? 'check-box'
                        : 'check-box-outline-blank'
                    }
                    color={
                      values?.location === 'custom' ? '#00958C' : '#868686'
                    }
                    size={20}
                  />
                )}
              />
            )}
          />
          <Spacer height={25} />
          {values.location === 'custom' ? (
            <Slider
              // style={{width: 330, height: 40}}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor={'#000'}
              maximumTrackTintColor="#000000"
              step={1}
              value={Number(values.distance)}
              onValueChange={v => {
                setFieldValue('distance', v);
              }}
            />
          ) : null}
        </List.Accordion>
        <Spacer height={50} />
      </ScrollView>
    );
  };

  const getSortTab = () => {
    return (
      <View>
        {sortingItems.map((item, index) => {
          return (
            <List.Item
              onPress={() => {
                setFieldValue('sortBy', item?.key);
                setFieldValue('dir', item?.order);
                setSortQuery(item.title);
              }}
              key={index}
              title={item?.title}
              left={props => (
                <List.Icon
                  {...props}
                  icon={() => (
                    <CustomIcon
                      origin={ICON_TYPE.MATERIAL_ICONS}
                      name={
                        sortQuery === item.title
                          ? 'check-box'
                          : 'check-box-outline-blank'
                      }
                      color={sortQuery === item.title ? '#00958C' : '#868686'}
                      size={20}
                    />
                  )}
                />
              )}
            />
          );
        })}
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isFilter}
      //   presentationStyle="pageSheet"
      onDismiss={() => setIsFilter(false)}>
      <Pressable
        style={{flex: 1, backgroundColor: '#00000030'}}
        onPress={() => setIsFilter(false)}>
        <View />
      </Pressable>
      <View
        style={{
          height: '90%',
          backgroundColor: '#ffffff',
          bottom: 0,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 20,
            }}>
            <Pressable
              onPress={() => setActiveTab('Filter')}
              style={{
                flex: 1,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor:
                  activeTab === 'Filter' ? '#00958C' : '#868686',
                borderBottomWidth: activeTab === 'Filter' ? 2 : 1,
                paddingBottom: 10,
              }}>
              <CustomText
                style={{
                  color: activeTab === 'Filter' ? '#00958C' : '#868686',
                }}>
                Filter
              </CustomText>
            </Pressable>
            <Pressable
              onPress={() => setActiveTab('Sort')}
              style={{
                flex: 1,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: activeTab === 'Sort' ? '#00958C' : '#868686',
                borderBottomWidth: activeTab === 'Sort' ? 2 : 1,
                paddingBottom: 10,
              }}>
              <CustomText
                style={{
                  color: activeTab === 'Sort' ? '#00958C' : '#868686',
                }}>
                Sort
              </CustomText>
            </Pressable>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
            }}>
            {activeTab === 'Filter' ? getFilterTab() : getSortTab()}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 20,
              width: '100%',
              height: 100,
            }}>
            <View
              style={{
                justifyContent: 'center',
                width: '45%',
              }}>
              <SubmitButton lable="Apply" onPress={handleSubmit} />
            </View>
            <Spacer width={10} />
            <View
              style={{
                justifyContent: 'center',
                width: '45%',
              }}>
              <SubmitButton
                onPress={() => {
                  resetForm();
                  setSortQuery('');
                }}
                lable="Reset"
                type="outlined"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Filter;

const styles = StyleSheet.create({});
