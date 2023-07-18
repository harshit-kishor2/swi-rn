import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import React from 'react';
import { IMAGES } from '@app/resources';

const SelectWithInput = ({
  item,
  onSelect,
  backgroundColor,
  isCheck,
  textValue,
  onChangeTextValue,
  placeholder,
}) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={ 0.7 }
        onPress={ onSelect }
        style={ { flexDirection: 'row', marginVertical: 12 } }>
        <View
          style={ {
            height: 20,
            width: 20,
            borderWidth: 1,
            borderColor: '#00958C',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: backgroundColor,
          } }>
          { isCheck ? (
            <Image
              source={ IMAGES.tickIcon }
              resizeMode={ 'contain' }
              style={ { height: 16, width: 16 } }
            />
          ) : null }
        </View>
        <Text
          style={ {
            marginLeft: 15,
            color: '#4E4E4E',
            fontFamily: 'OpenSans-Regular',
            fontSize: 14,
            
          } }>
          { item.name }
        </Text>
      </TouchableOpacity>
      { isCheck ? (
        <View>
          <Text
            style={ {
              color: '#7C7C7C',
              fontFamily: 'OpenSans-Regular',
              fontSize: 14,
              marginVertical: 10,
            } }>
            { `If yes, tick what’s ${item.name}` }
          </Text>
          <TextInput
            value={ textValue }
            onChangeText={ onChangeTextValue }
            placeholder={ placeholder }
            placeholderTextColor={ '#00000040' }
            maxLength={ 50 }
            style={ {
              borderBottomWidth: 1,
              borderBottomColor: '#00000040',
            } }
          />
        </View>
      ) : null }
    </View>
  );
};

export default SelectWithInput;
