import {
  BackHeader,
  Container,
  CustomIcon,
  NavigationBar,
} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {COLORS, IMAGES} from '@app/resources';
import {stayLoginAction} from '@app/store/authSlice';
import React, {useState} from 'react';
import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';

const AccountSetting = () => {
  const [switchOn, setSwitch] = useState(true);
  const [emailToggle, setEmailToggle] = useState(false);
  const onToggleNotification = () => {
    setSwitch(!switchOn);
  };
  const onToggleEmail = () => {
    setEmailToggle(!emailToggle);
  };
  return (
    <Container useSafeAreaView={true}>
      <BackHeader />
      <View style={{paddingHorizontal: 20}}>
        <View style={style.Notification}>
          <View style={{flexDirection: 'row'}}>
            <CustomIcon
              origin={ICON_TYPE.MATERIAL_ICONS}
              name={'notifications-none'}
              color={COLORS.BLACK}
            />
            <Text style={style.text}>Push Notification</Text>
          </View>
          <View>
            <ToggleSwitch
              isOn={switchOn}
              onToggle={onToggleNotification}
              onColor={'#00958C'}
              offColor={'#ACACAC'}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
          }}>
          <View style={style.line} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
          }}>
          <View style={{flexDirection: 'row'}}>
            <CustomIcon
              origin={ICON_TYPE.MATERIAL_COMMUNITY}
              name={'email-outline'}
              color={COLORS.BLACK}
            />
            <Text style={style.text}>Email Notification</Text>
          </View>
          <View>
            <ToggleSwitch
              isOn={emailToggle}
              onToggle={onToggleEmail}
              onColor={'#00958C'}
              offColor={'#ACACAC'}
            />
          </View>
        </View>
        <View style={style.line} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <CustomIcon
              origin={ICON_TYPE.FEATHER_ICONS}
              name={'lock'}
              color={COLORS.BLACK}
            />
            <Text style={style.text}>Change Password</Text>
          </View>
          <View>
            <TouchableOpacity>
              <CustomIcon
                origin={ICON_TYPE.FEATHER_ICONS}
                name={'chevron-right'}
                color={COLORS.BLACK}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.line} />
      </View>
    </Container>
  );
};

export default AccountSetting;
const style = StyleSheet.create({
  Notification: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: COLORS.BLACK,
    marginLeft: 10,
  },
  line: {
    height: 2,
    width: '100%',
    marginHorizontal: 5,
    backgroundColor: 'black',
    flexShrink: 1,
    marginVertical: 15,
    opacity: 0.2,
  },
});
