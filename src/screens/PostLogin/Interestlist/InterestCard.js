import { Container, CustomIcon, CustomInput, NavigationBar, Spacer } from "@app/components";
import { ICON_TYPE } from "@app/components/CustomIcon";
import { COLORS, IMAGES, SPACING } from "@app/resources";

import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

import { create } from "react-test-renderer";


const Item = ({ name, content, price, brand }) => {
    return (
        <View>
            <View
                style={style.main}>
                <View
                    style={{
                        flexDirection: 'row',
                        marginLeft: 10,
                        marginTop: 20
                    }}>
                    <Image
                        source={IMAGES.Ellipse7}
                        style={style.Image1} />
                    <Text style={{
                        fontSize: 20,

                        justifyContent: 'center',
                        color: '#232323',
                        fontFamily:'Cabin-SemiBold'
                    }}> {name}</Text>
                </View>
                <View style={{ margin: 5 }}>
                    <Text style={{
                        fontSize: 16,
                        marginLeft: 10,
                        fontFamily:'OpenSans-Regular'
                    }}>
                        {content}
                    </Text>
                    <View style={{ flexDirection: 'row', }}>
                        <Text
                            style={style.txtprice}>{price} </Text>
                        <Text style={style.brand}>. {brand} </Text>
                    <View style={{marginTop:-10}}>
                    <Image source={IMAGES.send_Icon} style={{ marginLeft: 160 }} />

                    </View>
                    </View>
                </View>
            </View>
        </View >

    )
}



export const InterestCard = () => {

    const Data = [
        {
            id: 1,
            name: 'Wilson Churchill',
            content: 'Rolex leather analog watch',
            price: '$125',
            brand: 'Brand New'
        },
        {
            id: 2,
            name: 'Wilson Churchill',
            content: 'Rolex leather analog watch',
            price: '$125',
            brand: 'Brand New'
        },
        {
            id: 3,
            name: 'Wilson Churchill',
            content: 'Rolex leather analog watch',
            price: '$125',
            brand: 'Brand New'
        },
        {
            id: 4,
            name: 'Wilson Churchill',
            content: 'Rolex leather analog watch',
            price: '$125',
            brand: 'Brand New'
        },
        {
            id: 4,
            name: 'Wilson Churchill',
            content: 'Rolex leather analog watch',
            price: '$125',
            brand: 'Brand New'
        },
        {
            id: 1,
            name: 'Wilson Churchill',
            content: 'Rolex leather analog watch',
            price: '$125',
            brand: 'Brand New'
        },
        {
            id: 2,
            name: 'Wilson Churchill',
            content: 'Rolex leather analog watch',
            price: '$125',
            brand: 'Brand New'
        },
        {
            id: 3,
            name: 'Wilson Churchill',
            content: 'Rolex leather analog watch',
            price: '$125',
            brand: 'Brand New'
        },
        {
            id: 4,
            name: 'Wilson Churchill',
            content: 'Rolex leather analog watch',
            price: '$125',
            brand: 'Brand New'
        },
        {
            id: 4,
            name: 'Wilson Churchill',
            content: 'Rolex leather analog watch',
            price: '$125',
            brand: 'Brand New'
        }
    ]

    const renderItem = ({ item, index }) => (
        <Item
            id={item.id}
            name={item.name}
            content={item.content}
            brand={item.brand}
            price={item.price}
            index={index}
        />
    )
    return (
        <View >
            <FlatList
                style={{ margin: 5 }}
                data={Data}
                renderItem={renderItem}
            />
        </View>
    )

}
const style = StyleSheet.create({
    main: {
        backgroundColor: '#F9F9F9',
        width: SPACING.SCALE_332,
        height: SPACING.SCALE_114,
        borderRadius: 10,
        marginVertical: 7,
    },
    Image1: {
        height: 30, width: 30,
        borderRadius: 25
    },
    txtprice: {
        fontSize: 18,
        color: '#00958C',
        marginLeft: 10,
        marginTop: 5,
        fontFamily:'Cabin-Bold'
    },
    brand: {
        fontSize: 12,
        color: '#00958C',
        marginTop: 10,
        margin: 5,
        fontFamily:'Cabin-Regular'
    }


})