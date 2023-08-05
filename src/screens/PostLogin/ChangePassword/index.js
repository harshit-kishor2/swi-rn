import { Container, CustomIcon, CustomInput, CustomText, NavigationBar, Spacer } from "@app/components";
import { ICON_TYPE } from "@app/components/CustomIcon";
import { COLORS, IMAGES } from "@app/resources";
import LoginHeader from "@app/screens/atoms/LoginHeader";
import React from "react";
import { Text } from "react-native";
import { View } from "react-native";

export const ChangePassword = () => {
    return (
        <Container useSafeAreaView={true}>
            <View style={{ margin: 15 }}>
                <NavigationBar
                    leftSource={IMAGES.BACKARROW}
                    leftAction={() => {
                        console.log('first');
                        props.navigation.navigate('CreateAccountScreen');
                    }}
                    flexDirection="row"
                />

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {/* <Text style={{
                        fontFamily: 'Cabin-Bold',
                        fontSize: 40,
                        color: COLORS.BLACK
                    }}>Change Password </Text> */}
                    <LoginHeader
                        title={"Change Password"}
                    />
                </View>
                <View style={{
                    // // alignContent: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    marginHorizontal: 50



                }}>
                    <CustomInput
                        placeholder='Enter old Password'
                        returnKeyType="next"


                        leftIcon={
                            <CustomIcon
                                origin={ICON_TYPE.FEATHER_ICONS}
                                name={'lock'}
                                color={COLORS.BLACK}
                                style={{
                                    marginRight: 10,

                                    // width: 240
                                }}

                            />
                        }
                    />
                    <CustomInput
                        placeholder='Enter New Password'
                        returnKeyType="next"
                        leftIcon={
                            <CustomIcon
                                origin={ICON_TYPE.FEATHER_ICONS}
                                name={'lock'}
                                color={COLORS.BLACK}
                                style={{ marginRight: 10 }}

                            />
                        }
                    />
                    <CustomInput
                        placeholder='Confirm New Password'
                        returnKeyType="next"
                        leftIcon={
                            <CustomIcon
                                origin={ICON_TYPE.FEATHER_ICONS}
                                name={'lock'}
                                color={COLORS.BLACK}
                                style={{ marginRight: 10 }}

                            />

                        }
                    />
                </View>
            </View>
        </Container>
    )
}