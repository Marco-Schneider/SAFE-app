import { useRoute } from "@react-navigation/native";
import {
  View,
  Image,
  Button,
  Text,
  StyleSheet,
  TextInput,
} from "react-native"

function UserAuthenticationScreen({navigation}) {

  const route = useRoute();
  const { userInfo } = route.params;

  console.log("USER INFORMATION", userInfo);
  
  const displayName = userInfo.fields.displayName.stringValue;
  const email = userInfo.fields.email.stringValue;
  const profilePicture = userInfo.fields.profilePicture.stringValue;
  const role = userInfo.fields.role.stringValue;

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
        />
        <View
          style={{marginTop: 20}}
        >
          <Button title='Confirmar' />
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