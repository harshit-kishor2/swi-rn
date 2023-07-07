import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import React from 'react';
import {COLORS, IMAGES, SPACING, TYPOGRAPHY} from '../../resources';

const Dropdown = ({
  title,
  data,
  isRequired,
  value,
  dropDownPress,
  isVisible,
  onRequestClose,
  headerTitle,
  extraData,
  renderItem,
  keyExtractor,
}) => {
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
      <Modal
        transparent={true}
        visible={isVisible}
        style={{flex: 1}}
        onRequestClose={onRequestClose}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onRequestClose}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.1)',
            minHeight: SPACING.SCALE_250,
          }}>
          <View style={{flex: 1}} />
        </TouchableOpacity>
        <FlatList
          data={data}
          ListHeaderComponent={
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 15,
              }}>
              <Text style={[TYPOGRAPHY.HEADER_TITLE, {color: 'black'}]}>
                {headerTitle}
              </Text>
            </View>
          }
          extraData={extraData}
          style={{backgroundColor: 'white'}}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </Modal>
    </View>
  );
};

export default Dropdown;
