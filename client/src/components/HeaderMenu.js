import { View, Text, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderMenu = () => {
    // global state
    const [state, setState] = useContext(AuthContext)
    // logout
    const handleLogout = async () => {
        setState({ token: "", user: null })
        await AsyncStorage.removeItem('@auth')
        alert("Logout successful.")
    }
    return (
        <View>
            <Pressable
                onPress={handleLogout}
            >
                <MaterialIcons name="logout" size={24} color="red" />
            </Pressable>
        </View>
    )
}

export default HeaderMenu