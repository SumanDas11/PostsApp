// npm install @react-navigation/bottom-tabs
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import navigationStrings from "../constants/navigationStrings";
import { Home, Post, MyPosts, Account } from "../screens";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import HeaderMenu from "../components/HeaderMenu";

const BottomTabs = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator>
            <Tab.Screen
                name={navigationStrings.HOME}
                component={Home}
                options={{
                    headerShown: true,
                    headerRight: () => <HeaderMenu />,
                    tabBarShowLabel: true,
                    tabBarIcon: ({ focused }) => focused ? (<AntDesign name="home" size={24} color="orange" />) : (<AntDesign name="home" size={24} color="black" />)
                }}
            />
            <Tab.Screen
                name={navigationStrings.POST}
                component={Post}
                options={{
                    headerShown: true,
                    headerRight: () => <HeaderMenu />,
                    tabBarShowLabel: true,
                    tabBarIcon: ({ focused }) => focused ? (<MaterialIcons name="post-add" size={24} color="orange" />) : (<MaterialIcons name="post-add" size={24} color="black" />)
                }}
            />
            <Tab.Screen
                name={navigationStrings.MYPOSTS}
                component={MyPosts}
                options={{
                    headerShown: true,
                    headerRight: () => <HeaderMenu />,
                    tabBarShowLabel: true,
                    tabBarIcon: ({ focused }) => focused ? (<MaterialIcons name="my-library-books" size={24} color="orange" />) : (<MaterialIcons name="my-library-books" size={24} color="black" />)
                }}
            />
            <Tab.Screen
                name={navigationStrings.ACCOUNT}
                component={Account}
                options={{
                    headerShown: true,
                    headerRight: () => <HeaderMenu />,
                    tabBarShowLabel: true,
                    tabBarIcon: ({ focused }) => focused ? (<Ionicons name="person" size={24} color="orange" />) : (<Ionicons name="person" size={24} color="black" />)
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabs;