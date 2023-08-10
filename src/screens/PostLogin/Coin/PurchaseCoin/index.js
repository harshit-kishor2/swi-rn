/* eslint-disable react-native/no-inline-styles */
import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {
  BackHeader,
  Container,
  Custombutton,
  NavigationBar,
  Spacer,
} from '@app/components';
import {IMAGES, SPACING} from '@app/resources';
import {RoutesName} from '@app/helper/strings';
import styles from './styles';
import {connect} from 'react-redux';
import {boostPlans} from '@app/store/exploreProductSlice/boostProduct.action';
import {useEffect} from 'react';
import {showAlert} from '@app/helper/commonFunction';

const PurchaseCoin = props => {
  const {boostPlans, boostProductReducer} = props;
  const [selected, setSelected] = useState();
  const [selectedPladId, setSelectedPlanId] = useState();

  const DATA = [
    {
      week_days: '1 Week',
      number_of_coins: 18,
    },
    {
      week_days: '15 days',
      number_of_coins: 50,
    },
    {
      week_days: '1 Month',
      number_of_coins: 80,
    },
  ];

  useEffect(() => {
    boostPlans();
  }, []);

  console.log(props, 'props===========');
  console.log(props?.route?.params?.product_id, 'props===========');
  const boostProductDetail = {
    pid: props?.route?.params?.product_id,
    planid: selectedPladId,
  };
  return (
    <Container style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{margin: 10, flex: 1}}>
        <BackHeader />
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
            No coins? Buy them to use this feature.
          </Text>
        </View>
        {boostProductReducer?.boostPlansData?.data?.length != 0 ? (
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
            }}
            data={boostProductReducer?.boostPlansData?.data}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    setSelected(index);
                    console.log(index);
                    setSelectedPlanId(item.id);
                    //boostProductDetail.planId = item.id;
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
                          {item.plan_name}{' '}
                        </Text>{' '}
                      </Text>
                      <View style={styles.CardCoinStyle}>
                        <Image source={IMAGES.coin} />
                        <Text style={styles.NumberStyle}>
                          {item.coins_value}
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
            <Text>No Data</Text>
          </View>
        )}
        <Spacer height={40} />
        <View>
          <Custombutton
            title="Purchase Coins"
            //marginTop={10}
            height={50}
            width={'90%'}
            //marginHorizontal={20}
            onPress={() => {
              if (boostProductDetail.planid) {
                props.navigation.navigate(
                  RoutesName.PAY_NOW,
                  boostProductDetail,
                );
              } else {
                showAlert({
                  title: 'Error',
                  message: 'Please select one plan to boost product.',
                });
              }
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
  };
};

const mapDispatchToProps = dispatch => ({
  //boostProduct: params => dispatch(boostProduct(params)),
  boostPlans: params => dispatch(boostPlans(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseCoin);
