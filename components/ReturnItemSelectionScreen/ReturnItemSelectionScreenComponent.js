import { useState, useEffect } from "react";
import {
  View,
  Image,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native"

import { useIsFocused, useRoute } from '@react-navigation/native'

function ReturnItemSelectionScreen({navigation}) {

  const route = useRoute();
  const { userId } = route.params;
  const { operation } = route.params;

  const [items, setItems] = useState([]);
  const [userItems, setUserItems] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchItemsFromDatabase();
  }, [isFocused]);

  useEffect(() => {
    console.log("alteracoes nos items!!");
    updateUserItems();
  }, [items]);

  const fetchItemsFromDatabase = async () => {
    try {
      const response = await fetch('https://firestore.googleapis.com/v1/projects/safe-auth-v2/databases/(default)/documents/tools');
      if (response.ok) {
        const data = await response.json();
        const itemData = data.documents.map((doc) => ({
          name: doc.name.split('/').pop(),
          ...doc.fields,
        }));
        setItems(itemData);
      } else {
        console.log('Error: Items not found!');
      }
    } catch (error) {
      console.log('Error fetching items:', error);
    }
  };

  const updateUserItems = () => {
    const userItems = items?.filter((item) => {
      return item.wasLentTo?.stringValue == userId;
    });
    setUserItems(userItems);

  }

  const handleItemPress = (item) => {
    if(item.isAvailable.booleanValue) {
      return ;
    }
    const updatedItems = userItems.map((data) => {
      if(data.name == item.name) {
        return {
          ...data,
          isSelected: !data.isSelected
        }
      }
      return data;
    })
    setUserItems(updatedItems);
  };

  const handleConfirmationButtonPress = () => {
    const selectedItems = userItems.filter((item) => item.isSelected);
    console.log("RETURN ITEMS SELECTION SCREEN - Selected Items:", selectedItems);
    navigation.navigate('Waiting screen', {
      operation: operation,
      selectedItems: selectedItems,
      userId: userId
    });
  };

  return (
    <View style={styles.appContainer}>
      <View>
        <Text style={styles.textContainer}>
          Selecione os itens que deseja devolver
        </Text>
      </View>
      <View style={styles.mainItemContainer}>
        {userItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={[
              styles.itemContainer,
              item.isSelected && styles.itemSelected,
            ]}
            onPress={() => handleItemPress(item)}
          >
            {item.image && (
              <Image
                style={styles.itemImage}
                source={{ uri: item.image.stringValue }}
              />
            )}
            <View style={{ width: "100%", textAlign: 'center' }}>
              <Text style={{ textAlign: 'center' }}>{item.toolName?.stringValue}</Text>
            </View>
          </TouchableOpacity>
          )
        )}
      </View>
      <View style={styles.bottomMenu}>
        <View style={styles.confirmationButton}>
          <Button 
            title='Prosseguir'
            onPress={handleConfirmationButtonPress}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1, 
    backgroundColor: "white"
  },
  textContainer: {
    fontSize: 25,
    marginTop: 25,
    marginLeft: 25,
    textAlign: 'left',
    width: 350,
  },
  mainItemContainer: {
    marginTop: 15,
    marginBottom: 15,
    marginRight: 30,
    marginLeft: 30,
    height: '70%',
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-evenly',
    backgroundColor: '#D3D3D3'
  },
  itemContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    width: '40%',
    aspectRatio: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  itemStatusContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  itemName: {
    textAlign: 'center',
  },
  itemStatus: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    paddingVertical: 5,
  },
  itemStatusText: {
    textAlign: 'center',
    color: 'white',
  },
  itemAvailable: {
    backgroundColor: 'green',
  },
  itemUnavailable: {
    backgroundColor: 'red',
  },
  itemImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  },
  itemSelected: {
    opacity: 0.3,
  },
  bottomMenu: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#0C479D'
  },
  linearGradient: {
    flex: 1,
    width: '100%',
  },
  confirmationButton: {
    marginRight: 35,
    marginBottom: 50
  }
})

export default ReturnItemSelectionScreen;