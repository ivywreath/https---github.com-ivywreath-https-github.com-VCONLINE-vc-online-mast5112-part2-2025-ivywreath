import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useMenu } from '../context/MenuContext';

export default function HomeScreen() {
  const { menuItems } = useMenu();

  type MenuItem = {
    price: string;
    course: 'starters' | 'main' | 'dessert';
    dishName: string;
  };

  /**
   * // Code attribution
   * This method was taken from stackoverflow
   * https://stackoverflow.com/questions/29544371/finding-the-average-of-an-array-using-js
   * bwroga
   * https://stackoverflow.com/users/1264328/bwroga
   */
  const calculateAveragePrice = () => {
    let prices = { starters: 0, main: 0, dessert: 0 };
    let counts = { starters: 0, main: 0, dessert: 0 };

    menuItems.forEach(({ price, course }: MenuItem) => {
      prices[course] += parseFloat(price);
      counts[course]++;
    });

    return {
      starters: counts.starters ? (prices.starters / counts.starters).toFixed(2) : 'N/A',
      main: counts.main ? (prices.main / counts.main).toFixed(2) : 'N/A',
      dessert: counts.dessert ? (prices.dessert / counts.dessert).toFixed(2) : 'N/A',
    };
  };

  const averagePrices = calculateAveragePrice();

  const getCourseImage = (course: 'starters' | 'main' | 'dessert') => {
    const item = menuItems.find((item) => item.course === course && item.image);
    return item ? item.image : null;
  };

  /**
   * // Code attribution
   * // showing a welcome image and average prices for each course
   * //https://stackoverflow.com/questions/74594964/how-do-i-display-items-in-a-nested-array-in-react-native
   * // Vu Phung
   * //https://stackoverflow.com/users/12040727/vu-phung
   */

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Christoffel's Menu</Text>
      <Image source={require('../assets/welcome.jpeg')} style={styles.welcomeImage} />

      <Text style={styles.menuHeader}>Average Prices:</Text>

       <View style={styles.row}>
          <Image source= {getCourseImage('starters') || require('../assets/starters.jpg')} style={styles.icon} />
          <Text style={styles.priceText}>Starters: R{averagePrices.starters}</Text>
        </View>
        <View style={styles.row}>
          <Image source={getCourseImage('main') || require('../assets/main.jpg')} style={styles.icon} />
          <Text style={styles.priceText}>Main: R{averagePrices.main}</Text>
        </View>
        <View style={styles.row}>
          <Image source={getCourseImage('dessert') || require('../assets/sweets.jpg')} style={styles.icon} />
          <Text style={styles.priceText}>Dessert: R{averagePrices.dessert}</Text>
        </View>
    <View/>

      {
        // Code attribution
        // this method was taken from stackoverflow
        // https://stackoverflow.com/questions/71940662/how-to-optimize-flatlist-in-react-native
        // Jun De Leon
        // https://stackoverflow.com/users/8844742/jun-de-leon
      }
      

    <Text style={styles.menuHeader}>Menu Items:</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
        <View style={styles.menuCard}>
        <Image
        source={
          item.image ||
          (item.course === 'starters'
            ? require('../assets/starters.jpg')
            : item.course === 'main'
            ? require('../assets/main.jpg')
            : require('../assets/sweets.jpg'))
        }
        style={styles.menuCardImage}
      />
      <View style={styles.menuCardContent}>
        <Text style={styles.menuCardTitle}>{item.dishName}</Text>
        <Text style={styles.menuCardSubtitle}>{item.course.toUpperCase()}</Text>
        <Text style={styles.menuCardPrice}>R{item.price}</Text>
      </View>
    </View>
  )}
  />
    </View>
  );
}

/*const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});*/



// **Styling Section**
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    flex: 1,
  },
  welcomeImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  menuImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  averagePriceContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  averagePriceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  priceText: {
    fontSize: 18,
    color: '#555',
  },
  menuHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#222',
  },
  menuItem: {
    fontSize: 18,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
   menuHeader: {
    fontSize: 22,       // Increase font size for emphasis
    fontWeight: 'bold', // Make the text bold
    color: '#222',      // Darker color for better visibility
    textAlign: 'left',  // Align text neatly
    marginVertical: 15, // Add vertical spacing above & below
  },
  
menuCard: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 12,
  marginBottom: 12,
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 2,
},
menuCardImage: {
  width: 50,
  height: 50,
  borderRadius: 8,
  marginRight: 15,
  backgroundColor: '#eee',
},
menuCardContent: {
  flex: 1,
},
menuCardTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333',
},
menuCardSubtitle: {
  fontSize: 14,
  color: '#888',
  marginTop: 2,
},
menuCardPrice: {
  fontSize: 16,
  color: '#2e7d32',
  marginTop: 4,
  fontWeight: 'bold',
},
});
