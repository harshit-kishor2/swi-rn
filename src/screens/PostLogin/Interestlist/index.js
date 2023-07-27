import { Container, CustomIcon, CustomInput, NavigationBar, Spacer } from "@app/components";
import { ICON_TYPE } from "@app/components/CustomIcon";
import { COLORS, IMAGES } from "@app/resources";
import SearchHeader from "@app/screens/atoms/SearchHeader";

import React from "react";
import { Image, ScrollView, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Searchbar, Text } from "react-native-paper";
import { SearchBar } from "react-native-screens";
import { InterestCard } from "./InterestCard";


export const InterestList = () => {
    return (
        <Container style={{ padding: 15, marginVertical: 20 }}>
            <NavigationBar
                leftSource={IMAGES.BACKARROW}
                leftAction={() => {
                    console.log('first');
                    props.navigation.navigate('CreateAccountScreen');
                }}
                flexDirection="row"
            />
            <View>
                <Text style={{ fontSize: 20, fontFamily: 'Cabin-Bold', color: COLORS.BLACK }}>
                    Interest List
                </Text>
            </View>
            <View
                style={{
                    height: 80,
                    width: '100%',

                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        flex: 1,
                    }}>
                    <CustomInput
                        mode={'outlined'}
                        outlineColor="grey"

                        style={{
                            // flex: 0.85,
                            width: '99%'
                        }}
                        outlineStyle={{
                            borderRadius: 10,
                        }}
                        leftIcon={
                            <CustomIcon
                                style={{
                                    alignSelf: 'center',
                                    paddingTop: 5,
                                }}
                                origin={ICON_TYPE.FEATHER_ICONS}
                                name={'search'}
                                color={'#00000070'}
                                size={20}
                            />
                        }
                        placeholder={'Search by product/brand/model'}
                    />
                </View>
            </View>
            <View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <InterestCard />

                </ScrollView>

            </View>
        </Container>
    )
}



