import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Container, NavigationBar } from '@app/components'
import { COLORS, IMAGES } from '@app/resources'
import PageTitle from '@app/screens/atoms/PageTitle'
import ProductCard from '@app/screens/atoms/ProductCard'

const MyFavourites = (props) => {
  return (
    <Container useSafeAreaView={true}>
        <View >
        <View style={{marginHorizontal:10, marginBottom:-10, marginTop:10}}>
        <NavigationBar
                leftSource={IMAGES.BACKARROW}
                leftAction={() => {
                    // console.log('first');
                    props.navigation.navigate('Profile');
                }}
                flexDirection="row"
    />
        </View>

    <View>
                <PageTitle title={'My Favourites'}/>
    </View>


    <FlatList
    data={[1,2,3,4,5,6,7,8]}
    numColumns={2}
    renderItem={()=>{

       return <ProductCard/>
    }}
    
    
    />
    </View>
    </Container>
  )
}

export default MyFavourites