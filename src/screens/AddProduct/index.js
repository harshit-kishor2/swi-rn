import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import StoryScreen from '../../components/StoryScreen';
import {COLORS, IMAGES} from '../../resources';
import NavigationBar from '../../components/NavigationBar';
import {styles} from './style';
import VideoimageScreen from './VideoimageScreen';

const SellScreen = () => {
  return (
    <StoryScreen>
      <NavigationBar
        leftSource={IMAGES.BACKARROW}
        leftAction={() => {
          this.props.first.navigation.navigate('WalkThroughScreen');
        }}
        title={'Post Your watch'}
        flexDirection="row"
        txtcolor={COLORS.HEADER_TEXT}
      />
      <VideoimageScreen />
    </StoryScreen>
  );
};

export default SellScreen;
