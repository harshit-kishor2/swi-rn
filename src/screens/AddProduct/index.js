import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import StoryScreen from '../../components/StoryScreen';
import {COLORS, IMAGES, SPACING} from '../../resources';
import NavigationBar from '../../components/NavigationBar';
import {styles} from './style';
import VideoimageScreen from './VideoimageScreen';
import FormDetails from './FormDetails';
import SetPriceScreen from './SetPriceScreen';
import {useDispatch, connect} from 'react-redux';
import {
  productBrandData,
  productBrandLoading,
  productDropdownLoading,
  productModelLoading,
} from '../../redux/addProduct.slice';

const SellScreen = props => {
  const [formNumber, setFormNumber] = useState('1');
  return (
    <StoryScreen
      NoPadding={true}
      loading={
        props.dropdownLoading || props.brandLoading || props.modelLoading
      }>
      <NavigationBar
        leftSource={IMAGES.BACKARROW}
        leftAction={() => {
          props.navigation.navigate('ExploreScreen');
        }}
        title={'Post Your watch'}
        flexDirection="row"
        txtcolor={COLORS.HEADER_TEXT}
        mainStyle={{marginHorizontal: SPACING.SCALE_25}}
      />
      <View style={{marginHorizontal: SPACING.SCALE_25}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.subheading}>
            {formNumber == 1
              ? 'You are few step away to post your watch'
              : formNumber == 2
              ? 'You are just a step away'
              : 'You are almost there'}
          </Text>
          <Text style={styles.progressiveNo}>
            {formNumber == 1 ? 1 : formNumber == 2 ? 2 : 3}/3
          </Text>
        </View>
        <View style={styles.progressiveMain}>
          <View style={[styles.progressive]} />
          <View
            style={[
              styles.progressive,
              {opacity: formNumber == 2 || formNumber == 3 ? 1 : 0.25},
            ]}
          />
          <View
            style={[styles.progressive, {opacity: formNumber == 3 ? 1 : 0.25}]}
          />
        </View>
      </View>
      <View style={{flex: 1}}>
        {formNumber == 1 ? (
          <VideoimageScreen NextPress={() => setFormNumber('2')} />
        ) : formNumber == 2 ? (
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
