import {
  BackHeader,
  Container,
  CustomIcon,
  CustomInput,
  CustomText,
  SubmitButton,
} from '@app/components';
import { ICON_TYPE } from '@app/components/CustomIcon';
import { showAlert } from '@app/helper/commonFunction';
import { LoadingStatus, RoutesName } from '@app/helper/strings';
import NavigationService from '@app/navigations/NavigationService';
import { COLORS, IMAGES } from '@app/resources';
import LoginHeader from '@app/screens/atoms/LoginHeader';
import { changePasswordAction } from '@app/store/authSlice';
import { RateUserAction, purchaseProductListingAction, ratingReviewAction } from '@app/store/ratingReviewSlice';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AirbnbRating, Rating } from 'react-native-ratings';
import { connect } from 'react-redux';
import * as Yup from 'yup';

const RateUser = (props) => {
  // const { updatePassword, authReducer } = props;
  // console.log(props)
  const { getReview, ratingReviewReducer, postData } = props;



  const item = props?.route?.params;
  useEffect(() => {

    getReview({ type: "user", user_id: item?.id, filter: '' })
  }, [])

  const [description, setDescription] = useState('')
  const data = props?.ratingReviewReducer?.ratingReviewAction?.data;
  console.log(item, "props value rate user===============")
  const userid = props?.route?.params?.id;
  // console.log(values);

  const [rating, setRating] = useState(0);

  console.log(userid, "============================..................>>>>>>>>>>>>>>>>>")
  const [validation, setValidation] = useState(false);
  const handleRating = (rating) => {
    // Handle the selected rating here
    setRating(rating);
    setValidation(false)

  };
  console.log(description, "Description========================");
  return (
    <Container useSafeAreaView={true}>
      <ScrollView style={{ margin: 15 }} showsVerticalScrollIndicator={false}>
        <BackHeader />

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <LoginHeader title={'Rate And Review'} />
        </View>


        <View
          style={{
            alignItems: 'center',
            marginTop: 30,

          }}>
          <Image
            source={{ uri: item?.image }}
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
            {item?.name}
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
              ratingCount={5}
              startingValue={data?.average}
              imageSize={16}
              readonly

            />
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'OpenSans-SemiBold',
                color: '#454545',
                marginLeft: 5,
              }}>
              {data?.count} reviews
            </Text>
          </View>
        </View>



        <View
          style={{
            // // alignContent: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            marginHorizontal: 50,
          }}>

          <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 20, color: 'black', marginVertical: 20 }}>Your Response</Text>
          <View style={{ marginBottom: 20 }}>
            <AirbnbRating
              count={5}
              reviews={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']}
              defaultRating={0}

              size={30}
              onFinishRating={handleRating}
            />

            {validation == true ? <View><Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 16, color: 'red' }}>Please enter your review</Text></View> : null}
          </View>

          <View
            style={{
              position: 'relative',
              marginBottom: 20
            }}>
            <CustomText style={{ color: '#000000', fontFamily: 'OpenSans-SemiBold', fontSize: 18 }}>
              Description
            </CustomText>
            <TextInput
              style={{
                backgroundColor: '#fff',
                minWidth: '45%',
                textAlignVertical: 'top',
                paddingBottom: 10,
                paddingHorizontal: 0,
                borderBottomEndRadius: 1,
                paddingBottom: 20,
                height: 150,
                borderColor: COLORS.APPGREEN,
                borderBottomWidth: 0.5,


              }}
              maxLength={500}
              multiline={true}
              numberOfLines={5}
              value={description}

              placeholder="Enter description..."
              onChangeText={(val) => { setDescription(val) }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 5,
                right: 5,
                //   paddingTop:5
              }}>
              <CustomText style={{ color: '#00958C' }}>
                {description.length}/500
              </CustomText>
            </View>
          </View>





          {/* <SubmitButton loading={authReducer.changePasswordLoadingStatus === LoadingStatus.LOADING} disabled={authReducer.changePasswordLoadingStatus === LoadingStatus.LOADING} lable="Change" onPress={handleSubmit} /> */}
          <Pressable style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, height: 50, borderRadius: 20, backgroundColor: 'black' }}
            onPress={() => {
              if (rating == 0 || rating == null) {
                setValidation(true)
              }
              else {
                postData({ user_id: userid, rating: rating, description: description }).then(res => {
                  if (res?.type.includes('fulfilled')) {
                    showAlert({
                      title: 'success',
                      message: res?.payload?.message ?? ' Rate Posted Successfully!',
                    });
                    NavigationService.navigate(RoutesName.PRODUCT_HISTORY);
                  }
                  if (res?.type.includes('rejected')) {
                    // setButtonDisabled(false);
                    showAlert({
                      title: 'Error',
                      message: res?.payload?.message ?? 'Internal server error!',
                    });
                  }
                });
              }
            }}>
            <Text style={{ fontFamily: 'OpenSans-SemiBold', color: 'white', fontSize: 20 }}>Rate Now</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Container>
  );
};


const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
    ratingReviewReducer: state.ratingReviewReducer



  };
};
const mapDispatchToProps = dispatch => ({
  postData: params => dispatch(RateUserAction(params)),
  getReview: params => dispatch(ratingReviewAction(params)),

});

export default connect(mapStateToProps, mapDispatchToProps)(RateUser);

