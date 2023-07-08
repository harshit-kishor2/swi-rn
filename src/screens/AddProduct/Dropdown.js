import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import React, {useCallback} from 'react';
import {COLORS, IMAGES, SPACING, TYPOGRAPHY} from '../../resources';

const Dropdown = ({title, isRequired, value, dropDownPress}) => {
  return (
    <View style={{width: '100%'}}>
      <Text
        style={{
          color: '#7C7C7C',
          fontFamily: 'Open Sans',
          fontSize: 14,
        }}>
        {title} {isRequired ? <Text style={{color: COLORS.RED}}>*</Text> : null}
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
    </View>
  );
};

export default Dropdown;
