import { useRoute } from "@react-navigation/native";
import {
  View,
  Image,
  Button,
  Text,
  StyleSheet,
  TextInput,
} from "react-native"
import { auth } from "../../firebase"
import { useState, useEffect } from "react";

function UserAuthenticationScreen({navigation}) {

  const route = useRoute();
  const { userInfo } = route.params;
  const { operation } = route.params;

  const [password, setPassword] = useState('');
  
  const displayName = userInfo.fields.displayName.stringValue;
  const email = userInfo.fields.email.stringValue;
  const profilePicture = userInfo.fields.profilePicture.stringValue;
  const role = userInfo.fields.role.stringValue;

  const userIdParser = (userInfo.name).split('/');
  const userId = userIdParser[userIdParser.length - 1];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user && operation == 'retrieveItems') {
        navigation.navigate('Item selection', 
          { userId: userId }
        );
      }
      else if(user && operation == 'returnItems') {
        navigation.navigate('Return items', { 
          userId: userId,
          operation: operation
        });
      }
    })
    return unsubscribe;
  }, [])

  const handleLogin = () => {
    console.log("CLICKED TO LOGIN!!");
    auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Logged in with: ', user.email);
    })
    .catch(error => alert(error.message))
  }

  return (
    <View style={styles.appContainer}>
      <View>
        <Text style={styles.textContainer}>
          Confirme a sua identidade
        </Text>
      </View>
      <View style={styles.userInformationContainer}>
        <Image 
          style={{width: 150, height: 150, backgroundColor: 'green'}}
          source={{uri: profilePicture}}
        />
        <Text style={{fontSize: 25}}> { displayName } </Text>
        <Text> { role } </Text>
      </View>
      <View style={styles.loginInformationContainer}>
        <TextInput 
          style={styles.passwordInputContainer}
          placeholder='senha'
          value={password}
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
        <View
          style={{marginTop: 20}}
        >
          <Button 
            title='Confirmar'
            onPress={handleLogin} 
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1, 
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textContainer: {
    fontSize: 25,
    textAlign: 'center',
    width: 325,
    // backgroundColor: 'yellow'
  },
  userInformationContainer: {
    width: 200,
    alignItems: 'center',
    justifyContent: "flex-start",
    // backgroundColor: 'orange',
  },
  loginInformationContainer: {
    width: 200
  },
  passwordInputContainer: {
    borderWidth: 1,
    borderColor: 'black',
    // backgroundColor: '#e4d0ff',
    borderRadius: 1,
    padding: 4,
    elevation: 0.5
  }
})

export default UserAuthenticationScreen;