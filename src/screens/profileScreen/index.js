import { View, Text, Button, Image, Touchable, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthAction } from '../../redux/auth.slice';
import store from '../../store';
import { IMAGES } from '../../resources';
import styles from './styles';


const MyProfileScreen = () => {
  const logout = async () => {
    await AsyncStorage.setItem('Token', '');
    store.dispatch(AuthAction.addIntotokenlogin());
  };
  return (
    <View style={{ flex: 1, margin: 20, marginTop:50 }}>
      <View style={styles.ProfilePicture}>
        <View>
          <Image source={IMAGES.UserProfile1} style={styles.ImageStyle} />
        </View>

        {/* Parallel To Image Section  */}

        <View >
          <View style={styles.NameBadgeStyle}>
            <Text style={styles.NameStyle}>Immy Van</Text>
            <View style={styles.BadgeStyle}>
              <Text> {<Image source={IMAGES.ProfileBadge} />} Premium Dealer</Text>
            </View>
          </View>
          <View style={styles.NameBadgeLineStyle} />
          {/* Verification Line Start */}

          <View>
            <View style={styles.VerificationViewStyle}>
              <Image source={IMAGES.check} style={{ alignSelf: 'center' }} />
              <Text style={styles.VerificationStyle}> SingPass Verified</Text>
            </View>
            <View style={styles.VerificationViewStyle}>
              <Image source={IMAGES.cross} style={{ alignSelf: 'center' }} />
              <Text style={styles.VerificationStyle}> Email verification Pending</Text>
            </View>
            <View style={styles.VerificationViewStyle}>
              <Image source={IMAGES.cross} style={{ alignSelf: 'center' }} />
              <Text style={styles.VerificationStyle}> Phone verification Pending</Text>
            </View>
            <View style={styles.VerificationViewStyle}>
              <Image source={IMAGES.cross} style={{ alignSelf: 'center' }} />
              <Text style={styles.VerificationStyle}> Facebook verification Pending</Text>
            </View>
          </View>
          {/* Verification Line End */}

        </View>



        {/* Parallel to Image section End  */}
      </View>

      <View>
        <Text style={styles.TextStyle1}>You have {<Image source={IMAGES.coin} />} 50 coins with you now</Text>
      </View>
      <View>

        {/* Pages for Navigate */}

          <TouchableOpacity onPress={()=>{
            Alert.alert("Pressed")
          }}>
        <View style={styles.NavigationView}>
          <View style={styles.NavigationViewInner}>
            <Image source={IMAGES.Favorite} />
            <Text style={styles.NavigationText}>My Fevorite {4}</Text>
          </View>
          <View style={styles.NavigationImageStyle}>
            <Image source={IMAGES.Arrow}  />
          </View>
        </View>
          </TouchableOpacity>
         <View style={styles.LineView} />


          <TouchableOpacity onPress={()=>{
            Alert.alert("Pressed")
          }}>
        <View style={styles.NavigationView}>
          <View style={styles.NavigationViewInner}>
            <Image source={IMAGES.userPic} />
            <Text style={styles.NavigationText}>Interest List {4}</Text>
          </View>
          <View style={styles.NavigationImageStyle}>
            <Image source={IMAGES.Arrow}  />
          </View>
        </View>
          </TouchableOpacity>
          
          <View style={styles.LineView}/>


          <TouchableOpacity onPress={()=>{
            Alert.alert("Pressed")
          }}>
        <View style={styles.NavigationView}>
          <View style={styles.NavigationViewInner}>
            <Image source={IMAGES.Dollar} />
            <Text style={styles.NavigationText}>Coin History</Text>
          </View>
          <View style={styles.NavigationImageStyle}>
            <Image source={IMAGES.Arrow}  />
          </View>
        </View>
          </TouchableOpacity>
          
          <View style={styles.LineView} />


          <TouchableOpacity onPress={()=>{
            Alert.alert("Pressed")
          }}>
        <View style={styles.NavigationView}>
          <View style={styles.NavigationViewInner}>
            <Image source={IMAGES.settings} />
            <Text style={styles.NavigationText}>Account Setting </Text>
          </View>
          <View style={styles.NavigationImageStyle}>
            <Image source={IMAGES.Arrow}  />
          </View>
        </View>
          </TouchableOpacity>
          
          <View style={styles.LineView} />

          <TouchableOpacity onPress={()=>{
            Alert.alert("Pressed")
          }}>
        <View style={styles.NavigationView}>
          <View style={styles.NavigationViewInner}>
            <Image source={IMAGES.about} />
            <Text style={styles.NavigationText}>About</Text>
          </View>
          <View style={styles.NavigationImageStyle}>
            <Image source={IMAGES.Arrow}  />
          </View>
        </View>
          </TouchableOpacity>
          <View  style={styles.LineView}/>
          
          
      </View>
      <View>
        <TouchableOpacity onPress={logout}>
          
         <View style={styles.VerificationViewStyle1} >
          <View style={styles.NavigationImageStyle}>

         <Image source={IMAGES.logout} style/>
          </View>
          <Text style={styles.NavigationText}>Logout</Text>
         </View>
        </TouchableOpacity>
      </View>
      {/* <Button title="logout"  /> */}
    </View>
  );
};

export default MyProfileScreen;
