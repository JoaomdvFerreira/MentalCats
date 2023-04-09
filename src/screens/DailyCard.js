import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { firestore, storage } from '../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

const DailyCard = ({ navigation }) => {
  const [card, setCard] = useState(null);
  const [catImages, setCatImages] = useState([]);
  const [psychologicalMessages, setPsychologicalMessages] = useState([]);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const [catImagesData, psychologicalMessagesData] = await Promise.all([
          fetchCatImages(),
          fetchPsychologicalMessages(),
        ]);

        setCatImages(catImagesData);
        setPsychologicalMessages(psychologicalMessagesData);

        if (catImagesData.length > 0 && psychologicalMessagesData.length > 0) {
          generateRandomCard(catImagesData, psychologicalMessagesData);
        } else {
          console.log('No data found');
        }
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    if (catImages.length > 0 && psychologicalMessages.length > 0) {
      generateRandomCard(catImages, psychologicalMessages);
    }
  }, [catImages, psychologicalMessages]);

  const fetchPsychologicalMessages = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, 'psychologicalMessages')
      );
      const messages = querySnapshot.docs.map((doc) => doc.data());
      return messages;
    } catch (error) {
      console.error('Error fetching psychological messages:', error);
    }
    return [];
  };

  const fetchCatImages = async () => {
    try {
      const listResult = await listAll(ref(storage, 'catImages'));

      if (listResult.items.length === 0) {
        console.log('No cat images found in storage');
      }

      const imageUrls = await Promise.all(
        listResult.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return { id: item.name, uri: url };
        })
      );
      return imageUrls;
    } catch (error) {
      console.error('Error fetching cat images:', error);
    }
    return [];
  };

  const generateRandomCard = (catImagesData, psychologicalMessagesData) => {
    if (catImagesData.length === 0 || psychologicalMessagesData.length === 0) {
      console.warn('No cat images or psychological messages found.');
      return;
    }

    const randomIndex = Math.floor(Math.random() * catImagesData.length);
    const randomImage = catImagesData[randomIndex];
    const randomMessage =
      psychologicalMessagesData[
        Math.floor(Math.random() * psychologicalMessagesData.length)
      ];

    setCard((prevCard) => {
      const newCard = {
        image: { id: randomIndex + 1, uri: randomImage.uri },
        message: { title: randomMessage.title, message: randomMessage.message },
      };

      if (
        prevCard === null ||
        prevCard.image.uri !== newCard.image.uri ||
        prevCard.message.title !== newCard.message.title ||
        prevCard.message.message !== newCard.message.message
      ) {
        return newCard;
      }

      return prevCard;
    });
  };

  const saveToFavorites = async () => {
    if (!card) return;

    try {
      const favorites =
        JSON.parse(await AsyncStorage.getItem('favorites')) || [];
      favorites.push(card);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      navigation.navigate('Favorites');
    } catch (err) {
      console.error('Error saving card to favorites:', err);
    }
  };

  const shareCard = async () => {
    if (!card) return;

    try {
      const baseUrl = 'https://mentalcats.com/share';
      const encodedImageUri = encodeURIComponent(card.image);
      const encodedMessage = encodeURIComponent(card.message);
      const shareUrl = `${baseUrl}?image=${encodedImageUri}&message=${encodedMessage}`;

      await Share.share({
        title: 'Awesome Cat',
        url: shareUrl,
        message: `Check out this awesome cat: ${shareUrl}`,
      });
    } catch (err) {
      console.error('Error sharing card:', err);
    }
  };

  if (!card) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: card.image.uri }} style={styles.image} />
      <Text style={styles.message}>{card.message.title}</Text>
      <Text style={styles.message}>{card.message.message}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={saveToFavorites}>
          <Text style={styles.buttonText}>Save to Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={shareCard}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: { width: '100%', height: 300, resizeMode: 'cover', marginBottom: 20 },
  message: { fontSize: 18, textAlign: 'center', marginBottom: 20 },
  buttonContainer: { flexDirection: 'row' },
  button: {
    backgroundColor: '#00f',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default DailyCard;
