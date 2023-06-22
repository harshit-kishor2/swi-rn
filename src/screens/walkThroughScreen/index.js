

import { View, Text, Button, StyleSheet, Pressable, Dimensions, StatusBar, SafeAreaView, ScrollView, Image, PixelRatio, Alert } from 'react-native';
import React, { useState } from 'react';
import { IMAGES, SPACING, TYPOGRAPHY } from '../../resources';
import { margin } from '../../resources/mixins';
import StoryScreen from '../../components/StoryScreen';
import NavigationBar from '../../components/NavigationBar';
const WalkThroughScreen = (props) => {
  const { width, height } = Dimensions.get('window');

  const [page, setPage] = useState(0);

  const skipFunction = () => {
    props.navigation.navigate("LoginScreen")

  }

  return (

    <>
      <StatusBar barStyle="light-content" />
      <StoryScreen>

        <View style={{  flexDirection :'row', marginTop:15}}>

        {(page === 1 || page === 2) &&

        <NavigationBar

          leftSource={IMAGES.BACKARROW}
          leftAction={() => {
            setPage(page - 1)
          }}
        />
        }

        {(page === 0 || page === 1) &&
          <View style={{ marginLeft: SPACING.SCALE_290 }}>
            <Pressable onPress={() => { skipFunction() }}>
              <Text style={styles.textStyle1} >Skip</Text>
            </Pressable>

          </View>}
        </View>
        <ScrollView
          style={{ flex: SPACING.SCALE_1 }}
          horizontal={true}
          scrollEventThrottle={SPACING.SCALE_16}
          pagingEnabled={true}
        >

          {page === 0 && <View style={{ width, height }}>

            <View style={styles.wrapper}>
              <Text style={styles.header}>Luxury Watches</Text>
              <Text style={styles.paragraph}>Erat neque facilisi pharetra et habitant posuere. Id tortor nisl eu scelerisque tempor orci sit. Egestas mus sapien duis vel nec pellentesque sit et convallis </Text>
            </View>
            <View style={styles.imageSizeStyle}>
              <Image source={IMAGES.Rectangle1} style={styles.imageStyle} />
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', marginLeft: SPACING.SCALE_160, marginTop: SPACING.SCALE_20 }}>
              <View style={{ height: SPACING.SCALE_6, width: SPACING.SCALE_6, borderRadius: SPACING.SCALE_3, backgroundColor: '#00958C' }}></View>
              <View style={{ height: SPACING.SCALE_6, width: SPACING.SCALE_6, borderRadius: SPACING.SCALE_3, marginLeft: SPACING.SCALE_5, backgroundColor: '#D9D9D9' }}></View>
              <View style={{ height: SPACING.SCALE_6, width: SPACING.SCALE_6, borderRadius: SPACING.SCALE_3, marginLeft: SPACING.SCALE_5, backgroundColor: '#D9D9D9' }}></View>
            </View>
            <Pressable onPress={() => {
              setPage(1);
            }}>
              <View style={styles.submitStyle}>
                <Text style={styles.bg_button}>Next</Text>
              </View>
            </Pressable>

          </View>}
          {page === 1 && <View style={{ width, height }}>

            <View style={styles.imageSizeStyle}>
              <Image source={IMAGES.Rectangle2} style={styles.imageStyle} />
            </View>
            <View style={styles.wrapper}>
              <Text style={styles.header}>Buy and Sell</Text>
              <Text style={styles.paragraph}>Erat neque facilisi pharetra et habitant posuere. Id tortor nisl eu sceler isque tempor orci sit. </Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', marginLeft: SPACING.SCALE_160, marginTop: SPACING.SCALE_20 }}>
              <View style={{ height: SPACING.SCALE_6, width: SPACING.SCALE_6, borderRadius: SPACING.SCALE_3, backgroundColor: '#D9D9D9' }}></View>
              <View style={{ height: SPACING.SCALE_6, width: SPACING.SCALE_6, borderRadius: SPACING.SCALE_3, marginLeft: SPACING.SCALE_5, backgroundColor: '#00958C' }}></View>
              <View style={{ height: SPACING.SCALE_6, width: SPACING.SCALE_6, borderRadius: SPACING.SCALE_3, marginLeft: SPACING.SCALE_5, backgroundColor: '#D9D9D9' }}></View>
            </View>
            <Pressable onPress={() => {
              setPage(2);
            }}>
              <View style={styles.submitStyle}>
                <Text style={styles.bg_button}>Next</Text>
              </View>
            </Pressable>
          </View>}
          {page === 2 && <View style={{ width, height }}>
            <View style={styles.wrapper}>
              <Text style={styles.header}>Features</Text>
              <Text style={styles.paragraph}>Lorem ipsum dolor sit amet consectetur amet</Text>
            </View>
            <View>
              <View style={styles.outer}>
                <View style={styles.imageSizeStyle}>
                  <Image
                    source={IMAGES.Rectangle31}
                    style={styles.imageStyle1}
                  />
                </View>
                <Text style={styles.paragraph1}>Lorem ipsum dolor sit amet consectetur. Erat neque facilisi pharetra et</Text>
              </View>
              <View style={styles.outer}>
                <View style={styles.imageSizeStyle}>
                  <Image
                    source={IMAGES.Rectangle32}
                    style={styles.imageStyle1}
                  />
                </View>
                <Text style={styles.paragraph1}>Lorem ipsum dolor sit amet consectetur. Erat neque facilisi pharetra et</Text>
              </View>
              <View style={styles.outer}>
                <View style={styles.imageSizeStyle}>
                  <Image
                    source={IMAGES.Rectangle33}
                    style={styles.imageStyle1}
                  />
                </View>
                <Text style={styles.paragraph1}>Lorem ipsum dolor sit amet consectetur. Erat neque facilisi pharetra et</Text>
              </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', marginLeft: SPACING.SCALE_160 , marginTop: SPACING.SCALE_20}}>
              <View style={{ height: SPACING.SCALE_6, width: SPACING.SCALE_6, borderRadius: SPACING.SCALE_3, backgroundColor: '#D9D9D9' }}></View>
              <View style={{ height: SPACING.SCALE_6, width: SPACING.SCALE_6, borderRadius: SPACING.SCALE_3, marginLeft: SPACING.SCALE_5, backgroundColor: '#D9D9D9' }}></View>
              <View style={{ height: SPACING.SCALE_6, width: SPACING.SCALE_6, borderRadius: SPACING.SCALE_3, marginLeft: SPACING.SCALE_5, backgroundColor: '#00958C' }}></View>
            </View>

            <Pressable onPress={() => { skipFunction() }}>
              <View style={styles.submitStyle}>
                <Text style={styles.bg_button}>Get Started</Text>
              </View>
            </Pressable>

          </View>}

        </ScrollView>
        {/* </SafeAreaView> */}
      </StoryScreen>
    </>
  );
};

export default WalkThroughScreen;

const styles = StyleSheet.create({
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(120),
    width: '90%',
    borderRadius: SPACING.SCALE_10,
    

  },
  imageStyle1: {
    height: 110,
    width: 110,
    borderRadius: SPACING.SCALE_10,


  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -45

  },
  header: {
    fontSize: 35,
    //fontWeight: '700',
    marginTop: 15,
    marginBottom: 20,
    fontFamily: 'Cabin-Bold',
    color: 'black',

  },
  paragraph: {
    fontSize: 16,
    fontFamily: 'Open Sans',
    color: 'black',
    textAlign: 'center',
    width: 288
  },
  imageSizeStyle:
  {
    marginTop: 30,
    marginBottom: SPACING.SCALE_10,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 30
  },
  submitStyle: {
    height: 50,
    width: 239,
    backgroundColor: '#000000',
    color: 'white',
    marginLeft: 60,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SPACING.SCALE_10,
  },
  bg_button: {
    color: 'white',
    // font: 'Cabin'
    fontSize: 24
  },
  headerStyle: {
    display: 'flex',
    flexDirection: 'row'

  },
  textStyle1: {
    fontWeight: 'bold',
    color: '#00958C',
    fontSize: 15,
    fontFamily:'Open Sans'
    

  },
  outer: {
    display: 'flex',
    flexDirection: 'row'
  },
  paragraph1: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: 'black',
    textAlign: 'center',
    width: 145,
    marginTop: 25
  },
});
