import {
  View,
  Button,
  Text,
  StyleSheet
} from "react-native"
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";


function QRCodeReaderScreen({navigation}) {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');
  const isFocused = useIsFocused();

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')
    })()
  }

  const resetScanner = () => {
    setScanned(false);
    setText("Not yet scanned");
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      resetScanner();
    }, [])
  );

  const handleBarCodeScanned = async ({type, data}) => {
    setScanned(true);
    setText(data);
    try {
      const userInfo = await fetchItemFromDatabase(data);
      navigation.navigate('User authentication', {
        userInfo: userInfo
      });
    }
    catch(error) {
      console.log("Error fetching item", error);
    }
  }

  const fetchItemFromDatabase = async (itemId) => {
    try {
      const response = await fetch(`https://firestore.googleapis.com/v1/projects/safe-auth-a2ae0/databases/(default)/documents/users/${itemId}`);
      if(response.ok) {
        const itemData = await response.json();
        return itemData;
      } else {
        console.log("Error, item not found!");
      }
    }
    catch(error) {
      console.log("Error fetching item: ", error);
      throw error;
    }
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
        <Button 
          title='Allow camera' onPress={() => askForCameraPermission()} />
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
        { isFocused ? (
          <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{height: 400, width: 400}}
        />) : null}
      </View>
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