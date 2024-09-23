import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import colors from '../styles/colors'

const InputFieldWithTitle = ({
    fieldTitle = "Field Title",
    placeholder,
    value,
    onChangeText,
    additionalSty = {},
    secureTextEntry = false,
    editable = true,
    multiline = false,
    keyboardType,
}) => {
    return (
        <View style={{ marginHorizontal: 10 }}>
            <Text>{fieldTitle}</Text>
            <TextInput
                style={{ ...styles.inputFieldSty, ...additionalSty }}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                editable={editable}
                // autoCorrect={false}
                keyboardType={keyboardType}
                multiline={multiline}
            // textAlignVertical={'top'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputFieldSty: {
        paddingHorizontal: 5,
        // paddingTop: 10,
        height: 40,
        width: 300,
        backgroundColor: "white",
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
    }

})

export default InputFieldWithTitle