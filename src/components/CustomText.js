import React from 'react';
import {Text} from 'react-native';

const CustomText = ({text, fontSize, fontFamily, fontColor, fontWeight}) => {
  const textStyle = {
    fontSize: fontSize || 14,
    fontFamily: fontFamily || 'Arial',
    fontWeight: fontWeight || 'normal',

    color: fontColor || 'black',
  };

  return <Text style={textStyle}>{text}</Text>;
};

export default CustomText;
