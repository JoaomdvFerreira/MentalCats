import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    'KronaOne-Regular': require('../assets/fonts/KronaOne-Regular.ttf'),
    'WorkSans-Light': require('../assets/fonts/WorkSans-Light.ttf'),
    'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf'),
  });
};

export default loadFonts;
