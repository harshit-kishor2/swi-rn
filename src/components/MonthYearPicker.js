import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomText from './CustomText';
import CustomIcon, {ICON_TYPE} from './CustomIcon';
import moment from 'moment';
import MonthPicker from 'react-native-month-year-picker';
import {
  ACTION_DATE_SET,
  ACTION_DISMISSED,
  ACTION_NEUTRAL,
} from 'react-native-month-year-picker';

const MonthYearPicker = ({onChange, value, children}) => {
  const [show, setShow] = useState(false);

  const [date, setDate] = useState(new Date());
  const onValueChange = (event, newDate) => {
    setShow(false);
    onChange(newDate);
  };
  return (
    <Pressable
      onPress={() => {
        setShow(true);
      }}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%',
        borderBottomWidth: 1,
        marginRight: 20,
      }}>
      <CustomText>
        {value ? moment(value).format('MMM, YYYY') : 'MM, YYYY'}
      </CustomText>
      <CustomIcon
        name={'calendar'}
        origin={ICON_TYPE.ICONICONS}
        style={{
          paddingRight: 10,
          color: '#00000080',
        }}
        size={20}
      />
      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={value ? value : date}
          minimumDate={new Date(2000, 5)}
          maximumDate={new Date()}
        />
      )}
    </Pressable>
  );
};

export default MonthYearPicker;

const styles = StyleSheet.create({});
