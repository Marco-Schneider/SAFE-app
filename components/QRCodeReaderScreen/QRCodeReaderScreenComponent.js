import {
  View,
  Image,
  Button,
  Text,
  StyleSheet
} from "react-native"
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";

function QRCodeReaderScreen({navigation}) {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scaneed');

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')
    })()
  }

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    setText(data);
    console.log('Type: ' + type + '\nData: ' + data);
  }

  if(hasPermission == null) {
    return (
      <View style={styles.appContainer}>
        <Text>Request for camera permission</Text>
      </View>
    )
  }
  if(hasPermission == false) {
    return(
      <View style={styles.appContainer}>
        <Text style={{margin: 10}}>No access to camera</Text>
        <Button title='Allow camera' onPress={() => askForCameraPermission()} />
      </View>
    )
  }

  return (
    <View style={styles.appContainer}>
      <View>
        <Text style={styles.textContainer}>
          Por favor, identifique-se apresentando sua identificação para a câmera
        </Text>
      </View>
      <View style={styles.barCodeContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{height: 400, width: 400}}
        />
      </View>
      <Text style={styles.mainText}>{text}</Text>
      {scanned && <Button title='Scan again?' onPress={() => setScanned(false)} color='tomato' />}
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1, 
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    fontSize: 25,
    textAlign: 'center',
    width: 325,
    marginBottom: 30
  },
  barCodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#00A3E0'
  },
  mainText: {
    fontSize: 16,
    margin: 20
  }
})

export default QRCodeReaderScreen;