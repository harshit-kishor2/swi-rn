import React from 'react';
import { View, SafeAreaView, Platform } from 'react-native';

const isIos = Platform.OS === 'ios';

const Container = ({ children, useSafeAreaView, style, ...other }) => {
    const Element = useSafeAreaView && isIos ? SafeAreaView : View;
    return (
        <Element
            style={[{ flex: 1, width: '100%', backgroundColor: '#fff' }, style]}
            {...other}>
            {children}
        </Element>
    );
};

export default Container;