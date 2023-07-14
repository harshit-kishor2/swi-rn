import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { isMountedRef, navigationRef } from './NavigationService';
import RootStackNavigator from './stack/RootStackNavigator';
import { connect, useSelector } from 'react-redux';


const Navigator = props => {
    const { authReducer } = props;

    //
    useEffect(() => {
        isMountedRef.current = true;
        return () => (isMountedRef.current = false);
    }, []);
    console.log('Status', authReducer.isAuthenticate);
    return (
        <NavigationContainer ref={navigationRef}>
            {authReducer.isAuthenticate ? (
                <DrawerNavigator />
            ) : (
                <RootStackNavigator />
            )}
        </NavigationContainer>
    );
};

const mapStateToProps = state => {
    return {
        authReducer: state?.authReducer,
    };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);