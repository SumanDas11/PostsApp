// npm i axios
// to start the app: "npx expo start"
// npm i @react-native-async-storage/async-storage
// npm i moment 
import { AuthProvider } from './src/context/authContext';
import { PostsProvider } from './src/context/postContext';
import Routes from './src/navigation/Routes';

export default function App() {
  return (
    <AuthProvider>
      <PostsProvider>
        <Routes />
      </PostsProvider>
    </AuthProvider>
  );
}