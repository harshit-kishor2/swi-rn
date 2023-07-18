import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const AddProduct = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
  }, []);

  return (
    <View>
      <Text>AddProduct</Text>
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({});
