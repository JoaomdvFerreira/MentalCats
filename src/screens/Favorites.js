import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { favoritesStyles as styles } from '../styles/favoritesStyles';

const Favorites = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [superFavorites, setSuperFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites =
          JSON.parse(await AsyncStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadFavorites();
  }, []);

  const removeFromFavorites = (index) => {
    Alert.alert(
      'Remove from Favorites',
      'Are you really sure you want to get rid of this cute cat?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const updatedFavorites = favorites.filter((_, i) => i !== index);
              await AsyncStorage.setItem(
                'favorites',
                JSON.stringify(updatedFavorites)
              );
              setFavorites(updatedFavorites);
            } catch (err) {
              console.error('Error removing card from favorites:', err);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const toggleSuperFavorite = (index) => {
    setSuperFavorites((prevSuperFavorites) => {
      if (prevSuperFavorites.includes(index)) {
        return prevSuperFavorites.filter((i) => i !== index);
      } else {
        return [...prevSuperFavorites, index];
      }
    });
  };

  const goToDetail = (card) => {
    navigation.navigate('Detail', { card });
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.cardList}
        data={favorites}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.favoriteCard}>
            <TouchableOpacity
              onPress={() => goToDetail(item)}
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            >
              <View style={styles.imageContainer}>
                <Image style={styles.cardImage} source={item.image} />
                <TouchableOpacity
                  style={styles.superFavoriteButton}
                  onPress={() => toggleSuperFavorite(index)}
                >
                  {superFavorites.includes(index) ? (
                    <Ionicons name="star" size={16} color="gold" />
                  ) : (
                    <Ionicons name="star-outline" size={16} color="#000" />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{item.message.title}</Text>
                <Text style={styles.cardMessage}>{item.message.message}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromFavorites(index)}
            >
              <Ionicons name="trash-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Favorites;
