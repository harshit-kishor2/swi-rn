import {StyleSheet} from 'react-native';
import {COLORS, SPACING, TYPOGRAPHY} from '../../resources';

export const styles = StyleSheet.create({
  //index
  Header: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  topBox: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  headline: {
    textAlign: 'center',
    fontFamily: 'Open Sans',

    fontSize: TYPOGRAPHY.FONT_SIZE_18,
    width: SPACING.SCALE_300,
    color: COLORS.HEADER_TEXT,
  },
  //videoimageScreen
  prograssive: {
    height: 6,
    width: SPACING.SCALE_115,
    borderRadius: 3,
    backgroundColor: COLORS.HYPERLINK,
  },
  prograssiveMain: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  prograssiveNo: {
    color: COLORS.HYPERLINK,
    marginRight: 10,
    fontFamily: 'OpenSans-Regular',
    fontSize: 10,
  },
  subheading: {
    color: COLORS.BLACK,
    marginLeft: 5,
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
  },
});
