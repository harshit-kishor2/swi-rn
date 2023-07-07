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
  //-------
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigImageContainer: {
    width: '95%',
    height: SPACING.SCALE_310,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  bigImage: {
    flex: 1,
    // resizeMode: 'contain',

    //
    height: SPACING.SCALE_290,
    width: '90%',
    borderRadius: SPACING.SCALE_10,
    alignSelf: 'center',
    marginTop: 20,
    //
  },
  smallImagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  smallImage: {
    width: 78,
    height: 78,
    resizeMode: 'contain',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  smallImageWrapper: {
    padding: 5,
  },
  selectedImageWrapper: {
    // borderWidth: 2,
    // borderColor: 'blue',
    // borderRadius: 5,
    width: 85,
    height: 85,
    resizeMode: 'contain',
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.HEADER_TEXT,
    // width: 80,
  },
  addbtn: {
    borderRadius: 10,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    height: SPACING.SCALE_290,
    borderRadius: SPACING.SCALE_10,
  },
});
