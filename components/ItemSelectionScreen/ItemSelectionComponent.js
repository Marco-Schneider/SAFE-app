import {
  View,
  Image,
  Button,
  Text,
  StyleSheet
} from "react-native"


function ItemSelectionScreen({navigation}) {
  return (
    <View style={styles.appContainer}>
      <Text>This is the item selection screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1, 
    backgroundColor: "white"
  },
  mainMenu: {
    flex: 1,
    // backgroundColor: "brown",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 35,
    margin: 4
  },
  logoContainer: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "flex-end",
    // backgroundColor: "yellow"
  },
  button: {
    width: 150,
    margin: 4
  }, 
  iconTopLeft: {
    width: 200,
    height: 200
  },
  iconBottomRightContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    // backgroundColor: 'blue',
    alignItems: 'flex-end'
    
  },
  iconBottomRight: {
    width: 200,
    height: 200,
    // backgroundColor: 'green'
  }
})

export default ItemSelectionScreen;