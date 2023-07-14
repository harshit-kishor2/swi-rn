import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, IMAGES, SPACING } from '../../../resources';

const Dropdown = ({
  title,
  isRequired,
  value,
  dropDownPress,
  otherValue,
  otherValueChangeText,
  otherValuePlaceholder,
}) => {
  return (
    <View style={{ width: '100%' }}>
      <Text
        style={{
          color: '#7C7C7C',
          fontFamily: 'Open Sans',
          fontSize: 14,
        }}>
        {title} {isRequired ? <Text style={{ color: COLORS.RED }}>*</Text> : null}
      </Text>
      <TouchableOpacity
        onPress={dropDownPress}
        activeOpacity={0.7}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginRight: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#00000040',
          marginTop: 5,
        }}>
        <Text
          style={{
            marginBottom: 10,
            color: COLORS.BLACK,
            fontFamily: 'Open Sans',
            fontSize: 16,
          }}>
          {value}
        </Text>
        <Image source={IMAGES.dropDownIcon} resizeMode={'contain'} />
      </TouchableOpacity>
      {value === 'Others' ? (
        <TextInput
          style={{
            height: SPACING.SCALE_44,
            marginTop: SPACING.SCALE_2,
            width: '95%',
            borderBottomWidth: SPACING.SCALE_1,
            // borderBottomColor: COLORS.BLACK,
            borderBottomColor: '#00000040',
          }}
          placeholder={otherValuePlaceholder}
          placeholderTextColor={'gray'}
          value={otherValue}
          onChangeText={otherValueChangeText}
          maxLength={50}
        />
      ) : null}
    </View>
  );
};

export default Dropdown;
