import { View, Text, Image, ImageBackground, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { CustomIcon, Custombutton, NavigationBar } from '@app/components';
import { IMAGES, SPACING } from '@app/resources';
import styles from './styles';
import { ICON_TYPE } from '@app/components/CustomIcon';





//   };
const DATA = [
    {
        coinNumber: 300,
        price: 30
    },
    {
        coinNumber: 500,
        price: 50
    },
    {
        coinNumber: 800,
        price: 80
    },


];



export const BuyCoins = (props) => {
    const [selected, setSelected] = useState()
    return (
        <View style={{ margin: 10 }}>
            <NavigationBar
                leftSource={IMAGES.BACKARROW}
                leftAction={() => {
                    // console.log('first');
                    // props.navigation.navigate('CreateAccountScreen');
                }}
                flexDirection="row"

            />
            <View style={styles.CoinContainer}>

                <ImageBackground source={IMAGES.bag} style={styles.ImageBackgroudContainer}>
                    <Image style={{
                        top: SPACING.SCALE_1,
                        marginLeft: 55,
                        height: 58,
                        width: 73
                    }} source={IMAGES.CoinBoostNow} />

                </ImageBackground>

            </View>

            <View style={styles.TextContainer}>
                <Text style={styles.TopText}>Buy coins now</Text>
                <Text style={styles.TopText}> and help your post</Text>
                <Text style={styles.TopText}>   to boost.</Text>
            </View>

            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <TouchableOpacity>
                    <Text style={styles.TextStyle1}>
                        Get it Now
                    </Text>

                </TouchableOpacity>

            </View>

            <FlatList
                data={DATA}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            setSelected(index);
                            console.log(index)
                        }}>
                            <View style={[styles.cardStyle, index === selected && styles.highlightedLine]}>
                                <View style={{
                                    justifyContent: 'space-between',
                                    flexDirection: 'row'
                                }}>
                                    <Text style={styles.outerText}>Get
                                        <Image source={IMAGES.coin} style={{ marginLeft: 2 }} />
                                        <Text style={styles.innerText}> {item.coinNumber} </Text>
                                        <Text style={{
                                            fontSize: 14,
                                            fontFamily: 'OpenSans-SemiBold',
                                            color: '#7C7C7C'
                                        }}>for</Text>
                                    </Text>

                                    <View style={styles.CardCoinStyle}>
                                        <CustomIcon
                                            origin={ICON_TYPE.FOUNDATION}
                                            name={'dollar'}
                                            color={'#00958C'}
                                            size={30}
                                            style={{ marginTop: -8, }}

                                        />
                                        <Text style={styles.NumberStyle}>{item.price}</Text>
                                    </View>
                                </View>
                            </View>

                        </TouchableOpacity>
                    );
                }}
            />

            <View>
                <Custombutton
                    title="Pay Now"
                    marginTop={10}
                    height={50}
                    width={'100%'}
                    marginHorizontal={20}
                // onPress={() => { Alert.alert("") }}
                />
            </View>

            <TouchableOpacity style={{ alignSelf: 'center', marginTop: 30 }}>
                <Text
                    style={{
                        fontSize: 14,
                        color: '#00958C',
                        fontFamily: 'OpenSans-Regular',
                        textDecorationLine: 'underline',
                    }}
                    onPress={() => {
                        // Alert.alert('in process');
                    }}>
                    Not now, I'll do it later
                </Text>
            </TouchableOpacity>
        </View>
    )
}

