import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputFieldWithTitle from './InputFieldWithTitle'
import axios from 'axios'
import { useNavigation } from "@react-navigation/native"
import navigationStrings from '../constants/navigationStrings'

const EditModal = ({ modalVisible, setModalVisible, post }) => {
    // const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // handle update post
    const updatePostHandler = async (id) => {
        try {
            const { data } = await axios.put(`/post/update-post/${id}`, { title, description })
            alert(data?.message)
            navigation.navigate(navigationStrings.HOME)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    // initial post data
    useEffect(() => {
        setTitle(post?.title)
        setDescription(post?.description)
    }, [post])
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {/* <Text>{JSON.stringify(post, null, 4)}</Text> */}
                        <Text style={styles.modalText}>Update your post</Text>
                        <InputFieldWithTitle fieldTitle='Title'
                            value={title}
                            onChangeText={(text) => { setTitle(text) }}
                        />
                        <InputFieldWithTitle fieldTitle='Description'
                            value={description}
                            onChangeText={(text) => { setDescription(text) }}
                            multiline={true}
                            additionalSty={{ height: 200, padding: 10 }} />
                        <View style={{ flexDirection: 'row', margin: 10 }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => { updatePostHandler(post && post._id), setModalVisible(!modalVisible) }}>
                                <Text style={styles.textStyle}>Update</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default EditModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})