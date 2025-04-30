import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [menuItems, setMenuItems] = useState<{ dishName: string; description: string; course: string; price: string }[]>([]);
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<'starters' | 'main' | 'dessert' | null>(null);
  const [courseInput, setCourseInput] = useState('');
  const [price, setPrice] = useState('');
  const [count, setCount] = useState({ starters: 0, main: 0, dessert: 0 });

  const addMenuItem = () => {
    if (!dishName || !description || !course || !price) {
      Alert.alert('Error', 'Please fill all fields!');
      return;
    }

    setMenuItems((prevItems) => [...prevItems, { dishName, description, course, price }]);
    setCount((prevCount) => ({
      ...prevCount,
      [course]: prevCount[course] + 1,
    }));

    setDishName('');
    setDescription('');
    setCourse(null);
    setPrice('');
  };

  const deleteMenuItem = (index: number) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this item?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          const updatedItems = [...menuItems];
          const item = updatedItems[index];
          updatedItems.splice(index, 1);

          setMenuItems(updatedItems);
          setCount((prevCount) => ({
            ...prevCount,
            [item.course as 'starters' | 'main' | 'dessert']: prevCount[item.course as 'starters' | 'main' | 'dessert'] - 1,
          }));
        },
      },
    ]);
  };

  return (
    <View style={{ padding: 20 }}>
      {/* App Title */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Christoffel's Menu</Text>

      {/* Display Dish Image */}
      <Image
        source={require('./assets/SigDish.jpeg')} 
        style={{ width: '100%', height: 200, marginBottom: 20 }}
        resizeMode="cover"
      />

      {/* Input Fields */}
      <TextInput
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
      />

      {/* Dropdown for Course Selection */}
      <View style={{ borderBottomWidth: 1, marginVertical: 10 }}>
        <Text style={{ marginBottom: 5 }}>Select Course</Text>
        <Picker
          selectedValue={course}
          onValueChange={(itemValue) => setCourse(itemValue as 'starters' | 'main' | 'dessert')}
          style={{ height: 50, width: '100%' }}
        >
          <Picker.Item label="Select a course" value={null} />
          <Picker.Item label="Starters" value="starters" />
          <Picker.Item label="Main" value="main" />
          <Picker.Item label="Dessert" value="dessert" />
        </Picker>
      </View>

      <TextInput
        placeholder="Price"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
      />

      {/* Menu Item Button */}
      <Button title="Add Menu Item" onPress={addMenuItem} />

      {/* Display List of Menu Items */}
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            <Text>{`${item.dishName} - ${item.description} (${item.course}) - ${item.price}`}</Text>
            <TouchableOpacity onPress={() => deleteMenuItem(index)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Message When No Items */}
      {menuItems.length === 0 && <Text style={{ color: 'gray', marginTop: 20 }}>No items have been added.</Text>}

      {/* Count of Meals */}
      <Text style={{ marginTop: 20 }}>
        Starters: {count.starters}, Main: {count.main}, Dessert: {count.dessert}
      </Text>
    </View>
  );
}
