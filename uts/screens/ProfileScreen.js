import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function ProfileScreen() {
  const { darkMode } = useDarkMode();

  const backgroundColor = darkMode ? '#222' : '#FFFFFF';
  const textColor = darkMode ? '#fff' : '#fff';
  const cardColor = darkMode ? '#333' : '#00BFFF';
  const borderColor = darkMode ? '#555' : '#ddd';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.profileCard, { backgroundColor: cardColor, borderColor }]}>
      <Image
          source={require('../assets/avatar.jpg')}
          style={styles.avatar}
        />
        <Text style={[styles.name, { color: textColor }]}>John Doe</Text>
        <Text style={[styles.email, { color: textColor }]}>john@gmail.com</Text>

        <View style={styles.divider} />
        
        <Text style={[styles.label, { color: textColor }]}>Status:</Text>
        <Text style={[styles.value, { color: textColor }]}>Premium Member</Text>

        <Text style={[styles.label, { color: textColor }]}>Bergabung Sejak:</Text>
        <Text style={[styles.value, { color: textColor }]}>Januari 2024</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    width: '100%',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#888',
    width: '100%',
    marginVertical: 16,
    opacity: 0.3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.8,
  },
  value: {
    fontSize: 16,
    marginBottom: 12,
  },
});
