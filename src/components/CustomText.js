import React from 'react';
import {Text} from 'react-native';

const CustomText = ({text, fontSize, fontFamily, fontWeight, fontColor}) => {
  const textStyle = {
    fontSize: fontSize || 14,
    fontFamily: fontFamily || 'Arial',
    fontWeight: fontWeight || 'normal',
    color: fontColor || 'black',
  };

  return <Text style={textStyle}>{text}</Text>;
};

export default CustomText;
