import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  PixelRatio,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, IMAGES, SPACING, TYPOGRAPHY} from '../../resources';
import {margin} from '../../resources/mixins';
import StoryScreen from '../../components/StoryScreen';
import NavigationBar from '../../components/NavigationBar';
import SetPriceScreen from '../AddProduct/SetPriceScreen';
const WalkThroughScreen = props => {
  const {width, height} = Dimensions.get('screen');

  const [page, setPage] = useState(0);

  const skipFunction = (props) => {
    props.navigation.navigate('LoginOptions');
    // console.log("=>>",props)
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      {/* <StoryScreen> */}
      <View
        style={{flexDirection: 'row', marginTop: 15, paddingHorizontal: 20}}>
        {(page === 1 || page === 2) && (
          <NavigationBar
            leftSource={IMAGES.BACKARROW}
            leftAction={() => {
              setPage(page - 1);
            }}
          />
        )}

        {(page === 0 || page === 1) && (
          <View style={{marginLeft: SPACING.SCALE_290}}>
            <Pressable
              onPress={() => {
                skipFunction(props);
              }}>
              <Text style={styles.textStyle1}>Skip</Text>
            </Pressable>
          </View>
        )}
      </View>
      <SafeAreaView style={{flex: 1}}>
        {/* <ScrollView
          style={{flex: SPACING.SCALE_1}}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          scrollEventThrottle={0}
          pagingEnabled={true}
          
          > */}
        {page === 0 && (
          <View style={{width, height}}>
            <View style={styles.wrapper}>
              <Text style={styles.header}>Luxury Watches</Text>
              <Text style={styles.paragraph}>
                Erat neque facilisi pharetra et habitant posuere. Id tortor nisl
                eu scelerisque tempor orci sit. Egestas mus sapien duis vel nec
                pellentesque sit et convallis{' '}
              </Text>
            </View>
            <View style={styles.imageSizeStyle}>
              <Image source={IMAGES.Rectangle1} style={styles.imageStyle} />
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
               alignSelf:'center',
               justifyContent:'center',
               marginTop:SPACING.SCALE_20
              }}>
              <View
                style={{
                  height: SPACING.SCALE_6,
                  width: SPACING.SCALE_6,
                  borderRadius: SPACING.SCALE_3,
                  backgroundColor: '#00958C',
                }}></View>
              <View
                style={{
                  height: SPACING.SCALE_6,
                  width: SPACING.SCALE_6,
                  borderRadius: SPACING.SCALE_3,
                  marginLeft: SPACING.SCALE_5,
                  backgroundColor: '#D9D9D9',
                }}></View>
              <View
                style={{
                  height: SPACING.SCALE_6,
                  width: SPACING.SCALE_6,
                  borderRadius: SPACING.SCALE_3,
                  marginLeft: SPACING.SCALE_5,
                  backgroundColor: '#D9D9D9',
                }}></View>
            </View>
            <Pressable
              onPress={() => {
                setPage(1);
              }}>
              <View style={styles.submitStyle}>
                <Text style={styles.bg_button}>Next</Text>
              </View>
            </Pressable>
           
          </View>
        )}
        {page === 1 && (
          <View style={{width, height}}>
            <View style={styles.imageSizeStyle}>
              <Image source={IMAGES.Rectangle2} style={styles.imageStyle} />
            </View>
            <View style={styles.wrapper}>
              <Text style={styles.header}>Buy and Sell</Text>
              <Text style={styles.paragraph}>
                Erat neque facilisi pharetra et habitant posuere. Id tortor nisl
                eu sceler isque tempor orci sit.{' '}
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
               alignSelf:'center',
               justifyContent:'center',
               marginTop:SPACING.SCALE_20
              }}>
              <View
                style={{
                  height: SPACING.SCALE_6,
                  width: SPACING.SCALE_6,
                  borderRadius: SPACING.SCALE_3,
                  backgroundColor: '#D9D9D9',
                }}></View>
              <View
                style={{
                  height: SPACING.SCALE_6,
                  width: SPACING.SCALE_6,
                  borderRadius: SPACING.SCALE_3,
                  marginLeft: SPACING.SCALE_5,
                  backgroundColor: '#00958C',
                }}></View>
              <View
                style={{
                  height: SPACING.SCALE_6,
                  width: SPACING.SCALE_6,
                  borderRadius: SPACING.SCALE_3,
                  marginLeft: SPACING.SCALE_5,
                  backgroundColor: '#D9D9D9',
                }}></View>
            </View>
            <Pressable
              onPress={() => {
                setPage(2);
              }}>
              <View style={styles.submitStyle}>
                <Text style={styles.bg_button}>Next</Text>
              </View>
            </Pressable>
            
          </View>
        )}
        {page === 2 && (
          <View style={{width, height}}>
            <View style={styles.wrapper}>
              <Text style={styles.header}>Features</Text>
              <Text style={styles.paragraph}>
                Lorem ipsum dolor sit amet consectetur amet
              </Text>
            </View>
            <View style={{}}>
              <View style={styles.outer}>
                <Image source={IMAGES.Rectangle31} style={styles.imageStyle1} />

                <Text style={styles.paragraph1}>
                  Lorem ipsum dolor sit amet consectetur. Erat neque facilisi
                  pharetra et
                </Text>
              </View>
              <View style={styles.outer}>
                <Image source={IMAGES.Rectangle32} style={styles.imageStyle1} />

                <Text style={styles.paragraph1}>
                  Lorem ipsum dolor sit amet consectetur. Erat neque facilisi
                  pharetra et
                </Text>
              </View>
              <View style={styles.outer}>
                <Image source={IMAGES.Rectangle33} style={styles.imageStyle1} />

                <Text style={styles.paragraph1}>
                  Lorem ipsum dolor sit amet consectetur. Erat neque facilisi
                  pharetra et
                </Text>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
               alignSelf:'center',
               justifyContent:'center',
                marginTop: SPACING.SCALE_20,
              }}>
              <View
                style={{
                  height: SPACING.SCALE_6,
                  width: SPACING.SCALE_6,
                  borderRadius: SPACING.SCALE_3,
                  backgroundColor: '#D9D9D9',
                }}></View>
              <View
                style={{
                  height: SPACING.SCALE_6,
                  width: SPACING.SCALE_6,
                  borderRadius: SPACING.SCALE_3,
                  marginLeft: SPACING.SCALE_5,
                  backgroundColor: '#D9D9D9',
                }}></View>
              <View
                style={{
                  height: SPACING.SCALE_6,
                  width: SPACING.SCALE_6,
                  borderRadius: SPACING.SCALE_3,
                  marginLeft: SPACING.SCALE_5,
                  backgroundColor: '#00958C',
                }}></View>
            </View>

            <Pressable
              onPress={() => {
                skipFunction(props);
              }}>
              <View style={styles.submitStyle}>
                <Text style={styles.bg_button}>Get Started</Text>
              </View>
            </Pressable>
          </View>
        )}
        {/* </ScrollView> */}
      </SafeAreaView>
      {/* </StoryScreen> */}
    </>
  );
};

export default WalkThroughScreen;

const styles = StyleSheet.create({
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(120),
    width: PixelRatio.getPixelSizeForLayoutSize(90),
    borderRadius: SPACING.SCALE_10,
  },
  imageStyle1: {
    height: SPACING.SCALE_90,
    width: SPACING.SCALE_90,
    borderRadius: SPACING.SCALE_10,
    marginTop: SPACING.SCALE__20,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: PixelRatio.getPixelSizeForLayoutSize(-10),
  },
  header: {
    fontSize: TYPOGRAPHY.FONT_SIZE_35,
    //fontWeight: '700',
    marginTop: SPACING.SCALE_5,
    marginBottom: SPACING.SCALE_20,
    fontFamily: 'Cabin-Bold',
    color: COLORS.BLACK,
  },
  paragraph: {
    fontSize: TYPOGRAPHY.FONT_SIZE_16,
    fontFamily: 'OpenSans-Regular',
    color: 'black',
    textAlign: 'center',
    width: SPACING.SCALE_288,
  },
  imageSizeStyle: {
    // marginTop: SPACING.SCALE_30,
    // marginBottom: SPACING.SCALE_10,
    // marginLeft: SPACING.SCALE_70,
    // marginRight: SPACING.SCALE_30,
    // borderRadius: SPACING.SCALE_30,
    // backgroundColor:'red'
    justifyContent:'center',
    alignSelf:'center',
    marginTop:20
  },
  submitStyle: {
    height: 51,
    width: 241,
    backgroundColor: COLORS.BLACK,
    color: COLORS.WHITE,
    alignSelf: 'center',
    marginTop: SPACING.SCALE_30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SPACING.SCALE_10,
  },
  bg_button: {
    color: COLORS.WHITE,
    // font: 'Cabin'
    fontFamily: 'Cabin-Bold',
    fontSize: TYPOGRAPHY.FONT_SIZE_16,
  },
  headerStyle: {
    display: 'flex',
    flexDirection: 'row',
  },
  textStyle1: {
    fontFamily: 'OpenSans-Bold',
    // fontWeight: 'bold',
    color: COLORS.HYPERLINK,
    fontSize: TYPOGRAPHY.FONT_SIZE_15,
  },
  outer: {
    // display: 'flex',
    flexDirection: 'row',
    // backgroundColor:'green',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: SPACING.SCALE_10,
    marginBottom: SPACING.SCALE__20,
  },
  paragraph1: {
    fontSize: TYPOGRAPHY.FONT_SIZE_12,
    fontFamily: 'OpenSans-Regular',
    color: COLORS.BLACK,
    textAlign: 'left',
    width: SPACING.SCALE_200,
    height: SPACING.SCALE_120,
    marginTop: SPACING.SCALE_10,
  },
});
