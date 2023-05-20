import {
  View,
  Image,
  Button,
  Text,
  StyleSheet
} from "react-native"
import HexagonTopLeft from "../../assets/icons/hexagons_top_left.svg";
import HexagonBottomRight from "../../assets/icons/hexagons_bottom_right.svg";
import SafeLogo from "../../assets/icons/SAFE_logo.svg";

function HomeScreen({navigation}) {
  return (
    <View style={styles.appContainer}>
      <HexagonTopLeft style={styles.iconTopLeft} />
      <View style={styles.mainMenu}>
        <Text style={styles.title}>S.A.F.E.</Text>
        <View style={styles.button}>
          <Button title='Emprestar item' />
        </View>
        <View style={styles.button}>
          <Button title='Devolver item' />
        </View>
      </View>
      <View style={styles.iconBottomRightContainer}>
        <HexagonBottomRight style={styles.iconBottomRight} />
      </View>
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

export default HomeScreen;