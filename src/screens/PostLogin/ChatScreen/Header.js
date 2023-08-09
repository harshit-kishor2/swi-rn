import {IMAGES, SPACING} from '@app/resources';
import ClearableSearch from '@app/screens/atoms/ClearableSearch';
import {useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';

const Header = () => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.search_container}>
      <View style={{width: '90%'}}>
        <ClearableSearch
          placeholder="Search by keyword"
          search={search}
          setSearch={setSearch}
        />
      </View>
      <Pressable
        onPress={() => {}}
        style={{marginLeft: SPACING.SCALE_10, marginTop: SPACING.SCALE_8}}>
        <Image source={IMAGES.notificationBell} />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  search_container: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
