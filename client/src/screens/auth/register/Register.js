import { View, Text, TextInput, SafeAreaView, Alert } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import InputFieldWithTitle from '../../../components/InputFieldWithTitle'
import ButtonComp from '../../../components/ButtonComp'
import navigationStrings from '../../../constants/navigationStrings'
import axios from 'axios'

const Register = ({ navigation }) => {
  // states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // functions
  const handleRegister = async () => {
    try {
      if (!name || !email || !password) {
        Alert.alert("Please fill all the fields")
        return;
      }
      const { data } = await axios.post(
        '/auth/register',
        { name, email, password }
      )
      alert(data && data.message);
      navigation.navigate(navigationStrings.LOGIN);
      console.log("Registration data: ", { name, email, password })
    } catch (error) {
      alert(error.response.data.message);
      console.log("Registration error", error)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleSty}>Register</Text>
      <InputFieldWithTitle
        fieldTitle={"Name"}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
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
      <ButtonComp btnText="Submit" onClick={handleRegister} />
      {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
      <Text>Already registered? Please{" "}
        <Text
          onPress={() => navigation.navigate(navigationStrings.LOGIN)}
          style={styles.linkText}
        >LOGIN</Text>
      </Text>
    </SafeAreaView>
  )
}

export default Register