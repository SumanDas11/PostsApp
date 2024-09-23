import axios from "axios";

const { default: AsyncStorage } = require("@react-native-async-storage/async-storage");
const { createContext, useState, useEffect } = require("react");


// context
const AuthContext = createContext();

// Provider
const AuthProvider = ({ children }) => {
    // golbal state
    const [state, setState] = useState({
        user: null,
        token: "",
    })

    // default axios settings
    axios.defaults.baseURL = "http://192.168.225.245:8080/api/v1";
    axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;

    // initial local storage data
    useEffect(() => {
        const loadLocalStorageData = async () => {
            let data = await AsyncStorage.getItem('@auth')
            let loginData = JSON.parse(data)
            setState({ ...state, user: loginData?.user, token: loginData?.token })
            // console.log('LoginData in storage: ', data)
        }
        loadLocalStorageData();
    }, [])
    return (
        <AuthContext.Provider value={[state, setState]}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }