import {
  View,
  Image,
  Button,
  Text,
  StyleSheet
} from "react-native"

function UserAuthenticationScreen({navigation}) {
  return (
    <View style={styles.appContainer}>
      <Text>TESTE</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1, 
    backgroundColor: "white"
  }
})

export default UserAuthenticationScreen;