import { StyleSheet, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;

export const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 25,
    backgroundColor: '#F39201',
  },
  image: {
    width: '100%',
    height: screenHeight * 0.6,
    resizeMode: 'cover',
    marginBottom: 20,
    marginTop: 40,
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
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    fontFamily: 'WorkSans-Regular',
    color: '#fff',
    fontWeight: 'bold',
  },
});
