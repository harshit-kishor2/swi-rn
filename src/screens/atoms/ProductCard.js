import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Avatar, Card} from 'react-native-paper';
import {CustomIcon, CustomText, Spacer} from '@app/components';
import {FontsConst} from '@app/assets/assets';
import {ICON_TYPE} from '@app/components/CustomIcon';

const ProductCard = () => {
  return (
    <Card
      style={{
        flex: 0.5,
        backgroundColor: '#ffffff',
        elevation: 1,
        margin: 5,
      }}>
      <Card.Cover
        style={{
          height: 150,
        }}
        source={{uri: 'https://picsum.photos/700'}}
      />
      <Card.Content>
        <CustomText
          style={{
            fontSize: 18,
            fontFamily: FontsConst.Cabin_Bold,
          }}>
          Card Title
        </CustomText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 5,
          }}>
          <CustomText
            style={{
              color: '#00958C',
              fontSize: 16,
              fontFamily: FontsConst.Cabin_Bold,
            }}>
            $12500
          </CustomText>
          <View
            style={{
              height: 5,
              width: 5,
              borderRadius: 3,
              backgroundColor: '#00958C',
            }}
          />
          <CustomText
            style={{
              color: '#00958C',
              fontSize: 12,
              fontFamily: FontsConst.Cabin_Regular,
            }}>
            Brand New
          </CustomText>
        </View>
      </Card.Content>
      <Card.Content>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5,
          }}>
          <Avatar.Text size={24} label="XD" />
          <Spacer width={5} />
          <CustomText
            style={{
              fontSize: 12,
              fontFamily: FontsConst.OpenSans_SemiBold,
            }}>
            Hars
          </CustomText>
        </View>
        <CustomText
          style={{
            fontSize: 10,
            fontFamily: FontsConst.OpenSans_Regular,
            color: '#868686',
          }}>
          Posted 3 days ago
        </CustomText>
      </Card.Content>
      <View
        style={{
          right: 5,
          position: 'absolute',
          height: 30,
          width: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable onPress={() => {}}>
          <CustomIcon
            size={30}
            color={'#000000'}
            origin={ICON_TYPE.MATERIAL_ICONS}
            name="bookmark-outline"
          />
        </Pressable>
      </View>
    </Card>
  );
};

export default ProductCard;

const styles = StyleSheet.create({});
