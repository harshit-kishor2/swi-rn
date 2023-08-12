import {
  BackHeader,
  Container,
  CustomInput,
  CustomText,
  Custombutton,
} from '@app/components';
import {COLORS, IMAGES} from '@app/resources';
import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Image} from 'react-native';
const GeneralProfileEdit = () => {
  return (
    <Container useSafeAreaView={true}>
      <BackHeader />
      <KeyboardAvoidingView
        enabled
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        behavior={Platform.OS == 'ios' ? 'padding' : null}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={{margin: 15}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={IMAGES.Ellipse7} />
            </View>
            <View style={{}}>
              <Text style={style.text}>Name</Text>
              <CustomInput placeholder="Enter your Name" />
              <Text style={style.text}>Email</Text>
              <CustomInput
                style={style.inputText}
                placeholder="immyvan9778@gmail.com"
              />
              <Text style={style.text}>Phone Number </Text>
              <CustomInput
                placeholder="+65 6549796565"
                style={style.inputText}
              />

              <Text style={style.text}>About</Text>
              <CustomInput
                placeholder="Suspendisse viverra
             luctus quam, sed fringilla nulla. Pellentesque quis massa tincidunt,
           iaculis ipsum sed, pretium purus."
                multiline={true}
                style={style.inputText}
              />
            </View>
            <View style={{marginTop: 10}}>
              <Custombutton title="Save Changes" height={50} width={239} />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'OpenSans-SemiBold',
                  fontSize: 16,
                  color: '#00958C',
                }}>
                Not now, I’ll do it later
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

const style = StyleSheet.create({
  text: {
    fontSize: 14,
    color: '#7C7C7C',
    fontFamily: 'OpenSans-Regular',
  },
  inputText: {
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
    color: COLORS.BLACK,
  },
});

export default GeneralProfileEdit;
