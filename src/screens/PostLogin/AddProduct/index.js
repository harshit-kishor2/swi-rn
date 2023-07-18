import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {NavigationBar, StoryScreen} from '@app/components';
import {COLORS, IMAGES, SPACING} from '@app/resources';
import {
  productBrandData,
  productBrandLoading,
  productDropdownLoading,
  productModelLoading,
} from '@app/store/addProduct.slice';
import FormDetails from './FormDetails';
import SetPriceScreen from './SetPriceScreen';
import VideoimageScreen from './VideoimageScreen';
import {styles} from './style';

const SellScreen = props => {
  const [formNumber, setFormNumber] = useState('1');
  console.log(props, 'bvdsfkdfkdhsfhsfh');
  // console.log('formNumber', formNumber);
  // const mainNavigation = () => {
  //   if (formNumber === '1') {
  //     props.navigation.navigate('ExploreScreen');
  //     setFormNumber('1');
  //   }
  //   if (formNumber === '2') {
  //     setFormNumber('1');
  //   } else {
  //     setFormNumber('2');
  //   }
  // };
  return (
    <StoryScreen
      NoPadding={true}
      loading={
        props.dropdownLoading || props.brandLoading || props.modelLoading
      }>
      <NavigationBar
        leftSource={IMAGES.BACKARROW}
        leftAction={() => {
          if (formNumber === '3') {
            setFormNumber('2');
          } else if (formNumber === '2') {
            setFormNumber('1');
          } else {
            props.navigation.goBack();
          }
        }}
        title={'Post Your watch'}
        flexDirection="row"
        txtcolor={COLORS.HEADER_TEXT}
        mainStyle={{marginHorizontal: SPACING.SCALE_25}}
      />
      <View style={{marginHorizontal: SPACING.SCALE_25}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.subheading}>
            {formNumber === '1'
              ? 'You are few step away to post your watch'
              : formNumber === '2'
              ? 'You are just a step away'
              : 'You are almost there'}
          </Text>
          <Text style={styles.progressiveNo}>
            {formNumber === '1' ? 1 : formNumber === '2' ? 2 : 3}/3
          </Text>
        </View>
        <View style={styles.progressiveMain}>
          <View style={[styles.progressive]} />
          <View
            style={[
              styles.progressive,
              {opacity: formNumber === '2' || formNumber === '3' ? 1 : 0.25},
            ]}
          />
          <View
            style={[
              styles.progressive,
              {opacity: formNumber === '3' ? 1 : 0.25},
            ]}
          />
        </View>
      </View>
      <View style={{flex: 1}}>
        {formNumber === '1' ? (
          <VideoimageScreen NextPress={() => setFormNumber('2')} />
        ) : formNumber === '2' ? (
          <FormDetails NextPress={() => setFormNumber('3')} />
        ) : (
          <SetPriceScreen />
        )}
      </View>
    </StoryScreen>
  );
};
const mapStateToProps = state => ({
  dropdownLoading: productDropdownLoading(state),
  brandLoading: productBrandLoading(state),
  brandData: productBrandData(state),
  modelLoading: productModelLoading(state),
});

export default connect(mapStateToProps)(SellScreen);
