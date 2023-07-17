import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Container } from '../../../components';
import { IMAGES } from '../../../resources';


const SplashView = () => {
    return (
        <Container>
            <ImageBackground
                source={IMAGES.Splash_logo}
                resizeMode="stretch"
                style={{ height: '100%', width: '100%' }}
            />
            <View style={styles.section2}>
                <Text style={styles.copyright}>
                    All Rights Reserved. Copyrights © Firebase Demo 2023
                </Text>
            </View>
        </Container>
    );
};

export default SplashView;

const styles = StyleSheet.create({
    section2: {
        position: 'absolute',
        bottom: 25,
        width: '100%',
    },
    copyright: {
        alignSelf: 'center',
        color: '#ffffff',
        fontSize: 14,
    },
});