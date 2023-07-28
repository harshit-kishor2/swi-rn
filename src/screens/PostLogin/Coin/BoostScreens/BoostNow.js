import { View, Text } from 'react-native'
import React from 'react'
import { NavigationBar } from '@app/components';
import { IMAGES } from '@app/resources';

const BoostNow = (props) => {
  return (
    <View style={{margin:10}}>
      <NavigationBar
          leftSource={IMAGES.BACKARROW}
          leftAction={() => {
            // console.log('first');
            props.navigation.navigate('CreateAccountScreen');
          }}
          flexDirection="row"

        />
        
    </View>
  )
}

export default BoostNow