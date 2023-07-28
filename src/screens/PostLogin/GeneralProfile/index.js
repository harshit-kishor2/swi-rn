import { Container, NavigationBar } from "@app/components";
import CustomIcon, { ICON_TYPE } from "@app/components/CustomIcon";
import { COLORS, IMAGES } from "@app/resources";
import { margin } from "@app/resources/mixins";
import React from "react";
import { Text } from "react-native";
import { Image, View } from "react-native";


export const GeneralProfile = () => {
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
                        flexDirection="row"

                    />
                    <View style={{ flexDirection: 'row', margin: 15 }}>
                        <View style={{ marginRight: 15 }}>
                            <CustomIcon
                                origin={ICON_TYPE.FEATHER_ICONS}
                                name={'edit-2'}
                                color={COLORS.BLACK}
                                size={24}
                            />
                        </View>
                        <CustomIcon
                            origin={ICON_TYPE.ANT_ICON}
                            name={'qrcode'}
                            color={COLORS.BLACK}

                        />
                    </View>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image
                        source={IMAGES.Ellipse7}
                        style={{
                            height: 90,
                            width: 90,
                            borderRadius: 10,
                        }}
                    />
                </View>
                <View style={{ alignItems: 'center', marginTop: 15 }}>
                    <Text style={{
                        fontSize: 24,
                        color: COLORS.BLACK,
                        fontFamily: 'OpenSans-Bold'
                    }}>Wilson Churchill</Text>
                    <Text style={{
                        fontSize: 14,
                        color: '#737373',
                        marginTop: 10,
                        fontFamily: 'OpenSans-Regular'
                    }}>wilsonchurchil@gmail.com</Text>
                    <Text style={{
                        fontSize: 14,
                        fontFamily: 'OpenSans-Regular',
                        marginTop: 10
                    }}>+65 5415254987</Text>
                </View>
                <View style={{
                    height: 2,
                    backgroundColor: '#00000033',
                    marginHorizontal: 10,
                    marginTop: 20,
                    width: '95%'
                }}></View>
                <View >
                    <Text style={{
                        fontFamily: 'OpenSans-Bold',
                        fontSize: 15,
                        marginTop: 20,
                        color: COLORS.BLACK
                    }}>About </Text>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: 'OpenSans-Regular',
                        color: COLORS.BLACK
                    }}>Suspendisse
                        viverra luctus quam, sed fringilla nulla. Pellentesque quis
                        massa tincidunt, iaculis ipsum sed, pretium purus.</Text>
                </View>
                <View style={{
                    height: 2,
                    backgroundColor: '#00000033',
                    marginHorizontal: 8,
                    marginTop: 20,
                    width: '95%'
                }}></View>
                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }} >
                        <CustomIcon
                            origin={ICON_TYPE.SIMPLE_LINE_ICONS}
                            name={'user-follow'}
                            color={COLORS.BLACK}
                            size={26}
                        />
                        <Text style={{
                            fontFamily: 'OpenSans-Bold',
                            fontSize: 16,
                            color: COLORS.BLACK,
                            marginLeft: 25
                        }}>42 Following</Text>

                    </View>
                    <View >
                        <CustomIcon
                            origin={ICON_TYPE.ANT_ICON}
                            name={'right'}
                            color={COLORS.BLACK}
                            size={26}
                        />
                    </View>
                </View>
                <View style={{
                    height: 2,
                    backgroundColor: '#00000033',
                    marginHorizontal: 8,
                    marginTop: 20,
                    width: '95%'
                }}></View>

            </View>




        </Container>
    )
}