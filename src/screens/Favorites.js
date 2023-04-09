import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorites = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites =
        JSON.parse(await AsyncStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);
    } catch (err) {
      console.error('Error loading favorites:', err);
    }
  };

  const removeFavorite = async (indexToRemove) => {
    try {
      const updatedFavorites = favorites.filter(
        (_, index) => index !== indexToRemove
      );
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (err) {
      console.error('Error removing favorite:', err);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', { card: item })}
      >
        <Image source={{ uri: item.image.uri }} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.message}>{item.message.message}</Text>
      <TouchableOpacity
        style={styles.unfavoriteButton}
        onPress={() => removeFavorite(index)}
      >
        <Text style={styles.unfavoriteButtonText}>Unfavorite</Text>
      </TouchableOpacity>
    </View>
  );

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text>
          No favorites found. Save your favorite cards from the Daily Card
          screen.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        key={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    maxWidth: '48%',
  },
  image: { width: '100%', height: 150, resizeMode: 'cover', marginBottom: 10 },
  message: { fontSize: 16, textAlign: 'center' },
  unfavoriteButton: {
    backgroundColor: '#f00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  unfavoriteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Favorites;
