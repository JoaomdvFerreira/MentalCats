import React from 'react';
import { View, Text, Image, TouchableOpacity, Share } from 'react-native';
import { detailStyles } from '../styles/detailStyles';

const Detail = ({ route }) => {
  const { card } = route.params;

  const shareImage = async () => {
    try {
      await Share.share({
        message: `${card.message.title} - ${card.message.message} - ${card.image.uri}`,
        url: card.image.uri,
      });
    } catch (error) {
      console.error('Error sharing image:', error);
    }
  };

  return (
    <View style={detailStyles.container}>
      <Image source={{ uri: card.image.uri }} style={detailStyles.image} />
      <Text style={detailStyles.title}>{card.message.title}</Text>
      <Text style={detailStyles.message}>{card.message.message}</Text>
      <TouchableOpacity style={detailStyles.button} onPress={shareImage}>
        <Text style={detailStyles.buttonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Detail;
