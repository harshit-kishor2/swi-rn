import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const HeaderFactoryGemSet = ({
  header,
  onPressYes,
  value,
  onPressNo,
  subTitle,
}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Open Sans',
            fontSize: 16,
            fontWeight: '400',
          }}>
          {header}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={onPressYes}>
            <View
              style={{
                height: 16,
                width: 16,
                borderRadius: 8,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#00958C',
                marginHorizontal: 5,
              }}>
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: value === 'Yes' ? '#00958C' : 'white',
                }}
              />
            </View>
            <Text
              style={{
                marginLeft: 5,
                marginRight: 15,
                color: 'black',
                fontFamily: 'Open Sans',
                fontSize: 16,
                fontWeight: '400',
              }}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={onPressNo}>
            <View
              style={{
                height: 16,
                width: 16,
                borderRadius: 8,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#00958C',
              }}>
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: value === 'No' ? '#00958C' : 'white',
                }}
              />
            </View>
            <Text
              style={{
                marginLeft: 5,
                marginRight: 15,
                color: 'black',
                fontFamily: 'Open Sans',
                fontSize: 16,
                fontWeight: '400',
              }}>
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={{
          color: '#7C7C7C',
          fontFamily: 'Open Sans',
          fontSize: 14,
          fontWeight: '400',
          marginVertical: 10,
        }}>
        {subTitle}
      </Text>
    </View>
  );
};

export default HeaderFactoryGemSet;
