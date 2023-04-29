import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Share } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { dailyCardStyles } from '../styles/dailyCardStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  fetchCatImages,
  fetchPsychologicalMessages,
} from '../utils/firebaseApi';
import { generateDailyCard } from '../utils/dailyCardGenerator';

import Star from '../components/svg/Star';
import CustomCardBackground from '../components/svg/CustomCardBackground';

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
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    if (catImages.length > 0 && psychologicalMessages.length > 0) {
      const newCard = generateDailyCard(catImages, psychologicalMessages);
      if (newCard) {
        setCard((prevCard) => {
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
      } else {
        console.warn('Failed to generate a new daily card');
      }
    }
  }, [catImages, psychologicalMessages]);

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

  if (!card) {
    return (
      <View style={dailyCardStyles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={dailyCardStyles.container}>
        <View style={dailyCardStyles.card}>
          <View style={dailyCardStyles.grid}>
            <CustomCardBackground imageUrl={card.image.uri} />
            <Star style={dailyCardStyles.star} />
          </View>
        </View>
        <Text style={dailyCardStyles.title}>{card.message.title}</Text>
        <Text style={dailyCardStyles.message}>{card.message.message}</Text>
        <Text style={dailyCardStyles.photoOwner}>
          Photo by Jeremy Bishop on Unsplash
        </Text>
        <TouchableOpacity
          onPress={saveToFavorites}
          style={dailyCardStyles.favoriteButton}
        >
          <Ionicons name="heart-outline" size={32} color="#000" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DailyCard;
