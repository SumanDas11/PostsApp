import { View, ScrollView, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../context/postContext'
import CustomPostCard from '../../components/CustomPostCard'
import axios from 'axios'

const MyPosts = () => {
  // global state
  // const [posts] = useContext(PostContext)
  // state
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  // get user posts
  const getUserPosts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/post/get-user-post')
      setLoading(false)
      setPosts(data?.userPosts)
    } catch (error) {
      setLoading(false)
      console.log(error)
      alert(error)
    }
  };

  // initial
  useEffect(() => {
    getUserPosts();
  }, []);
  return (
    <View>
      <ScrollView>
        <CustomPostCard posts={posts} myPostScreen={true} />
        {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
      </ScrollView>
    </View>
  )
}

export default MyPosts