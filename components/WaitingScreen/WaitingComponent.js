import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import {
  View,
  Image,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native"

function WaitingScreen({navigation}) {

  const route = useRoute();
  const { selectedItems } = route.params;
  const indicator = false;

  useEffect(() => {
    console.log("THE USER SELECTED THE FOLLOWING ITEMS: ", selectedItems);
    handleUpdateAvailability();
    handleOpeningOfCabinet();
  }, [])

  const handleUpdateAvailability = async () => {
    try {
      const updatedItems = selectedItems.map((item) => ({
        ...item,
        isAvailable: {
          booleanValue: false
        }
      }));

      console.log("UpdatedItems ",updatedItems)

      const updateRequests = updatedItems.map((item) => {
        const documentName = `projects/safe-auth-a2ae0/databases/(default)/documents/tools/${item.name}`;
        console.log("mapping", item);
        return fetch(`https://firestore.googleapis.com/v1/${documentName}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fields: {
              isAvailable: item.isAvailable,
              image: item.image,
              location: item.location
            },
          }),
        });
      });
  
      const updateResponses = await Promise.all(updateRequests);
  
      for (const response of updateResponses) {
        if (!response.ok) {
          console.log('Error updating item:', response.status);
        }
      }
    } catch (error) {
      console.log('Error updating items:', error);
    }
  };

  const handleOpeningOfCabinet = async () => {

    const doorsToBeOpened = {
      "objects": []
    }

    doorsToBeOpened["objects"] = selectedItems.map((item) => ({
      "door": item.location.integerValue,
      "state": 0
    }))

    console.log("Doors to be opened: ", doorsToBeOpened)

    try {      
      const response = await fetch('http://192.168.0.12/control/retrieve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(doorsToBeOpened)
      });
  
      if (response.ok) {
        const responseData = await response.text();
        console.log('Response:', responseData);
      } else {
        const errorBody = await response.text();
        console.log('Error:', response.status);
        console.log('Error body:', errorBody);
      }
    } 
    catch (error) {
      console.log('Error 2:', error.message);
    }
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Por favor, retire os itens confome indicado painel do SAFE</Text>
        { indicator && (
          <View>
            <Text style={styles.text}>Gostaria de retirar mais items?</Text>
            <View style={styles.buttonsContainer}>
              <Button 
                title='Sim'
              />
              <Button 
                title='Não'
              />
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#0C479D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 25,
    width: 350,
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    color: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
})

export default WaitingScreen;