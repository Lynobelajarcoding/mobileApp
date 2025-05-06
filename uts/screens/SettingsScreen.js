import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function SettingsScreen() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [notifications, setNotifications] = useState(true);

  const toggleNotifications = () => setNotifications(prev => !prev);

  const handleLanguagePress = () => {
    Alert.alert('Fitur Belum Tersedia', 'Menu bahasa akan ditambahkan nanti.');
  };

  const backgroundColor = darkMode ? '#222' : '#FFFFFF';
  const textColor = darkMode ? '#fff' : '#222';
  const borderColor = darkMode ? '#555' : '#eee';
  const iconColor = darkMode ? '#ccc' : '#333';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.header, { color: textColor }]}>Pengaturan</Text>

      <View style={[styles.item, { borderBottomColor: borderColor }]}>
        <Icon name="moon" size={24} color={iconColor} style={styles.icon} />
        <Text style={[styles.itemText, { color: textColor }]}>Mode Gelap</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>

      <TouchableOpacity
        style={[styles.item, { borderBottomColor: borderColor }]}
        onPress={handleLanguagePress}
      >
        <Icon name="language" size={24} color={iconColor} style={styles.icon} />
        <Text style={[styles.itemText, { color: textColor }]}>Bahasa</Text>
        <Icon name="chevron-forward" size={20} color={iconColor} />
      </TouchableOpacity>

      <View style={[styles.item, { borderBottomColor: borderColor }]}>
        <Icon name="notifications" size={24} color={iconColor} style={styles.icon} />
        <Text style={[styles.itemText, { color: textColor }]}>Notifikasi</Text>
        <Switch value={notifications} onValueChange={toggleNotifications} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  icon: { marginRight: 16 },
  itemText: { flex: 1, fontSize: 16 },
});