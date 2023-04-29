import { StyleSheet, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;

export const dailyCardStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 30,
    backgroundColor: '#F39201',
  },
  card: {
    width: '100%',
    height: screenHeight * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 20,
  },
  star: {
    position: 'absolute',
    bottom: -13,
    left: 5,
  },
  title: {
    fontFamily: 'WorkSans-Regular',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  photoOwner: {
    fontSize: 12,
    fontFamily: 'WorkSans-Light',
    textAlign: 'center',
    marginBottom: 20,
  },
  favoriteButton: {
    marginBottom: 20,
  },
});
