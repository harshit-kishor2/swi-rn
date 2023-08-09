/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Container, Custombutton, NavigationBar} from '@app/components';
import {IMAGES, SPACING} from '@app/resources';
import styles from './styles';
import {RoutesName} from '@app/helper/strings';
import {ScrollView} from 'react-native-gesture-handler';
import {connect, useSelector} from 'react-redux';
import {boostProduct} from '@app/store/exploreProductSlice/boostProduct.action';

// const Item = ({
//     week_days,
//     number_of_coins,
//     index,
//     setSelected,
//     selected,

//   }) => {

//   };
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

const BoostNow = props => {
  const [selected, setSelected] = useState();
  const [coins, setCoins] = useState(null);

  const {boostProduct, boostProductReducer} = props;

  // const renderItem = ({ item, index, setSelected,selected}) => (
  //     <Item
  //       week_days={item.week_days}
  //     number_of_coins={item.number_of_coins}
  //       index={index}
  //       setSelected={setSelected}
  //       selected={selected}
  //     />
  //   );

  console.log(boostProduct, boostProductReducer, 'ProductId');
  const params = {
    pid: props?.route?.params?.product_id,
    planid: 100,
  };
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
            You have {<Image source={IMAGES.coin} />} 50 coins with you now
          </Text>
        </View>

        <FlatList
          data={DATA}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelected(index);
                  setCoins(item?.number_of_coins);
                  params.planid = item.number_of_coins;
                  console.log(item, coins, '======');
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
                        {item.week_days}{' '}
                      </Text>{' '}
                    </Text>
                    <View style={styles.CardCoinStyle}>
                      <Image source={IMAGES.coin} />
                      <Text style={styles.NumberStyle}>
                        {item.number_of_coins}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <View>
          <Custombutton
            title="Boost Now"
            marginTop={10}
            height={50}
            width={'100%'}
            marginHorizontal={20}
            onPress={() => {
              if (params.pid && params.planid) {
                console.log('fghjkl;');
                boostProduct(params);
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
  };
};

const mapDispatchToProps = dispatch => ({
  boostProduct: params => dispatch(boostProduct(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoostNow);
