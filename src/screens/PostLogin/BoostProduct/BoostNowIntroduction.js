import { View, Text, Image, ImageBackground, Pressable, Alert } from 'react-native'
import React from 'react'
import { Custombutton, NavigationBar } from '@app/components'
import { COLORS, IMAGES, SPACING } from '@app/resources'
import styles from './styles'

const BoostNowIntroduction = () => {
  return (
    <View style={styles.MainContainer}>
      <View style={styles.NavigationContainer}>

        <NavigationBar
          leftSource={IMAGES.BACKARROW}
          leftAction={() => {
            console.log('first');
            props.navigation.navigate('CreateAccountScreen');
          }}
          flexDirection="row"
        />
      </View>


      <View style={styles.CoinContainer}>

        <ImageBackground source={IMAGES.BoostNowShade1} style={styles.ImageBackgroudContainer}>
          <Image style={{ top: SPACING.SCALE__30 }} source={IMAGES.CoinBoostNow} />
        </ImageBackground>

      </View>

      <View style={{ justifyContent: 'center', alignSelf: 'center', width: SPACING.SCALE_300, margin: 30 }}>
        <Text style={styles.BoostTextStyle}>Sell your watch faster
          Boost it now</Text>
      </View>
      <View style={styles.contentMainStyle}>
        <View style={styles.GroupContainerStyle}>
          <View style={styles.GroupStyle}>
            <Image source={IMAGES.GroupIcon} />
          </View>
          <View style={styles.ContentTextStyle}>
            <Text style={styles.HedaerStyle}>Get 3X customers</Text>
            <Text style={styles.ContentStyle}>If you want to make any changes to your post you can do that from your posted ads section.</Text>
          </View>
        </View>
        <View style={styles.GroupContainerStyle}>
          <View style={styles.GroupStyle}>
            <Image source={IMAGES.GroupIcon} />
          </View>
          <View style={styles.ContentTextStyle}>
            <Text style={styles.HedaerStyle}>Sell your watch faster </Text>
            <Text style={styles.ContentStyle}>If you want to make any changes to your post you can do that from your posted ads section.</Text>
          </View>
        </View>
      </View>
      <View style={styles.contentMainStyle}>
        <Custombutton
          title={'Get Started'}
          width={'80%'}
          fontSize={SPACING.SCALE_20}
          onPress={() => {
            Alert.alert("Getting Started")
          }}
        />
        <Pressable style={styles.pressableStyle} onPress={() => Alert.alert("Dab gya")}>
          <Text style={styles.hyperlinkStyle}>Not now, I’ll do it later</Text>
        </Pressable>
      </View>

    </View>
  )
}

export default BoostNowIntroduction