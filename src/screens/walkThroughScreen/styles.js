// import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
// import React, { useState } from 'react';

// const WalkThroughScreen = () => {
//     const [page, setPage] = useState(0);
//     return (
//         <View>
//             {page === 0 && <View style={{ backgroundColor: 'green' }}>

//                 <Text>index{page}

//                 </Text>
//                 <Button title='next' onPress={() => {
//                     setPage(1);
//                 }} />
//             </View>}

//             {page === 1 && <View style={{ backgroundColor: 'red' }}>
//                 <Text>index{page}</Text>
//                 <Pressable onPress={() => {
//                     setPage(2);
//                 }}>
//                     <View style={styles.submitStyle}>
//                         <Text style={styles.bg_button}>final page</Text>
//                     </View>
//                 </Pressable>
//             </View>}

//             {page === 2 && <View style={{ backgroundColor: 'yellow' }}>
//                 <Text>index{page}</Text>
//                 <Button title='end' onPress={() => {
//                     //setPage(1);
//                 }} />
//             </View>}


//         </View>

//     );
// };

// export default WalkThroughScreen;
// const styles = StyleSheet.create({
//     submitStyle: {
//         height: 40,
//         width: 350,
//         backgroundColor: '#000000',
//         color: 'white',
//         elevation: 2,
//         overflow: 'hidden',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 30,
//     },
//     bg_button: {
//         color: 'white',
//         font: 'Cabin'
//     }
// });




import { View, Text, Button, StyleSheet, Pressable, Dimensions, StatusBar, SafeAreaView, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { IMAGES, SPACING, TYPOGRAPHY } from '../../resources';
const WalkThroughScreen = () => {
    const App = () => {
        const [sliderState, setSliderState] = useState({ currentPage: 0 });
        const { width, height } = Dimensions.get('window');

        const setSliderPage = (event) => {
            const { currentPage } = sliderState;
            const { x } = event.nativeEvent.contentOffset;
            const indexOfNextScreen = Math.floor(x / width);
            if (indexOfNextScreen !== currentPage) {
                setSliderState({
                    ...sliderState,
                    currentPage: indexOfNextScreen,
                });
            }
        };

        const { currentPage: pageIndex } = sliderState;

        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView
                        style={{ flex: 1 }}
                        horizontal={true}
                        scrollEventThrottle={16}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        onScroll={(event) => {
                            setSliderPage(event);
                        }}
                    >
                        <View style={{ width, height }}>
                            <Image source={IMAGES.Watch_Image1} style={styles.imageStyle} />
                            <View style={styles.wrapper}>
                                <Text style={styles.header}>Nature Imitates Art</Text>
                                <Text style={styles.paragraph}>....something like that</Text>
                            </View>
                        </View>
                        <View style={{ width, height }}>
                            <Image
                                source={IMAGES.Watch_Image2}
                                style={styles.imageStyle}
                            />
                            <View style={styles.wrapper}>
                                <Text style={styles.header}>High quality Art work</Text>
                                <Text style={styles.paragraph}>... for a fraction of the price</Text>
                            </View>
                        </View>
                        <View style={{ width, height }}>
                            <Image
                                source={IMAGES.Watch_Image3}
                                style={styles.imageStyle}
                            />
                            <View style={styles.wrapper}>
                                <Text style={styles.header}>Top Notch Artists</Text>
                                <Text style={styles.paragraph}>... all in one place</Text>
                            </View>
                        </View>

                    </ScrollView>
                    <View style={styles.paginationWrapper}>
                        {Array.from(Array(5).keys()).map((key, index) => (
                            <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
                        ))}
                    </View>
                </SafeAreaView>
            </>
        );
    };

    const styles = StyleSheet.create({
        imageStyle: {
            height: PixelRatio.getPixelSizeForLayoutSize(135),
            width: '100%',
        },
        wrapper: {
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 30,
        },
        header: {
            fontSize: 30,
            fontWeight: 'bold',
            marginBottom: 20,
        },
        paragraph: {
            fontSize: 17,
        },
        paginationWrapper: {
            position: 'absolute',
            bottom: 200,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        paginationDots: {
            height: 10,
            width: 10,
            borderRadius: 10 / 2,
            backgroundColor: '#0898A0',
            marginLeft: 10,
        },

    })
};