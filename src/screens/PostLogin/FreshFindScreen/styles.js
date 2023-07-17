import { StyleSheet, Text, View } from 'react-native';
export default styles = StyleSheet.create({
  outer: {
    backgroundColor: '#F6F6F6',
    width: SPACING.SCALE_160,
    height: SPACING.SCALE_279,
    borderRadius: SPACING.SCALE_10,
    marginTop: SPACING.SCALE_30,
  },
  inner: {
    width: SPACING.SCALE_160,
    height: SPACING.SCALE_160,
    borderRadius: SPACING.SCALE__10,
  },
  imageStyle: {
    width: SPACING.SCALE_160,
    height: SPACING.SCALE_160,
    borderRadius: SPACING.SCALE_10,
    marginTop: SPACING.SCALE__15,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: SPACING.SCALE_10,
    borderWidth: SPACING.SCALE_1,
    borderColor: '#ccc',
    elevation: SPACING.SCALE_3,
    paddingHorizontal: SPACING.SCALE_10,
    marginVertical: SPACING.SCALE_10,
  },
  icon: {
    fontSize: SPACING.SCALE_20,
    marginRight: SPACING.SCALE_10,
  },
  input: {
    flex: 1,
    height: SPACING.SCALE_40,
    marginLeft: SPACING.SCALE_15,
  },
  HedaerTextStyle: {
    fontFamily: 'Cabin-Bold',
    fontSize: SPACING.SCALE_20,
    color: COLORS.BLACK,
    marginLeft: SPACING.SCALE_20,
  },
});
