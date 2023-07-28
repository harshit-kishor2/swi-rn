import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { CustomIcon, Custombutton, NavigationBar } from '@app/components'
import { ICON_TYPE } from '@app/components/CustomIcon'
import { IMAGES } from '@app/resources'
import styles from './styles'

const CoinHistory = (props) => {
    return (
        <View style={{ margin: 20 }}>

            <NavigationBar
                leftSource={IMAGES.BACKARROW}
                leftAction={() => {
                    // console.log('first');
                    props.navigation.navigate('Explore');
                }}
                flexDirection="row"

            />
            <View style={{ flexDirection: 'row' }}>
                <View style={{ margin: 10, marginTop: 30 }}>
                    <Image
                        source={IMAGES.CoinHistory} style={{ height: 72, width: 92 }} />
                </View>
                <View style={{}}>
                    <Text style={{ fontSize: 38, fontFamily: 'OpenSans-SemiBold', color: 'black' }}> 50</Text>
                    <View style={{ height: 100, width: 200 }}>
                        <Text style={styles.TextStyle1}>
                            You have {<Image source={IMAGES.coin} />} 50 coins with you now
                        </Text>
                    </View>
                </View>
                <View>

                </View>
            </View>

            <Custombutton
                title="Purchase Coins"
                marginTop={10}
                height={50}
                width={'100%'}
                marginHorizontal={20}
                onPress={() => { Alert.alert("") }}
            />

            <View style={{ height: 2,
        width:'100%',
        marginHorizontal:5,
        backgroundColor: 'black',
        flexShrink: 1,
        marginTop:30,
        opacity:0.2}} />

            <Text style={{ fontSize: 20, fontFamily: 'Cabin-Bold', color: 'black', marginLeft: 20, marginTop:20 }}>History</Text>

           <View style={{marginTop:20, }}>
           <View style={{marginHorizontal:20}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 15, fontFamily: 'OpenSans-SemiBold', color: 'black' }}>Boosted Rolex men watch</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Image source={IMAGES.coin} />
                        <Text style={{ marginHorizontal: 10, fontFamily: 'OpenSans-SemiBold', fontSize: 15, color: 'black' }}>20</Text>
                        <Image source={IMAGES.RedTriangle} style={{ marginTop: 5 }} />
                    </View>
                </View>
                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, marginTop: 10 }}>25 Jul, 2023</Text>
            </View>
            <View style={styles.lineColor} />
            
            <View style={{marginHorizontal:20}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 15, fontFamily: 'OpenSans-SemiBold', color: 'black' }}>Purchased Coin</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Image source={IMAGES.coin} />
                        <Text style={{ marginHorizontal: 10, fontFamily: 'OpenSans-SemiBold', fontSize: 15, color: 'black' }}>80</Text>
                        <Image source={IMAGES.GreenTriangle} style={{ marginTop: 5 }} />
                    </View>
                </View>
                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, marginTop: 10 }}>25 Jul, 2023</Text>
            </View>
            <View style={styles.lineColor} />
            <View style={{marginHorizontal:20}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 15, fontFamily: 'OpenSans-SemiBold', color: 'black' }}>Boosted Rolex men watch</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Image source={IMAGES.coin} />
                        <Text style={{ marginHorizontal: 10, fontFamily: 'OpenSans-SemiBold', fontSize: 15, color: 'black' }}>20</Text>
                        <Image source={IMAGES.RedTriangle} style={{ marginTop: 5 }} />
                    </View>
                </View>
                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, marginTop: 10 }}>25 Jul, 2023</Text>
            </View>
           </View>
            

        </View>
    )
}

export default CoinHistory