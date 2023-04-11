import { StyleSheet } from 'react-native';

export const dailyCardStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  card: {
    backgroundColor: 'rgb(1,243,131)',
    width: 300,
    height: 600,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 30,
    marginBottom: 30,
  },
  imageContainer: {
    width: 225,
    height: 225,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  messageTitle: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 22,
    lineHeight: 22,
    textAlign: 'center',
    color: '#000000',
  },
  message: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 19,
    lineHeight: 23,
    textAlign: 'center',
    color: '#000000',
    marginTop: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  photoOwner: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    color: '#000000',
  },
});