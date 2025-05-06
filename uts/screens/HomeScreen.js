import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function HomeScreen() {
  const { darkMode } = useDarkMode();

  const handleOrder = (title) => {
    if (Platform.OS === 'web') {
      window.alert(`Anda berhasil memesan ${title}`);
    } else {
      Alert.alert('Berhasil!', `Anda berhasil memesan ${title}`);
    }
  };

  const backgroundColor = darkMode ? '#222' : '#FFFFFF';
  const textColor = darkMode ? '#fff' : '#1E1E1E';
  const cardColor = darkMode ? '#666' : '#FFFFFF';
  const buttonColor = darkMode ? '#000' : '#00BFFF';
  const buttonText = darkMode ? '#fff' : '#fff';

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>

      {services.map((service, index) => (
        <View style={[styles.card, { backgroundColor: cardColor }]} key={index}>
          <Image source={service.image} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <View style={styles.textContainer}>
              <Text style={[styles.cardTitle, { color: textColor }]}>{service.title}</Text>
              <Text style={[styles.cardDesc, { color: textColor }]}>{service.desc}</Text>
            </View>
            <TouchableOpacity
              style={[styles.orderButton, { backgroundColor: buttonColor }]}
              onPress={() => handleOrder(service.title)}
            >
              <Text style={[styles.orderButtonText, { color: buttonText }]}>Pesan Sekarang</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const services = [
  {
    title: 'Cuci Mobil Eksterior',
    desc: 'Mobil kamu akan tampak seperti baru!',
    image: require('../assets/cuci-eksterior.jpg'),
  },
  {
    title: 'Cuci Motor',
    desc: 'Kilapkan motor kesayanganmu dengan cepat.',
    image: require('../assets/cuci-motor.jpg'),
  },
  {
    title: 'Detailing Interior',
    desc: 'Interior bersih, nyaman, dan bebas debu.',
    image: require('../assets/detailing-interior.jpg'),
  },
  {
    title: 'Poles Body Mobil',
    desc: 'Hapus baret halus dan kembalikan kilap cat mobil.',
    image: require('../assets/poles-mobil.jpg'),
  },
  {
    title: 'Pembersihan Mesin',
    desc: 'Mesin bersih tanpa merusak komponen penting.',
    image: require('../assets/cuci-mesin.jpg'),
  },
  {
    title: 'Cuci Mobil di Rumah',
    desc: 'Teknisi datang ke rumah, bebas repot dan cepat.',
    image: require('../assets/cuci-panggil.jpg'),
  },
];

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardDesc: {
    fontSize: 14,
    marginTop: 4,
  },
  orderButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  orderButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});