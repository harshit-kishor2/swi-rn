import {StyleSheet, Text, Keyboard} from 'react-native';
import React, {forwardRef, useState} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import CustomIcon, {ICON_TYPE} from './CustomIcon';

const CustomInput = forwardRef(
  (
    {
      label,
      mode = 'flat',
      placeholder = 'Enter your text',
      multiline = false,
      editable = true,
      value,
      onChangeText,
      error = false,
      secureTextEntry,
      lableStyle,
      style,
      errorText = '',
      rightIcon,
      leftIcon,
      keyboardType,
      ...rest
    },
    ref,
  ) => {
    const [showPass, setShowPass] = useState(false);
    const styles = useStyles(multiline);
    return (
      <>
        {label ? <Text style={[lableStyle]}>{label}</Text> : null}
        <TextInput
          ref={ref}
          secureTextEntry={secureTextEntry && !showPass}
          style={[styles.containerStyle, style]}
          mode={mode}
          label={''}
          placeholder={placeholder}
          value={value}
          error={error}
          onChangeText={onChangeText}
          editable={editable}
          multiline={multiline}
          numberOfLines={multiline ? 5 : 1}
          keyboardType={keyboardType}
          // theme={styles.textInputOutlineStyle}
          left={
            leftIcon ? (
              <TextInput.Icon
                forceTextInputFocus={false}
                icon={() => leftIcon}
                size={20}
              />
            ) : null
          }
          right={
            secureTextEntry ? (
              <TextInput.Icon
                forceTextInputFocus={false}
                icon={() => (
                  <CustomIcon
                    origin={ICON_TYPE.FEATHER_ICONS}
                    name={showPass ? 'eye-off' : 'eye'}
                    color={'black'}
                    size={20}
                  />
                )}
                onPress={() => {
                  Keyboard.dismiss();
                  setShowPass(!showPass);
                }}
              />
            ) : null
          }
          {...rest}
        />
        <HelperText type="error" visible={error}>
          {errorText}
        </HelperText>
      </>
    );
  },
);

export default CustomInput;

const useStyles = multiline =>
  StyleSheet.create({
    // textInputOutlineStyle: {
    //   width: '70%',
    //   colors: {
    //     placeholder: 'black',
    //     text: 'black',
    //     background: 'blue',
    //     // primary: 'black',
    //     underlineColor: 'transparent',
    //   },
    //   roundness: 10,
    // },
    containerStyle: {
      backgroundColor: 'white',
      height: multiline ? null : 40,
      paddingHorizontal: 0,
      textAlignVertical: multiline ? 'top' : 'center',
    },
  });
