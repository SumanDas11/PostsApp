import { View, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { PostContext } from '../../context/postContext'
import CustomPostCard from '../../components/CustomPostCard'

const Home = () => {
  // global state
  const [posts] = useContext(PostContext)
  return (
    <View>
      <ScrollView>
        <CustomPostCard posts={posts} />
        {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
      </ScrollView>
    </View>
  )
}

export default Home