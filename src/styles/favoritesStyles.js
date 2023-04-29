import { StyleSheet } from 'react-native';

export const favoritesStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  cardList: {
    marginTop: 20,
  },
  favoriteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  imageContainer: {
    position: 'relative',
  },

  superFavoriteButton: {
    position: 'absolute',
    top: 5,
    left: 5,
  },

  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardMessage: {
    fontSize: 14,
  },
  removeButton: {
    marginLeft: 10,
  },
});
