import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DailyCardHeader = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Card</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
        <Ionicons name="star" size={24} color="yellow" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 25,
    paddingTop: 50,
    paddingBottom: 5,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DailyCardHeader;
