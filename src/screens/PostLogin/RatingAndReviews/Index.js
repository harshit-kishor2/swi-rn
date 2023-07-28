import { Container, CustomIcon, NavigationBar } from "@app/components";
import { ICON_TYPE } from "@app/components/CustomIcon";
import { IMAGES } from "@app/resources";
import React from "react";
import { FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const RatingAndReviews = () => {
    const data = [
        {
            id: 1,
            name: 'star',
            source: ICON_TYPE.EVIL_ICONS
        },
        {
            id: 2,
            name: 'star',
            source: ICON_TYPE.EVIL_ICONS
        },
        {
            id: 3,
            name: 'star',
            source: ICON_TYPE.EVIL_ICONS
        },
        {
            id: 4,
            name: 'star',
            source: ICON_TYPE.EVIL_ICONS
        }
    ]
    return (
        <Container>
            <View style={{ margin: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <NavigationBar
                        leftSource={IMAGES.BACKARROW}
                        leftAction={() => {
                            // console.log('first');
                            props.navigation.navigate('CreateAccountScreen');
                        }}
                        flexDirection="row" />
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: "space-evenly"

                }}>
                    <TouchableOpacity
                    >
                        <Text style={style.btnText} >
                            As A Seller
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    >
                        <Text style={style.btnText}>
                            As A Buyer
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    alignItems: 'center',
                    marginTop: 40
                }}>
                    <Image
                        source={IMAGES.Ellipse7}
                        style={{
                            width: 90,
                            height: 90,
                            borderRadius: 10
                        }}
                    />
                    <Text>Immy Vans</Text>
                    {/* <CustomIcon 
                        source={ICON_TYPE.EVIL_ICONS}
                        name={'star'}
                        color={'#FFBD3D'}
                        size={14}
                    /> */}
                </View>
                <View >
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) =>
                            <View >
                                <CustomIcon
                                    source={item.source}
                                    name={item.name}
                                    size={14}
                                    color={'#FFBD3D'}

                                />

                            </View>


                        }


                    />
                </View>


            </View>
        </Container>
    )

}

const style = StyleSheet.create({

    btnText: {
        fontSize: 17,
        fontFamily: 'OpenSans-SemiRegular',
        color: '#00958C'

    }

})