import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Custombutton2, StoryScreen } from '@app/components/Button2';
import { IMAGES, SPACING } from '@app/resources';

const PostedSuccessfully = () => {
  return (
    <StoryScreen>
      <View>
        <View style={ styles.imageSizeStyle }>
          <Image source={ IMAGES.check1 } style={ styles.imageStyle } />
        </View>
        <View>
          <Text style={ styles.subheadline }>Posted Successfully</Text>
          <Text style={ styles.text }>
            Your post is now visible to the customers
          </Text>
          <Text style={ styles.text1 }>
            You can boost your post to get higher visibility and get attractions
          </Text>
        </View>
        <View style={ { alignSelf: 'center' } }>
          <Custombutton2
            title={ 'Boost now' }
            marginTop={ 20 }
            width={ 241 }
            height={ 51 }
            marginHorizontal={ 20 }
            onPress={ () => {
              Alert.alert('rrr');
            } }
          />
        </View>
        <View>
          <TouchableOpacity style={ { alignSelf: 'center', marginTop: 30 } }>
            <Text
              style={ {
                fontSize: 14,
                color: '#00958C',
                fontFamily: 'Open Sans',
                textDecorationLine: 'underline',
              } }
              onPress={ () => {
                Alert.alert('in process');
              } }>
              Not now, I'll do it later
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <View style={ { marginTop: 100 } }>
          <Text style={ styles.text }>
            If you want to make any changes to your post you can do that from
            your posted ads section.
            <TouchableOpacity style={ { alignSelf: 'center' } }>
              <Text
                style={ {
                  fontSize: 14,
                  color: '#00958C',
                  fontFamily: 'Open Sans',
                  textDecorationLine: 'underline',
                } }
                onPress={ () => {
                  Alert.alert('in process');
                } }>
                ViewPost
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </StoryScreen>
  );
};

export default PostedSuccessfully;

const styles = StyleSheet.create({
  imageSizeStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 100,
  },
  imageStyle: {
    height: 75,
    width: 75,
    borderRadius: SPACING.SCALE_10,
  },
  subheadline: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 24,
    fontFamily: 'OpenSans-SemiBold',
    // fontFamily:'Cabin-Bold',
    fontWeight: '600',
    width: 300,
    marginTop: 20,
    color: '#000000',
  },
  text: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 12,
    fontFamily: 'Open Sans',
    marginTop: 5,
  },

  text1: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold',
    marginTop: 130,
    width: 280,

    textAlign: 'center',
    color: 'black',
  },
});
