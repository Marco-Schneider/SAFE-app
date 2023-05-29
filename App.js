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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={ HomeScreen } />
        <Stack.Screen name="QRCode reader" component={ QRCodeReaderScreen } />
        <Stack.Screen name="User authentication" component={ UserAuthenticationScreen } />
        <Stack.Screen name="Item selection" component={ ItemSelectionScreen } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
