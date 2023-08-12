/* eslint-disable react-native/no-inline-styles */
import {
  Container,
  CustomIcon,
  CustomInput,
  NavigationBar,
  Spacer,
} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {LoadingStatus} from '@app/helper/strings';
import {COLORS, IMAGES} from '@app/resources';
import ProductCard from '@app/screens/atoms/ProductCard';
import {productInsights} from '@app/store/exploreProductSlice';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {FlatList, ScrollView} from 'react-native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {Dropdown} from 'react-native-element-dropdown';
import {connect} from 'react-redux';

const Insight = props => {
  const {exploreProduct, productInsights} = props;
  // console.log(
  //   exploreProduct.productInsightsInfo,
  //   productInsights,
  //   'Insights data<<=====',
  // );

  console.log(exploreProduct, '^^^^^^^^');
  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);
  const [select, setSelect] = useState('Clicks');

  const chartConfig = {
    // backgroundColor: '#F0F2FA',
    backgroundGradientFrom: '#F0F2FA',
    backgroundGradientTo: '#F0F2FA',
    decimalPlaces: 0,
    color: (opacity = 0) => `rgba(0, 149, 140, ${opacity})`,
    labelColor: (opacity = 0) => `rgba(0, 149, 140, ${opacity})`,
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientFromOffset: 1,
    style: {
      borderRadius: 16,
    },
    bezier: false,
    fromZero: true,
    labelRotation: 30,
  };

  const data = [
    {
      label: 'Last 7 days',
      value: '1',
    },
    {
      label: 'Last 8 days',
      value: '2',
    },
    {
      label: 'Last 9 days',
      value: '3',
    },
    {
      label: 'Last 10 days',
      value: '4',
    },
  ];

  useEffect(() => {
    if (props?.route?.params?.productId) {
      productInsights(props?.route?.params);
    }
  }, []);

  return (
    <Container
      loading={
        exploreProduct?.productInsightsInfoLoadingStatus ===
        LoadingStatus.LOADING
      }>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{margin: 20}}>
          <NavigationBar
            leftSource={IMAGES.BACKARROW}
            leftAction={() => {
              console.log('first');
              props.navigation.goBack();
            }}
            flexDirection="row"
          />

          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Cabin Bold',
              color: COLORS.BLACK,
            }}>
            Insights Overview
          </Text>
          <View
            style={{
              height: 4,
              width: '10%',
              marginTop: 10,
              backgroundColor: '#00958C',
            }}
          />

          <View style={{marginTop: 25, marginLeft: 5}}>
            <Dropdown
              style={style.dropdown}
              selectedTextStyle={style.selectedText}
              placeholderStyle={style.selectedText}
              iconStyle={style.iconStyle}
              labelField={'label'}
              placeholder="Last 7 days"
              data={data}
              value={value}
              valueField={'value'}
              onChange={item => {
                setValue(item.value);
              }}
              renderRightIcon={() => (
                <CustomIcon
                  origin={ICON_TYPE.FEATHER_ICONS}
                  name={'chevron-down'}
                  color={COLORS.BLACK}
                />
              )}
            />
          </View>
          <View style={{marginTop: 10, marginVertical: 5}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'OpenSans Regular',
                color: '#797979',
                marginLeft: 5,
              }}>
              {exploreProduct?.productInsightsInfo?.click?.summary}
            </Text>
          </View>

          <View style={{marginVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={style.impressionClick}>Total Impressions</Text>
              <View>
                <Text style={style.impressionClickText}>
                  {exploreProduct?.productInsightsInfo?.impressions?.total}
                </Text>
                <Text style={style.impressionClickPercent}>
                  {exploreProduct?.productInsightsInfo?.impressions?.upDown}
                  {'%'}
                </Text>
              </View>
            </View>
            <View
              style={{height: 2, backgroundColor: '#D8D8D8', marginTop: 6}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={style.impressionClick}>Number of click</Text>
              <View>
                <Text style={style.impressionClickText}>
                  {exploreProduct?.productInsightsInfo?.click?.total}
                </Text>
                <Text style={style.impressionClickPercent}>
                  {exploreProduct?.productInsightsInfo?.click?.upDown}
                  {'%'}
                </Text>
              </View>
            </View>
            <View
              style={{height: 2, backgroundColor: '#D8D8D8', marginTop: 6}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={style.impressionClick}>Number of chats</Text>
              <View>
                <Text style={style.impressionClickText}>
                  {exploreProduct?.productInsightsInfo?.chat?.total}
                </Text>
                <Text style={style.impressionClickPercent}>
                  {exploreProduct?.productInsightsInfo?.chat?.upDown}
                  {'%'}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 20,
              //backgroundColor: 'red',
              // width: '90%'
            }}>
            <View style={{width: '30%'}}>
              <TouchableOpacity>
                <Text
                  style={[
                    style.OpacityText,
                    select === 'Impressions' && style.OpacityTextHighlighted,
                  ]}
                  onPress={() => setSelect('Impressions')}>
                  Impressions
                </Text>
              </TouchableOpacity>
              {select === 'Impressions' ? (
                <View
                  style={{height: 4, backgroundColor: '#00958C', marginTop: 10}}
                />
              ) : null}
            </View>

            <View style={{width: '30%'}}>
              <TouchableOpacity>
                <Text
                  style={[
                    style.OpacityText,
                    select === 'Clicks' && style.OpacityTextHighlighted,
                  ]}
                  onPress={() => setSelect('Clicks')}>
                  Clicks
                </Text>
              </TouchableOpacity>
              {select === 'Clicks' ? (
                <View
                  style={{height: 4, backgroundColor: '#00958C', marginTop: 10}}
                />
              ) : null}
            </View>

            <View style={{width: '30%'}}>
              <TouchableOpacity>
                <Text
                  style={[
                    style.OpacityText,
                    select === 'Chats' && style.OpacityTextHighlighted,
                  ]}
                  onPress={() => setSelect('Chats')}>
                  Chats
                </Text>
              </TouchableOpacity>
              {select === 'Chats' ? (
                <View
                  style={{height: 4, backgroundColor: '#00958C', marginTop: 10}}
                />
              ) : null}
            </View>
          </View>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <Text
              style={{
                marginBottom: 8,
                fontSize: 15,
                fontFamily: 'OpenSans Regular',
                color: '#7E7E7E',
              }}>
              Number of Clicks{' '}
            </Text>
            <View>
              <Dropdown
                style={{
                  width: 130,
                  height: 16,
                  marginRight: 10,
                }}
                disable={true}
                selectedTextStyle={style.selectedText}
                placeholderStyle={style.selectedText}
                iconStyle={{
                  fontSize: 12,
                  fontFamily: 'OpenSans Regular',
                  color: '#868686',
                }}
                labelField={'label'}
                placeholder="Last 7 days"
                data={data}
                value={value}
                valueField={'value'}
                onChange={item => {
                  setValue1(item.value);
                }}
                renderRightIcon={() => (
                  <CustomIcon
                    origin={ICON_TYPE.FEATHER_ICONS}
                    name={'chevron-down'}
                    color={COLORS.BLACK}
                  />
                )}
              />
            </View>
          </View>

          {select === 'Impressions' && (
            <View>
              <View
                style={{
                  width: 365,
                  height: 196,
                  marginTop: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {exploreProduct?.productInsightsInfo?.impressions?.chart
                  .length !== 0 ? (
                  <BarChart
                    data={{
                      labels:
                        exploreProduct?.productInsightsInfo?.impressions?.chart
                          ?.label ?? [],
                      datasets: [
                        {
                          data:
                            exploreProduct?.productInsightsInfo?.impressions
                              ?.chart?.value ?? [],
                        },
                      ],
                    }}
                    width={359}
                    withInnerLines={false}
                    height={200}
                    chartConfig={chartConfig}
                  />
                ) : (
                  <Text>No record found</Text>
                )}
              </View>
            </View>
          )}
          {select === 'Clicks' ? (
            <View>
              <View
                style={{
                  width: 359,
                  height: 196,
                  marginTop: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {exploreProduct?.productInsightsInfo?.click?.chart.length !==
                0 ? (
                  <BarChart
                    data={{
                      labels:
                        exploreProduct?.productInsightsInfo?.click?.chart
                          ?.label ?? [],
                      datasets: [
                        {
                          data:
                            exploreProduct?.productInsightsInfo?.click?.chart
                              ?.value ?? [],
                        },
                      ],
                    }}
                    width={359}
                    // withInnerLines={false}
                    height={200}
                    chartConfig={chartConfig}
                  />
                ) : (
                  <Text>No record found</Text>
                )}
              </View>
            </View>
          ) : null}
          {select === 'Chats' ? (
            <View>
              <View
                style={{
                  width: 359,
                  height: 196,
                  marginTop: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {exploreProduct?.productInsightsInfo?.chat?.chart.length !==
                0 ? (
                  <BarChart
                    data={{
                      labels:
                        exploreProduct?.productInsightsInfo?.chat?.chart
                          ?.label ?? [],
                      datasets: [
                        {
                          data:
                            exploreProduct?.productInsightsInfo?.chat?.chart
                              ?.value ?? [],
                        },
                      ],
                    }}
                    width={359}
                    withInnerLines={false}
                    height={200}
                    chartConfig={chartConfig}
                  />
                ) : (
                  <Text>No record found</Text>
                )}
              </View>
            </View>
          ) : null}

          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Cabin Bold',
                fontWeight: 'bold',
                color: COLORS.BLACK,
              }}>
              Products boosted by you
            </Text>
          </View>
          <View>
            {/* Boosted Product Component Call by saket */}
            <Spacer height={15} />
            <FlatList
              data={exploreProduct?.productInsightsInfo?.boosted_products}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({index, item}) => {
                return (
                  <ProductCard
                    toShowUserDetail={false}
                    item={item}
                    key={index}
                  />
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    exploreProduct: state?.exploreProductReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  productInsights: params => dispatch(productInsights(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Insight);

const style = StyleSheet.create({
  dropdown: {
    borderColor: '#BFBFBF',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    width: 345,
  },
  selectedText: {
    fontSize: 16,
    color: COLORS.BLACK,
  },
  iconStyle: {
    color: COLORS.BLACK,
  },
  impressionClick: {
    fontSize: 15,
    fontFamily: 'OpenSans Bold',
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  impressionClickText: {
    fontSize: 14,
    fontFamily: 'OpenSans Bold',
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  impressionClickPercent: {
    fontSize: 12,
    fontFamily: 'OpenSans Bold',
    fontWeight: 'bold',
    color: '#7DAF07',
    marginLeft: 7,
    marginTop: 3,
  },
  OpacityText: {
    fontSize: 15,
    fontFamily: 'OpenSans-Regular',
    color: '#868686',
    alignSelf: 'center',
  },
  OpacityTextHighlighted: {
    fontSize: 15,
    fontFamily: 'OpenSans-Bold',
    color: '#00958C',
    alignSelf: 'center',
  },
});
