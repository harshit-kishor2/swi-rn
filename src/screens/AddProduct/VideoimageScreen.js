import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SPACING} from '../../resources';
import {styles} from './style';

const VideoimageScreen = () => {
  return (
    <View style={{color: 'white', height: 90}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.subheading}>
          You are few step away to post your watch
        </Text>
        <Text style={styles.prograssiveNo}>1/3</Text>
      </View>
      <View style={styles.prograssiveMain}>
        <View style={[styles.prograssive]}></View>
        <View style={[styles.prograssive, {opacity: 0.25}]}></View>
        <View style={[styles.prograssive, {opacity: 0.25}]}></View>
      </View>
      <View style={{height: '100%', backgroundColor: 'red', marginTop: 30}}>
        <Text>Upload watch images*</Text>
        <Text>Please upload Image of max 10mb</Text>
        <View style={{backgroundColor: 'blue', borderRadius: 15, height: 400}}>
          <Text>hjbu</Text>
        </View>
      </View>
    </View>
  );
};

export default VideoimageScreen;
