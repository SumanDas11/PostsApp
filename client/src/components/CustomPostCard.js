import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import moment from 'moment'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import colors from '../styles/colors';
import axios from 'axios';
import EditModal from './EditModal';
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../constants/navigationStrings';
import { PostContext } from '../context/postContext'

const CustomPostCard = ({ posts, myPostScreen }) => {
    const navigation = useNavigation();
    // global post context
    const [setPosts] = useContext(PostContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [post, setPost] = useState({})
    // handle delete prompt
    const handleDeletePrompt = (id) => {
        Alert.alert("Attention!", "Confirm if you want to delete the post.", [
            {
                text: "Cancel",
                onPress: () => {
                    console.log("cancel pressed")
                }
            },
            {
                text: "Delete",
                onPress: () => {
                    handleDeletePost(id)
                    console.log("delete pressed")
                }
            }
        ])
    }
    // delete post data
    const handleDeletePost = async (id) => {
        console.log('id passed to: ', id)
        try {
            const { data } = await axios.delete(`/post/delete-post/${id}`)
            alert(data?.message)

            // Update the global post context after deletion
            // setPosts(prevPosts => prevPosts.filter(post => post._id !== id));  // Update the global state
            navigation.navigate(navigationStrings.MYPOSTS)
        } catch (error) {
            console.log("handleDeletePost: ", error)
            alert(error)
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ color: 'green' }}>Total posts {posts?.length}</Text>
            {(myPostScreen) && (
                <EditModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    post={post}
                />
            )}
            {posts?.map((post, index) => (
                <View key={index} style={styles.cardSty}>
                    {(myPostScreen) && (
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <MaterialIcons name="edit" size={18} color="black"
                                onPress={() => { setPost(post), setModalVisible(true) }}
                            />
                            <AntDesign name="delete" size={18} color="red"
                                onPress={() => handleDeletePrompt(post?._id)}
                            />
                        </View>
                    )}
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{post?.title}</Text>
                    <View style={{ borderBottomWidth: .5, marginVertical: 5 }} />
                    <Text>{post?.description}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="calendar" size={24} color={colors.themeColor} />
                            <Text>{moment(post?.createdAt).format("DD:MM:YYYY")}</Text>
                        </View>
                        {(post?.postedBy?.name) &&
                            (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="person" size={24} color={colors.themeColor} />
                                    <Text>{post?.postedBy?.name}</Text>
                                </View>
                            )
                        }
                    </View>
                </View>
            ))
            }
        </View>
    )
}

export default CustomPostCard

const styles = StyleSheet.create({
    cardSty: {
        margin: 10,
        backgroundColor: '#FFFF',
        padding: 5,
        borderRadius: 5
    }
})