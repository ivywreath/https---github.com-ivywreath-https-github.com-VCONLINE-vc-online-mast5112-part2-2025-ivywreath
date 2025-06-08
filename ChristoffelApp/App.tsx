import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import MenuManagementScreen from './screens/MenuManagementScreen';
import GuestFilteringScreen from './screens/GuestFilteringScreen';
import { MenuProvider } from './context/MenuContext';

/**
 * Code attribution
 * This method was taken from stackoverflow
 * https://stackoverflow.com/questions/31079081/how-to-programmatically-navigate-using-react-router
 * babaliaris
 * https://stackoverflow.com/users/5695458/babaliaris
 * Paul S
 * https://stackoverflow.com/users/444829/paul-s
 */

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Tab.Navigator>
         <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Manage Menu" component={MenuManagementScreen} />
          <Tab.Screen name="Filter Menu" component={GuestFilteringScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
