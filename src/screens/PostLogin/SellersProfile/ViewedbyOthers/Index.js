import { Container, CustomIcon, CustomInput, NavigationBar } from "@app/components";
import { ICON_TYPE } from "@app/components/CustomIcon";
import { COLORS, IMAGES, SPACING } from "@app/resources";
import { margin } from "@app/resources/mixins";
import ProductCard from "@app/screens/atoms/ProductCard";
import { sellerProductListingAction } from "@app/store/sellersProfileSclice";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { FlatList, Image, Text, View } from "react-native";
import { connect, useSelector } from "react-redux";

import RNBranch from 'react-native-branch';
import ProductCardFav from "@app/screens/atoms/ProductCardFav";
import { EmptyList } from "../../ChatScreen/commn";

const generateDeepLink = async () => {
  const branchUniversalObject = await RNBranch.createBranchUniversalObject({
    title: 'My Deep Link',
    contentDescription: 'Description of your content',
    contentImageUrl: 'https://example.com/image.jpg', // Optional
    contentMetadata: {
      customKey: 'customValue',
    },
  });

  const linkProperties = {
    feature: 'share',
    channel: 'QR Code',
  };

  const controlParams = {
    $desktop_url: 'https://example.com', // Fallback URL
  };

  const { url } = await branchUniversalObject.generateShortUrl(linkProperties, controlParams);
  console.log('Generated deep link:', url);
  return url;
};

const QRCode = ()=>{
    
}

const SellerProfileViewByOther = (props) => {

    const{getProductList, sellersProfileReducer}=props
    const [sellerListing, setSellerListing] = useState('Listing');
    const handleButton = (data) => {
        setSellerListing(data);
    }
    console.log(props, "View By others Design")
    const item = sellersProfileReducer?.sellerProductListingAction?.data;
    console.log(props.sellersProfileReducer, "Reducer response data===============>>>>>>>>>>>>>>")

    const Data = [
        {
            id: 1,
            star: IMAGES.starimage

        }
    ]
    

    useEffect(
        () => {
            if(props.route.params){
            getProductList(props.route.params)
            }

        }, []
    )
    const renderItem = ({item, index}) => {
    
        return <ProductCard key={index} item={item} />;
      };
    return (
        <View style={{ flex: 1 }}>
            <View >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                    marginVertical: 20

                }}>
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
                    <Image source={IMAGES.coverSellerProfile}
                        style={{ width: 393, height: 125 }} />
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: "absolute",
                        width: '100 %',
                        height: "200%"

                    }}>
                        <Image source={IMAGES.Ellipse7}
                            style={{
                                height: 100, width: 100,
                                borderRadius: 50,
                                borderWidth: 5,
                                borderColor: COLORS.WHITE

                            }} />
                    </View>
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 50
                }} >
                    <Text style={{
                        fontSize: 24,
                        color: '#000000'
                    }}>Immy Van</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image source={IMAGES.ProfileBadge} />
                    <Text style={{
                        fontSize: 16,
                        color: '#737373', marginLeft: 5
                    }}>Premium Seller</Text>
                </View>
                <View style={{
                    flexDirection: 'row',

                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image source={IMAGES.starimage} />
                    <Image source={IMAGES.starimage} />
                    <Image source={IMAGES.starimage} />
                    <Image source={IMAGES.starimage} />
                    <Image source={IMAGES.starimage} />
                    <Text style={{
                        fontSize: 16,
                        color: '#454545',
                        margin: 5,
                        fontWeight: 'bold'
                    }}>20 reviews</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        color: '#7C7C7C',
                        fontSize: 16,
                        fontWeight: 'bold'
                    }}>Verified : </Text>
                    <Image source={IMAGES.Seller__Singpass} style={style.verifiedImage} />
                    <Image source={IMAGES.Seller_gmail} style={style.verifiedImage} />
                    <Image source={IMAGES.Seller_phone_call} style={style.verifiedImage} />
                    <Image source={IMAGES.Seller_facebook} style={style.verifiedImage} />
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 20,
                marginBottom: 10
            }}>

                <TouchableOpacity
                    onPress={() => { handleButton('Listing') }}
                >
                    <Text style={[style.button, sellerListing === 'Listing' && style.buttonClick]}
                    >Listings</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => { handleButton('About') }}>
                    <Text style={[style.button, sellerListing === 'About' && style.buttonClick]}

                    >About</Text>
                </TouchableOpacity>


            </View>
            {sellerListing === 'Listing' && <View>
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
                <Text style={{
                    fontFamily: 'Cabin',
                    fontSize: 20,
                    color: '#000000',
                    marginTop: 10,
                    marginLeft: 20,
                    marginBottom: 10

                }}>Watches posted by Immy</Text>
               <View>
               <FlatList
               data={item}
                renderItem={renderItem}
                numColumns={2}
                ListEmptyComponent={EmptyList}
                
                
                />
                </View>

            </View>

            }
            {sellerListing === 'About' &&

                <ScrollView horizontal={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{
                        backgroundColor: '#F0F2FA',
                        height: 78,
                        width: 394,
                        marginTop: 12
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            marginTop: 12,
                            //backgroundColor: 'green'
                        }}>
                            <Text style={style.socialNumber}> 4 </Text>
                            <Text style={style.socialNumber}> 256 </Text>
                            <Text style={style.socialNumber}> 340 </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',

                        }}>
                            <Text style={style.socialText}> Post </Text>
                            <Text style={style.socialText}> Followers </Text>
                            <Text style={style.socialText}>Visitors  </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{
                            backgroundColor: '#000000',
                            height: 50,
                            width: 209,
                            borderRadius: 10,
                            marginTop: 25,
                            marginLeft: 30,
                        }}>
                            <Text style={{
                                color: COLORS.WHITE,
                                justifyContent: 'center',
                                alignSelf: 'center',
                                marginTop: 9,
                                fontSize: 20
                            }}>+ Follow</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#F5F5F5',
                                width: 96,
                                height: 50,
                                borderRadius: 10,
                                marginTop: 25,
                                marginLeft: 20
                            }}
                        >
                            <Image source={IMAGES.share}
                                style={{
                                    alignSelf: 'center',
                                    marginTop: 12
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        height: 2,
                        backgroundColor: '#00000033',
                        marginHorizontal: 10,
                        marginTop: 20,
                        width: '90%'
                    }}></View>
                    <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
                        <Text style={{
                            fontSize: 15,
                            color: '#454545',
                            fontFamily: 'OpenSans-Bold'

                        }}>About</Text>
                        <Text style={{
                            color: IMAGES.BLACK,
                            fontSize: 15
                        }}>absvhbahvbahbvbhavjbavjhbavjhba
                            avhdhavdjhab vjhb avjhbavjh
                        </Text>
                    </View>
                    <View style={{
                        height: 2,
                        backgroundColor: '#00000033',

                        marginHorizontal: 16,
                        width: '90%',
                        marginTop: 15
                    }}></View>
                    <View style={{ flexDirection: 'column', marginHorizontal: 20, marginTop: 10 }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                            <Text>Location</Text>
                            <Text style={{ width: '50%' }}>Shop #2 Marina Bay San</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                            <Text>Opening Hours </Text>
                            <Text style={{ width: '50%' }}>Monday -Saturday
                                (11:00am -9:00pm)</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                            <Text>Contacts</Text>
                            <Text style={{ width: '50%' }}>+65 6549796565</Text>

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                            <Text>Websites</Text>
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
                            <Text>Joined since</Text>
                            <Text style={{ width: '50%' }}>24 September 2021</Text>
                        </View>


                    </View>
                </ScrollView>


            }




        </View >
    )

}

const style = StyleSheet.create({
    verifiedImage: {
        margin: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonClick: {
        fontSize: 17,
        fontFamily: 'OpenSans-Bold',
        color: '#00958C',

    },
    button: {
        fontSize: 17,
        fontFamily: 'OpenSans-Regular',
        color: '#868686'
    },
    socialNumber: {
        fontSize: 20,
        fontFamily: 'cabin',
        fontWeight: 'bold',
        color: COLORS.BLACK
    },
    socialText: {
        fontSize: 15,
        fontFamily: 'OpenSans-Regular',
        color: '#7C7C7C',
        marginTop: 3

    }



})

const mapStateToProps = state => {
    return {
        authReducer: state.authReducer,
        sellersProfileReducer: state.sellersProfileReducer
    }
}
const mapDispatchToProps = dispatch => ({
    getProductList: params => dispatch(sellerProductListingAction(params))
    
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerProfileViewByOther);