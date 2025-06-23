import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:3000/items';

export default function AddItemScreen({ navigation }) {
  const [nama_barang, setNamaBarang] = useState('');
  const [harga, setHarga] = useState('');
  const [stok, setStok] = useState('');
  const [kategori, setKategori] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (!nama_barang || !harga || !stok || !kategori) {
      setErrorMessage('SEMUA KOLOM WAJIB DIISI!');
      return;
    }

    try {
      await axios.post(API_URL, {
        nama_barang,
        harga: parseInt(harga),
        stok: parseInt(stok),
        kategori,
      });
      setErrorMessage('');
      navigation.goBack();
    } catch (err) {
      console.error(err);
      setErrorMessage('Terjadi kesalahan saat menyimpan data.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nama Barang</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh: Baju Koko"
        placeholderTextColor="#aaa"
        value={nama_barang}
        onChangeText={setNamaBarang}
      />

      <Text style={styles.label}>Harga</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh: 100000"
        placeholderTextColor="#aaa"
        value={harga}
        onChangeText={setHarga}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Stok</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh: 50"
        placeholderTextColor="#aaa"
        value={stok}
        onChangeText={setStok}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Kategori</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh: Pakaian"
        placeholderTextColor="#aaa"
        value={kategori}
        onChangeText={setKategori}
      />

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <View style={{ marginTop: 30 }}>
        <HoverButton
          text="Simpan"
          defaultStyle={styles.submitButton}
          hoverStyle={styles.submitButtonHover}
          textDefaultStyle={styles.submitText}
          textHoverStyle={styles.submitText}
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );
}

// Komponen reusable untuk tombol dengan hover
const HoverButton = ({ text, defaultStyle, hoverStyle, textDefaultStyle, textHoverStyle, onPress }) => {
  const [hover, setHover] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      style={[styles.buttonBase, hover ? hoverStyle : defaultStyle]}
    >
      <Text style={hover ? textHoverStyle : textDefaultStyle}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 1,
    marginTop: 14,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  buttonBase: {
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 2,
  },
  submitButton: {
    backgroundColor: '#339af0',
  },
  submitButtonHover: {
    backgroundColor: '#1c7ed6', // biru agak tua saat hover
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    marginTop: 25,
    color: '#e03131',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});