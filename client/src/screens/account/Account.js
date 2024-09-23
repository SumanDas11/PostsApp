import { View, Text, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import InputFieldWithTitle from '../../components/InputFieldWithTitle'
import ButtonComp from '../../components/ButtonComp'
import axios from 'axios'
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../../styles/colors'

const Account = () => {
  // global state
  const [state, setState] = useContext(AuthContext)

  // local state
  const [name, setName] = useState(state?.user.name)
  const [password, setPassword] = useState(state?.user.name)
  const [email] = useState(state?.user.email)

  // handleUpdate
  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        '/auth/updateUser',
        { name, email, password },
        {
          headers: {
            Authorization: `Bearer ${state.token && state.token}`
          }
        }
      )
      console.log("data_handleUpdate: ", data)
      let UD = JSON.stringify(data)
      setState({ ...state, user: UD?.updatedUser })
      // logout and clear local storage
      setState({ token: "", user: null })
      await AsyncStorage.removeItem('@auth')
      alert(data && data.message)
    } catch (error) {
      alert(error.response.data.message)
      console.log("Error_handleUpdate: ", error)
    }
  }
  return (
    <View>
      <Image
        source={{ uri: "https://p7.hiclipart.com/preview/722/101/213/computer-icons-user-profile-circle-abstract.jpg" }}
        style={{ height: 200, width: 200, alignSelf: 'center', borderRadius: 100 }}
      />
      <Text style={styles.userInfo}>
        Only Name and Password can be updated
      </Text>
      <View style={styles.formSty}>
        <InputFieldWithTitle
          fieldTitle='Name'
          value={name}
          onChangeText={setName}
        />
        <InputFieldWithTitle
          fieldTitle='Email'
          value={state?.user.email}
          editable={false}
          additionalSty={{ color: colors.blackOpacity30 }}
        />
        <InputFieldWithTitle
          fieldTitle='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <InputFieldWithTitle
          fieldTitle='Role'
          value={state?.user.role}
          editable={false}
          additionalSty={{ color: colors.blackOpacity30 }}
        />
        <ButtonComp
          btnText='Update'
          onClick={handleUpdate}
        />
      </View>
    </View>
  )
}

export default Account