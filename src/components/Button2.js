import { View, Text, Pressable } from 'react-native'
import React from 'react'

const Button2 = (props) => {
    return (
        <View>
            <Pressable onPress={submit}>
                <View style={styles.submitStyle}>
                    <Text style={styles.bg_button}>{props}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default Button2