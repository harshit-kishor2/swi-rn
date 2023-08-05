import { Container, CustomIcon, CustomInput, CustomText, NavigationBar } from "@app/components";
import { ICON_TYPE } from "@app/components/CustomIcon";
import { COLORS, IMAGES } from "@app/resources";
import { initialState } from "@app/store/addProduct.slice";
import { Field, Formik, useFormik } from "formik";
import React, { useState } from "react";
// import { CheckBox } from 'react-native-elements';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Checkbox } from "react-native-paper";
import ToggleSwitch from "toggle-switch-react-native";
import { date } from "yup";

// type ValuePiece = Date | string | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

export const EditSellerProfile = () => {

    // const weekData = [
    //     {
    //         id: 1,
    //         day: "Monday",
    //         // onOff: "off"
    //         timing: "10:00 am - 5:00 pm",
    //         onOff: false

    //     },
    //     {
    //         id: 1,
    //         day: "Tuesday",
    //         // onOff: "on",
    //         timing: "9:00 am - 5:00 pm",
    //         onOff: true

    //     },
    //     {
    //         id: 1,
    //         day: "Wednesday",
    //         //onOff: "on",
    //         timing: "9:00 am - 5:00 pm",
    //         onOff: true

    //     },
    //     {
    //         id: 1,
    //         day: "Thursday",
    //         // onOff: "on",
    //         timing: "9:00 am - 5:00 pm",
    //         onOff: true

    //     },
    //     {
    //         id: 1,
    //         day: "Friday",
    //         // onOff: "on",
    //         timing: "9:00 am - 5:00 pm",
    //         onOff: false

    //     },
    //     {
    //         id: 1,
    //         day: "Saturday",
    //         //// onOff: "on",
    //         timing: "9:00 am - 5:00 pm",
    //         onOff: false

    //     },
    //     {
    //         id: 1,
    //         day: "Sunday",
    //         //onOff: "on",
    //         timing: "9:00 am - 5:00 pm",
    //         onOff: true

    //     }
    // ]


    // const [sellerName, setSwitchOn] = useState(false);
    const [switchOn, setSwitchOn] = useState(false);
    const [IsChecked, setIsChecked] = useState(false);
    const [list, setList] = useState([
        {
            id: 1,
            day: "Monday",
            // onOff: "off"
            timing: "10:00 am - 5:00 pm",
            onOff: false

        },
        {
            id: 1,
            day: "Tuesday",
            // onOff: "on",
            timing: "9:00 am - 5:00 pm",
            onOff: true

        },
        {
            id: 1,
            day: "Wednesday",
            //onOff: "on",
            timing: "9:00 am - 5:00 pm",
            onOff: true

        },
        {
            id: 1,
            day: "Thursday",
            // onOff: "on",
            timing: "9:00 am - 5:00 pm",
            onOff: true

        },
        {
            id: 1,
            day: "Friday",
            // onOff: "on",
            timing: "9:00 am - 5:00 pm",
            onOff: false

        },
        {
            id: 1,
            day: "Saturday",
            //// onOff: "on",
            timing: "9:00 am - 5:00 pm",
            onOff: false

        },
        {
            id: 1,
            day: "Sunday",
            //onOff: "on",
            timing: "9:00 am - 5:00 pm",
            onOff: true

        }
    ]

    )

    const onToggleMonday = () => {
        // setSwitchOn(!switchOn);
        setList(!list.onOff)
    }
    const initialValues = {
        sellerName: '',
        email: '',
        phoneNumber: '',
        about: '',
        location: '',
        week: [],
        website: '',
        socialMedia: [],
        paymentMode: [],
        announcement: '',
        announcementDate: ''

    }
    const {
        handleChange,
        handleSubmit,
        values,
        handleBlur,
        errors,
        setFieldValue
    } = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log(values);
        }

    })
    console.log("=>>>>>>>>", values);




    return (
        <Container useSafeAreaView={true}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 15
            }}>
                <NavigationBar
                    leftSource={IMAGES.BACKARROW
                    }
                    leftAction={() => {
                        console.log('first');
                        props.navigation.navigate('CreateAccountScreen');
                    }}
                    flexDirection="row"
                />
                <View>
                    <TouchableOpacity>
                        <Text style={{
                            fontFamily: 'OpenSans-Bold',
                            fontSize: 16,
                            color: '#00958C',
                            marginTop: 10
                        }}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View>
                    <View>
                        <Image source={IMAGES.coverSellerProfile}
                            style={{ width: 393, height: 125 }} />

                        <View style={{
                            position: 'absolute',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginTop: 90
                        }}>
                            <Image source={IMAGES.Ellipse7}
                                style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: 50,
                                    borderWidth: 5,
                                    borderColor: COLORS.WHITE

                                }} />
                        </View>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        marginTop: 90,
                    }} >
                        <TouchableOpacity style={{
                            backgroundColor: COLORS.RED,
                            width: 210,
                            height: 50,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center'

                        }}>
                            <Text style={{
                                color: COLORS.WHITE,
                                fontFamily: 'cabin',
                                fontSize: 20
                            }}>Retrieve My Info</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ margin: 15 }}>

                        <Text style={style.text}>Seller's Name</Text>
                        <CustomInput
                            placeholder="Seller's Name"
                            style={style.input}
                            onChangeText={(values) => setFieldValue('sellerName', values)}
                            value={values.sellerName}
                        />
                        <Text style={style.text}>Email</Text>
                        <CustomInput
                            placeholder="Email"
                            style={style.input}
                            onChangeText={(value) => setFieldValue("email", value)}
                            value={values.email}
                        />
                        <Text style={style.text}>Phone Number</Text>
                        <CustomInput
                            placeholder="Phone Number"
                            style={style.input}
                            onChangeText={(value) => setFieldValue("phoneNumber", value)}
                            value={values.phoneNumber}

                        />
                        <Text style={style.text}>About (Max 500 Words)</Text>
                        <CustomInput
                            placeholder="Suspendisse viverra uctus quam,
                                 sed fringilla nulla. Pellentesque quis massa tincidunt,
                                 iaculis ipsum sed, pretium purus."
                            multiline={true}
                            style={style.input}
                            value={values.about}
                            onChangeText={(value) => setFieldValue("about", value)}
                        />

                        <Text style={style.text}>Location</Text>
                        <CustomInput
                            placeholder="Shop #2 Marina Bay San"
                            style={style.input}
                            value={values.location}
                            onChangeText={(value) => setFieldValue('location', value)}
                        />

                        <View>
                            <FlatList
                                data={list}
                                keyExtractor={item => item.id}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View key={index} style={style.toggle}>
                                            <View style={style.dayText}>
                                                <Text style={style.week}>{item.day}</Text>
                                            </View>
                                            <View style={style.toggleView}>
                                                <ToggleSwitch
                                                    isOn={item.onOff}
                                                    // onToggle={}
                                                    onToggle={onToggleMonday}
                                                    onColor={'#00958C'}
                                                    offColor={'#ACACAC'}
                                                    value={switchOn}
                                                />
                                            </View>
                                            <View style={{ width: '30%', marginHorizontal: 20 }}>
                                                <CustomInput
                                                    // placeholder="09:00 am - 05:00pm"
                                                    value={item.timing}
                                                    style={{ width: 150 }}
                                                />
                                            </View>
                                        </View>
                                    )
                                }}
                            />
                        </View>

                        <View style={{ marginTop: 5 }}>
                            <Text style={style.text}>Website</Text>
                            <CustomInput
                                placeholder="immayvan.com"
                                style={style.input}
                                value={values.website}
                                onChangeText={(value) => setFieldValue('website', value)}
                            />
                            <View>
                                <Text style={style.text}>Social Media Links</Text>
                                <CustomInput
                                    placeholder='facebook/immyvan'
                                    style={style.input}
                                />
                            </View>

                            <View style={{ alignSelf: 'flex-end' }}>
                                <TouchableOpacity>
                                    <Text style={{
                                        fontFamily: 'OpenSans-SemiBold',
                                        fontSize: 14,
                                        color: '#00958C'
                                    }}>+ Add More</Text>
                                </TouchableOpacity>
                            </View>


                            <Text style={style.text}>Choose Payment Mode Available</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <FlatList
                                    data={[1, 2, 3, 4]}
                                    numColumns={3}
                                    renderItem={() => {
                                        return (

                                            <View style={{
                                                flexDirection: 'row',
                                                // marginHorizontal: 20,
                                                width: '33%'
                                            }}>
                                                <Checkbox
                                                    status={IsChecked ? "checked" : "unchecked"}
                                                    value={IsChecked}
                                                    onPress={() => { setIsChecked(!IsChecked) }}
                                                />
                                                <Text style={[{ marginTop: 6 }, style.text]}>Debit Card</Text>
                                            </View>
                                        )
                                    }}
                                />
                            </View>

                            <View>
                                <Text>Post Ads </Text>
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    data={[1, 2, 3, 4, 5, 6, 7]}
                                    horizontal
                                    renderItem={() => {
                                        return (
                                            <View style={{
                                                height: 177, width: 307,
                                                backgroundColor: '#F0F2FA',
                                                borderRadius: 10,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginTop: 15,
                                                borderStyle: "dashed",
                                                borderWidth: 2,
                                                borderColor: '#B5B6BB',
                                                margin: 10
                                            }}>
                                                <Pressable onPress={() => { }}>
                                                    <CustomIcon
                                                        origin={ICON_TYPE.MATERIAL_ICONS}
                                                        name={'add'}
                                                        size={30}
                                                        color={'#00958C'}
                                                    />
                                                </Pressable>


                                            </View>
                                        )
                                    }}
                                />
                            </View>
                            <View style={{ marginTop: 15 }}>
                                <Text style={style.text} >Announcements</Text>
                                <CustomInput
                                    placeholder='Black day sale will be live from next week'
                                    style={style.input}
                                    value={values.announcement}
                                    onChangeText={(value) => setFieldValue('announcement', value)}
                                />
                                <Text>Announcement ends on </Text>
                                <CustomInput
                                />
                            </View>
                            <View style={{
                                alignSelf: 'center',
                            }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: COLORS.BLACK,
                                        borderRadius: 10,
                                        width: 239,
                                        height: 50,
                                        justifyContent: 'center',
                                        alignItems: 'center'

                                    }}
                                // onPress={handlerSubmit}
                                >
                                    <Text style={{
                                        fontSize: 20,
                                        fontFamily: 'Cabin-SemiBold',
                                        color: COLORS.WHITE
                                    }}>Save Changes</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{

                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 12,
                                marginBottom: 20

                            }}>
                                <TouchableOpacity>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontFamily: 'OpenSans-SemiBold',
                                            color: '#00958C'

                                        }}
                                    >Not now, I’ll do it later</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>









                </View>
            </ScrollView>
        </Container >
    )
}

const style = StyleSheet.create({

    text: {
        fontSize: 14,
        fontFamily: 'OpenSans-Regular',
        color: '#7C7C7C',
    },
    toggle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
        width: '90%',
        alignContent: 'center'
    },
    input: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 16,
        color: COLORS.BLACK
    },
    week: {
        fontSize: 14,
        color: COLORS.BLACK,
        fontFamily: 'OpenSans-Regular'
    },
    dayText: { justifyContent: 'center', width: '30%' },
    toggleView: { justifyContent: 'center', width: '25%' },
    customInput: { width: '30%', marginHorizontal: 20 }


})