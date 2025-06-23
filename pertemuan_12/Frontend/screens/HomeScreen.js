import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Pressable } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';

const API_URL = 'http://localhost:3000/items';

export default function HomeScreen({ navigation }) {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const res = await axios.get(API_URL);
    setItems(res.data);
  };

  const deleteItem = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchItems();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchItems);
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.addButton}>
        <HoverButton
          text="Tambah Barang"
          defaultStyle={styles.addButtonDefault}
          hoverStyle={styles.addButtonHover}
          textDefaultStyle={styles.textBlue}
          textHoverStyle={styles.textWhite}
          onPress={() => navigation.navigate('AddItem')}
        />
      </View>

      {items.map((item) => (
        <Card key={item._id} style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>{item.nama_barang}</Title>

            <View style={styles.descriptionWrapper}>
              <Paragraph style={styles.descriptionText}>Harga: Rp{item.harga}</Paragraph>
              <Paragraph style={styles.descriptionText}>Stok: {item.stok}</Paragraph>
              <Paragraph style={styles.descriptionText}>Kategori: {item.kategori}</Paragraph>
            </View>

            <View style={styles.buttonRow}>
              <View style={styles.buttonWrapper}>
                <HoverButton
                  text="Edit"
                  defaultStyle={styles.editButton}
                  hoverStyle={styles.editButtonHover}
                  textDefaultStyle={styles.textWhite}
                  textHoverStyle={styles.textWhite}
                  onPress={() => navigation.navigate('EditItem', { item })}
                />
              </View>
              <View style={styles.buttonWrapper}>
                <HoverButton
                  text="Hapus"
                  defaultStyle={styles.deleteButton}
                  hoverStyle={styles.deleteButtonHover}
                  textDefaultStyle={styles.textWhite}
                  textHoverStyle={styles.textWhite}
                  onPress={() => deleteItem(item._id)}
                />
              </View>
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

// Komponen tombol dengan hover
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
    padding: 20,
  },
  addButton: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 25,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    elevation: 3,
  },
  title: {
    paddingLeft: 10,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: 800,
  },
  descriptionWrapper: {
    paddingLeft: 10,
  },
  descriptionText: {
    fontWeight: 550,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonBase: {
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 6,
  },
  // Tambah Barang
  addButtonDefault: {
    backgroundColor: '#339af0',
  },
  addButtonHover: {
    backgroundColor: '#007bff',
  },
  // Edit
  editButton: {
    backgroundColor: '#339af0',
  },
  editButtonHover: {
    backgroundColor: '#1c7ed6',
  },
  // Hapus
  deleteButton: {
    backgroundColor: '#e03131',
  },
  deleteButtonHover: {
    backgroundColor: '#a51111',
  },
  // Text Colors
  textBlue: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textWhite: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
