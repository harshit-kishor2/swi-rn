import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SearchBar} from 'react-native-screens';

const Item = ({title, content, srno}) => {
  return (
    <View>
      <View style={{marginLeft: 15}}>
        <Text style={{}}>
          {srno}.{title}
        </Text>
      </View>
      <View>
        <Text style={{}}>{content}</Text>
      </View>
    </View>
  );
};

const DATA = [
  {
    srno: '1',
    title: 'Terms',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    srno: '2',
    title: 'Use Licences',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    srno: '3',
    title: 'Terms of Use',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
];
const FreshFind = () => {
  const [search, setSearch] = useState('');
  return (
    <View>
      {/* <SearchBar
        placeholder="Type Here..."
        onChangeText={()=>{
          setSearch
        }}
        value={search}
      /> */}
      <Text>FreshFind</Text>
    </View>
  );
};

export default FreshFind;

const styles = StyleSheet.create({});
