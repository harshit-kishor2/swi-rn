/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {Container, Custombutton, NavigationBar} from '@app/components';
import {IMAGES, SPACING} from '@app/resources';
import styles from './styles';
import {RoutesName} from '@app/helper/strings';
import {ScrollView} from 'react-native-gesture-handler';
import {connect, useSelector} from 'react-redux';
import {
  boostPlans,
  boostProduct,
} from '@app/store/exploreProductSlice/boostProduct.action';
import {useEffect} from 'react';
import {userProfile} from '@app/store/authSlice';
import {showAlert} from '@app/helper/commonFunction';

const BoostNow = props => {
  const [selected, setSelected] = useState();
  const [selectedPlan, setSelectedPlan] = useState();

  const {boostProduct, boostProductReducer, boostPlans, authReducer} = props;

  console.log(
    boostProduct,
    boostProductReducer.boostPlansData,
    authReducer?.userProfileDetails?.coins,
    'ProductId',
  );
  const params = {
    pid: props?.route?.params?.product_id,
    planid: selectedPlan,
  };

  useEffect(() => {
    console.log('runs=======>');
    boostPlans();
  }, []);
  return (
    <Container style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView showsVerticalScrollIndicator={false} style={{margin: 20}}>
        <NavigationBar
          leftSource={IMAGES.BACKARROW}
          leftAction={() => {
            // console.log('first');
            props?.navigation?.goBack();
          }}
          flexDirection="row"
        />
        <View style={styles.CoinContainer}>
          <ImageBackground
            source={IMAGES.sandWatch}
            style={styles.ImageBackgroudContainer}>
            <Image
              style={{top: SPACING.SCALE__35, marginLeft: 30}}
              source={IMAGES.CoinBoostNow}
            />
          </ImageBackground>
        </View>

        <View style={styles.TextContainer}>
          <Text style={styles.TopText}>
            You can select a time frame to increase the visibility of your post.
          </Text>
        </View>

        <View style={{alignItems: 'center', marginBottom: 20}}>
          <Text style={styles.TextStyle1}>
            You have {<Image source={IMAGES.coin} />}{' '}
            {authReducer?.userProfileDetails?.coins} coins with you now
          </Text>
        </View>
        {boostProductReducer?.boostPlansData?.data?.length !== 0 ? (
          <FlatList
            data={boostProductReducer?.boostPlansData?.data}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelected(index);
                    //setCoins(item?.number_of_coins);
                    setSelectedPlan(item.id);
                    params.planid = item.id;
                    console.log(item?.id, '======');
                  }}>
                  <View
                    style={[
                      styles.cardStyle,
                      index === selected && styles.highlightedLine,
                    ]}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <Text style={styles.outerText}>
                        {' '}
                        for{' '}
                        <Text style={styles.innerText}>
                          {' '}
                          {item?.plan_name}{' '}
                        </Text>{' '}
                      </Text>
                      <View style={styles.CardCoinStyle}>
                        <Image source={IMAGES.coin} />
                        <Text style={styles.NumberStyle}>
                          {item?.coins_value}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <View>
            <ActivityIndicator size={40} />
          </View>
        )}

        <View>
          <Custombutton
            title="Boost Now"
            marginTop={10}
            height={50}
            width={'100%'}
            marginHorizontal={20}
            onPress={() => {
              if (selectedPlan) {
                boostProduct(params).then(result => {
                  if (
                    result?.payload?.message ===
                    'Your product has been successfully boosted.'
                  ) {
                    props?.navigation?.navigate(
                      RoutesName.BOOST_PRODUCT_SUCCESS,
                    );
                  }
                });
              } else {
                showAlert({
                  title: 'Alert',
                  message: 'Please select one plan.',
                });
              }

              // if (props?.route?.params?.product_id) {
              //   props.navigation.navigate(RoutesName.BOOST_PRODUCT_SUCCESS);
              // }
            }}
          />
        </View>

        <TouchableOpacity style={{alignSelf: 'center', marginTop: 30}}>
          <Text
            style={{
              fontSize: 14,
              color: '#00958C',
              fontFamily: 'OpenSans-Regular',
              textDecorationLine: 'underline',
            }}
            onPress={() => {
              // Alert.alert('in process');
            }}>
            Not now, I'll do it later
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    boostProductReducer: state?.boostProductReducer,
    authReducer: state?.authReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  boostProduct: params => dispatch(boostProduct(params)),
  boostPlans: params => dispatch(boostPlans(params)),

  userProfile: params => dispatch(userProfile(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoostNow);
