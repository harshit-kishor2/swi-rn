import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../../resources';

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
  progressive: {
    height: 6,
    width: '30%',
    borderRadius: 3,
    backgroundColor: COLORS.HYPERLINK,
  },
  progressiveMain: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  progressiveNo: {
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
    width: '98%',
    height: SPACING.SCALE_310,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    padding: SPACING.SCALE_10,
    borderRadius: SPACING.SCALE_8
  },
  bigImage: {
    flex: 1,
    // resizeMode: 'contain',

    //
    height: SPACING.SCALE_310,
    width: '100%',
    borderRadius: SPACING.SCALE_10,
    alignSelf: 'center',
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
    height: SPACING.SCALE_308,
    borderRadius: SPACING.SCALE_10,
    alignSelf: 'center'
  },
  //FormDetails
  formDetailsStyle: {
    backgroundColor: '#F0F2FA',
    marginTop: SPACING.SCALE_30,
    flexGrow: 1,
    paddingHorizontal: SPACING.SCALE_25,
    paddingTop: SPACING.SCALE_25,
  },
  mainFormComponent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: TYPOGRAPHY.DYNAMIC_WIDTH('50%'),
  },
  fortyFivePercent: {
    width: TYPOGRAPHY.DYNAMIC_WIDTH('45%'),
  },
  formHeaderMainView: {
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#00000040',
  },
  formHeaderText: {
    color: '#7C7C7C',
    fontFamily: 'Open Sans',
    fontSize: 14,
  },
  formMainWatchConditionView: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
  },
  formWatchConditionView: {
    marginRight: 15,
    borderRadius: 20,
    borderWidth: 1,
  },
  formWatchConditionText: {
    fontFamily: 'Open Sans',
    fontSize: 14,
    marginVertical: 7,
    marginHorizontal: 16,
  },
  formDateMainView: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  formDateChildrenMainView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 16,
    borderBottomColor: '#00000040',
  },
  formDateTextStyle: {
    color: 'black',
    fontFamily: 'Open Sans',
    fontSize: 16,
  },
  formTickMainView: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: COLORS.themeColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 36,
  },
  formAdditionalInfo: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    marginTop: 36,
    marginBottom: 10,
  },
  formAdditionalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 19,
    marginHorizontal: 20,
  },
  formWatchDescription: {
    marginVertical: 20,
    fontFamily: 'Open Sans',
    fontSize: 14,
    fontWeight: '400',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#00000040',
  },
  watchDescriptionText: {
    alignSelf: 'flex-end',
    marginBottom: 4,
    color: '#00958C',
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontWeight: '600',
  },
  genderTypeView: {
    flexDirection: 'row',
    marginTop: 17,
  },
  genderSelectView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  genderTextStyle: {
    marginLeft: 5,
    marginRight: 15,
    marginVertical: 7,
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '400',
  },
  formDropDownMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 35,
  },
  formLocationTextView: {
    color: '#7C7C7C',
    fontFamily: 'Open Sans',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 10,
  },
  formLocationMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: SPACING.SCALE_30,
  },
  formModelTextStyle: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
    textAlign: 'center',
  },
});
