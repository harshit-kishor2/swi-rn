import { View, Text, StyleSheet, PixelRatio } from 'react-native';
import React from 'react';
import { COLORS, SPACING } from '../../../resources';

export default styles = StyleSheet.create({
    MainContainer: {
        marginVertical: SPACING.SCALE_25,
        padding: SPACING.SCALE_10
    },
    NavigationContainer: {
        marginLeft: SPACING.SCALE_10
    },
    CoinContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SPACING.SCALE_30
    },
    ImageBackgroudContainer: {
        height: SPACING.SCALE_100,
        width: SPACING.SCALE_100
    },
    BoostTextStyle:
    {
        fontSize: SPACING.SCALE_24,
        fontFamily: 'OpenSans-SemiBold',
        textAlign: 'center',
        color: '#000000'
    },
    GroupStyle: {
        backgroundColor: '#F4F4F4',
        height: SPACING.SCALE_50,
        width: SPACING.SCALE_50,
        borderRadius: SPACING.SCALE_10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SPACING.SCALE_20
    },
    ContentTextStyle: {
        marginHorizontal: SPACING.SCALE_10,
        height: '100%',
        width: '70%'
    },
    HedaerStyle: {
        fontSize: SPACING.SCALE_18,
        fontFamily: 'OpenSans-SemiBold',
        textAlign: 'left',
        color: '#000000'
    },
    ContentStyle: {
        fontSize: SPACING.SCALE_14,
        fontFamily: 'OpenSans-Regular',
        textAlign: 'left',
        color: '#4E4E4E',
        marginTop: SPACING.SCALE_10
    },
    pressableStyle: {
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: SPACING.SCALE_20
    },
    hyperlinkStyle: {
        fontFamily: 'OpenSans-SemiBold', 
        fontSize: 16, 
        color: COLORS.HYPERLINK, 
        textDecorationLine: 'underline'
    },
    GroupContainerStyle: {
        flexDirection: 'row',
        margin: SPACING.SCALE_5
    },
    contentMainStyle: {
        marginLeft: SPACING.SCALE_20
    }


});
