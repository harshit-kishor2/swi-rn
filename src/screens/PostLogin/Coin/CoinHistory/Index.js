import { View, Text, TouchableOpacity, Image, Alert, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { CustomIcon, Custombutton, NavigationBar } from '@app/components'
import { ICON_TYPE } from '@app/components/CustomIcon'
import { IMAGES } from '@app/resources'
import styles from './styles'
import { CoinHistoryAction } from '@app/store/sellersProfileSclice'
import { connect, useSelector } from 'react-redux'
import { EmptyList } from '../../ChatScreen/commn'


const Item = ({ description, coins_value, type, created_at_dis}) => {
    console.log(type,'dfghjkl')
   
    return (
        <View>
             <View style={{marginHorizontal:20}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 15, fontFamily: 'OpenSans-SemiBold', color: 'black' }}>{description}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Image source={IMAGES.coin} />
                        <Text style={{ marginHorizontal: 10, fontFamily: 'OpenSans-SemiBold', fontSize: 15, color: 'black' }}>{type == "debit" ? coins_value: coins_value}</Text>
                        { type == "credit" && <Image source={IMAGES.GreenTriangle} style={{ marginTop: 5 }} />  }
                        { type == "debit" && <Image source={IMAGES.RedTriangle} style={{ marginTop: 5 }} />  }
                         
                    </View>
                </View>
                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, marginTop: 10 }}>{created_at_dis}</Text>
            </View>
          
            <View style={styles.lineColor} />
        </View >

    )
}
const CoinHistory = (props) => {
    console.log(props,"props value by coin history====>>>>")
    const {getCoinHistory,sellersProfileReducer} = props;

   const Data = sellersProfileReducer?.CoinHistoryAction?.data?.history;
   const Coins = sellersProfileReducer?.CoinHistoryAction?.data?.total_coins;
   console.log(Data,'===========================================')

   const coinValue=  Coins ? Coins : '0';
    useEffect(
        () => {
            getCoinHistory()
        }, []
      )
    const renderItem = ({ item, index }) => (
        <Item
            id={item.id}
            description={item.description}
            coins_value={item.coins_value}
            created_at_dis={item.created_at_dis}
            type={item.type}
          
        />
    )
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
                    <Text style={{ fontSize: 38, fontFamily: 'OpenSans-SemiBold', color: 'black' }}> {coinValue}</Text>
                    <View style={{ height: 100, width: 200 }}>
                        <Text style={styles.TextStyle1}>
                            You have {<Image source={IMAGES.coin} />} {coinValue} coins with you now
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
            
            <FlatList
            data={Data}
            renderItem={renderItem}
            style={{height:500}}
            ListEmptyComponent={EmptyList}
            />
          
            
            
           </View>
            

        </View>
    )
}

const mapStateToProps = state => {
    return {
        authReducer: state.authReducer,
        sellersProfileReducer: state.sellersProfileReducer
    }
}
const mapDispatchToProps = dispatch => ({
    getCoinHistory: params => dispatch(CoinHistoryAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinHistory);