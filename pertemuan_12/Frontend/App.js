import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import EditItemScreen from './screens/EditItemScreen';
import TambahItemScreen from './screens/TambahItemScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'TokoSaya' }} />
        <Stack.Screen name="AddItem" component={TambahItemScreen} options={{ title: 'Tambah Barang' }} />
        <Stack.Screen name="EditItem" component={EditItemScreen} options={{ title: 'Edit Barang' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}