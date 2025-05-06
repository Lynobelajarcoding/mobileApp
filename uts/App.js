import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { darkMode } = useDarkMode();

  const headerBackgroundColor = darkMode ? '#222' : '#FFF';
  const headerTextColor = darkMode ? '#fff' : '#000';
  const iconColor = darkMode ? '#fff' : '#000';

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: headerBackgroundColor },
        headerTintColor: headerTextColor,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'RIJIK',
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Icon
                  name="settings-outline"
                  size={28}
                  color={iconColor}
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Icon
                  name="person-circle-outline"
                  size={32}
                  color={iconColor}
                  style={{ marginRight: 10, bottom: 2 }}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <DarkModeProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </DarkModeProvider>
  );
}