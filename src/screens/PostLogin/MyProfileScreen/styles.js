import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../resources'

const styles = StyleSheet.create({
  ImageStyle: {
    height: 72,
    width: 72,
    borderRadius: 72 / 2,
    marginTop: -70
  },
  NameStyle: {
    fontFamily: 'Cabin-Regular',
    fontSize: 20,

  },
  BadgeStyle: {
    // flexDirection:'row',
    // justifyContent:'space-between',
    alignContent: 'center'
  },
  NameBadgeStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  ProfilePicture: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  VerificationStyle: {
    fontFamily: 'Cabin-Regular'
  },
  VerificationViewStyle: {
    flexDirection: 'row'
  },
  VerificationViewStyle1: {
    flexDirection: 'row',
    marginTop: 40

  },
  TextStyle1: {
    fontFamily: 'OpenSans-Bold',
    alignSelf: 'center',
    color: COLORS.HYPERLINK,
    margin: 20
  },
  NavigationView: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between'
  },
  NavigationText: {
    fontFamily: 'OpenSans-SemiBold',
    marginLeft: 10,
    fontSize: 16
  },
  NavigationViewInner: {
    flexDirection: 'row'
  },
  NavigationImageStyle: {
    alignSelf: 'center',

  },
  LineView: {
    height: 1,
    width: '90%',
    backgroundColor: 'black',
    margin: 20,
    alignSelf: 'center',
    marginLeft: -20
  },
  NameBadgeLineStyle: {
    height: 1, width: '100%', backgroundColor: '#D8D8D8', margin: 10, alignSelf: 'center'
  }
})

export default styles
