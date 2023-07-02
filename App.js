import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View,
  Button,
  AppRegistry
} from 'react-native';
import { 
  NavigationContainer
} from '@react-navigation/native';
import {
  createNativeStackNavigator
} from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen/HomeScreenComponent';
import QRCodeReaderScreen from './components/QRCodeReaderScreen/QRCodeReaderScreenComponent';
import UserAuthenticationScreen from './components/UserAuthenticationScreen/UserAuthenticationScreenComponent';
import ItemSelectionScreen from './components/ItemSelectionScreen/ItemSelectionComponent';
import WaitingScreen from './components/WaitingScreen/WaitingComponent';
import ReturnItemSelectionScreen from './components/ReturnItemSelectionScreen/ReturnItemSelectionScreenComponent';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={ HomeScreen } />
        <Stack.Screen name="QRCode reader" component={ QRCodeReaderScreen } />
        <Stack.Screen name="User authentication" component={ UserAuthenticationScreen } />
        <Stack.Screen options={{ headerTitle: '', headerBackVisible: false }} name="Item selection" component={ ItemSelectionScreen } />
        <Stack.Screen options={{ headerTitle: '', headerBackVisible: false }} name="Return items" component={ ReturnItemSelectionScreen } />
        <Stack.Screen options={{ headerShown: false }} name="Waiting screen" component={ WaitingScreen } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
