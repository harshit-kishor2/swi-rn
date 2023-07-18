import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  CustomIcon,
  CustomInput,
  CustomText,
  CustomTextInput,
  Spacer,
} from '@app/components';
import {List} from 'react-native-paper';
import {ICON_TYPE} from '@app/components/CustomIcon';
import Slider from '@react-native-community/slider';
import {useReducer} from 'react';

const sortingItems = [
  'Recently added',
  'Price: Low to High',
  'Price: High to Low',
  'Ascending: A to Z',
  'Descending: Z to A',
];

const initialState = {
  distance: '', //
  sortBy: '', //price,id,title
  dir: '', // DESC,ASC
  min_price: '',
  max_price: '',
  watch_condition: '', //watch_condition or pre-owned
};

const reducer = (state, action) => {
  switch (action.type) {
    case value:
      break;

    default:
      break;
  }
};

const Filter = ({isFilter, setIsFilter, ...props}) => {
  const {exploreProduct} = props;
  const [activeTab, setActiveTab] = useState('Filter');
  const [sortQuery, setSortQuery] = useState('Recently added');

  const [state, dispatch] = useReducer(reducer, initialState);

  const getFilterTab = () => {
    return (
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: 20,
            width: '90%',
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
              // onChangeText={handleChange('email')}
              // onBlur={handleBlur('email')}
              // value={values.email}
              // error={errors?.email && touched?.email}
              // errorText={errors?.email}
              leftIcon={
                <CustomIcon
                  origin={ICON_TYPE.FEATHER_ICONS}
                  name="user"
                  color={'black'}
                  size={20}
                />
              }
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
              label="Min Price"
              placeholder="Min Price"
              keyboardType="email-address"
              returnKeyType="next"
              // onChangeText={handleChange('email')}
              // onBlur={handleBlur('email')}
              // value={values.email}
              // error={errors?.email && touched?.email}
              // errorText={errors?.email}
              leftIcon={
                <CustomIcon
                  origin={ICON_TYPE.FEATHER_ICONS}
                  name="user"
                  color={'black'}
                  size={20}
                />
              }
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
              justifyContent: 'center',
              paddingVertical: 20,
              width: '90%',
            }}>
            <View
              style={{
                justifyContent: 'center',
                //   alignItems: 'center',
                width: '45%',
              }}>
              <List.Item
                title={'Brand New'}
                left={props => (
                  <List.Icon
                    {...props}
                    icon={() => (
                      <CustomIcon
                        origin={ICON_TYPE.MATERIAL_ICONS}
                        name={
                          sortQuery ? 'check-box' : 'check-box-outline-blank'
                        }
                        color={sortQuery ? '#00958C' : '#868686'}
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
                justifyContent: 'center',
                //   alignItems: 'center',
                width: '45%',
              }}>
              <List.Item
                title={'Pre Owned'}
                left={props => (
                  <List.Icon
                    {...props}
                    icon={() => (
                      <CustomIcon
                        origin={ICON_TYPE.MATERIAL_ICONS}
                        name={
                          sortQuery ? 'check-box' : 'check-box-outline-blank'
                        }
                        color={sortQuery ? '#00958C' : '#868686'}
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
                title={item?.name}
                left={props => (
                  <List.Icon
                    {...props}
                    icon={() => (
                      <CustomIcon
                        origin={ICON_TYPE.MATERIAL_ICONS}
                        name={
                          sortQuery === item
                            ? 'check-box'
                            : 'check-box-outline-blank'
                        }
                        color={sortQuery === item ? '#00958C' : '#868686'}
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
            left={props => (
              <List.Icon
                {...props}
                icon={() => (
                  <CustomIcon
                    origin={ICON_TYPE.MATERIAL_ICONS}
                    name={sortQuery ? 'check-box' : 'check-box-outline-blank'}
                    color={sortQuery ? '#00958C' : '#868686'}
                    size={20}
                  />
                )}
              />
            )}
          />
          <List.Item
            title={'Distance Range'}
            left={props => (
              <List.Icon
                {...props}
                icon={() => (
                  <CustomIcon
                    origin={ICON_TYPE.MATERIAL_ICONS}
                    name={sortQuery ? 'check-box' : 'check-box-outline-blank'}
                    color={sortQuery ? '#00958C' : '#868686'}
                    size={20}
                  />
                )}
              />
            )}
          />
          <Slider
            // style={{width: 330, height: 40}}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor={'#000'}
            maximumTrackTintColor="#000000"
            step={1}
            // value={distance}
            // onValueChange={handleDistanceChange}
          />
        </List.Accordion>

        <View></View>
      </ScrollView>
    );
  };

  const getSortTab = () => {
    return (
      <View>
        {sortingItems.map((item, index) => {
          return (
            <List.Item
              onPress={() => setSortQuery(item)}
              key={index}
              title={item}
              left={props => (
                <List.Icon
                  {...props}
                  icon={() => (
                    <CustomIcon
                      origin={ICON_TYPE.MATERIAL_ICONS}
                      name={
                        sortQuery === item
                          ? 'check-box'
                          : 'check-box-outline-blank'
                      }
                      color={sortQuery === item ? '#00958C' : '#868686'}
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
        </View>
      </View>
    </Modal>
  );
};

export default Filter;

const styles = StyleSheet.create({});
