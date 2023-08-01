import { View, Text, TouchableOpacity, FlatList, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { COLORS, IMAGES, SPACING } from '@app/resources'
import { Image } from 'react-native'
import fonts from '@app/resources/fonts'
import styles from './styles'
import listings from './listings'
import { CustomIcon, CustomInput, Custombutton, Custombutton2, NavigationBar } from '@app/components'
import { ICON_TYPE } from '@app/components/CustomIcon'
import { margin } from '@app/resources/mixins'
import { Rating } from 'react-native-ratings'
import { WHITE } from '@app/resources/colors'



const Item = ({
  product_image,
  product_name,
  price,
  condition,
  seller_image,
  seller_name,
  posting_day,
  onPress,

}) => {
  const wishListPress = () => {
    return (
      <>

      </>
    )
  }
  return (

    <TouchableOpacity onPress={onPress}>
      <View style={styles.outer}>
        <View style={styles.inner}>
          <Image source={product_image} style={styles.imageStyle} />
          <TouchableOpacity
            onPress={wishListPress}
            style={{
              position: 'absolute',
              right: -10,
              height: SPACING.SCALE_30,
              width: SPACING.SCALE_30,
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
            <View>
              <View style={{ height: 4, width: 4, borderRadius: 2, backgroundColor: COLORS.WHITE }} />
              <View style={{ height: 4, width: 4, borderRadius: 2, backgroundColor: COLORS.WHITE, marginVertical: 2 }} />
              <View style={{ height: 4, width: 4, borderRadius: 2, backgroundColor: COLORS.WHITE }} />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              marginLeft: 2,
              color: COLORS.BLACK,
            }}>
            {product_name}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text
              style={{
                fontFamily: 'OpenSans-SemiBold',
                fontSize: 12,
                color: COLORS.HYPERLINK,
                marginLeft: 6,
              }}>
              {' '}
              $ {price} .
            </Text>
            <Text
              style={{
                fontFamily: 'Open Sans',
                fontSize: 10,
                marginTop: 2,
                color: COLORS.HYPERLINK,
              }}>
              {' '}
              {condition}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View>
              <Image
                source={seller_image}
                style={{ height: 17, width: 17, marginTop: 5, marginLeft: 8 }}
              />
            </View>
            <View>
              <Text style={{ fontFamily: 'OpenSans-SemiBold', marginLeft: 10 }}>
                {seller_name}
              </Text>
            </View>
          </View>
          <Text
            style={{
              marginLeft: 7,
              fontFamily: 'OpenSans-Regular',
              fontSize: 8,
              marginTop: 10,
            }}>
            {posting_day}
          </Text>
          <View style={{ marginLeft: -8 }}>
            <Custombutton2
              title="Boost Product"
              marginTop={10}
              height={50}
              width={170}
              marginHorizontal={20}
              backgroundColor={'#F6F6F6'}
              fontFamily={'Cabin-Regular'}
              fontSize={18}

            />
          </View>
        </View>
        <View>


        </View>


      </View>

    </TouchableOpacity>
  );
};
const DATA = [
  {
    product_image: IMAGES.Rectangle91,
    product_name: 'Mens Rolex Wat..',
    price: '1200',
    condition: 'Brand New',
    seller_image: IMAGES.Ellipse7,
    seller_name: 'immy van',
    posting_day: 'Posted Two Days Ago',
  },
  {
    product_image: IMAGES.Rectangle91,
    product_name: 'Mens Rolex Wat..',
    price: '1200',
    condition: 'Brand New',
    seller_image: IMAGES.Ellipse7,
    seller_name: 'immy van',
    posting_day: 'Posted Two Days Ago',
  },
  {
    product_image: IMAGES.Rectangle91,
    product_name: 'Mens Rolex Wat..',
    price: '1200',
    condition: 'Brand New',
    seller_image: IMAGES.Ellipse7,
    seller_name: 'immy van',
    posting_day: 'Posted Two Days Ago',
  },
  {
    product_image: IMAGES.Rectangle91,
    product_name: 'Mens Rolex Wat..',
    price: '1200',
    condition: 'Brand New',
    seller_image: IMAGES.Ellipse7,
    seller_name: 'immy van',
    posting_day: 'Posted Two Days Ago',
  },
  {
    product_image: IMAGES.Rectangle91,
    product_name: 'Mens Rolex Wat..',
    price: '1200',
    condition: 'Brand New',
    seller_image: IMAGES.Ellipse7,
    seller_name: 'immy van',
    posting_day: 'Posted Two Days Ago',
  },
  {
    product_image: IMAGES.Rectangle91,
    product_name: 'Mens Rolex Wat..',
    price: '1200',
    condition: 'Brand New',
    seller_image: IMAGES.Ellipse7,
    seller_name: 'immy van',
    posting_day: 'Posted Two Days Ago',
  },

];

const SellersProfileViewByOwn = (props) => {
  
  const [selectedButton, setSelectedButton] = useState('Listing');


  const renderItem = ({ item, index }) => (
    <Item
      product_image={item.product_image}
      product_name={item.product_name}
      price={item.price}
      condition={item.condition}
      seller_image={item.seller_image}
      seller_name={item.seller_name}
      posting_day={item.posting_day}
      index={index}
    />
  );
  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
  }
  const userRating = 4
  return (
    <View style={{

      flex: 1
    }}>
      <View style={ {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal:10,
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

      <View>
        <Image source={IMAGES.BackgroundImage} style={{ height: 130, width: '100%' }} />
        <View style={{ alignItems: 'center', position: 'absolute', justifyContent: 'center', width: '100%', height: '200%' }}>
          <Image source={IMAGES.Ellipse7} style={{ height: 100, width: 100, borderRadius: 50, borderWidth: 5, borderColor: 'white' }} />
        </View>
      </View>


      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
        <Text style={{ fontFamily: 'Cabin-SemiBold', fontSize: 24, color: COLORS.BLACK }}>Immy Van</Text>
        <View style={{ flexDirection: 'row' }}>
          <Image source={IMAGES.ProfileBadge} style={{ marginTop: 5, marginRight: 5 }} />
          <Text style={{ fontFamily: 'Cabin-SemiBold' }}>Premium Seller</Text>
        </View>
      </View>


      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        {/* <Rating/> */}
        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 16, marginLeft: 10, textDecorationLine: 'underline', color: 'black' }}>20 reviews</Text>
      </View>


      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <Text style={{ fontFamily: 'Cabin-SemiBold', fontSize: 16 }}>Verified:</Text>
        <View style={{ flexDirection: 'row', marginHorizontal: 5, justifyContent: 'space-between' }}>

          <View style={{ height: 16, width: 16, borderRadius: 8, backgroundColor: '#797979', justifyContent: 'center', alignItems: 'center' }}>
            <CustomIcon
              origin={ICON_TYPE.ANT_ICON}
              name={'idcard'}
              color={COLORS.WHITE}
              size={8}
            />
          </View>

          <CustomIcon
            origin={ICON_TYPE.ENTYPO}
            name={'mail-with-circle'}
            color={'#797979'}
            size={16}
          />
          <View style={{ height: 16, width: 16, borderRadius: 8, backgroundColor: '#797979', justifyContent: 'center', alignItems: 'center' }}>
            <CustomIcon
              origin={ICON_TYPE.FEATHER_ICONS}
              name={'phone'}
              color={COLORS.WHITE}
              size={8}
            />
          </View>
          <CustomIcon
            origin={ICON_TYPE.ENTYPO}
            name={'facebook-with-circle'}
            color={'#797979'}
            size={16}
          />
        </View>
      </View>


      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 20,
          marginBottom: 10

        }}>
        <View>

          <TouchableOpacity
            onPress={() => {
              // Alert.alert('Compare');
              handleButtonPress('Listing');
            }}>
            <Text style={[styles.buttonStyle, selectedButton === 'Listing' && styles.highlightedButton]}>Listings</Text>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            height: 30,
            width: 0.4,
            backgroundColor: 'gray',
            flexShrink: 1,
          }}
        /> */}
        <View >
          <TouchableOpacity
            onPress={() => {
              // Alert.alert('Price Alert');
              handleButtonPress('About');
            }}>
            <Text
              style={[styles.buttonStyle, selectedButton === 'About' && styles.highlightedButton]}>
              About
            </Text>
          </TouchableOpacity>
        </View>

      </View>
      <View style={{ flexDirection: 'row', marginBottom: 20, marginHorizontal: 10 }}>
        <View
          style={[styles.lineColor, selectedButton === 'Listing' && styles.highlightedLine]}
        />
        <View
          style={[styles.lineColor, selectedButton === 'About' && styles.highlightedLine]}
        />
      </View>
      {selectedButton === 'Listing' && (
        <ScrollView style={{}}>

          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: "center",
                alignItems: 'center',
                marginLeft: 22
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
            <FlatList
              data={DATA}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              numColumns={2}
            />

          </View>
        </ScrollView>
      )}

      {selectedButton === 'About' && (

        <ScrollView horizontal={false} contentContainerStyle={{ flexGrow: 1, }}
        >

          <View style={{
            backgroundColor: '#F0F2FA',
            height: 78,
            width: 394,
            marginTop: 12
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 12
            }}>
              <Text style={styles.socialNumber}> 54 </Text>
              <Text style={styles.socialNumber}> 256 </Text>
              <Text style={styles.socialNumber}> 340 </Text>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',

            }}>
              <Text style={styles.socialText}> Post </Text>
              <Text style={styles.socialText}> Followers </Text>
              <Text style={styles.socialText}>Visitors </Text>
            </View>
            <View>

            </View>

          </View>

          <View style={{ margin: 20 }}>
            <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 15 }}>About</Text>

            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 16, marginTop: 10 }}>Suspendisse viverra luctus quam, sed fringilla nulla. Pellentesque quis massa tincidunt, iaculis ipsum sed pretium.</Text>
          </View>
          <View
            style={{ height: 1, marginHorizontal: 20, width: '90%', backgroundColor: '#000000' }}
          />

          <View style={{ flexDirection: 'column', marginHorizontal: 20, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <Text>Location</Text>
              <Text style={{ width: '50%' }}>Shop #2 Marina Bay San</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <Text>Opening Hour</Text>
              <Text style={{ width: '50%' }}>Monday -Saturday
                (11:00am -9:00pm)</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <Text>Contact</Text>
              <Text style={{ width: '50%' }}>+65 6549796565</Text>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <Text>WebSite</Text>
              <Text style={{ width: '50%' }}>immyvan.com</Text>


            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <Text>Socials</Text>
              <Text style={{ width: '50%' }}>facebook/immyvan</Text>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <Text>Payment Mode</Text>
              <Text style={{ width: '50%' }}>Cash, Credit Card</Text>


            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <Text>Joined Since</Text>
              <Text style={{ width: '50%' }}>24 September 2021</Text>

            </View>

          </View>
        </ScrollView>

      )}
    </View>
  )
}


const mapStateToProps = dispatch => ({
  onSel
})
export default SellersProfileViewByOwn

