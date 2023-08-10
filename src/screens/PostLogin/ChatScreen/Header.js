import {RoutesName} from '@app/helper/strings';
import useDebounce from '@app/hooks/useDebounce';
import {IMAGES, SPACING} from '@app/resources';
import ClearableSearch from '@app/screens/atoms/ClearableSearch';
import {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';

const Header = props => {
  const {getChatHistory, navigation} = props;

  const [search, setSearch] = useState('');
  const searchQuery = useDebounce(search);

  useEffect(() => {
    getChatHistory({keyword: searchQuery});
  }, [searchQuery]);

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
        onPress={() => {
          navigation?.navigate(RoutesName.NOTIFICATION_SCREEN);
        }}
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
