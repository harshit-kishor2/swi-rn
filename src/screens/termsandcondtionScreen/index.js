import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import React, { useState } from 'react';
import StoryScreen from '../../components/StoryScreen';
import { IMAGES, SPACING, TYPOGRAPHY } from '../../resources';

import NavigationBar from '../../components/NavigationBar';

const Item = ({ title, content, srno }) => {
  return (
    <View>
      <View style={{ marginLeft: 15 }}>
        <Text style={styles.titleStyle}>{srno}.{title}</Text>
      </View>
      <View>
        <Text style={styles.contentStyle}>{content}</Text>
      </View>

    </View>
  )
}

const DATA = [
  {
    srno: '1',
    title: 'Terms',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    srno: '2',
    title: 'Use Licences',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    srno: '3',
    title: 'Terms of Use',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
];
const TermsandcondtionScreen = () => {
  const [title, setTitle] = useState(' Terms');
  const [srno, setSrno] = useState('1');
  const [content, setContent] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.');
  const renderItem = ({ item, index }) => (
    <Item content={item.content} title={item.title} srno={item.srno} index={index} />
  );
  return (
    <StoryScreen>
      <NavigationBar
        leftSource={IMAGES.BACKARROW}
        leftAction={() => {
          props.navigation.goBack();
        }}
        flexDirection="row"
      />
      <Text style={styles.HedaerTextStyle}> Terms And Conditions</Text>
      <FlatList

        data={DATA}
        renderItem={renderItem} 
        showsVerticalScrollIndicator={false}/>
        


    </StoryScreen>
  );
};

export default TermsandcondtionScreen;

const styles = StyleSheet.create({
  HedaerTextStyle: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Cabin-Bold',
    marginTop: 20,
  },
  titleStyle: {

    fontFamily: 'Cabin-Bold',
    fontSize: 15,
    color: 'black',
    marginTop: 30,
  },
  contentStyle: {
    fontFamily: 'Open Sans',
    width: 330,
    alignSelf: 'center'
  }
});
