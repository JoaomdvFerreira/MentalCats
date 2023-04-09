import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Share,
} from 'react-native';

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
    <View style={styles.container}>
      <Image source={{ uri: card.image.uri }} style={styles.image} />
      <Text style={styles.message}>{card.message.title}</Text>
      <Text style={styles.message}>{card.message.message}</Text>
      <TouchableOpacity style={styles.button} onPress={shareImage}>
        <Text style={styles.buttonText}>Share</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Detail;
