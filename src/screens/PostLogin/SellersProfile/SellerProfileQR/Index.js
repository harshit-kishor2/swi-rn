import { Container, CustomIcon, NavigationBar } from "@app/components";
import { ICON_TYPE } from "@app/components/CustomIcon";
import { COLORS, IMAGES } from "@app/resources";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const SellerProfileQR = () => {
    return (
        <Container>
            <View style={{ margin: 15 }}>
                <NavigationBar
                    leftSource={IMAGES.BACKARROW}
                    leftAction={() => {
                        console.log('first');
                        props.navigation.navigate('CreateAccountScreen');
                    }}
                    flexDirection="row"
                />
                <View style={{
                    alignItems: 'center',
                    height: 90,
                    width: 90,
                    marginTop: 20,
                    // justifyContent: 'center',
                    alignSelf: 'center'
                }}>
                    <Image
                        source={IMAGES.Ellipse7}
                    />

                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontFamily: 'Cabin-Bold',
                        color: COLORS.BLACK,
                        marginTop: 20
                    }}>Immy van</Text>
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginTop: 3

                }}>
                    <Image
                        source={IMAGES.badge}
                        style={{ height: 15, width: 10 }}
                    />
                    <Text style={{
                        fontFamily: 'Cabin-Regular',
                        fontSize: 14,
                        color: '#737373',
                        marginLeft: 5
                    }}>Premium Seller</Text>
                </View>
                <View style={{
                    alignItems: 'center',
                    marginTop: 30
                }}>
                    <CustomIcon
                        origin={ICON_TYPE.MATERIAL_ICONS}
                        name={'qr-code-2'}
                        color={COLORS.BLACK}
                        size={233}

                    />
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 60

                }}>
                    <TouchableOpacity style={{
                        height: 50,
                        width: 209,
                        backgroundColor: COLORS.BLACK,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10

                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <CustomIcon
                                origin={ICON_TYPE.ANT_ICON}
                                name={'sharealt'}
                                color={COLORS.WHITE}
                                style={{ marginRight: 8, marginTop: 4 }}
                            />
                            <Text style={{
                                fontSize: 20,
                                color: COLORS.WHITE,
                                fontFamily: 'Cabin-SemiBold'
                            }}>
                                Share
                            </Text>
                        </View>

                    </TouchableOpacity>
                </View>




            </View>
        </Container>

    )
}