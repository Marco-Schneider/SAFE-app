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
import firestore from '@react-native-firebase/firestore';

function WaitingScreen({navigation}) {

  const route = useRoute();
  const { selectedItems } = route.params;
  const { userId } = route.params;
  const { operation } = route.params;

  console.log("operation: ", operation);

  const [indicator, setIndicator] = useState(false);
  var intialSafeState = "";

  useEffect(() => {
    console.log("THE USER SELECTED THE FOLLOWING ITEMS: ", selectedItems);
    getInitialSafeState();
    handleUpdateAvailability();
    handleOpeningOfCabinet();

    const interval = setInterval(() => {
      getUpdatedSafeState();
    }, 2000);

    return () => clearInterval(interval);

  }, [])

  const getInitialSafeState = async () => {
    try {
      const response = await fetch('https://firestore.googleapis.com/v1/projects/safe-auth-v2/databases/(default)/documents/safe');

      if(response.ok) {
        const data = await response.json();
        const itemData = data.documents.map((doc) => ({
          name: doc.name.split('/').pop(),
          ...doc.fields,
        }));

        if(itemData.length > 0) {
          const value = itemData[0].status.stringValue;
          intialSafeState = value;
        }
      } 
      else {
        console.log('Items not found!');
      }
    } 
    catch (error) {
      console.log('Error gathering items:', error);
    }
  }

  const getUpdatedSafeState = async () => {
    try {
      const response = await fetch('https://firestore.googleapis.com/v1/projects/safe-auth-v2/databases/(default)/documents/safe');

      if (response.ok) {
        const data = await response.json();
        const itemData = data.documents.map((doc) => ({
          name: doc.name.split('/').pop(),
          ...doc.fields,
        }));

        if (itemData.length > 0) {
          const value = itemData[0].status.stringValue;
          console.log("Value: ", value);
          console.log("initial", intialSafeState);
          if(value == "itemRetrieval" && intialSafeState == "Closed") {
            intialSafeState = "itemRetrieval";
          }
          if(value == "returningItems" && intialSafeState == "Closed") {
            intialSafeState = "returningItems";
          }
          if (value != intialSafeState && value == "Closed") {
            intialSafeState = value;
            setIndicator(true);
            console.log('State has changed:', value);
          }
        }
      } else {
        console.log('Items not found!');
      }
    } catch (error) {
      console.log('Error gathering items:', error);
    }
  };

  const handleUpdateAvailability = async () => {
    console.log("operation: ");
    console.log(operation);

    try {
      if(operation == "retrieveItems") {
        const updatedItems = selectedItems.map((item) => ({
          ...item,
          isAvailable: {
            booleanValue: false
          },
          wasLentTo: {
            stringValue: userId
          }
        }));
  
        console.log("UpdatedItems ",updatedItems);
  
        const updateRequests = updatedItems.map((item) => {
          const documentName = `projects/safe-auth-v2/databases/(default)/documents/tools/${item.name}`;
          console.log("documentName", documentName);
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
                toolName: item.toolName,
                location: item.location,
                wasLentTo: item.wasLentTo
              },
            }),
          });
        });
      }
      else if(operation == "returnItems") {
        const updatedItems = selectedItems.map((item) => ({
          ...item,
          isAvailable: {
            booleanValue: true
          },
          wasLentTo: {
            stringValue: ""
          }
        }));
  
        console.log("UpdatedItems ",updatedItems)
  
        const updateRequests = updatedItems.map((item) => {
          const documentName = `projects/safe-auth-v2/databases/(default)/documents/tools/${item.name}`;
          console.log("documentName", documentName);
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
                toolName: item.toolName,
                location: item.location,
                wasLentTo: item.wasLentTo
              },
            }),
          });
        });
      }
  
      const updateResponses = await Promise.all(updateRequests);
  
      for (const response of updateResponses) {
        if (!response.ok) {
          console.log('Error updating item:', response.status);
        }
        else {
          console.log('Item successfully updated!', response.status);
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
      if(operation == "retrieveItems") {
        console.log("Beggining for the retrieve!!");
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
      else if(operation == "returnItems") {
        const response = await fetch('http://192.168.0.12/control/return', {
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
    } 
    catch (error) {
      console.log('Error 2:', error.message);
    }
  };

  const handleYesButtonPress = () => {
    navigation.goBack();
  };

  const handleNoButtonPress = () => {
    navigation.popToTop();
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.textContainer}>
        { !indicator && (
          <Text style={styles.text}>Por favor, retire os itens confome indicado painel do SAFE</Text>
        )}
        { indicator && (
          <View>
            <Text style={styles.text}>Gostaria de retirar mais items?</Text>
            <View style={styles.buttonsContainer}>
              <Button 
                title='Sim'
                onPress={handleYesButtonPress}
              />
              <Button 
                title='Não'
                onPress={handleNoButtonPress}
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