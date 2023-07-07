import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';
import {styles} from './style';
import {COLORS, IMAGES, SPACING, TYPOGRAPHY} from '../../resources';
import Custombutton from '../../components/Button1';
import LocationInput from '../../LocationInput';
import {connect, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  getProductBrand,
  getProductModel,
  productBrandData,
  productDropdownAction,
  productDropdownData,
  productDropdownLoading,
  productModelData,
} from '../../redux/addProduct.slice';
import Dropdown from './Dropdown';
import DatePicker from '../../components/DatePicker';
import moment from 'moment';

const genderType = [
  {name: 'Male', icon: IMAGES.maleIcon, id: 1},
  {name: 'Female', icon: IMAGES.femaleIcon, id: 2},
  {name: 'Unisex', icon: IMAGES.unisexIcon, id: 3},
];
const gemSetType = [
  {name: 'Case', id: 1},
  {name: 'Dial', id: 2},
  {name: 'Bracelet', id: 3},
  {name: 'Bezel', id: 4},
  {name: 'Lugs', id: 5},
  {name: 'Clasp', id: 6},
];
const FormDetails = ({NextPress, dropdownData, brandData, modelData}) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState();
  const [watchDes, setWatchDes] = useState();
  const [gender, setGender] = useState('Male');
  const [isFactoryGem, setIsFactoryGem] = useState('Yes');
  const [custom, setCustom] = useState('Yes');
  const [factoryGem, setFactoryGem] = useState('');
  const [customType, setCustomType] = useState('');
  const [indicateGem, setIndicateGem] = useState('');
  const [dial, setDial] = useState();
  const [openAdditionalInfo, setOpenAdditionalInfo] = useState(false);
  const [selectedModel, setSelectedModel] = useState({});
  const [selectedBrand, setSelectedBrand] = useState({});
  const [dropData, setDropData] = useState([]);
  const [headerTitle, setHeaderTitle] = useState('');
  const [watchCondition, setWatchCondition] = useState('brand_new');
  const [date, setDate] = useState();
  const [certain, setCertain] = useState(false);
  const [accessories, setAccessories] = useState();
  const [dialMarker, setDialMarker] = useState({});
  const [caseSize, setCaseSize] = useState({});
  const [movement, setMovement] = useState({});

  useFocusEffect(
    useCallback(() => {
      dispatch(getProductBrand());
      dispatch(productDropdownAction());
    }, []),
  );
  // console.log('dropdownData', dropdownData?.data);
  useEffect(() => {
    let params = {
      id: selectedBrand?.id,
    };
    dispatch(getProductModel(params));
  }, [selectedBrand]);

  return (
    <ScrollView style={styles.formDetailsStyle}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{width: '50%'}}>
          <Dropdown
            dropDownPress={() => {
              setDropData(brandData?.data);
              setHeaderTitle('Select Brand');
              setIsModalVisible(!isModalVisible);
            }}
            title={'Choose Brand'}
            isRequired={true}
            value={selectedBrand?.name}
          />
        </View>
        <View style={{width: '50%'}}>
          <Dropdown
            transparent={true}
            dropDownPress={() => {
              setHeaderTitle('Select Model');
              setDropData(modelData?.data);
              setIsModalVisible(!isModalVisible);
            }}
            title={'Choose Model'}
            isRequired={true}
            value={selectedModel?.name}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 30,
          borderBottomWidth: 1,
          borderBottomColor: '#00000040',
        }}>
        <Text
          style={{
            color: '#7C7C7C',
            fontFamily: 'Open Sans',
            fontSize: 14,
          }}>
          Title <Text style={{color: COLORS.RED}}>*</Text>
        </Text>
        <TextInput
          style={{marginBottom: 16, marginTop: 8}}
          value={title}
          maxLength={50}
          onChangeText={e => setTitle(e)}
        />
      </View>
      <View style={{marginTop: 30}}>
        <Text
          style={{
            color: '#7C7C7C',
            fontFamily: 'Open Sans',
            fontSize: 14,
          }}>
          Watch Condition <Text style={{color: COLORS.RED}}>*</Text>
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => setWatchCondition('brand_new')}
            activeOpacity={0.7}
            style={{
              backgroundColor:
                watchCondition === 'brand_new' ? '#00958C' : 'white',
              marginRight: 15,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: watchCondition === 'brand_new' ? 'white' : '#00958C',
            }}>
            <Text
              style={{
                color: watchCondition === 'brand_new' ? 'white' : '#00958C',
                fontFamily: 'Open Sans',
                fontSize: 14,
                marginVertical: 7,
                marginHorizontal: 16,
              }}>
              Brand new
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setWatchCondition('pre_owned')}
            activeOpacity={0.7}
            style={{
              backgroundColor:
                watchCondition === 'pre_owned' ? '#00958C' : 'white',
              marginRight: 15,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: watchCondition === 'pre_owned' ? 'white' : '#00958C',
            }}>
            <Text
              style={{
                color: watchCondition === 'pre_owned' ? 'white' : '#00958C',
                fontFamily: 'Open Sans',
                fontSize: 14,
                marginVertical: 7,
                marginHorizontal: 16,
              }}>
              Pre-Owned
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: 30}}>
        <Text
          style={{
            color: '#7C7C7C',
            fontFamily: 'Open Sans',
            fontSize: 14,
          }}>
          Dated <Text style={{color: COLORS.RED}}>*</Text>
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: '50%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 8,
          }}>
          <DatePicker
            children={
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  paddingBottom: 16,
                  borderBottomColor: '#00000040',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Open Sans',
                    fontSize: 16,
                  }}>
                  {date ? moment(date).format('MMM, YYYY') : 'MMM, YYYY'}
                </Text>
                <Image source={IMAGES.calendarIcon} resizeMode={'contain'} />
              </View>
            }
            onChangeDate={e => {
              setDate(e);
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setCertain(!certain)}
              style={{
                height: 20,
                width: 20,
                borderWidth: 1,
                borderColor: '#00958C',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
                marginLeft: 36,
                backgroundColor: certain ? '#00958C' : 'white',
              }}>
              {certain ? (
                <Image
                  source={IMAGES.tickIcon}
                  resizeMode={'contain'}
                  style={{height: 16, width: 16}}
                />
              ) : null}
            </TouchableOpacity>
            <Text>No Certain</Text>
          </View>
        </View>
      </View>
      <View style={{marginTop: 30}}>
        <Dropdown
          dropDownPress={() => {
            setDropData(dropdownData?.data?.ACCESSORIES);
            setHeaderTitle('Select Accessories');
            setIsModalVisible(!isModalVisible);
          }}
          title={'Accessories'}
          isRequired={true}
          value={accessories?.name}
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          width: '100%',
          marginTop: 36,
          marginBottom: 10,
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setOpenAdditionalInfo(!openAdditionalInfo)}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 19,
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              fontFamily: 'Open Sans',
              fontSize: 16,
              fontWeight: '600',
              color: 'black',
            }}>
            Fill in additional information
          </Text>
          <Image source={IMAGES.dropIcon} resizeMode={'contain'} />
        </TouchableOpacity>
        {openAdditionalInfo ? (
          <View style={{marginHorizontal: 15}}>
            <View
              style={{borderBottomWidth: 0.5, borderBottomColor: '#7C7C7C'}}
            />
            <Text
              style={{
                marginVertical: 20,
                fontFamily: 'Open Sans',
                fontSize: 14,
                fontWeight: '400',
              }}>
              Tell the customers about this watch
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#00000040',
              }}>
              <TextInput
                numberOfLines={5}
                multiline={true}
                maxLength={250}
                onChangeText={e => setWatchDes(e)}
                value={watchDes}
              />
              <Text
                style={{
                  alignSelf: 'flex-end',
                  marginBottom: 4,
                  color: '#00958C',
                  fontFamily: 'Open Sans',
                  fontSize: 12,
                  fontWeight: '600',
                }}>
                {watchDes?.length ?? 0}/250
              </Text>
            </View>
            <View style={{marginTop: 30}}>
              <Text
                style={{
                  color: '#7C7C7C',
                  fontFamily: 'Open Sans',
                  fontSize: 14,
                }}>
                Gender
              </Text>
              <View style={{flexDirection: 'row', marginTop: 17}}>
                {genderType?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setGender(item.name)}
                      key={`gender${index}`}
                      style={{
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 8,
                        borderColor:
                          gender == item.name ? '#00958C' : '#F0F2FA',
                        backgroundColor:
                          gender == item.name ? '#00958C' : '#F0F2FA',
                      }}>
                      <Image
                        source={item.icon}
                        style={{
                          marginLeft: 15,
                          tintColor: gender == item.name ? 'white' : '#00958C',
                        }}
                      />
                      <Text
                        style={{
                          marginLeft: 5,
                          marginRight: 15,
                          marginVertical: 7,
                          color: gender == item.name ? 'white' : '#00958C',
                          fontSize: 14,
                          fontFamily: 'Open Sans',
                          fontWeight: '400',
                        }}>
                        {item?.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 35,
              }}>
              <View style={{width: '45%'}}>
                <Dropdown
                  dropDownPress={() => {
                    setDropData(dropdownData?.data?.DIAL);
                    setHeaderTitle('Select Dial');
                    setIsModalVisible(!isModalVisible);
                  }}
                  title={'Dial'}
                  isRequired={false}
                  value={dial?.name}
                />
              </View>
              <View style={{width: '45%'}}>
                <Dropdown
                  dropDownPress={() => {
                    setDropData(dropdownData?.data?.DIALMARKERS);
                    setHeaderTitle('Select Dial Markers');
                    setIsModalVisible(!isModalVisible);
                  }}
                  title={'Dial Markers'}
                  isRequired={false}
                  value={dialMarker?.name}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 30,
              }}>
              <View style={{width: '45%'}}>
                <Dropdown
                  dropDownPress={() => {
                    setDropData(dropdownData?.data?.CASESIZE);
                    setHeaderTitle('Select Case Size');
                    setIsModalVisible(!isModalVisible);
                  }}
                  title={'Case Size'}
                  isRequired={false}
                  value={caseSize?.name}
                />
              </View>
              <View style={{width: '45%'}}>
                <Dropdown
                  dropDownPress={() => {
                    setDropData(dropdownData?.data?.MOVEMENT);
                    setHeaderTitle('Select Movement');
                    setIsModalVisible(!isModalVisible);
                  }}
                  title={'Movement'}
                  isRequired={false}
                  value={movement?.name}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 35,
              }}>
              <View style={{width: '45%'}}>
                <Text
                  style={{
                    color: '#7C7C7C',
                    fontFamily: 'Open Sans',
                    fontSize: 14,
                  }}>
                  Case material
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginRight: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#00000040',
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      marginBottom: 10,
                      color: COLORS.BLACK,
                      fontFamily: 'Open Sans',
                      fontSize: 16,
                    }}>
                    Bronze
                  </Text>
                  <Image source={IMAGES.dropDownIcon} resizeMode={'contain'} />
                </View>
              </View>
              <View style={{width: '45%'}}>
                <Text
                  style={{
                    color: '#7C7C7C',
                    fontFamily: 'Open Sans',
                    fontSize: 14,
                  }}>
                  Strap/Bracelet
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginRight: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#00000040',
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      marginBottom: 10,
                      color: COLORS.BLACK,
                      fontFamily: 'Open Sans',
                      fontSize: 16,
                    }}>
                    Leather
                  </Text>
                  <Image source={IMAGES.dropDownIcon} resizeMode={'contain'} />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 35,
              }}>
              <View style={{width: '100%'}}>
                <Text
                  style={{
                    color: '#7C7C7C',
                    fontFamily: 'Open Sans',
                    fontSize: 14,
                  }}>
                  Clasp
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginRight: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#00000040',
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      marginBottom: 10,
                      color: COLORS.BLACK,
                      fontFamily: 'Open Sans',
                      fontSize: 16,
                    }}>
                    Tang Buckle
                  </Text>
                  <Image source={IMAGES.dropDownIcon} resizeMode={'contain'} />
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 30,
                borderBottomWidth: 1,
                borderBottomColor: '#00000040',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Open Sans',
                    fontSize: 16,
                    fontWeight: '400',
                  }}>
                  Factory Gem set ?
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => setIsFactoryGem('Yes')}>
                    <View
                      style={{
                        height: 16,
                        width: 16,
                        borderRadius: 8,
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: '#00958C',
                        marginHorizontal: 5,
                      }}>
                      <View
                        style={{
                          height: 12,
                          width: 12,
                          borderRadius: 6,
                          backgroundColor:
                            isFactoryGem === 'Yes' ? '#00958C' : 'white',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        marginLeft: 5,
                        marginRight: 15,
                        color: 'black',
                        fontFamily: 'Open Sans',
                        fontSize: 16,
                        fontWeight: '400',
                      }}>
                      Yes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => setIsFactoryGem('No')}>
                    <View
                      style={{
                        height: 16,
                        width: 16,
                        borderRadius: 8,
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: '#00958C',
                      }}>
                      <View
                        style={{
                          height: 12,
                          width: 12,
                          borderRadius: 6,
                          backgroundColor:
                            isFactoryGem === 'No' ? '#00958C' : 'white',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        marginLeft: 5,
                        marginRight: 15,
                        color: 'black',
                        fontFamily: 'Open Sans',
                        fontSize: 16,
                        fontWeight: '400',
                      }}>
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text
                style={{
                  color: '#7C7C7C',
                  fontFamily: 'Open Sans',
                  fontSize: 14,
                  fontWeight: '400',
                  marginVertical: 10,
                }}>
                If yes, tick what’s gem-setted
              </Text>
              {isFactoryGem === 'Yes' &&
                gemSetType?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setFactoryGem(item.name)}
                      style={{flexDirection: 'row', marginVertical: 12}}>
                      <View
                        style={{
                          height: 20,
                          width: 20,
                          borderWidth: 1,
                          borderColor: '#00958C',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            factoryGem == item.name ? '#00958C' : 'white',
                        }}>
                        {factoryGem == item.name ? (
                          <Image
                            source={IMAGES.tickIcon}
                            resizeMode={'contain'}
                            style={{height: 16, width: 16}}
                          />
                        ) : null}
                      </View>
                      <Text
                        style={{
                          marginLeft: 15,
                          color: '#4E4E4E',
                          fontFamily: 'Open Sans',
                          fontSize: 14,
                          fontWeight: '400',
                        }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              <Text
                style={{
                  color: '#7C7C7C',
                  fontFamily: 'Open Sans',
                  fontSize: 14,
                  fontWeight: '400',
                  marginVertical: 10,
                }}>
                {`Indicate what’s Gem-setted`}
              </Text>
              <TextInput
                style={{marginBottom: 16, marginTop: 8}}
                value={indicateGem}
                onChangeText={e => setIndicateGem(e)}
              />
            </View>
            <View
              style={{
                marginTop: 30,
                borderBottomWidth: 1,
                borderBottomColor: '#00000040',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Open Sans',
                    fontSize: 16,
                    fontWeight: '400',
                  }}>
                  Custom ?
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => setCustom('Yes')}>
                    <View
                      style={{
                        height: 16,
                        width: 16,
                        borderRadius: 8,
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: '#00958C',
                        marginHorizontal: 5,
                      }}>
                      <View
                        style={{
                          height: 12,
                          width: 12,
                          borderRadius: 6,
                          backgroundColor:
                            custom === 'Yes' ? '#00958C' : 'white',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        marginLeft: 5,
                        marginRight: 15,
                        color: 'black',
                        fontFamily: 'Open Sans',
                        fontSize: 16,
                        fontWeight: '400',
                      }}>
                      Yes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => setCustom('No')}>
                    <View
                      style={{
                        height: 16,
                        width: 16,
                        borderRadius: 8,
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: '#00958C',
                      }}>
                      <View
                        style={{
                          height: 12,
                          width: 12,
                          borderRadius: 6,
                          backgroundColor:
                            custom === 'No' ? '#00958C' : 'white',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        marginLeft: 5,
                        marginRight: 15,
                        color: 'black',
                        fontFamily: 'Open Sans',
                        fontSize: 16,
                        fontWeight: '400',
                      }}>
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text
                style={{
                  color: '#7C7C7C',
                  fontFamily: 'Open Sans',
                  fontSize: 14,
                  fontWeight: '400',
                  marginVertical: 10,
                }}>
                If yes, tick what’s custom
              </Text>
              {custom === 'Yes' &&
                gemSetType?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setCustomType(item.name)}
                      style={{flexDirection: 'row', marginVertical: 12}}>
                      <View
                        style={{
                          height: 20,
                          width: 20,
                          borderWidth: 1,
                          borderColor: '#00958C',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            customType == item.name ? '#00958C' : 'white',
                        }}>
                        {customType == item.name ? (
                          <Image
                            source={IMAGES.tickIcon}
                            resizeMode={'contain'}
                            style={{height: 16, width: 16}}
                          />
                        ) : null}
                      </View>
                      <Text
                        style={{
                          marginLeft: 15,
                          color: '#4E4E4E',
                          fontFamily: 'Open Sans',
                          fontSize: 14,
                          fontWeight: '400',
                        }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              <Text
                style={{
                  color: '#7C7C7C',
                  fontFamily: 'Open Sans',
                  fontSize: 14,
                  fontWeight: '400',
                  marginVertical: 10,
                }}>
                {`Indicate what’s customised`}
              </Text>
              <TextInput
                style={{marginBottom: 16, marginTop: 8}}
                value={indicateGem}
                onChangeText={e => setIndicateGem(e)}
              />
            </View>
            <View
              style={{
                marginTop: 30,
                borderBottomWidth: 1,
                borderBottomColor: '#00000040',
                marginBottom: 32,
              }}>
              <Text
                style={{
                  color: '#7C7C7C',
                  fontFamily: 'Open Sans',
                  fontSize: 14,
                  fontWeight: '400',
                  marginVertical: 10,
                }}>
                {`Indicate what’s customised`}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor: 'red',
                }}>
                {/* <TextInput
                  style={{marginBottom: 16, marginTop: 8, flex: 1}}
                  value={indicateGem}
                  onChangeText={e => setIndicateGem(e)}
                /> */}
                <LocationInput />
                <Image source={IMAGES.locationIcon} resizeMode={'contain'} />
              </View>
            </View>
          </View>
        ) : null}
      </View>
      <View style={{marginBottom: 50}}>
        <Custombutton
          title="NEXT"
          marginTop={40}
          height={50}
          width={335}
          marginHorizontal={20}
          onPress={() => {
            NextPress();
          }}
        />
      </View>
      <Modal
        transparent={true}
        visible={isModalVisible}
        style={{flex: 1}}
        onRequestClose={() => setIsModalVisible(false)}>
        <SafeAreaView style={{flex: 1}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsModalVisible(false)}
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.1)',
              minHeight: SPACING.SCALE_250,
            }}>
            <View style={{flex: 1}} />
          </TouchableOpacity>
          <FlatList
            data={dropData}
            ListHeaderComponent={
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 15,
                }}>
                <Text style={[TYPOGRAPHY.HEADER_TITLE, {color: 'black'}]}>
                  {headerTitle}
                </Text>
              </View>
            }
            style={{backgroundColor: 'white', paddingBottom: 20}}
            keyExtractor={(item, index) => `${item?.id}${index}`}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    if (headerTitle === 'Select Brand') {
                      setSelectedBrand(item);
                    } else if (headerTitle === 'Select Accessories') {
                      setAccessories(item);
                    } else if (headerTitle === 'Select Dial') {
                      setDial(item);
                    } else if (headerTitle === 'Select Dial Markers') {
                      setDialMarker(item);
                    } else if (headerTitle === 'Select Case Size') {
                      setCaseSize(item);
                    } else if (headerTitle === 'Select Movement') {
                      setMovement(item);
                    } else {
                      setSelectedModel(item);
                    }
                    setIsModalVisible(false);
                  }}
                  style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'Open Sans',
                      fontSize: 16,
                      fontWeight: '400',
                      marginVertical: 8,
                      textAlign: 'center',
                    }}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </SafeAreaView>
      </Modal>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  dropdownData: productDropdownData(state),
  brandData: productBrandData(state),
  modelData: productModelData(state),
  dropdownLoading: productDropdownLoading(state),
});

export default connect(mapStateToProps)(FormDetails);
