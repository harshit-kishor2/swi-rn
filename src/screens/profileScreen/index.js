import {View, Text, Button} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthAction} from '../../redux/auth.slice';
import store from '../../store';

const MyProfileScreen = () => {
  const logout = async () => {
    await AsyncStorage.setItem('Token', '');
    store.dispatch(AuthAction.addIntotokenlogin());
  };
  return (
    <View>
      <Text>Profile</Text>
      <Button title="logout" onPress={logout} />
    </View>
  );
};

export default MyProfileScreen;
