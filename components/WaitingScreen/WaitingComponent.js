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

  useEffect(() => {
    console.log("THE USER SELECTED THE FOLLOWING ITEMS: ", selectedItems);
    handleUpdateAvailability();
  }, [])

  const handleUpdateAvailability = async () => {
    try {
      const updatedItems = selectedItems.map((item) => ({
        ...item,
        isAvailable: {
          booleanValue: false
        }
      }));

      const updateRequests = updatedItems.map((item) => {
        const documentName = `projects/safe-auth-a2ae0/databases/(default)/documents/tools/${item.name}`;
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
  

  return (
    <View style={styles.appContainer}>
      <View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1, 
    backgroundColor: '#0C479D'
  },
  textContainer: {
    fontSize: 25,
    marginTop: 25,
    textAlign: 'center',
    width: 350,
  }
})

export default WaitingScreen;