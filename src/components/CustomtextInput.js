import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const CustomTextInput = ({
  value,
  placeholder,
  onChangeText,
  icon,
  type,
  
  keyboardType,
  maxLength,
  Width,
  Hight,
}) => {
  return (
    <View
      style={[
        styles.continer,
        {
          width: Width ?? '85%',
          height: Hight ?? 50,
        },
      ]}>
      <View style={{marginLeft: 10}}>
        <Image
          source={icon}
          style={{width: 21, height: 21}}
          resizeMode={'contain'}
        />
      </View>
      <TextInput
        placeholder={placeholder}
        type={type}
        placeholderTextColor={'#7C7C7C'}
        keyboardType={keyboardType ? keyboardType : 'default'}
        style={{marginLeft: 10,fontFamily: 'Cabin-Bold', fontSize:16}}
        secureTextEntry={type ? true : false}
        
        // maxLength={maxLength ? maxLength : 0}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  continer: {
    // borderWidth: 1,
    // borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: '#000000',

    alignSelf: 'center',
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
