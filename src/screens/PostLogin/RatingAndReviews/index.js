import {
  BackHeader,
  Container,
  CustomIcon,
  NavigationBar,
} from '@app/components';
import { ICON_TYPE } from '@app/components/CustomIcon';
import { COLORS, IMAGES } from '@app/resources';
import { margin } from '@app/resources/mixins';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import styles from '../ItemComparison/styles';
import { connect } from 'react-redux';
import { ratingReviewAction } from '@app/store/ratingReviewSlice';
import { RenderItem } from './RenderList';

const RatingAndReviews = props => {


  const { route, navigation, ratingReviewReducer, getRatingReview } = props;
  console.log('UserID@#$%^&*(*&^%$', props?.ratingReviewReducer?.ratingReviewAction?.data);

  //Data
  const item = props?.ratingReviewReducer?.ratingReviewAction?.data;
  const average = item?.average;
  const count = item?.count;
  const userPic = item?.rated_user?.image;
  const userName = item?.rated_user?.name;
  const ratingList = item?.list;

  console.log("ratinglist===========", ratingList)


  const ratingCount = 5;
  const [selected, setSelected] = useState('seller');
  const handlePress = button => {
    setSelected(button);
    console.log(selected);
  };
  const handleBuyerPress = button => {
    setSelected(button);
  };

  useEffect(() => {
    if (props?.authReducer?.userProfileDetails?.additional_info?.user_id) {
      getRatingReview({ type: "user", user_id: props?.authReducer?.userProfileDetails?.additional_info?.user_id })
    }
  }, [])

  return (
    <Container useSafeAreaView={true}>
      <View style={{ margin: 20, flex: 1 }}>
        <BackHeader />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            onPress={() => {
              handlePress('seller');
            }}>
            <Text style={[style.btnText, selected === "seller" && {
              fontSize: 17,
              fontFamily: 'OpenSans-SemiBold',
              color: "#00958C"
            }]}>As a Seller</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleBuyerPress('buyer');
            }}>
            <Text style={[style.btnText, selected === "buyer" && {
              fontSize: 17,
              fontFamily: 'OpenSans-SemiBold',
              color: '#00958C',
            }]}>As a Buyer</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <View
            style={[
              style.lineStyle,
              selected === 'seller' && {
                height: 4,
                width: '50%',
                backgroundColor: '#00958C',
              },
            ]}
          />
          <View
            style={[
              style.lineStyle,
              selected === 'buyer' && {
                height: 4,
                width: '50%',
                backgroundColor: '#00958C',
              },
            ]}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: 30,

          }}>
          <Image
            source={{ uri: userPic }}
            style={{
              width: 90,
              height: 90,
              borderRadius: 45,
            }}
          />
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'OpenSans-Bold',
              color: '#000000',
              marginTop: 10,
            }}>
            {userName}
          </Text>



          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 15,
            }}>
            <Rating
              type="star"
              ratingCount={ratingCount}
              startingValue={average}
              imageSize={16}
              readonly

            />
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'OpenSans-SemiRegular',
                color: '#454545',
                marginLeft: 5,
              }}>
              {item?.count} reviews
            </Text>
          </View>
        </View>

        {selected === 'seller' && (
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>


            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Cabin Regular',
                color: '#090909',
                marginTop: 15,
              }}>
              Overall Rating
            </Text>
            <View
              style={{
                flexDirection: 'row',
                // backgroundColor: 'red'
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 55,
                    marginTop: 15,
                    // marginLeft: 5,
                    color: COLORS.BLACK,
                  }}>
                  {average}
                  <Text
                    style={{
                      fontSize: 37,
                      marginTop: 15,

                      color: COLORS.BLACK,
                    }}>
                    /{ratingCount}{' '}
                  </Text>
                </Text>
              </View>
              <View style={{ marginTop: 30 }}>
                <Rating
                  type="star"
                  ratingCount={ratingCount}
                  startingValue={average}
                  imageSize={16}
                  readonly
                  style={{
                    // marginLeft: 20,
                  }}
                />
                <Text
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 20,
                    marginTop: 5,
                  }}>
                  Base on {item?.count} reviews
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Cabin Regular',
                  color: '#090909',
                }}>
                Reviews
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <CustomIcon
                  origin={ICON_TYPE.ANT_ICON}
                  name={'filter'}
                  size={16}
                  color={'#00958C'}
                  style={{
                    marginTop: 3,
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'OpenSans',
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: '#00958C',
                    marginLeft: 5,
                    marginRight: 10,
                  }}>
                  Filter
                </Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                  data={ratingList}
                  renderItem={RenderItem}
                />

              </ScrollView>
            </View>
          </ScrollView>
        )}

        {selected === 'buyer' && (
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>


            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Cabin Regular',
                color: '#090909',
                marginTop: 15,
              }}>
              Overall Rating
            </Text>
            <View
              style={{
                flexDirection: 'row',
                // backgroundColor: 'red'
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 55,
                    marginTop: 15,
                    // marginLeft: 5,
                    color: COLORS.BLACK,
                  }}>
                  {average}
                  <Text
                    style={{
                      fontSize: 37,
                      marginTop: 15,

                      color: COLORS.BLACK,
                    }}>
                    /{ratingCount}{' '}
                  </Text>
                </Text>
              </View>
              <View style={{ marginTop: 30 }}>
                <Rating
                  type="star"
                  ratingCount={ratingCount}
                  startingValue={average}
                  imageSize={16}
                  readonly
                  style={{
                    // marginLeft: 20,
                  }}
                />
                <Text
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 20,
                    marginTop: 5,
                  }}>
                  Base on {item?.count} reviews
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Cabin Regular',
                  color: '#090909',
                }}>
                Reviews
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <CustomIcon
                  origin={ICON_TYPE.ANT_ICON}
                  name={'filter'}
                  size={16}
                  color={'#00958C'}
                  style={{
                    marginTop: 3,
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'OpenSans',
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: '#00958C',
                    marginLeft: 5,
                    marginRight: 10,
                  }}>
                  Filter
                </Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                  data={ratingList}
                  renderItem={RenderItem}
                />

              </ScrollView>
            </View>
          </ScrollView>
        )}
        <View
          style={{
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Cabin',
                color: '#00958C',
                marginTop: 5,
              }}>
              See all reviews
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};


const style = StyleSheet.create({
  btnText: {
    fontSize: 17,
    fontFamily: 'OpenSans-Regular',
    color: '#868686',
  },
  lineStyle: {
    height: 4,
    width: '50%',
    backgroundColor: '#E7E7E7',
  },
  lineStyleHighlite: {
    height: 4,
    width: '50%',
    backgroundColor: '#00958C',
  },
});

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
    ratingReviewReducer: state.ratingReviewReducer,
  };
};
const mapDispatchToProps = dispatch => ({
  getRatingReview: params => dispatch(ratingReviewAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RatingAndReviews);
