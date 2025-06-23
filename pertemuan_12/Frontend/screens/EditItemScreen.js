import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:3000/items';

export default function EditItemScreen({ route, navigation }) {
  const { item } = route.params;
  const [namaBarang, setNamaBarang] = useState(item.nama_barang);
  const [harga, setHarga] = useState(item.harga.toString());
  const [stok, setStok] = useState(item.stok.toString());
  const [kategori, setKategori] = useState(item.kategori);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdate = async () => {
    if (!namaBarang || !harga || !stok || !kategori) {
      setErrorMessage('SEMUA KOLOM WAJIB DIISI!');
      return;
    }

    try {
      await axios.put(`${API_URL}/${item._id}`, {
        nama_barang: namaBarang,
        harga: Number(harga),
        stok: Number(stok),
        kategori,
      });
      setErrorMessage('');
      navigation.goBack();
    } catch (err) {
      console.error(err);
      setErrorMessage('Terjadi kesalahan saat menyimpan perubahan.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nama Barang</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh: Baju Koko"
        placeholderTextColor="#aaa"
        value={namaBarang}
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

      <Pressable style={styles.submitButton} onPress={handleUpdate}>
        <Text style={styles.submitText}>Simpan Perubahan</Text>
      </Pressable>
    </ScrollView>
  );
}

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
  submitButton: {
    marginTop: 30,
    backgroundColor: '#339af0',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
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
