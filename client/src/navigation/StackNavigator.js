// npm install @react-navigation/native
// npx expo install react-native-screens react-native-safe-area-context
// npm install @react-navigation/native-stack
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navigationStrings from '../constants/navigationStrings';
import { Login, Register } from '../screens'; ///screens/index.js
import BottomTabs from './BottomTabs';
import { AuthContext } from '../context/authContext';
import HeaderMenu from '../components/HeaderMenu';

const StackNavigator = () => {
    // global state
    const [state] = useContext(AuthContext)
    // auth condition
    const authenticatedUser = state?.user && state?.token
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            {authenticatedUser ? (
                <>
                    <Stack.Screen name={navigationStrings.MAIN} component={BottomTabs} options={{ headerShown: false }} />
                </>
            ) : (
                <>
                    <Stack.Screen name={navigationStrings.LOGIN} component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name={navigationStrings.REGISTER} component={Register} options={{ headerShown: false }} />
                </>
            )}


        </Stack.Navigator>
    )
}

export default StackNavigator;