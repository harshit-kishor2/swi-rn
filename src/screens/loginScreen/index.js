import { View, Text } from 'react-native';
import React from 'react';
import StoryScreen from '../../components/StoryScreen';
import NavigationBar from '../../components/NavigationBar';
import { IMAGES } from '../../resources';

const LoginScreen = (props) => {
  return (
    <StoryScreen>
      <NavigationBar
        leftSource={IMAGES.BACKARROW}
        leftAction={() => {
          props.navigation.navigate('WalkThroughScreen');
        }}

        flexDirection="row"
      />
      <View>
        <Text>Log In Pages</Text>
      </View>
    </StoryScreen>
  );
};

export default LoginScreen;
