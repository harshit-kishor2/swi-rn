import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable, FlatList, ScrollView } from 'react-native'
import React from 'react'
import StoryScreen from '../../components/StoryScreen'
import NavigationBar from '../../components/NavigationBar'
import { IMAGES, SPACING, COLORS } from '../../resources'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const Item=(
  {id,
    userId, 
      post_Title,
      postImage ,
      city,
      username,
      notification,
      Date,
      day,
      
    status}
)=>{
  return(
    <View style={{backgroundColor: status=='unread' ? '#F0F2FA' : 'white' }}>
      {/* <Text>{id}</Text>
      <Text>{post_Title}</Text>
      <View>
        <Image source={postImage} style={{height:100, width:100, borderRadius:50}}/>
      </View>
      <Text>{city}</Text>
      <Text>{username}</Text>
      <Text>{notification}</Text>
      <Text>{Date}</Text> */}
     
      <View style={[styles.container,
        {
            width:  '90%',
            height:  90,
            flexDirection:'row',
            justifyContent:'space-evenly' ,
            marginTop:20
        },]}>
        <View style={{flex:1}}>
          <Image source={postImage}style={{height:40, width:40,  borderRadius:20,}}/>
        </View>
        <View style={{flex:3}}>
          <Text style={{fontFamily:'OpenSans-Regular',color:'black', fontSize:14}}>{username? username:post_Title} {notification}</Text>
          <Text style={{marginTop:15, fontFamily:'OpenSans-Regular', fontSize:11}}>{day}</Text>
        </View>
      </View>
    </View>
  )

}
const NotoficationScreen = props => {
  const Data=[
    {
      id:2,
      post_Title:"Liked Post",
      userId:'1',
      postImage:IMAGES.Ellipse7, 
      city: "Lucknow",
      username:'Radhesh',
      notification:'Liked Your Post',
      Date:"Today",
      status:'unread',
      day:'30 min ago'
    },
    {
      id:3,
      post_Title:"Liked Post",
      userId:'1',
      postImage:IMAGES.Ellipse7, 
      city: "Lucknow",
      username:'Radhesh',
      notification:'Liked Your Post',
      Date:"Today",
      status:'unread',
      day:'1 hour ago'
    },
    {
      id:4,
      post_Title:"Liked Post",
      userId:'1',
      postImage:IMAGES.Ellipse7, 
      city: "Lucknow",
      username:'Radhesh',
      notification:'Liked Your Post ',
      Date:"Last Week",
      status:'read',
      day:'Monday'
    },
    {
      id:5,
      post_Title:"Liked Post",
      userId:'1',
      postImage:IMAGES.Ellipse7, 
      city: "Lucknow",
      username:'Radhesh',
      notification:'Liked Your Post',
      Date:"Last Week",
      status:'unread',
      day:'Sunday'
    },
    {
      id:6,
      post_Title:"Liked Post",
      userId:'1',
      postImage:IMAGES.Ellipse7, 
      city: "Lucknow",
      username:'Radhesh',
      notification:'Liked Your Post',
      Date:"Last Week",
      status:'read',
      day:'Saturday'
    },
  ]
  
  const renderItem = ({item, index}) => (
    <Item
    id={item.id}
    userId={item.userId}
    post_Title={item.post_Title}
    postImage={item.postImage}
    city={item.city}
    username={item.username}
    notification={item.notification}
    Date={item.Date}
    status={item.status}
    day={item.day}
      index={index}
    />
  );
  return (
   <StoryScreen>
    <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
         
        }}>
    <NavigationBar
        leftSource={IMAGES.BACKARROW}
        leftAction={() => {
          console.log('first');
          props.navigation.navigate('CreateAccountScreen');
        }}
        flexDirection="row"
      />
    <Pressable
          onPress={() => {
            Alert.alert('pressed');
          }}>
          <Image source={IMAGES.bell} style={{marginLeft: SPACING.SCALE_10}} />
        </Pressable>
    </View>
    <View>
          <Text style={{fontSize:20, fontFamily:'Cabin-Bold',color:COLORS.BLACK}}>
            Notifications
          </Text>

    </View>
   <ScrollView showsVerticalScrollIndicator={false}>
   <Text style={{fontSize:18, fontFamily:'OpenSans-SemiBold', color:'black', height:40,  marginBottom:10, marginTop:20}}>Today</Text>

<View>
  <FlatList data={Data}
   renderItem={renderItem}
   nestedScrollEnabled/>
</View>
<Text style={{fontSize:18, fontFamily:'OpenSans-SemiBold', color:'black', height:40,  marginBottom:10, marginTop:20}}>This Week</Text>
<View>
  <FlatList data={Data}
   renderItem={renderItem}
   />
</View>
   </ScrollView>
   </StoryScreen>
  )
}

export default NotoficationScreen

const styles = StyleSheet.create({

  container:{
    borderBottomWidth: 1,   
    alignSelf: 'center',
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderColor:'#D8D8D8',
    
}
})