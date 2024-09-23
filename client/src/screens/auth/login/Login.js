import { View, Text, TextInput, SafeAreaView, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/authContext'
import styles from './styles'
import InputFieldWithTitle from '../../../components/InputFieldWithTitle'
import ButtonComp from '../../../components/ButtonComp'
import navigationStrings from '../../../constants/navigationStrings'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const Login = ({ navigation }) => {
  // global state
  const [state, setState] = useContext(AuthContext)
  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // functions
  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Please fill all the fields")
        return;
      }
      const { data } = await axios.post(
        '/auth/login',
        { email, password }
      )
      setState(data)
      // store the login data in local storage with async storage
      await AsyncStorage.setItem('@auth', JSON.stringify(data));

      alert(data && data.message);
      navigation.navigate(navigationStrings.MAIN);
      console.log("Login data: ", { email, password })
    } catch (error) {
      alert(error.response.data.message);
      console.log("Login error", error)
    }
  }
  // temp function to check local storage data
  const getLocalStorageData = async () => {
    let data = await AsyncStorage.getItem('@auth')
    console.log('Local storage: ', data)
  }
  getLocalStorageData();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleSty}>Login</Text>
      <InputFieldWithTitle
        fieldTitle={"Email"}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <InputFieldWithTitle
        fieldTitle={"Password"}
        placeholder="Enter your password"
        secureTextEntry='true'
        value={password}
        onChangeText={setPassword}
      />
      <ButtonComp btnText="Submit" onClick={handleLogin} />
      {/* <Text>{JSON.stringify({ email, password }, null, 4)}</Text> */}
      <Text>Don't have an account? Please{" "}
        <Text
          onPress={() => navigation.navigate(navigationStrings.REGISTER)}
          style={styles.linkText}
        >REGISTER</Text>
      </Text>
    </SafeAreaView>
  )
}

export default Login