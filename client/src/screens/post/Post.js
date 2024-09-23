import { View, Text, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import InputFieldWithTitle from '../../components/InputFieldWithTitle'
import ButtonComp from '../../components/ButtonComp'
import styles from './styles'
import axios from 'axios'
import navigationStrings from '../../constants/navigationStrings'
import { PostContext } from '../../context/postContext'

const Post = ({ navigation }) => {
  // global state
  const [posts, setPosts] = useContext(PostContext)
  // local state
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [loading, setLoading] = useState(false);
  // handleCreatePost
  const handleCreatePost = async () => {
    try {
      setLoading(true)
      if (!title || !description) {
        alert("Please add post title and description")
      }
      const { data } = await axios.post(
        '/post/create-post',
        { title, description }
      )
      setLoading(false)
      setPosts([...posts, data?.post])
      alert(data?.message);
      navigation.navigate(navigationStrings.HOME);
      console.log("Post data: ", { title, description })
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log("Post error", error);
    }
    // alert(`your post title is ${title} and description is ${description}`)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titleSty}>Create A Post</Text>
      <InputFieldWithTitle
        fieldTitle='Post Title'
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <InputFieldWithTitle
        fieldTitle='Post Description'
        multiline={true}
        // additionalSty={{ multiline: true, numberOfLines: 6 }}
        additionalSty={{ height: 200, padding: 10 }}
        value={description}
        onChangeText={(text) => setdescription(text)}
      />
      <ButtonComp btnText='Create Post'
        onClick={handleCreatePost}
      />
    </View>
  )
}

export default Post