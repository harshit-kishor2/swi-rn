import React from 'react'
import {
  FlatList, Image,
  Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native'

import { COLORS, IMAGES, SPACING } from '@app/resources'
import { NavigationBar } from '@app/components'
import NotificationCard from '@app/screens/atoms/NotificationCard'


// const NotificationScreen = props => {

//   return (
//     <StoryScreen>
//       <View style={ {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',

//       } }>
//         <NavigationBar
//           leftSource={ IMAGES.BACKARROW }
//           leftAction={ () => {
//             console.log('first');
//             props.navigation.navigate('CreateAccountScreen');
//           } }
//           flexDirection="row"
//         />
//         <Pressable
//           onPress={ () => {
//             Alert.alert('pressed');
//           } }>
//           <Image source={ IMAGES.bell } style={ { marginLeft: SPACING.SCALE_10 } } />
//         </Pressable>
//       </View>
//       <View>
//         <Text style={ { fontSize: 20, fontFamily: 'Cabin-Bold', color: COLORS.BLACK } }>
//           Notifications
//         </Text>

//       </View>
//       <ScrollView showsVerticalScrollIndicator={ false }>
//         <Text style={ { fontSize: 18, fontFamily: 'OpenSans-SemiBold', color: 'black', height: 40, marginBottom: 10, marginTop: 20 } }>Today</Text>

//         <View>
//           <FlatList data={ Data }
//             renderItem={ renderItem }
//             nestedScrollEnabled />
//         </View>
//         <Text style={ { fontSize: 18, fontFamily: 'OpenSans-SemiBold', color: 'black', height: 40, marginBottom: 10, marginTop: 20 } }>This Week</Text>
//         <View>
//           <FlatList data={ Data }
//             renderItem={ renderItem }
//           />
//         </View>
//       </ScrollView>
//     </StoryScreen>
//   )
// }

// export default NotificationScreen

// const styles = StyleSheet.create({




const NotificationScreen = (props) => {
  const Data = [
    {
      id: 2,
      post_Title: "Liked Post",
      userId: '1',
      postImage: IMAGES.Ellipse7,
      city: "Lucknow",
      username: 'Radhesh',
      notification: 'Liked Your Post jladskfhksajdfkjadsnfknasdfkjaslkdnfkdsjfkdsmdfnsdfjf this is my toen yousldkjgsjdbgkjdsfajdsgkdfkb',
      Date: "Today",
      status: 'unread',
      day: '30 min ago'
    },
    {
      id: 3,
      post_Title: "Liked Post",
      userId: '1',
      postImage: IMAGES.Ellipse7,
      city: "Lucknow",
      username: 'Radhesh',
      notification: 'Liked Your Post',
      Date: "Today",
      status: 'unread',
      day: '1 hour ago'
    },
    {
      id: 4,
      post_Title: "Liked Post",
      userId: '1',
      postImage: IMAGES.Ellipse7,
      city: "Lucknow",
      username: 'Radhesh',
      notification: 'Liked Your Post ',
      Date: "Last Week",
      status: 'read',
      day: 'Monday'
    },
    {
      id: 5,
      post_Title: "Liked Post",
      userId: '1',
      postImage: IMAGES.Ellipse7,
      city: "Lucknow",
      username: 'Radhesh',
      notification: 'Liked Your Post',
      Date: "Last Week",
      status: 'unread',
      day: 'Sunday'
    },
    {
      id: 6,
      post_Title: "Liked Post",
      userId: '1',
      postImage: IMAGES.Ellipse7,
      city: "Lucknow",
      username: 'Radhesh',
      notification: 'Liked Your Post',
      Date: "Last Week",
      status: 'read',
      day: 'Saturday'
    },
  ]
console.log(props,"notifiaction props=====>>>>>")

  return (
    <View style={{backgroundColor:COLORS.WHITE, }}>
       
       <View style={ {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal:"3%",
        marginVertical:20

      } }>
        <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}>
              <Image
                style={{
                  height: SPACING.SCALE_24,
                  width: SPACING.SCALE_24,
                  resizeMode: 'cover',
                }}
                source={IMAGES.BACKARROW}
              />
            </TouchableOpacity>
     
      </View>
      {/* <View>
        <Text>
          {Data.map((item)=>{
            return(
              <Text>{item.id}</Text>
            )
          })}
        </Text>
      </View> */}
     
      <View>
        <Text style={ { fontSize: 20, fontFamily: 'Cabin-Bold', color: COLORS.BLACK, marginHorizontal:"5%" } }>
          Notifications
        </Text>
        <View>
          <View style={{height:4, width:'10%',backgroundColor:COLORS.HYPERLINK, marginHorizontal:20, borderRadius:10, marginVertical:20}}/>
        </View>

      </View>
      <ScrollView showsVerticalScrollIndicator={ false }>
        <Text style={ { fontSize: 18, fontFamily: 'OpenSans-SemiBold', color: 'black' ,marginHorizontal:"5%", marginTop:'2%'} }>Today</Text>

        <View>
          {/* <FlatList data={ Data }
            renderItem={ renderItem }
            nestedScrollEnabled /> */}
            <NotificationCard data={Data}/>
        </View>
        <Text style={ { fontSize: 18, fontFamily: 'OpenSans-SemiBold', color: 'black',   marginHorizontal:"5%", marginTop:'5%' } }>This Week</Text>
        <View>
          {/* <FlatList data={ Data }
            renderItem={ renderItem }
          /> */}
          <NotificationCard data={Data}/>
        </View>
      </ScrollView>
    </View>
  )
}

export default NotificationScreen
const styles = StyleSheet.create({

  container: {
    borderBottomWidth: 1,
    alignSelf: 'center',
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderColor: '#D8D8D8',

  }
})