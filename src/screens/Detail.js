import React from 'react';
import { View, Text, Image, TouchableOpacity, Share } from 'react-native';
import { detailStyles } from '../styles/detailStyles';
import CustomCardBackground from '../components/svg/CustomCardBackground';

const Detail = ({ route }) => {
  const { card, colors } = route.params;
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
    <View
      style={[detailStyles.container, { backgroundColor: colors.background }]}
    >
      <CustomCardBackground
        imageUrl={card.image.uri}
        cardBackgroundColor={colors.cardBackground}
      />
      <Text style={detailStyles.title}>{card.message.title}</Text>
      <Text style={detailStyles.message}>{card.message.message}</Text>
      <TouchableOpacity style={detailStyles.button} onPress={shareImage}>
        <Text style={detailStyles.buttonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Detail;
