import {IMAGES, SPACING} from '@app/resources';
import store from '@app/store';
// import {logoutAction} from '@app/store/authSlice/auth.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {SharedPreference} from '@app/helper';
import {useDispatch} from 'react-redux';
import {logoutAction} from '@app/store/authSlice';
import {useState} from 'react';
import {Container, Spacer} from '@app/components';

const MyProfileScreen = props => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dispatch = useDispatch();
  const logout = async () => {
    await AsyncStorage.setItem('Token', '');
    SharedPreference.multiRemove([
      SharedPreference.keys.IS_AUTHENTICATE,
      SharedPreference.keys.TOKEN,
    ]);
    dispatch(logoutAction());
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setIsLoggingOut(false),
        },
        {text: 'Logout', style: 'destructive', onPress: () => performLogout()},
      ],
      {cancelable: false},
    );
  };

  const performLogout = () => {
    logout();
    // Your logout logic goes here
    // For example: call an API to clear user session, navigate to login screen, etc.
    setIsLoggingOut(false);
    // Add your logout logic here
  };
  return (
    <Container useSafeAreaView={Platform.OS === 'ios' ? true : false}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            height: SPACING.SCALE_145,
            backgroundColor: '#F6F6F6',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.ProfilePicture}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Sellers Own Profile');
              }}>
              <View
                style={{
                  //marginLeft: SPACING.SCALE_10,
                  marginTop: SPACING.SCALE_25,
                }}>
                <Image source={IMAGES.UserProfile1} style={styles.ImageStyle} />
              </View>
            </TouchableOpacity>
            <Spacer width={20} />

            {/* Parallel To Image Section  */}

            <View
              style={{
                //backgroundColor: 'green',
                marginRight: SPACING.SCALE_10,
                marginTop: SPACING.SCALE_10,
              }}>
              <View style={styles.NameBadgeStyle}>
                <Text style={styles.NameStyle}>Immy Van</Text>
                <Spacer width={SPACING.SCALE_8} />
                <View style={styles.BadgeStyle}>
                  <Text>
                    {' '}
                    {<Image source={IMAGES.ProfileBadge} />} Premium Dealer
                  </Text>
                </View>
              </View>
              <View style={styles.NameBadgeLineStyle} />
              {/* Verification Line Start */}

              <View>
                <View style={styles.VerificationViewStyle}>
                  <Image source={IMAGES.check} style={{alignSelf: 'center'}} />
                  <Text style={styles.VerificationStyle}> Email Verified</Text>
                </View>
                <View style={styles.VerificationViewStyle}>
                  <Image source={IMAGES.cross} style={{alignSelf: 'center'}} />
                  <Text style={styles.VerificationStyle}>
                    {' '}
                    SingPass verification Pending
                  </Text>
                </View>
              </View>
              {/* Verification Line End */}
              <Spacer height={SPACING.SCALE_30} />
            </View>

            {/* Parallel to Image section End  */}
          </View>
        </View>
        <View style={{}}>
          <Text style={styles.TextStyle1}>
            You have {<Image source={IMAGES.coin} />} 50 coins with you now
          </Text>
        </View>
        <View
          style={{
            // backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Spacer height={SPACING.SCALE_20} />
          {/* Pages for Navigate */}

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              //Alert.alert('Pressed');
            }}>
            <View style={styles.NavigationView}>
              <View style={styles.NavigationViewInner}>
                <Image source={IMAGES.Favorite} />
                <Text style={styles.NavigationText}>My Favourite</Text>
              </View>
              <View style={styles.NavigationImageStyle}>
                <Image resizeMode="contain" source={IMAGES.Arrow} />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.LineView} />

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              // Alert.alert('Pressed');
            }}>
            <View style={styles.NavigationView}>
              <View style={styles.NavigationViewInner}>
                <Image source={IMAGES.userPic} />
                <Text style={styles.NavigationText}>Interest List</Text>
              </View>
              <View style={styles.NavigationImageStyle}>
                <Image resizeMode="contain" source={IMAGES.Arrow} />
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.LineView} />

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              // Alert.alert('Pressed');
              props.navigation.navigate('Coin History');
            }}>
            <View style={styles.NavigationView}>
              <View style={styles.NavigationViewInner}>
                <Image source={IMAGES.Dollar} />
                <Text style={styles.NavigationText}>Coin History</Text>
              </View>
              <View style={styles.NavigationImageStyle}>
                <Image resizeMode="contain" source={IMAGES.Arrow} />
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.LineView} />

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              // Alert.alert('Pressed');
            }}>
            <View style={styles.NavigationView}>
              <View style={styles.NavigationViewInner}>
                <Image source={IMAGES.settings} />
                <Text style={styles.NavigationText}>Account Setting </Text>
              </View>
              <View style={styles.NavigationImageStyle}>
                <Image resizeMode="contain" source={IMAGES.Arrow} />
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.LineView} />

          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <View style={styles.NavigationView}>
              <View style={styles.NavigationViewInner}>
                <Image source={IMAGES.about} />
                <Text style={styles.NavigationText}>About</Text>
              </View>
              <View style={styles.NavigationImageStyle}>
                <Image resizeMode="contain" source={IMAGES.Arrow} />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.LineView} />
        </View>
        <View>
          <TouchableOpacity onPress={handleLogout}>
            <View style={styles.VerificationViewStyle1}>
              <View style={styles.NavigationImageStyle}>
                <Image source={IMAGES.logout} style />
              </View>
              <Text style={styles.NavigationText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <Button title="logout"  /> */}
      </ScrollView>
    </Container>
  );
};

export default MyProfileScreen;
