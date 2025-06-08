import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../context/MenuContext';

type MenuItem = {
  dishName: string;
  course: string;
  image: any; // or ImageSourcePropType if you want to be more specific
  description: string;
  price: number;
};

export default function GuestFilteringScreen() {
  const { menuItems, removeMenuItem } = useMenu();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  return (
    <View>
      <Picker selectedValue={selectedCourse} onValueChange={setSelectedCourse}>
        <Picker.Item label="All Courses" value={null} />
        <Picker.Item label="Starters" value="starters" />
        <Picker.Item label="Main" value="main" />
        <Picker.Item label="Dessert" value="dessert" />
      </Picker>

       {/* 
        * Code attribution
        * This method was taken from stackoverflow
        * https://stackoverflow.com/questions/71940662/how-to-optimize-flatlist-in-react-native
        * Jun De Leon
        * https://stackoverflow.com/users/8844742/jun-de-leon
       */}

      <FlatList
        data={menuItems.filter(item => !selectedCourse || item.course === selectedCourse)}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.menuItem}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.dishName}>{item.dishName}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>R{item.price}</Text>

              {// Code attribution
              // This method was taken from stackoverflow
              // https://stackoverflow.com/questions/57447453/onpress-event-not-working-on-views-images-touchableopacity-in-react-native
              // hong developer
              // https://stackoverflow.com/users/11212074/hong-developer
              }
            
              <TouchableOpacity onPress={() => removeMenuItem(index)}>
                <Text style={{color: 'red', marginTop: 4}}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

// **Styles for Better UI**
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
   menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
   image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
   price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});


