import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
  const [isFavorited, setIsFavorited] = useState(false);
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
    const checkFavoriteStatus = async () => {
      if (card) {
        try {
          const favorites =
            JSON.parse(await AsyncStorage.getItem('favorites')) || [];
          const isCardFavorited = favorites.some(
            (favorite) => favorite.image.uri === card.image.uri
          );
          setIsFavorited(isCardFavorited);
        } catch (err) {
          console.error('Error checking card favorite status:', err);
        }
      }
    };

    checkFavoriteStatus();
  }, [card]);

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

  const toggleFavorite = async () => {
    if (!card) return;

    try {
      const favorites =
        JSON.parse(await AsyncStorage.getItem('favorites')) || [];

      if (isFavorited) {
        const updatedFavorites = favorites.filter(
          (favorite) => favorite.image.uri !== card.image.uri
        );
        await AsyncStorage.setItem(
          'favorites',
          JSON.stringify(updatedFavorites)
        );
      } else {
        favorites.push(card);
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      }

      setIsFavorited(!isFavorited);
    } catch (err) {
      console.error('Error toggling card favorite status:', err);
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
          onPress={toggleFavorite}
          style={dailyCardStyles.favoriteButton}
        >
          <Ionicons
            name={isFavorited ? 'heart' : 'heart-outline'}
            size={32}
            color={isFavorited ? 'red' : '#000'}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DailyCard;
