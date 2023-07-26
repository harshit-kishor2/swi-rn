import {CustomIcon, CustomText} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import React, {useEffect, useState} from 'react';
import {FlatList, Modal, Pressable, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';

const DropDownWithModel = ({
  data,
  label,
  isRequired,
  backgroundColor,
  onClick,
  value,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [tempData, setTempData] = useState(data ?? []);
  const [searchQuery, setSearchQuery] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [otherText, setOtherText] = useState('');

  useEffect(() => {
    setTempData(data);
    if (value && !selectedItem) {
      const tm = data.filter(it => it.id === value);
      setSelectedItem(tm[0]);
    }
  }, [data, value]);

  useEffect(() => {
    if (searchQuery) {
      const d = data?.filter(item =>
        item?.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setTempData(d);
    } else {
      setTempData(data);
    }
  }, [searchQuery]);

  const renderItem = ({item, index}) => {
    return (
      <Pressable
        onPress={() => {
          setSelectedItem(item);
          setIsVisible(false);
          setSearchQuery('');
          setOtherText('');
          onClick(item, null);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
          height: 50,
          marginVertical: 5,
        }}>
        <CustomText>{item?.name}</CustomText>
      </Pressable>
    );
  };

  const emptyComponent = ({item, index}) => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <CustomText>No Data Found</CustomText>
      </View>
    );
  };

  const headerComponent = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          mode="outlined"
          style={{
            backgroundColor: '#F0F2FA',
            minWidth: '90%',
            marginBottom: 10,
          }}
          value={searchQuery}
          placeholder="Search"
          onChangeText={v => setSearchQuery(v)}
        />
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 2,
      }}>
      <Pressable onPress={() => setIsVisible(true)}>
        <CustomText style={{color: '#7C7C7C'}}>
          {label}{' '}
          {isRequired ? <CustomText style={{color: 'red'}}>*</CustomText> : ''}
        </CustomText>
        <TextInput
          style={{
            backgroundColor: backgroundColor ?? '#F0F2FA',
            width: '100%',
            marginBottom: 10,
          }}
          multiline={true}
          numberOfLines={selectedItem?.name.length > 12 ? 2 : 1}
          contentStyle={{
            color: '#000',
          }}
          value={selectedItem?.name}
          placeholder="Search"
          disabled={true}
          right={
            <TextInput.Icon
              onPress={() => setIsVisible(true)}
              forceTextInputFocus={true}
              icon={() => (
                <CustomIcon
                  name={'arrow-drop-down'}
                  origin={ICON_TYPE.MATERIAL_ICONS}
                  size={20}
                />
              )}
              size={20}
            />
          }
          // onChangeText={v => searchText(v)}
        />
      </Pressable>
      {selectedItem?.name === 'Others' ? (
        <TextInput
          style={{
            backgroundColor: '#fff',
            minWidth: '45%',
          }}
          value={otherText}
          placeholder="Type..."
          onChangeText={v => {
            setOtherText(v);
            onClick(selectedItem, v);
          }}
        />
      ) : null}

      <Modal
        animationType="slide"
        transparent
        visible={isVisible}
        //   presentationStyle="pageSheet"
        onDismiss={() => setIsVisible(false)}>
        <Pressable
          style={{flex: 1, backgroundColor: '#00000030'}}
          onPress={() => setIsVisible(false)}>
          <View />
        </Pressable>
        <View
          style={{
            height: '90%',
            backgroundColor: '#ffffff',
            bottom: 0,
            paddingVertical: 20,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {headerComponent()}
            <FlatList
              keyboardShouldPersistTaps={'always'}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={tempData}
              renderItem={renderItem}
              ListEmptyComponent={emptyComponent}
              // ListHeaderComponent={() => headerComponent}
              contentContainerStyle={{
                paddingBottom: 30,
                flexGrow: 1,
                backgroundColor: '#ffffff',
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DropDownWithModel;

const styles = StyleSheet.create({});
