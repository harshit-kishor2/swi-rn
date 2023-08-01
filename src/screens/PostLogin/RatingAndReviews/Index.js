import { Container, CustomIcon, NavigationBar } from "@app/components";
import { ICON_TYPE } from "@app/components/CustomIcon";
import { COLORS, IMAGES } from "@app/resources";
import { margin } from "@app/resources/mixins";
import React, { useState } from "react";
import { Alert, FlatList, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Rating } from "react-native-ratings";
import styles from "../ItemComparison/styles";

export const RatingAndReviews = () => {
    const userRating = 3;
    const [selected, setSelected] = useState('seller')
    const handlePress = (button) => {
        setSelected(button)
        console.log(selected)

    }
    const handleBuyerPress = (button) => {
        setSelected(button)
    }
    return (
        <Container>
            <View style={{ margin: 20, flex: 1 }}>
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
                    <TouchableOpacity onPress={() => { handlePress('seller') }}
                    >
                        <Text style={style.btnText} >
                            As A Seller
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { handleBuyerPress('buyer') }}
                    >
                        <Text style={style.btnText}>
                            As A Buyer
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <View style={[style.lineStyle, selected === 'seller' && { height: 4, width: '50%', backgroundColor: '#00958C' }]} />
                    <View style={[style.lineStyle, selected === 'buyer' && { height: 4, width: '50%', backgroundColor: '#00958C' }]} />

                </View>


                {selected === 'seller' &&
                    <View style={{ flex: 1 }}>
                        <View style={{
                            alignItems: 'center',
                            marginTop: 30
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
                        <View style={{
                            flexDirection: 'row',
                            // backgroundColor: 'red'
                        }}>
                            <View >
                                <Text style={{
                                    fontSize: 55,
                                    marginTop: 15,
                                    marginLeft: 25,
                                    color: COLORS.BLACK
                                }}>4.0 <Text style={{
                                    fontSize: 37,
                                    marginTop: 15,
                                    marginLeft: 25,
                                    color: COLORS.BLACK
                                }}>/5 </Text></Text>
                            </View>
                            <View style={{ marginTop: 30 }}>
                                <Rating
                                    type="star"
                                    ratingCount={5}
                                    startingValue={userRating}
                                    imageSize={16}
                                    readonly
                                    style={{
                                        marginLeft: 20,
                                    }}
                                />
                                <Text style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginLeft: 20,
                                    marginTop: 5

                                }}>Base on 20 reviews</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 20,


                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontFamily: 'Cabin Regular',
                                color: '#090909',

                            }}>Reviews</Text>
                            <View style={{
                                flexDirection: 'row',

                            }}>
                                <CustomIcon
                                    origin={ICON_TYPE.ANT_ICON}
                                    name={'filter'}
                                    size={16}
                                    color={'#00958C'}
                                    style={{
                                        marginTop: 3,
                                    }}

                                />
                                <Text style={{
                                    fontFamily: 'OpenSans',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    color: '#00958C',
                                    marginLeft: 5,
                                    marginRight: 10
                                }}
                                >Filter</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>

                            <ScrollView showsVerticalScrollIndicator={false}>
                                <FlatList
                                    data={[1, 2]}
                                    renderItem={() => {
                                        return (
                                            <View>
                                                <View style={{ marginTop: 25 }} >
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <View style={{
                                                                height: 29,
                                                                width: 29,
                                                                borderRadius: 29 / 2,
                                                                backgroundColor: '#FF7575',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',

                                                            }}>
                                                                <Text style={{
                                                                    color: COLORS.WHITE,
                                                                    fontSize: 16
                                                                }}>SL</Text>

                                                            </View>
                                                            <Text style={{
                                                                marginLeft: 15,
                                                                fontSize: 16,
                                                                color: COLORS.BLACK

                                                            }}>Su Yan Lao</Text>
                                                        </View>
                                                        <View style={{
                                                            height: 19,
                                                            width: 39,
                                                            backgroundColor: '#028006',
                                                            alignItems: 'center'
                                                        }}><Text style={{ color: COLORS.WHITE }}>5.0</Text></View>
                                                    </View>

                                                </View>
                                                <View>
                                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>
                                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 11, color: COLORS.HYPERLINK }}>30 Dec, 2020</Text>
                                                </View>
                                                <View style={{
                                                    height: 2,
                                                    backgroundColor: '#707070',
                                                    opacity: 0.25,
                                                    marginTop: 5
                                                }}></View>
                                            </View>)
                                    }}
                                />
                                <View style={{
                                    alignItems: 'center'
                                }}>
                                    <TouchableOpacity>
                                        <Text style={{
                                            fontSize: 16,
                                            fontFamily: 'Cabin',
                                            color: '#00958C',
                                            marginTop: 5
                                        }}>See all reviews</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>

                    </View>}

                {selected === 'buyer' &&
                    <View style={{ flex: 1 }}>
                        <View style={{
                            alignItems: 'center',
                            marginTop: 30
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
                        <View style={{
                            flexDirection: 'row',
                            // backgroundColor: 'red'
                        }}>
                            <View >
                                <Text style={{
                                    fontSize: 55,
                                    marginTop: 15,
                                    marginLeft: 25,
                                    color: COLORS.BLACK
                                }}>4.0 <Text style={{
                                    fontSize: 37,
                                    marginTop: 15,
                                    marginLeft: 25,
                                    color: COLORS.BLACK
                                }}>/5 </Text></Text>
                            </View>
                            <View style={{ marginTop: 30 }}>
                                <Rating
                                    type="star"
                                    ratingCount={5}
                                    startingValue={userRating}
                                    imageSize={16}
                                    readonly
                                    style={{
                                        marginLeft: 20,
                                    }}
                                />
                                <Text style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginLeft: 20,
                                    marginTop: 5

                                }}>Base on 20 reviews</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 20,


                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontFamily: 'Cabin Regular',
                                color: '#090909',

                            }}>Reviews</Text>
                            <View style={{
                                flexDirection: 'row',

                            }}>
                                <CustomIcon
                                    origin={ICON_TYPE.ANT_ICON}
                                    name={'filter'}
                                    size={16}
                                    color={'#00958C'}
                                    style={{
                                        marginTop: 3,
                                    }}

                                />
                                <Text style={{
                                    fontFamily: 'OpenSans',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    color: '#00958C',
                                    marginLeft: 5,
                                    marginRight: 10
                                }}
                                >Filter</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>

                            <ScrollView showsVerticalScrollIndicator={false}>
                                <FlatList
                                    data={[1, 2]}
                                    renderItem={() => {
                                        return (
                                            <View>
                                                <View style={{ marginTop: 25 }} >
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <View style={{
                                                                height: 29,
                                                                width: 29,
                                                                borderRadius: 29 / 2,
                                                                backgroundColor: '#FF7575',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',

                                                            }}>
                                                                <Text style={{
                                                                    color: COLORS.WHITE,
                                                                    fontSize: 16
                                                                }}>SL</Text>

                                                            </View>
                                                            <Text style={{
                                                                marginLeft: 15,
                                                                fontSize: 16,
                                                                color: COLORS.BLACK

                                                            }}>Su Yan Lao</Text>
                                                        </View>
                                                        <View style={{
                                                            height: 19,
                                                            width: 39,
                                                            backgroundColor: '#028006',
                                                            alignItems: 'center'
                                                        }}><Text style={{ color: COLORS.WHITE }}>5.0</Text></View>
                                                    </View>

                                                </View>
                                                <View>
                                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>
                                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 11, color: COLORS.HYPERLINK }}>30 Dec, 2020</Text>
                                                </View>
                                                <View style={{
                                                    height: 2,
                                                    backgroundColor: '#707070',
                                                    opacity: 0.25,
                                                    marginTop: 5
                                                }}></View>
                                            </View>)
                                    }}
                                />
                                <View style={{
                                    alignItems: 'center'
                                }}>
                                    <TouchableOpacity>
                                        <Text style={{
                                            fontSize: 16,
                                            fontFamily: 'Cabin',
                                            color: '#00958C',
                                            marginTop: 5
                                        }}>See all reviews</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>

                    </View>
                }

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
    ,
    lineStyle: {
        height: 4, width: '50%', backgroundColor: '#E7E7E7'
    },
    lineStyleHighlite: {
        height: 4, width: '50%', backgroundColor: '#00958C'
    }

})