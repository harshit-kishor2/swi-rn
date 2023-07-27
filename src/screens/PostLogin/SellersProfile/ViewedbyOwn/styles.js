import {View, Text, StyleSheet, PixelRatio} from 'react-native';
import React from 'react';
import {SPACING} from '../../../resources';
import { COLORS } from '@app/resources';

export default styles = StyleSheet.create({
 IconStyle:{
    marginLeft:5
 },
 buttonStyle:{
   fontFamily: 'OpenSans-Regular', fontSize: 17
 },
 highlightedButton:{
   color:'#00958C',
   fontFamily:'OpenSans-Bold'
   
   
 },
 lineColor:{
   height: 4,
   width:'50%',
   backgroundColor: '#DBDBDB',
   flexShrink: 1,
 },
 highlightedLine:{
   backgroundColor:'#00958C'
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
   marginLeft: 20,
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
 TextStyle:{
   fontFamily:'Cabin-Bold',
   fontSize:20,
   color:'black'
 },
 socialText:{
   fontFamily:'OpenSans-Regular',
   fontSize:15,
   alignItems:'center'
 },
 socialNumber:{
   fontFamily:'Cabin-Bold',
   fontSize:20,
   alignSelf:'center',
   justifyContent:'center',
   color:COLORS.BLACK
 }
 
});
