import {
  Container,
  CustomIcon,
  CustomInput,
  NavigationBar,
} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {COLORS, IMAGES} from '@app/resources';
import ProductCard from '@app/screens/atoms/ProductCard';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {Dropdown} from 'react-native-element-dropdown';

export const Insight = () => {
  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);
  const [select, setSelect] = useState('Clicks');

  const graphData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        data: [1, 2, 3, 5],
      },
    ],
  };

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

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{margin: 15}}>
          <NavigationBar
            leftSource={IMAGES.BACKARROW}
            leftAction={() => {
              console.log('first');
              props.navigation.navigate('CreateAccountScreen');
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
              You reached +6.9% more clicks in the last 7 days as compared to
              May 30- June 5
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
                <Text style={style.impressionClickText}>14.2 K</Text>
                <Text style={style.impressionClickPercent}>+6.1 %</Text>
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
                <Text style={style.impressionClickText}>10.9 K</Text>
                <Text style={style.impressionClickPercent}>+3.9 %</Text>
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
                <Text style={style.impressionClickText}>1.1 K</Text>
                <Text style={style.impressionClickPercent}>+2.7%</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 20,
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
            }}></View>

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
              <View style={{width: 359, height: 196, marginTop: 20}}>
                <BarChart
                  data={graphData}
                  width={359}
                  withInnerLines={false}
                  height={200}
                  chartConfig={chartConfig}
                />
              </View>
            </View>
          )}
          {select === 'Clicks' ? (
            <View>
              <View style={{width: 359, height: 196, marginTop: 20}}>
                <BarChart
                  data={graphData}
                  width={359}
                  withInnerLines={false}
                  height={200}
                  chartConfig={chartConfig}
                />
              </View>
            </View>
          ) : null}
          {select === 'Chats' ? (
            <View>
              <View style={{width: 359, height: 196, marginTop: 20}}>
                <BarChart
                  data={graphData}
                  width={359}
                  withInnerLines={false}
                  height={200}
                  chartConfig={chartConfig}
                />
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
            <ProductCard />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

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
