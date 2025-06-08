import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../context/MenuContext';

export default function MenuManagementScreen() {
  const { menuItems, addMenuItem, removeMenuItem } = useMenu();
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<'starters' | 'main' | 'dessert' | null>(null);
  const [price, setPrice] = useState('');

  /**
   * Code attribution
   * This method was taken from stackoverflow
   * https://stackoverflow.com/questions/57255945/which-is-the-better-way-to-assign-function-for-item-in-flatlist
   * Vencovsky
   * https://stackoverflow.com/users/9119186/vencovsky
   */
  const defaultImages = {
    starters: require('../assets/starters.jpg'),
    main: require('../assets/main.jpg'),
    dessert: require('../assets/sweets.jpg'),
  };

  // **Function to Add a New Menu Item**
  const handleAddItem = () => {
    if (!dishName || !description || !course || !price) {
      Alert.alert('Error', 'Please fill all fields!');
      return;
    }

    addMenuItem({ dishName, description, course, price,  image: defaultImages[course]});

    // Clear input fields after adding item
    setDishName('');
    setDescription('');
    setCourse(null);
    setPrice('');
  };

  // **Function to Remove a Menu Item**
  const handleRemoveItem = (index: number) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to remove this item?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => removeMenuItem(index) },
    ]);
  };

   return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Manage Menu</Text>
        <TextInput placeholder="Dish Name" value={dishName} onChangeText={setDishName} style={{ borderBottomWidth: 1, marginVertical: 10 }} />
        <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={{ borderBottomWidth: 1, marginVertical: 10 }} />
        <View style={{ borderBottomWidth: 1, marginVertical: 10 }}>
          <Text style={{ marginBottom: 5 }}>Select Course</Text>
          <Picker selectedValue={course} onValueChange={(itemValue) => setCourse(itemValue as 'starters' | 'main' | 'dessert')}>
            <Picker.Item label="Select a course" value={null} />
            <Picker.Item label="Starters" value="starters" />
            <Picker.Item label="Main" value="main" />
            <Picker.Item label="Dessert" value="dessert" />
          </Picker>
        </View>
        <TextInput placeholder="Price" value={price} keyboardType="numeric" onChangeText={setPrice} style={{ borderBottomWidth: 1, marginVertical: 10 }} />
        <Button title="Add Menu Item" onPress={handleAddItem} />
        <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold' }}>Menu Items</Text>

      {/* 
        Code attribution
        This method was taken from stackoverflow
        https://stackoverflow.com/questions/71940662/how-to-optimize-flatlist-in-react-native
        Jun De Leon
        https://stackoverflow.com/users/8844742/jun-de-leon
      */}

        <FlatList
          data={menuItems}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item, index }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
              <Text>{`${item.dishName} - ${item.description} (${item.course}) - R${item.price}`}</Text>
              <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                <Text style={{ color: 'red' }}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        {menuItems.length === 0 && <Text style={{ color: 'gray', marginTop: 20 }}>No items have been added.</Text>}
      </View>
    </SafeAreaView>
  );
}