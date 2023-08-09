import {
  BackHeader,
  Container,
  CustomIcon,
  CustomInput,
  CustomText,
  DatePicker,
  NavigationBar,
} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {COLORS, IMAGES} from '@app/resources';
import CheckBox from '@react-native-community/checkbox';
import {useFormik} from 'formik';
import moment from 'moment';
import {
  getSellerProfile,
  updateSellerProfile,
} from '@app/store/testSellerEditProfile/sellerProfileEdit.action';
import {useEffect, useState} from 'react';
// import { CheckBox } from 'react-native-elements';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ToggleSwitch from 'toggle-switch-react-native';
import {connect} from 'react-redux';
import {showAlert} from '@app/helper/commonFunction';
import {err} from 'react-native-svg/lib/typescript/xml';

const EditSellerProfile = props => {
  const [inputs, setInputs] = useState([{id: 0, value: ''}]);
  const addTextInput = () => {
    const newInput = {id: inputs.length, value: ''};
    setInputs([...inputs, newInput]);
  };
  const handleInputChange = (id, text) => {
    const updatedInputs = inputs.map(input =>
      input.id === id ? {...input, value: text} : input,
    );
    setInputs(updatedInputs);
  };
  const {
    navigation,
    route,
    authReducer,
    updateSellerProfileReducer,
    getUpdateProfile,
    updateSellerProfile,
  } = props;
  const userId = route.params?.userId;
  // const {getSellerProfileList} = props;
  console.log(props, 'Props================|||||||||||||||||||||||||');

  const item = updateSellerProfileReducer?.getSellerProfile;

  const updateItem = updateSellerProfileReducer.updateSellerProfile;
  // console.log('=>>>>>>>item==================>', item);  console.log('=>>>>>>>item==================>Alok', updateItem);
  // const item = getSellerProfileReducer;
  console.log('ITEM GET===================>>>>>>>>>>>>', item);
  useEffect(() => {
    getUpdateProfile();
  }, []);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [switchOn, setSwitchOn] = useState(false);

  const initialValues = {
    userId: item?.id,
    name: item?.name ?? '',
    email: item?.email ?? '',
    mobile: item?.mobile ?? '',
    about: item?.bio ?? '',
    location: item.additional_info?.location,
    opening_hours: item.additional_info?.opening_hours ?? [],
    website: item.additional_info?.website ?? '',
    social_media: item.additional_info?.social_media ?? [],
    payment_method: item.additional_info?.payment_method ?? [],
    announcement: item.additional_info?.announcement ?? '',
    announcement_end: item.additional_info?.announcement_end ?? '',
  };
  const {
    handleChange,
    handleSubmit,
    values,
    handleBlur,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: values => {
      try {
        updateSellerProfile(values).then(res => {
          if (res?.type.include('fulfilled')) {
            showAlert({
              title: 'success',
              message: res?.payload?.message ?? 'Success',
            });
          }
          if (res?.type.include('rejected')) {
            showAlert({
              title: 'Error',
              message: res?.payload?.message ?? 'Failed',
            });
          }
        });
      } catch (error) {
        console.log('OnPost Error Message==================>', error.message);
      }
      // updateSellerProfileReducer();
    },
  });
  console.log('================>Values ONSubmit ', values);

  console.log('=>>>>>>>>initial VAllues', initialValues);

  return (
    <Container useSafeAreaView={true}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 15,
        }}>
        <BackHeader />
        <View>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: 'OpenSans-Bold',
                fontSize: 16,
                color: '#00958C',
                marginTop: 10,
              }}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View>
          <View>
            <Image
              source={IMAGES.coverSellerProfile}
              style={{width: 393, height: 125}}
            />

            <View
              style={{
                position: 'absolute',
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: 90,
              }}>
              <Image
                source={IMAGES.Ellipse7}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  borderWidth: 5,
                  borderColor: COLORS.WHITE,
                }}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 90,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.RED,
                width: 210,
                height: 50,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: COLORS.WHITE,
                  fontFamily: 'cabin',
                  fontSize: 20,
                }}>
                Retrieve My Info
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{margin: 15}}>
            <Text style={style.text}>Seller's Name</Text>
            <CustomInput
              placeholder="Seller's Name"
              style={style.input}
              onChangeText={values => setFieldValue('name', values)}
              value={values.name}
            />
            <Text style={style.text}>Email</Text>
            <CustomInput
              placeholder="Email"
              style={style.input}
              onChangeText={value => setFieldValue('email', value)}
              value={values.email}
            />
            <Text style={style.text}>Phone Number</Text>
            <CustomInput
              placeholder="Phone Number"
              style={style.input}
              onChangeText={value => setFieldValue('mobile', value)}
              value={values.mobile}
            />
            <Text style={style.text}>About (Max 500 Words)</Text>
            <CustomInput
              placeholder="Suspendisse viverra uctus quam,
                                 sed fringilla nulla. Pellentesque quis massa tincidunt,
                                 iaculis ipsum sed, pretium purus."
              multiline={true}
              style={style.input}
              value={values.about}
              onChangeText={value => setFieldValue('about', value)}
            />

            <Text style={style.text}>Location</Text>
            <CustomInput
              placeholder="Shop #2 Marina Bay San"
              style={style.input}
              value={values.location}
              onChangeText={value => setFieldValue('location', value)}
            />

            <View>
              <FlatList
                data={values.opening_hours}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => {
                  // console.log(item)
                  return (
                    <View style={style.toggle}>
                      <View style={style.dayText}>
                        <Text style={style.week}>{item.day}</Text>
                      </View>
                      <View style={style.toggleView}>
                        <ToggleSwitch
                          isOn={item.onOff}
                          onToggle={val => {
                            const temp = values.opening_hours.filter((a, i) => {
                              if (a.id === item.id) {
                                item.onOff = val;
                                return item;
                              } else {
                                return item;
                              }
                            });

                            setFieldValue('opening_hours', temp);
                          }}
                          // onToggle={}
                          onColor={'#00958C'}
                          offColor={'#ACACAC'}
                          value={switchOn}
                        />
                      </View>
                      <View style={{width: '30%', marginHorizontal: 20}}>
                        <CustomInput
                          // placeholder="09:00 am - 05:00pm"
                          value={item.timing}
                          style={{width: 150}}
                          onChangeText={val => {
                            const temp = values.opening_hours.filter((a, i) => {
                              if (a.id === item.id) {
                                item.timing = val;
                                return item;
                              } else {
                                return item;
                              }
                            });

                            setFieldValue('opening_hours', temp);
                          }}
                        />
                      </View>
                    </View>
                  );
                }}
              />
            </View>

            <View style={{marginTop: 5}}>
              <Text style={style.text}>Website</Text>
              <CustomInput
                placeholder="immayvan.com"
                style={style.input}
                value={values.website}
                onChangeText={value => setFieldValue('website', value)}
              />
              <View>
                <Text style={style.text}>Social Media Links</Text>

                {/* <CustomInput
                  placeholder="facebook/immyvan"
                  style={style.input}
                /> */}
                {values.social_media.map((item, index) => (
                  <CustomInput
                    key={index}
                    value={item}
                    onChangeText={value => {
                      values.social_media[index] = value;
                      setFieldValue('social_media', values.social_media);
                    }}
                    // onChangeText={text => handleInputChange(item.id, text)}
                    rightIcon={() => {
                      return (
                        <CustomIcon
                          origin={ICON_TYPE.ENTYPO}
                          name={'cross'}
                          size={20}
                        />
                      );
                    }}
                  />
                ))}
              </View>

              <View style={{alignSelf: 'flex-end'}}>
                <TouchableOpacity onPress={addTextInput}>
                  <Text
                    style={{
                      fontFamily: 'OpenSans-SemiBold',
                      fontSize: 14,
                      color: '#00958C',
                    }}>
                    + Add More
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={style.text}>Choose Payment Mode Available</Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <FlatList
                  data={values.payment_method}
                  numColumns={3}
                  keyExtractor={item => item.id}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          // marginHorizontal: 20,
                          width: '33%',
                        }}>
                        <CheckBox
                          disabled={false}
                          value={item.check}
                          onValueChange={val => {
                            const temp = values.payment_method.filter(
                              (a, i) => {
                                if (a.id === item.id) {
                                  item.check = val;
                                  return item;
                                } else {
                                  return item;
                                }
                              },
                            );
                            // setPaymentMode(temp);
                            setFieldValue('payment_method', temp);
                          }}
                        />
                        <Text style={[{marginTop: 6}, style.text]}>{item}</Text>
                      </View>
                    );
                  }}
                />
              </View>

              <View>
                <Text>Post Ads </Text>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={[1, 2, 3, 4, 5, 6, 7]}
                  horizontal
                  renderItem={() => {
                    return (
                      <View
                        style={{
                          height: 177,
                          width: 307,
                          backgroundColor: '#F0F2FA',
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 15,
                          borderStyle: 'dashed',
                          borderWidth: 2,
                          borderColor: '#B5B6BB',
                          margin: 10,
                        }}>
                        <Pressable onPress={() => {}}>
                          <CustomIcon
                            origin={ICON_TYPE.MATERIAL_ICONS}
                            name={'add'}
                            size={30}
                            color={'#00958C'}
                          />
                        </Pressable>
                      </View>
                    );
                  }}
                />
              </View>
              <View style={{marginTop: 15}}>
                <Text style={style.text}>Announcements</Text>
                <CustomInput
                  placeholder="Black day sale will be live from next week"
                  style={style.input}
                  value={values.announcement}
                  onChangeText={value => setFieldValue('announcement', value)}
                />
              </View>
              <Text>Announcement ends on </Text>
              <View onPress={() => setOpen(true)} style={{marginBottom: 5}}>
                <DatePicker
                  Value={values.announcement_end}
                  children={
                    <CustomText>
                      {date
                        ? moment(date).format('DD MMM YYYY')
                        : 'DD MMM YYYY'}
                    </CustomText>
                  }
                  onChangeDate={d => setFieldValue(d)}
                />
              </View>
              <View
                style={{
                  height: 2,
                  width: '100%',
                  backgroundColor: '#000000',

                  marginBottom: 20,
                }}></View>
              <View
                style={{
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.BLACK,
                    borderRadius: 10,
                    width: 239,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={handleSubmit}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: 'Cabin-SemiBold',
                      color: COLORS.WHITE,
                    }}>
                    Save Changes
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 12,
                  marginBottom: 20,
                }}>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'OpenSans-SemiBold',
                      color: '#00958C',
                    }}>
                    Not now, I’ll do it later
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const style = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: '#7C7C7C',
  },
  toggle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    width: '90%',
    alignContent: 'center',
  },
  input: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: COLORS.BLACK,
  },
  week: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: 'OpenSans-Regular',
  },
  dayText: {justifyContent: 'center', width: '30%'},
  toggleView: {justifyContent: 'center', width: '25%'},
  customInput: {width: '30%', marginHorizontal: 20},
});

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
    updateSellerProfileReducer: state.updateSellerProfileReducer,
  };
};
const mapDispatchToProps = dispatch => ({
  getUpdateProfile: params => dispatch(getSellerProfile(params)),
  updateSellerProfile: params => dispatch(updateSellerProfile(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSellerProfile);
