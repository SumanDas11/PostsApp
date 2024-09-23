import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../styles/colors'

const ButtonComp = ({
    btnText = "btnText",
    additionalSty = {},
    onClick = () => { }
}) => {
    return (
        <Pressable
            onPress={onClick}
            // style={styles.btnSty}
            style={{ ...styles.btnSty, ...additionalSty }}
        >
            <Text style={styles.btnTextSty}>{btnText}</Text>
        </Pressable>
    )
}

export default ButtonComp

const styles = StyleSheet.create({
    btnSty: {
        backgroundColor: colors.themeColor,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTextSty: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
})