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
import SelectWithInput from './SelectWithInput';
import DatePicker from '../../components/DatePicker';
import moment from 'moment';
import HeaderFactoryGemSet from './HeaderFactoryGemSet';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const genderType = [
  {name: 'Male', icon: IMAGES.maleIcon, id: 1},
  {name: 'Female', icon: IMAGES.femaleIcon, id: 2},
  {name: 'Unisex', icon: IMAGES.unisexIcon, id: 3},
];

const FormDetails = ({NextPress, dropdownData, brandData, modelData}) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState();
  const [watchDes, setWatchDes] = useState();
  const [gender, setGender] = useState('Male');
  const [isFactoryGem, setIsFactoryGem] = useState('Yes');
  const [custom, setCustom] = useState('Yes');
  const [factoryGem, setFactoryGem] = useState([]);
  const [customType, setCustomType] = useState([]);
  const [dial, setDial] = useState();
  const [openAdditionalInfo, setOpenAdditionalInfo] = useState(false);
  const [selectedModel, setSelectedModel] = useState({});
  const [selectedBrand, setSelectedBrand] = useState({});
  const [dropData, setDropData] = useState([]);
  const [headerTitle, setHeaderTitle] = useState('');
  const [watchCondition, setWatchCondition] = useState('brand_new');
  const [date, setDate] = useState();
  const [certain, setCertain] = useState(false);
  const [accessories, setAccessories] = useState({});
  const [dialMarker, setDialMarker] = useState({});
  const [caseSize, setCaseSize] = useState({});
  const [movement, setMovement] = useState({});
  const [caseMaterial, setCaseMaterial] = useState({});
  const [strap, setStrap] = useState({});
  const [clasp, setClasp] = useState({});
  const [isLocationModal, setIsLocationModal] = useState(false);
  const [address, setAddress] = useState();
  const [latitude, setLatitude] = useState();
  const [long, setLong] = useState();
  const [brandText, setBrandText] = useState('');
  const [modelText, setModelText] = useState('');

  useFocusEffect(
    useCallback(() => {
      dispatch(getProductBrand());
      dispatch(productDropdownAction());
    }, []),
  );

  useEffect(() => {
    let params = {
      id: selectedBrand?.id,
    };
    dispatch(getProductModel(params));
  }, [selectedBrand]);

  const factoryAddFun = (arr, item) => {
    if (arr?.find(obj => obj?.id === item.id)) {
      let data = arr;
      const newArr = data.filter(obj => obj.id != item.id);
      if (item.type === 'FACTTORYGEM') {
        setFactoryGem(newArr);
      } else {
        setCustomType(newArr);
      }
    } else {
      let paramObj = {
        id: item.id,
        name: item.name,
        type: item.type,
        text: '',
      };
      if (item.type === 'FACTTORYGEM') {
        setFactoryGem(e => [...e, paramObj]);
      } else {
        setCustomType(e => [...e, paramObj]);
      }
    }
  };

  const isSelectedFactory = (array, id) => {
    return array?.some(obj => obj.id === id);
  };

  const onChangeTextValue = (arr, item, textValue) => {
    let paramObj = {
      id: item.id,
      name: item.name,
      type: item.type,
      text: textValue,
    };
    let newArr = replaceObject(arr, item.id, paramObj);
    setFactoryGem(newArr);
  };

  const replaceObject = (array, id, newObject) => {
    const updatedArray = array.map(obj => {
      if (obj.id === id) {
        return newObject;
      }
      return obj;
    });
    return updatedArray;
  };

  return (
    <View style={styles.formDetailsStyle}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={[styles.formDetailsStyle, {paddingHorizontal: 0}]}>
        <View style={styles.mainFormComponent}>
          <View style={styles.halfWidth}>
            <Dropdown
              dropDownPress={() => {
                setDropData(brandData?.data);
                setHeaderTitle('Select Brand');
                setIsModalVisible(!isModalVisible);
              }}
              title={'Choose Brand'}
              isRequired={true}
              value={selectedBrand?.name}
              otherValuePlaceholder={'Enter Brand'}
              otherValue={brandText}
              otherValueChangeText={e => setBrandText(e)}
            />
          </View>
          <View style={styles.halfWidth}>
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
              otherValuePlaceholder={'Enter Model'}
              otherValue={modelText}
              otherValueChangeText={e => setModelText(e)}
            />
          </View>
        </View>
        <View style={styles.formHeaderMainView}>
          <Text style={styles.formHeaderText}>
            Title <Text style={{color: COLORS.RED}}>*</Text>
          </Text>
          <TextInput
            style={{marginBottom: SPACING.SCALE_16, marginTop: SPACING.SCALE_8}}
            value={title}
            maxLength={50}
            onChangeText={e => setTitle(e)}
          />
        </View>
        <View style={{marginTop: SPACING.SCALE_30}}>
          <Text style={styles.formHeaderText}>
            Watch Condition <Text style={{color: COLORS.RED}}>*</Text>
          </Text>
          <View style={styles.formMainWatchConditionView}>
            <TouchableOpacity
              onPress={() => setWatchCondition('brand_new')}
              activeOpacity={0.7}
              style={[
                styles.formWatchConditionView,
                {
                  backgroundColor:
                    watchCondition === 'brand_new'
                      ? COLORS.themeColor
                      : COLORS.WHITE,
                  borderColor:
                    watchCondition === 'brand_new'
                      ? COLORS.WHITE
                      : COLORS.themeColor,
                },
              ]}>
              <Text
                style={[
                  styles.formWatchConditionText,
                  {
                    color:
                      watchCondition === 'brand_new'
                        ? COLORS.WHITE
                        : COLORS.themeColor,
                  },
                ]}>
                Brand new
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setWatchCondition('pre_owned')}
              activeOpacity={0.7}
              style={[
                styles.formWatchConditionView,
                {
                  backgroundColor:
                    watchCondition === 'pre_owned'
                      ? COLORS.themeColor
                      : COLORS.WHITE,
                  borderColor:
                    watchCondition === 'pre_owned'
                      ? COLORS.WHITE
                      : COLORS.themeColor,
                },
              ]}>
              <Text
                style={[
                  styles.formWatchConditionText,
                  {
                    color:
                      watchCondition === 'pre_owned'
                        ? COLORS.WHITE
                        : COLORS.themeColor,
                  },
                ]}>
                Pre-Owned
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: SPACING.SCALE_30}}>
          <Text style={styles.formHeaderText}>
            Dated <Text style={{color: COLORS.RED}}>*</Text>
          </Text>
          <View style={styles.formDateMainView}>
            <DatePicker
              children={
                <View style={styles.formDateChildrenMainView}>
                  <Text style={styles.formDateTextStyle}>
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
                style={[
                  styles.formTickMainView,
                  {
                    backgroundColor: certain ? COLORS.themeColor : COLORS.WHITE,
                  },
                ]}>
                {certain ? (
                  <Image
                    source={IMAGES.tickIcon}
                    resizeMode={'contain'}
                    style={{height: SPACING.SCALE_16, width: SPACING.SCALE_16}}
                  />
                ) : null}
              </TouchableOpacity>
              <Text>No Certain</Text>
            </View>
          </View>
        </View>
        <View style={{marginTop: SPACING.SCALE_30}}>
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
        <View style={styles.formAdditionalInfo}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setOpenAdditionalInfo(!openAdditionalInfo)}
            style={styles.formAdditionalView}>
            <Text style={[styles.formDateTextStyle, {fontWeight: '600'}]}>
              Fill in additional information
            </Text>
            <Image source={IMAGES.dropIcon} resizeMode={'contain'} />
          </TouchableOpacity>
          {openAdditionalInfo ? (
            <View style={{marginHorizontal: SPACING.SCALE_15}}>
              <View
                style={{
                  borderBottomWidth: SPACING.SCALE_0_5,
                  borderBottomColor: COLORS.borderBottomColor,
                }}
              />
              <Text style={styles.formWatchDescription}>
                Tell the customers about this watch
              </Text>
              <View style={styles.borderBottom}>
                <TextInput
                  numberOfLines={5}
                  multiline={true}
                  maxLength={250}
                  onChangeText={e => setWatchDes(e)}
                  value={watchDes}
                />
                <Text style={styles.watchDescriptionText}>
                  {watchDes?.length ?? 0}/250
                </Text>
              </View>
              <View style={{marginTop: SPACING.SCALE_30}}>
                <Text style={styles.formHeaderText}>Gender</Text>
                <View style={styles.genderTypeView}>
                  {genderType?.map((item, index) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setGender(item.name)}
                        key={`gender${index}`}
                        style={[
                          styles.genderSelectView,
                          {
                            borderColor:
                              gender === item.name
                                ? COLORS.themeColor
                                : COLORS.PageBackground,
                            backgroundColor:
                              gender === item.name
                                ? COLORS.themeColor
                                : COLORS.PageBackground,
                          },
                        ]}>
                        <Image
                          source={item.icon}
                          style={{
                            marginLeft: SPACING.SCALE_15,
                            tintColor:
                              gender === item.name
                                ? COLORS.WHITE
                                : COLORS.themeColor,
                          }}
                        />
                        <Text
                          style={[
                            styles.genderTextStyle,
                            {
                              color:
                                gender === item.name
                                  ? COLORS.WHITE
                                  : COLORS.themeColor,
                            },
                          ]}>
                          {item?.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              <View style={styles.formDropDownMainView}>
                <View style={styles.fortyFivePercent}>
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
                <View style={styles.fortyFivePercent}>
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
              <View style={styles.formDropDownMainView}>
                <View style={styles.fortyFivePercent}>
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
                <View style={styles.fortyFivePercent}>
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
              <View style={styles.formDropDownMainView}>
                <View style={styles.fortyFivePercent}>
                  <Dropdown
                    dropDownPress={() => {
                      setDropData(dropdownData?.data?.CASEMATERIAL);
                      setHeaderTitle('Select Case Material');
                      setIsModalVisible(!isModalVisible);
                    }}
                    title={'Case Material'}
                    isRequired={true}
                    value={caseMaterial?.name}
                  />
                </View>
                <View style={styles.fortyFivePercent}>
                  <Dropdown
                    dropDownPress={() => {
                      setDropData(dropdownData?.data?.STRAPBRACELET);
                      setHeaderTitle('Select Strap/Bracelet');
                      setIsModalVisible(!isModalVisible);
                    }}
                    title={'Strap/Bracelet'}
                    isRequired={true}
                    value={strap?.name}
                  />
                </View>
              </View>
              <View style={styles.formDropDownMainView}>
                <Dropdown
                  dropDownPress={() => {
                    setDropData(dropdownData?.data?.CLASP);
                    setHeaderTitle('Select Clasp');
                    setIsModalVisible(!isModalVisible);
                  }}
                  title={'Clasp'}
                  isRequired={true}
                  value={clasp?.name}
                />
              </View>
              <View
                style={{
                  marginTop: SPACING.SCALE_30,
                  marginBottom: SPACING.SCALE_20,
                }}>
                <HeaderFactoryGemSet
                  header={'Factory Gem set ?'}
                  onPressYes={() => setIsFactoryGem('Yes')}
                  value={isFactoryGem}
                  onPressNo={() => setIsFactoryGem('No')}
                  subTitle={'If yes, tick what’s gem-setted'}
                />
                {isFactoryGem === 'Yes' &&
                  dropdownData?.data?.FACTTORYGEM?.map((item, index) => {
                    return (
                      <SelectWithInput
                        item={item}
                        onSelect={() => factoryAddFun(factoryGem, item)}
                        backgroundColor={
                          isSelectedFactory(factoryGem, item.id)
                            ? COLORS.themeColor
                            : COLORS.WHITE
                        }
                        isCheck={isSelectedFactory(factoryGem, item.id)}
                        textValue={item.text}
                        onChangeTextValue={e =>
                          onChangeTextValue(factoryGem, item, e)
                        }
                      />
                    );
                  })}
              </View>
              <View style={{marginTop: SPACING.SCALE_30}}>
                <HeaderFactoryGemSet
                  header={'Custom ?'}
                  onPressYes={() => setCustom('Yes')}
                  value={custom}
                  onPressNo={() => setCustom('No')}
                  subTitle={'If yes, tick what’s custom'}
                />
                {custom === 'Yes' &&
                  dropdownData?.data?.CUSTOMFACTTORYGEM?.map((item, index) => {
                    return (
                      <SelectWithInput
                        item={item}
                        onSelect={() => factoryAddFun(customType, item)}
                        backgroundColor={
                          isSelectedFactory(customType, item.id)
                            ? COLORS.themeColor
                            : COLORS.WHITE
                        }
                        isCheck={isSelectedFactory(customType, item.id)}
                        textValue={item.text}
                        onChangeTextValue={e =>
                          onChangeTextValue(customType, item, e)
                        }
                      />
                    );
                  })}
              </View>
              <View
                style={[
                  styles.borderBottom,
                  {
                    marginBottom: SPACING.SCALE_20,
                  },
                ]}>
                <Text style={styles.formLocationTextView}>
                  What is the location of this product?
                </Text>
                <View style={styles.formLocationMainView}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setIsLocationModal(!isLocationModal)}
                    style={{width: TYPOGRAPHY.DYNAMIC_WIDTH('80%')}}>
                    <Text>{address}</Text>
                  </TouchableOpacity>
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
            width={'100%'}
            marginHorizontal={20}
            onPress={() => NextPress()}
          />
        </View>
      </ScrollView>
      <Modal
        transparent={true}
        visible={isLocationModal}
        style={{flex: 1}}
        onRequestClose={() => setIsLocationModal(false)}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: COLORS.WHITE,
            paddingHorizontal: SPACING.SCALE_20,
          }}>
          <Text
            style={{
              marginTop: SPACING.SCALE_20,
              justifyContent: 'center',
              alignSelf: 'center',
              fontFamily: 'Open Sans',
              fontSize: 18,
              fontWeight: '700',
              color: COLORS.BLACK,
            }}>
            Select Address
          </Text>
          <View style={{marginTop: SPACING.SCALE_20, flex: 1}}>
            <GooglePlacesAutocomplete
              placeholder="Type a place"
              fetchDetails={true}
              onPress={(data, details = null) => {
                setAddress(data?.description);
                console.log(data);
                if (details) {
                  const {lat, lng} = details.geometry.location;
                  setLatitude(lat);
                  setLong(lng);
                  console.log('Latitude:', lat);
                  console.log('Longitude:', lng);
                }
                setIsLocationModal(false);
              }}
              query={{key: 'AIzaSyCGz3NzE46sAz0Q7J912AJftXjdy0fOrgI'}}
              onFail={error => console.log(error)}
              onNotFound={() => console.log('no results')}
              textInputProps={{
                autoFocus: true,
                blurOnSubmit: false,
              }}
              styles={{
                textInputContainer: {},
                textInput: {
                  height: 38,
                  color: '#5d5d5d',
                  fontSize: 16,
                  borderWidth: 1,
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
            />
          </View>
        </SafeAreaView>
      </Modal>
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
                    } else if (headerTitle === 'Select Case Material') {
                      setCaseMaterial(item);
                    } else if (headerTitle === 'Select Strap/Bracelet') {
                      setStrap(item);
                    } else if (headerTitle === 'Select Clasp') {
                      setClasp(item);
                    } else {
                      setSelectedModel(item);
                    }
                    setIsModalVisible(false);
                  }}
                  style={{alignItems: 'center'}}>
                  <Text style={styles.formModelTextStyle}>{item?.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const mapStateToProps = state => ({
  dropdownData: productDropdownData(state),
  brandData: productBrandData(state),
  modelData: productModelData(state),
  dropdownLoading: productDropdownLoading(state),
});

export default connect(mapStateToProps)(FormDetails);
