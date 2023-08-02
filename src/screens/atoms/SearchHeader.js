import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Searchbar} from 'react-native-paper';
import {CustomIcon, CustomInput, Spacer} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';

const SearchHeader = ({onChangeSearch, searchQuery, showBell}) => {
  return (
    <View
      style={{
        height: 80,
        width: '90%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flex: 1,
        }}>
        <Spacer width={10} />
        <CustomInput
          mode={'outlined'}
          outlineColor="grey"
          onChangeText={onChangeSearch}
          style={{
            flex: showBell ? 0.85 : 1,
          }}
          outlineStyle={{
            borderRadius: 10,
          }}
          leftIcon={
            <CustomIcon
              style={{
                alignSelf: 'center',
                paddingTop: 5,
              }}
              origin={ICON_TYPE.FEATHER_ICONS}
              name={'search'}
              color={'#00000070'}
              size={20}
            />
          }
          placeholder={'Search by product/brand/model'}
        />
        {showBell && (
          <CustomIcon
            style={{
              flex: 0.15,
            }}
            origin={ICON_TYPE.FEATHER_ICONS}
            name={'bell'}
            color={'#000000'}
            size={30}
          />
        )}
      </View>
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({});
