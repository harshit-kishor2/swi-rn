import { Container, CustomIcon, NavigationBar } from "@app/components";
import { ICON_TYPE } from "@app/components/CustomIcon";
import { COLORS, IMAGES } from "@app/resources";
import React from "react";
import { FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Rating } from "react-native-ratings";

export const RatingAndReviews = () => {
    const userRating = 3;
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
                    <Text style={{
                        fontSize: 24,
                        fontFamily: 'OpenSans-Bold',
                        color: '#000000',
                        marginTop: 10
                    }}>Immy Vans</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 15
                    }}>
                        <Rating
                            type="star"
                            ratingCount={5}
                            startingValue={userRating}
                            imageSize={16}
                            readonly

                        />
                        <Text style={{
                            fontSize: 13,
                            fontFamily: 'OpenSans-SemiRegular',
                            color: '#454545',
                            marginLeft: 5
                        }}>20 reviews</Text>

                    </View>
                </View>

                <Text style={{
                    fontSize: 18,
                    fontFamily: 'Cabin Regular',
                    color: '#090909',
                    marginTop: 15
                }}>Overall Rating</Text>
                <View>
                    <Text>4/5 </Text>
                    <Rating
                        type="star"
                        ratingCount={5}
                        startingValue={userRating}
                        imageSize={16}
                        readonly
                        style={{
                            flexDirection: 'row',
                            justifyContent: "space-evenly",
                            alignItems: "center"
                        }}
                    />
                </View>




            </View>

        </Container >
    )

}

const style = StyleSheet.create({

    btnText: {
        fontSize: 17,
        fontFamily: 'OpenSans-SemiRegular',
        color: '#00958C'

    }

})