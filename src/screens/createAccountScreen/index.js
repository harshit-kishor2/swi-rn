import {View, Text} from 'react-native';
import React from 'react';
import StoryScreen from '../../components/StoryScreen';
import NavigationBar from '../../components/NavigationBar';
import {IMAGES} from '../../resources';

const CreateAccountScreen = props => {
  return (
    <StoryScreen>
      <NavigationBar
        leftSource={IMAGES.BACKARROW}
        leftAction={() => {
          props.navigation.navigate('WalkthroughScreen');
        }}
      />
      <View>
        <Text>index</Text>
      </View>
    </StoryScreen>
  );
};

export default CreateAccountScreen;
