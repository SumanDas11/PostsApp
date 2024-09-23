import { createContext, useState, useEffect } from "react";
import axios from 'axios';
// context
const PostContext = createContext();

// Provider
const PostsProvider = ({ children }) => {
    // state
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    // get posts
    const getAllPosts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/post/get-all-post')
            setLoading(false)
            setPosts(data?.posts)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    // initial posts
    useEffect(() => {
        getAllPosts();
    }, [])
    return (
        <PostContext.Provider value={[posts, setPosts]}>
            {children}
        </PostContext.Provider>
    )
}

export { PostContext, PostsProvider }