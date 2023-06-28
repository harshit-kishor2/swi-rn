import {
  View,
  Text,
  StyleSheet,
  Alert,
  Button,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import StoryScreen from '../../components/StoryScreen';
import NavigationBar from '../../components/NavigationBar';
import {IMAGES} from '../../resources';
import Custombutton from '../../components/Button1';
import Custombutton2 from '../../components/Button2';

const CreateAccountScreen = props => {
  return (
    <StoryScreen>
      <NavigationBar
        leftSource={IMAGES.BACKARROW}
        leftAction={() => {
          console.log('first');
          props.navigation.navigate('WalkThroughScreen');
        }}
        flexDirection='row'
      />
      <View style={styles.container}>
        <View style={styles.topBox}>
          <Text style={styles.headline}>Hello there!</Text>
          <Text style={styles.subheadline}>Create Your Account</Text>
        </View>
        <Custombutton
          title="Sign up via Email"
          marginTop={50}
          height={51}
          width={241}
          marginHorizontal={20}
          onPress={() => {
            props.navigation.navigate('SignupScreen');
          }}
        />
        <Custombutton
          title="Sign up via Singpass"
          marginTop={13}
          width={241}
          height={51}
          marginHorizontal={20}
          onPress={() => {
            Alert.alert('rrr');
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 50,
            marginLeft: 80,
            marginRight: 80,
          }}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          <View>
            <Text
              style={{
                width: 25,
                textAlign: 'center',
                color: '#00958C',
                fontSize: 16,
                fontFamily:'Cabin-Bold',
              }}>
              Or
            </Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
        <Custombutton2
          title={'Sign up with Facebook'}
          marginTop={50}
          width={241}
          height={51}
          marginHorizontal={20}
          onPress={() => {
            Alert.alert('rrr');
          }}
        />
        <Custombutton2
          title={'Sign up with Google'}
          marginTop={15}
          width={241}
          height={51}
          marginHorizontal={20}
          onPress={() => {
            Alert.alert('rrr');
          }}
        />
        <Custombutton2
          title={'Sign up with Apple ID'}
          marginTop={15}
          width={241}
          height={51}
          marginHorizontal={20}
          onPress={() => {
            Alert.alert('rrr');
          }}
        />
        <View style={{flexDirection: 'row', margin: 50}}>
          <Text style={{fontSize: 14, color: '#4E4E4E',fontFamily: 'Open Sans',}}>
            Already have an account?
          </Text>
          <TouchableOpacity style={{marginLeft: 4}}>
            <Text
              style={{fontSize: 14, color: '#00958C',fontFamily: 'Open Sans',}}
              onPress={() => {
                props.navigation.navigate("LoginScreen");
              }}>
              Sign In now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </StoryScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  headline: {
    textAlign: 'center',
    // fontWeight: 'bold',  
    fontFamily:'Cabin-Bold',
    fontSize: 18,
    marginTop: 10,
    width: 200,
    color: '#000000',
  },
  subheadline: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Open Sans',
    width: 300,
    marginTop: 7,
    color: '#00958C',
  },  
  topBox: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default CreateAccountScreen;
