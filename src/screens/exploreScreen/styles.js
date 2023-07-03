import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {COLORS} from '../../resources';

export default styles = StyleSheet.create({
  searchViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeStyle: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outer: {
    backgroundColor: '#F6F6F6',
    // backgroundColor:'red',
    width: 160,
    height: 279,
    borderRadius: 10,
    // alignSelf:'center',
    // justifyContent:'center',
    marginTop: 40,
    marginLeft: 15,
  },
  inner: {
    width: 160,
    height: 160,
    borderRadius: 10,
    // position:'absolute'
  },
  imageStyle: {
    width: 160,
    height: 160,
    borderRadius: 10,
    marginTop: -15,
  },
  progressContainer: {
    marginLeft: 18,
    marginTop: 20,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  progressBar: {
    height: 8,
    borderRadius: 10,
    backgroundColor: COLORS.APPGREEN,
  },
});
