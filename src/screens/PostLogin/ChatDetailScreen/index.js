import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ChatDetailScreen = ({navigation, route}) => {
  const {id} = route.params;
  console.log('Id==', id);
  return (
    <View>
      <Text>ChatDetailScreen</Text>
    </View>
  );
};

export default ChatDetailScreen;

const styles = StyleSheet.create({});
